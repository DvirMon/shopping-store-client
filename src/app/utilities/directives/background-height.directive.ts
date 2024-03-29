import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormService } from 'src/app/services/form.service';
import { store } from '../redux/store';

@Directive({
  selector: '[appBackgroundHeight]'
})
export class BackgroundHeightDirective {

  @HostBinding("style.height") public height: string;

  @HostListener('window:scroll', ['$event']) public checkScroll() {

    const scrollPosition = window.pageYOffset

    if (scrollPosition >= 70) {
      this.height = "210vh"
    }

  }


  constructor(
    private formService: FormService
  ) {
  }




}
