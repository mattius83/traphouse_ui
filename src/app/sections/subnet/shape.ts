// declare var $:JQueryStatic;
// import * as _ from 'lodash';
// import * as backbone from 'backbone';
 import * as joint from 'jointjs';

var Shape = joint.dia.Element.define('demo.Shape', {
        size: {
            width: 100,
            height: 50
        },
        attrs: {
            body: {
                refWidth: '100%',
                refHeight: '100%',
                fill: 'ivory',
                stroke: 'gray',
                strokeWidth: 2,
                rx: 10,
                ry: 10
            },
            label: {
                refX: '50%',
                refY: '50%',
                yAlignment: 'middle',
                xAlignment: 'middle',
                fontSize: 15
            }
        }
    }, {
        markup: [{
            tagName: 'rect',
            selector: 'body'
        }, {
            tagName: 'text',
            selector: 'label'
        }],

        setText: function(text) {
            return this.attr('label/text', text || '');
        }
    });

    export { Shape };
