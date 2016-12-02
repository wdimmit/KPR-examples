/*  Copyright 2011-2016 Marvell Semiconductor, Inc.  Licensed under the Apache License, Version 2.0 (the "License");  you may not use this file except in compliance with the License.  You may obtain a copy of the License at      http://www.apache.org/licenses/LICENSE-2.0  Unless required by applicable law or agreed to in writing, software  distributed under the License is distributed on an "AS IS" BASIS,  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the License for the specific language governing permissions and  limitations under the License.*/let Pins = require("pins");let PLOTTER = require('plotter');

let labelStyle = new Style({ color: '#47476B', font: '30px Helvetica bold' });let GraphContainer = Container.template($ => ({ 	left: 0, right: 0, top: 0, bottom: 0, }));let GraphLabel = Line.template($ => ({ 	left: 10, bottom: 5, 	skin: new Skin({ fill: '#B3FFFFFF',}), 	contents: [		Label($, { style: labelStyle, string: 'x: ' }),		Label($, { 			style: labelStyle, string: '--', 			behavior: Behavior({				onCreate: function(content, data) {					this.name = data.name;				},				onReceiveReading: function(content, reading, name) {					//update the value string					if ( this.name == name ) {			        	content.string = reading.toFixed(2);			 		}				},			})		}),	]}));let GraphCanvas = PLOTTER.Plotter.template($ => ({ 	left: 5, right: 5, top: 5, bottom: 5, 	behavior: PLOTTER.PlotterBehavior({		onTimeChanged: function(content) {			Pins.invoke("/potentiometer/read", data => {				application.distribute("gotReading", data);			});		},	})}));application.behavior = Behavior({	onLaunch: function(content) {		/*		Initializes a GraphContainer, which includes the GraphCanvas,		upon which values are drawn, and the GraphLabel, which displays		the value as text. 		*/		var graph = new GraphContainer();					/**		Parameters for the plotter			name: unique identifier			interval: ms between updates			buckets: number of values displayed on the screen at once			background: background color			strokeStyle: color of the line			lineWidth: width of the line			complement: if true, graph ( 1 - value ) rather than the value 		*/        var plotterParams = {        	name: "sensor1",		     		interval: 10,			buckets:200,        	background: "white",        	strokeStyle: "red",			lineWidth: 4,			complement: true		};					graph.add( new GraphCanvas( plotterParams ) );		graph.add( new GraphLabel( plotterParams) );		application.skin = new Skin({ fill: 'white' });		application.add(graph);				Pins.configure({        	potentiometer: {            	require: "Analog",                pins: {                	power: { pin: 51, type: "Power", voltage: 3.3 },                	analog: { pin: 52 },                	ground: { pin: 53, type: "Ground" }                }            }		}, success => {			if (!success) {				trace("Failed to configure pins.\n");			}		});	},})