import { Component, OnInit } from '@angular/core';
import * as operatorModule from '../../data/operators.json';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  operatorList: any;
  displayedColumns: string[];

  constructor() {
      this.displayedColumns = [ 'index', 'about', 'company'];
  }

  ngOnInit() {
            this.operatorList = operatorModule['default'];
  }

}
