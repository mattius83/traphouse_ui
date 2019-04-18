import { Component, OnInit } from '@angular/core';
declare var $:JQueryStatic;
import * as _ from 'lodash';
import * as backbone from 'backbone';
import * as joint from 'jointjs';
import { Shape } from '../shared/shape';
import { Node } from './node';
import { Subnet } from '../subnet/subnet';
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

  /*  list of all the nodes, raw data from service */
  networkNodeList: Array<Node>;

  /* Dictionary mapping node id to node attributes */
  networkNodeDictionary: any;

  /* Dictionary mapping subnet id to adjacencyList of nodes corresponding to that subnet */
  adjacencyDictionary: any;

  nodeInfoOpen: boolean;
  selectedSubnetList: Array<any>;
  selectedSubnet:any;


  constructor(private netInfoService: NetworkInfoService) {
     this.graph = new joint.dia.Graph;
     this.networkNodeDictionary = { };
     this.adjacencyDictionary = {};
     this.currentNode = { };
     this.nodeInfoOpen = false;
     this.selectedSubnetList = [];
     this.selectedSubnet = {};

  }

  ngOnInit() {
    this.load();
  }

  onShowNodeInfo() {

  }

  load() {
    this.netInfoService.getSubnets().subscribe( subnetData => {


        this.selectedSubnetList = _.map(subnetData, (subnet: any) => {
            return { "value": subnet.id, "displayValue": subnet.name };
        });

        this.netInfoService.getNodes().subscribe( nodesData => {

            /* build a dictionary that maps node id to node attributes */
            this.buildnetworkNodeDictionaryionary(nodesData);

            /* group the nodes by subnet */
            let nodesBySubnet = _.groupBy(nodesData, 'subnetId');

            /* map over each subnet and build adjacencyList for each subnets */
            let subnetKeys = Object.keys(nodesBySubnet);
            _.map(subnetKeys, subnetId => {

                let rawList = nodesBySubnet[subnetId];
                let nodeList = _.map(rawList, (entry:any)=> {
                    return this.buildNode(entry);
                });

                let alist = this.buildAdjacencyList(nodeList);
                this.adjacencyDictionary[subnetId] = alist;
            });

            let selectedSubnetId = Object.keys(this.adjacencyDictionary)[0];

        });
    });


  }

  onSubnetSelected(event) {
    console.log("The subnet selector was changed and here is the data: ");
    console.log(event);
    let subnetId = event.value;
    this.renderDirectedGraph(this.adjacencyDictionary[subnetId]);

  }

  buildNode(entry:any): Node {
    let result: Node = new Node(entry.currentUserName, entry.id);
    result.subnetId = entry.subnetId;
    result.deviceName = entry.deviceName;
    result.manufacturer = entry.manufacturer;
    result.model = entry.model;
    result.osType = entry.osType;
    result.type = entry.type;
    result.macAddress = entry.macAddress;
    result.ipAddress = entry.ipAddress;
    result.networkType = entry.networkType;
    result.connections = entry.connections;
    return result;
  }

  buildnetworkNodeDictionaryionary(nodes: Array<Node>): void {
      _.map(nodes, (entry: Node) => {
        this.networkNodeDictionary[entry.id] = entry;
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
      this.currentNode = this.networkNodeDictionary[currentElement.id];
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
           let currentNode = this.networkNodeDictionary[nodeId];
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
