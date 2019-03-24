import { Component, OnInit } from '@angular/core';
declare var $:JQueryStatic;
import * as _ from 'lodash';
import * as backbone from 'backbone';
import * as joint from 'jointjs';
import { Shape } from './shape';
import { Link } from './link';
// import { Subnet } from './subnet';
import { NetworkInfoService } from '../../services/network-info.service';



@Component({
  selector: 'network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  drawerPosition = 'end';
  currentNetwork: any;
  graph: any;
  networkNodeList: Array<Node>;
  networkNodeDict: any;

  constructor(private netinfoService: NetworkInfoService) {
     this.graph = new joint.dia.Graph;
     this.networkNodeList = [];
     this.networkNodeDict = { };
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
      width:  $("#diagram").width(),
      // width: 300,
      gridSize: 1
    });

    paper.on('cell:pointerclick', cellView => {
      this.resetAll(paper);
      let isElement = cellView.model.isElement();
      let currentElement = cellView.model;
      this.currentSubnet = this.subnetDict[currentElement.id];
      currentElement.attr('body/stroke', 'orange');
    });

    let cells = this.buildGraphFromAdjacencyList(adjacencyList);
    this.graph.resetCells(cells);
    joint.layout.DirectedGraph.layout(this.graph, {} );
  }

  resetAll(paper) {
    var elements = paper.model.getElements();
    for (var i = 0, ii = elements.length; i < ii; i++) {
        var currentElement = elements[i];
        currentElement.attr('body/stroke', 'black');
    }

    var links = paper.model.getLinks();
    for (var j = 0, jj = links.length; j < jj; j++) {
        var currentLink = links[j];
        currentLink.attr('line/stroke', 'black');
        currentLink.label(0, {
            attrs: {
                body: {
                    stroke: 'black'
                }
            }
        })
    }
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

}
