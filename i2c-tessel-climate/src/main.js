/*
  Copyright 2011-2015 Marvell Semiconductor, Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

let Pins = require("pins");

/* TEMPLATES */

let MainScreen = Column.template($ => ({
	left:0, right:0, top:0, bottom:0, skin:new Skin({ fill:'#76b321' }),
	style:new Style({ font:'bold 36px', color:'white', horizontal:'left', vertical:'middle' }),
	Behavior: class extends Behavior {
		onClimateRead(container, value) {
	        container.first.string = "Temperature: " + value.temperature.toPrecision(3) + "°";
	        container.first.next.string = "Humidity: " + (value.humidity * 100).toPrecision(3) + "%";
		}
		onDisplayed(container) {
			Pins.configure({
				tesselClimate: {
					require: "tesselClimate",
					pins: {
					    climate: {sda: 27, clock: 29, units: "farenheight", heater: false}
					}
				}
			}, success => this.onPinsConfigured(container, success));
		}
		onPinsConfigured(container, success) {		
			if (success) {
				Pins.repeat("/tesselClimate/read", 30, value => this.onClimateRead(container, value));
	
				Pins.share("ws", {zeroconf: true, name: "i2c-tessel-climate"});
			}
			else {
				trace("failed to configure pins\n");
	        }
		}
	},
	contents:[
		Label($, { left:20, right:0, top:0, bottom:0 }),
		Label($, { left:20, right:0, top:0, bottom:0 })
	]
}));

/* APPLICATION */

application.add(new MainScreen);
