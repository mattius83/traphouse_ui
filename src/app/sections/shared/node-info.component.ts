import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'node-info',
  templateUrl: './node-info.component.html',
  styleUrls: ['./node-info.component.css']
})
export class NodeInfoComponent implements OnInit {

@Input()
node: any;

  constructor() {

  }

  ngOnInit() {

  }

}
