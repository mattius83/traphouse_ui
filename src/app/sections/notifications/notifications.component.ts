import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  columnDefs:any;
  rowData:any;
  
  constructor() {
  }

  ngOnInit() {

    this.columnDefs = [
      {headerName: 'Make', field: 'make' },
      {headerName: 'Model', field: 'model' },
      {headerName: 'Price', field: 'price'}
    ];

    this.rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
  }

}
