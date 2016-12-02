//@module
/*
  Copyright 2011-2016 Marvell Semiconductor, Inc.

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
exports.pins = {
    red: { type: "PWM" },
    green: { type: "PWM" },
    blue: { type: "PWM" },
};

exports.configure = function() {
	this.red.init();
	this.green.init();
	this.blue.init();
	this.turnOff();
}

exports.turnOff = function() {
	this.red.write(1);
	this.green.write(1);
	this.blue.write(1);
}

exports.write = function(value) {
	this.red.write(1 - value);
	this.green.write(1 - value);
	this.blue.write(1 - value);
}

exports.close = function(){
	this.turnOff();
	this.red.close();
	this.green.close();
	this.blue.close();
}

