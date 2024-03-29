import { Component, OnInit, forwardRef, Input, Output, HostListener, ElementRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, UntypedFormControl } from '@angular/forms';
import { ProductModel } from 'src/app/feat-modules/products/product-model';
import { FormService } from 'src/app/services/form.service';


@Component({
  selector: 'app-upload-input',
  templateUrl: './upload-input.component.html',
  styleUrls: ['./upload-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputUploadComponent),
      multi: true
    },
  ]
})
export class InputUploadComponent  {

  @Input() control: UntypedFormControl
  @Input() editMode: boolean = false
  @Input() product: ProductModel

  // emit the file
  @Output() fileEmit = new EventEmitter<File | string>()

  // listen to change event
  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    this.file = event && event.item(0);
    this.fileEmit.emit(this.file)
    this.previewImage()
  }

  public file: File | null = null;
  public preview: string

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private formService: FormService,

  ) { }


  writeValue(value: null) {

    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  public registerOnChange(fn: any): void {
  }

  public registerOnTouched(fn: any) {
  }


  public async previewImage() {

    if (!this.file) {
      alert("Please choose image");
      return;
    }

    try {
      this.preview = await this.formService.previewImage(this.file)
    }
    catch (err) {
      console.log(err)
    }
  }


}
