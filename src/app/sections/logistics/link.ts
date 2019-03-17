
import * as joint from 'jointjs';


var Link = joint.dia.Link.define('demo.Link', {
       attrs: {
           line: {
               connection: true,
               stroke: 'gray',
               strokeWidth: 2,
               pointerEvents: 'none',
               targetMarker: {
                   type: 'path',
                   fill: 'gray',
                   stroke: 'none',
                   d: 'M 10 -10 0 0 10 10 z'
               }
           }
       },
       connector: {
           name: 'rounded'
       },
       z: -1,
       weight: 1,
       minLen: 1,
       labelPosition: 'c',
       labelOffset: 10,
       labelSize: {
           width: 50,
           height: 30
       },
       labels: [{
           markup: [{
               tagName: 'rect',
               selector: 'labelBody'
           }, {
               tagName: 'text',
               selector: 'labelText'
           }],
           attrs: {
               labelText: {
                   fill: 'gray',
                   textAnchor: 'middle',
                   refY: 5,
                   refY2: '-50%',
                   fontSize: 20,
                   cursor: 'pointer'
               },
               labelBody: {
                   fill: 'lightgray',
                   stroke: 'gray',
                   strokeWidth: 2,
                   refWidth: '100%',
                   refHeight: '100%',
                   refX: '-50%',
                   refY: '-50%',
                   rx: 5,
                   ry: 5
               }
           },
           size: {
               width: 50, height: 30
           }
       }]

   }, {

       markup: [{
           tagName: 'path',
           selector: 'line',
           attributes: {
               'fill': 'none'
           }
       }],

       connect: function(sourceId, targetId) {
           return this.set({
               source: { id: sourceId },
               target: { id: targetId }
           });
       },

       setLabelText: function(text) {
           return this.prop('labels/0/attrs/labelText/text', text || '');
       }
   });

       export { Link };
