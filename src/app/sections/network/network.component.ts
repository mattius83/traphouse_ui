import { Component, OnInit } from '@angular/core';
declare var $:JQueryStatic;
import * as _ from 'lodash';
import * as backbone from 'backbone';
import * as joint from 'jointjs';
import { Shape } from '../shared/shape';
import { Node } from './node';
import { Link } from '../shared/link';
import { NetworkInfoService } from '../../services/network-info.service';



@Component({
  selector: 'network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  drawerPosition = 'end';
  currentNode: any;
  graph: any;
  networkNodeList: Array<Node>;
  networkNodeDict: any;
  nodeInfoOpen: boolean;

  constructor(private netinfoService: NetworkInfoService) {
     this.graph = new joint.dia.Graph;
     this.networkNodeList = [];
     this.networkNodeDict = { };
     this.currentNode = { };
     this.nodeInfoOpen = false;
  }

  ngOnInit() {
    this.load();
  }

  onShowNodeInfo() {

  }

  load() {
    this.netinfoService.getNodes().subscribe( data => {


        _.map(data, (entry:any) => {

            // for now... only load up nodes for one subnet - Philadelphia "p210"
            if ( entry.subnetId === "p210") {
              let node: Node = new Node(entry.currentUserName, entry.id);
              node.subnetId = entry.subnetId;
              node.manufacturer = entry.manufacturer;
              node.model = entry.model;
              node.osType = entry.osType;
              node.type = entry.type;
              node.macAddress = entry.macAddress;
              node.ipAddress = entry.ipAddress;
              node.networkType = entry.networkType;
              node.connections = entry.connections;
              this.networkNodeList.push(node);
            }

        });
        console.log("Inside load - subscribe and here is the networkNodeList");
        console.log(this.networkNodeList);

        this.buildNetworkNodeDictionary(this.networkNodeList);

        console.log("Here are the subnets");
        console.log(this.networkNodeList);
        console.log("Here is the subnet dictionary: ");
        console.log(this.networkNodeDict);


        let alist = this.buildAdjacencyList(this.networkNodeList);

        console.log("Here is the resulting adjacencyList: ");
        console.log(alist);

        this.renderDirectedGraph(alist);
    });
  }

  buildNetworkNodeDictionary(nodes: Array<Node>): void {
      _.map(nodes, (entry: Node) => {
        this.networkNodeDict[entry.id] = entry;
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
      this.currentNode = this.networkNodeDict[currentElement.id];
      currentElement.attr('body/stroke', 'orange');
    });

    let cells = this.buildGraphFromAdjacencyList(adjacencyList);
    let graphOptions = { rankSep: 3, nodeSep: 5, edgeSep: 3};
    /*
    let graphOptions = {
      "nodeSep": 20,
      "edgeSep": 30,
      "rankSep": 20,
      "rankDir": “TB”,
      "marginX": 10,
      "marginY": 10
    };
    */
    this.graph.resetCells(cells);

    joint.layout.DirectedGraph.layout(this.graph, graphOptions );
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
   * dictionary are the IDs from the nodes
   */
  buildAdjacencyList(nodeList: Array<Node>):any {
      let result:any = { };

      _.map(nodeList, (entry:Node) => {
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

       Object.keys(adjacencyList).forEach(nodeId =>  {
           // Add element
           let elem = new Shape({id: nodeId});
           let currentNode = this.networkNodeDict[nodeId];
           elem.attr('label/text', currentNode.currentUserName);
           elements.push(elem);

           // Add links
           adjacencyList[nodeId].forEach(function(childLabel) {
               let link = new Link();
               link.set({
                   source: { id: nodeId },
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
