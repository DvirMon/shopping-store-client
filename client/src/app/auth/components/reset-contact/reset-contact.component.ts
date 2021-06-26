import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';

import { FormService } from 'src/app/services/form.service';
import { ResetModel, ResetService } from 'src/app/services/reset.service';

@Component({
  selector: 'app-reset-contact',
  templateUrl: './reset-contact.component.html',
  styleUrls: ['./reset-contact.component.scss']
})
export class ResetContactComponent {

  @ViewChild('phone') public inputPhone: NgxMatIntlTelInputComponent
  @Output() public next = new EventEmitter();
  @Input() public method;

  public control: FormControl = this.formService.setMethodControl();
  public serverError: string

  constructor(
    private formService: FormService,
    private resetService: ResetService
  ) { }

  // HTTP SECTION

  public onSubmit() {

    const value = this.method === "email" ? this.control.value : this.inputPhone.value

    this.resetService.getConfirmationCode({ contact: value, method: this.method }).subscribe(
      (payload: ResetModel) => {
        this.resetService.setResetData(payload);
        this.next.emit()
      },
      (err: HttpErrorResponse) => {
        this.serverError = err.error
        this.control.setErrors({ serverError: true })
      }
    )

  }



}