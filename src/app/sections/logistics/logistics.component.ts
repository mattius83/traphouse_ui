import { Component, OnInit } from '@angular/core';
declare var $:JQueryStatic;
import * as _ from 'lodash';
import * as backbone from 'backbone';
import * as joint from 'jointjs';
import {Shape} from './shape';



@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.css']
})
export class LogisticsComponent implements OnInit {

  graph: any;

  constructor() {
     this.graph = new joint.dia.Graph;
  }

  ngOnInit() {

    let paper = new joint.dia.Paper({
      el: $("#paper"),
      model: this.graph,
      height: $("#diagram").height(),
      width: $("#diagram").width(),
      // width: 300,
      gridSize: 1
    });

    this.buildSampleGraph();

  }



  buildSampleGraph() {
    let rect = new joint.shapes.basic.Rect({
      position: { x: 100, y: 30 },
      size: { width: 100, height: 30 },
      attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
    });

    let rect2 = rect.clone() as joint.shapes.basic.Rect;
    rect2.translate(300);

    var link = new joint.dia.Link({
      source: { id: rect.id },
      target: { id: rect2.id }
    });

    var myShape = new Shape({ id: "ba707" }).setText("G7");
    myShape.position(300,200);
    this.graph.addCells([rect, rect2, link, myShape]);
  }
}
