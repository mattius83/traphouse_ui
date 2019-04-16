import { Component, OnChanges, OnInit, Input } from '@angular/core';
import * as _ from "lodash";

@Component({
  selector: 'node-info',
  templateUrl: './node-info.component.html',
  styleUrls: ['./node-info.component.css']
})
export class NodeInfoComponent  {

displayProperties: Array<any>;

@Input()
node: any;

@Input()
nodeType: string;

  constructor() {
    this.displayProperties = [];
  }

  ngOnChanges() {
      let filterOutKeys = ["connections", "id"];
      this.displayProperties = [];
      let properties = Object.keys(this.node);
      _.map(properties, key=> {
          let kv = { "key": key, "value": this.node[key] };
          if (_.indexOf(filterOutKeys, key) == -1) {
              this.displayProperties.push(kv);
          }
      });
  }

}
