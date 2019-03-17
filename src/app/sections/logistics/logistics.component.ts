import { Component, OnInit } from '@angular/core';
declare var $:JQueryStatic;
import * as _ from 'lodash';
import * as backbone from 'backbone';
import * as joint from 'jointjs';
import {Shape} from './shape';
import {Link} from './link';



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

    /*
    var link = new joint.dia.Link({
      source: { id: rect.id },
      target: { id: rect2.id }
    });
    */



    // var myShape = new Shape({ id: "ba707" }).setText("G7");
    var shape_a = new Shape({id: "ba707"});
    shape_a.attr('label/text', 'G707');
    shape_a.position(300,200);

    var shape_b = new Shape({id: "ba708"});
    shape_b.attr('label/text', 'G708');
    shape_b.position(500, 200);

    /*
    var link = new Link().connect("ba707", "ba708")
                         .setLabelText("a link");
    */
    var link = new Link();
    link.connect("ba707", "ba708").setLabelText("m link");

    this.graph.addCells([rect, rect2, shape_a, shape_b, link]);
  }
}
