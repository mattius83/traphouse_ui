import { Component, OnInit } from '@angular/core';
declare var $:JQueryStatic;
import * as _ from 'lodash';
import * as backbone from 'backbone';
import * as joint from 'jointjs';
import { Shape } from './shape';
import { Link } from './link';
import { Subnet } from './subnet';
import { NetworkInfoService } from '../../services/network-info.service';



@Component({
  selector: 'subnet',
  templateUrl: './subnet.component.html',
  styleUrls: ['./subnet.component.css']
})
export class SubnetComponent implements OnInit {

  graph: any;
  subnetList: Array<Subnet>;
  subnetDict: any;

  constructor(private netinfoService: NetworkInfoService) {
     this.graph = new joint.dia.Graph;
     this.subnetList = [];
     this.subnetDict = { };
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.netinfoService.getSubnets().subscribe( data => {
        _.map(data, (entry:any) => {
            let sn: Subnet = new Subnet(entry.name, entry.id, entry.sysAdmin, entry.connections);
            this.subnetList.push(sn);
        });
        this.buildSubnetDictionary(this.subnetList);
        /*
        console.log("Here are the subnets");
        console.log(this.subnetList);
        console.log("Here is the subnet dictionary: ");
        console.log(this.subnetDict);
        */

        let alist = this.buildAdjacencyList(this.subnetList);
        /*
        console.log("Here is the resulting adjacencyList: ");
        console.log(alist);
        */
        this.renderDirectedGraph(alist);
    });
  }

  buildSubnetDictionary(subnets: Array<Subnet>): void {
      _.map(subnets, (entry: Subnet) => {
        this.subnetDict[entry.id] = entry;
      });
  }

  renderDirectedGraph(adjacencyList:any): void {
    let paper = new joint.dia.Paper({
      el: $("#paper"),
      model: this.graph,
      height: $("#diagram").height(),
      width: $("#diagram").width(),
      // width: 300,
      gridSize: 1
    });

    paper.on('cell:pointerclick', function(cellView) {
      let isElement = cellView.model.isElement();
      let currentElement = cellView.model;
      console.log("Here is the currentElement");
      console.log(currentElement);
      currentElement.attr('body/stroke', 'orange');
    });

    let cells = this.buildGraphFromAdjacencyList(adjacencyList);
    this.graph.resetCells(cells);
    joint.layout.DirectedGraph.layout(this.graph, {} );
  }

  /* Builds a dictionary representing an adjacencyList where the keys in the
   * dictionary are the IDs from the subnets
   */
  buildAdjacencyList(subnetList: Array<Subnet>):any {
      let result:any = { };

      _.map(subnetList, (entry:Subnet) => {
          result[entry.id] = [];
          _.map(entry.connections, connectedId => {
              result[entry.id].push(connectedId);
          });
      });
      return result;
  }

  buildGraphFromAdjacencyList(adjacencyList) {

       var elements = [];
       var links = [];

       Object.keys(adjacencyList).forEach(subnetId =>  {
           // Add element
           let elem = new Shape({id: subnetId});
           let currentSubnet = this.subnetDict[subnetId];
           elem.attr('label/text', currentSubnet.name);
           elements.push(elem);

           // Add links
           adjacencyList[subnetId].forEach(function(childLabel) {
               let link = new Link();
               link.set({
                   source: { id: subnetId },
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
