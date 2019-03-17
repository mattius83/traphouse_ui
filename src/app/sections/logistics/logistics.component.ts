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

  //   this.buildSampleGraph();
  let alist = {
            a: ['b','c','d'],
            b: ['d', 'e'],
            c: [],
            d: [],
            e: ['e'],
            f: [],
            g: ['b','i'],
            h: ['f'],
            i: ['f','h']
        };

    let cells = this.buildGraphFromAdjacencyList(alist);
    this.graph.resetCells(cells);
    joint.layout.DirectedGraph.layout(this.graph, {} );

  }

  buildGraphFromAdjacencyList(adjacencyList) {

       var elements = [];
       var links = [];

       Object.keys(adjacencyList).forEach(function(parentLabel) {
           // Add element
           let elem = new Shape({id: parentLabel});
           elem.attr('label/text', parentLabel);
           elements.push(elem);

           // Add links
           adjacencyList[parentLabel].forEach(function(childLabel) {
               let link = new Link();
               link.set({
                   source: { id: parentLabel },
                   target: { id: childLabel }
               });
              // link.connect(parentLabel, childLabel);
               links.push(link);
           });
       });

       // Links must be added after all the elements. This is because when the links
       // are added to the graph, link source/target
       // elements must be in the graph already.
       return elements.concat(links);
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
    // link.connect("ba707", "ba708").setLabelText("m link");
    link.set({
        source: { id: "ba707" },
        target: { id: "ba708" }
    });
    this.graph.addCells([rect, rect2, shape_a, shape_b, link]);
  }
}
