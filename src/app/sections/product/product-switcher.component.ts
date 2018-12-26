import { Component, OnInit } from '@angular/core';
import * as vehicleModule from '../../data/vehicles.json';
import { Vehicle } from './vehicle';

@Component({
  selector: 'app-product-switcher',
  templateUrl: './product-switcher.component.html',
  styleUrls: ['./product-switcher.component.css']
})
export class ProductSwitcherComponent implements OnInit {


  vehicleList: Array<Vehicle>;
  currentVehicle: Vehicle;
  vehicleIndex: number;

  constructor() { }

  ngOnInit() {


      this.vehicleList = vehicleModule['default'];
      for(let i=0; i < this.vehicleList.length; i++) {
          this.vehicleList[i].image = "../../../assets/images/product/" + this.vehicleList[i].serial + ".jpg";
      }
      this.vehicleIndex = 0;
      this.currentVehicle = this.vehicleList[this.vehicleIndex];
      console.log("Here is the currentVehicle");
      console.log(this.currentVehicle);

  }

  onNext() {
      if (this.vehicleIndex < this.vehicleList.length -1) {
        this.vehicleIndex++;
        this.currentVehicle = this.vehicleList[this.vehicleIndex];
      }
  }

  onPrevious() {
      if (this.vehicleIndex > 0) {
          this.vehicleIndex--;
          this.currentVehicle = this.vehicleList[this.vehicleIndex];
      }
  }
}
