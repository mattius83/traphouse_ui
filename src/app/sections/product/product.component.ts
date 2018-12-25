import { Component, OnInit, Input, Output } from '@angular/core';
import { Vehicle } from './vehicle';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  vehicle: Vehicle;


  constructor() { }

  ngOnInit() {

  }

}
