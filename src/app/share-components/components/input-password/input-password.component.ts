import { Component, OnInit, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, UntypedFormControl } from '@angular/forms';

import { MatInput } from '@angular/material/input';
import { AuthService } from 'src/app/feat-modules/auth/auth.service';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true
    },
  ]
})
export class InputPasswordComponent implements OnInit, ControlValueAccessor {

  @ViewChild(MatInput) input: HTMLInputElement;

  @Input() public control: UntypedFormControl;

  @Input() public type: string;
  @Input() public hint: string;
  @Input() public controlName: string;
  @Input() public placeHolder: string;

  @Input() public serverErrorState: boolean;
  @Input() public loginState: boolean;

  public value: any
  public error: string
  public serverError: string
  public password: string
  public hide: boolean = true
  public passwordAutocomplete: boolean = true;

  onChange: (event) => void
  onTouched: () => void
  disabled: boolean

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.subscribeToSubject();
    this.subscribeToControl();
  }

  // ControlValueAccessor logic

  public writeValue(value: any): void {
    this.value = value ? value : ""
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  public handleChange(value: any) {
    this.value = value
  }

  public onFocus() {

    if (this.loginState || this.password) {
      return
    }

    this.generatePassword()
  }

  // subscription section

  private subscribeToSubject() {
    this.authService.serverError.subscribe(
      (error) => {
        this.serverError = error
        if (this.serverError) {
          this.control.setErrors({ serverError: true });
          this.input.focus()
        }
      }
    )
  }

  private subscribeToControl() {
    this.control.statusChanges.subscribe(
      (status) => {

        if (status === "VALID") {
          this.input.focus()

        }
      })
  }

  // LOGIC SECTION

  // function to generate password
  public generatePassword() {
    this.password = this.messageService.generate()
  }

  // function to update password to the control
  public pushPassword() {
    this.control.setValue(this.password)
  }

  // function to handle validation messages
  public validate() {

    this.error = this.messageService.getErrorMessage(this.control, this.placeHolder)

    this.control.valueChanges.subscribe(
      () => {
        this.error = this.messageService.getErrorMessage(this.control, this.placeHolder)
      }
    )
  }

  // end of logic section
}
