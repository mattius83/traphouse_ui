
import * as joint from 'jointjs';


var Link = joint.dia.Link.define('demo.Link', {
       attrs: {
           line: {
               connection: true,
               stroke: 'gray',
               strokeWidth: 2,
               pointerEvents: 'none'
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
           markup: [ {
               tagName: 'text',
               selector: 'labelText'
           }],
           attrs: {

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
