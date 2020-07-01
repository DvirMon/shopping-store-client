import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

import { faCcMastercard } from '@fortawesome/free-brands-svg-icons';
import { faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { faCcAmex } from '@fortawesome/free-brands-svg-icons';
import { faCcJcb } from '@fortawesome/free-brands-svg-icons';

import { CreditCardModel } from 'src/app/utilities/models/credit-card-model';
  
import Cleave from 'src/cleave.js-master'
 
@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit, AfterViewInit {
 
  @ViewChild('input') input: ElementRef

  @Input() public control: FormControl

  public cleave: Cleave
  public creditCards : CreditCardModel[] = []
  
  ngOnInit(): void {
    const visa: CreditCardModel = new CreditCardModel(faCcVisa, false, "visa");
    const amex : CreditCardModel = new CreditCardModel(faCcAmex, false, "amex");
    const mc : CreditCardModel = new CreditCardModel(faCcMastercard, false, "mastercard");
    const jcb : CreditCardModel = new CreditCardModel( faCcJcb, false, "jcb");
    this.creditCards = [visa, mc, amex, jcb]
    
  }

  
  ngAfterViewInit() {

    this.cleave = new Cleave(this.input.nativeElement, {
      creditCard: true,
      onCreditCardTypeChanged: (type) => {
        this.handleIconColor(type)
      }
    })

  }

  private handleIconColor(value) {

    for(const card of this.creditCards) {
      card.name === value ? card.color = true : card.color = false
    }

  }



}