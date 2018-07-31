/*******************************************************************************
 * Copyright 2017 Cognizant Technology Solutions
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.  You may obtain a copy
 * of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 ******************************************************************************/
/// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var AgentDialogController = /** @class */ (function () {
        function AgentDialogController(agentService, $mdDialog) {
            this.agentService = agentService;
            this.$mdDialog = $mdDialog;
            this.message = 'Message from cntrl';
            this.headerArray = [];
            this.agentDetailedNode = [];
            this.showFieldVal = ['id', 'type', 'uuid', 'status', 'execId', 'message'];
            this.headerArrayDisplay = [];
            var self = this;
            this.showThrobber = true;
            this.showcontent = !this.showThrobber;
            this.checkResponseData = true;
            this.agentService.loadHealthConfigurations(self["toolName"], self["toolCategory"])
                .then(function (data) {
                self.showThrobber = false;
                self.showcontent = !self.showThrobber;
                var dataArray = data.data.nodes;
                if (dataArray.length === 0) {
                    this.checkResponseData = false;
                }
                for (var key in dataArray) {
                    var dataNodes = dataArray[key];
                    for (var node in dataNodes) {
                        if (node == "propertyMap") {
                            var obj = dataNodes[node];
                            self.agentDetailedNode.push(obj);
                            for (var attr in obj) {
                                if (self.headerArray.indexOf(attr) < 0) {
                                    self.headerArray.push(attr);
                                    self.showSelectedField();
                                }
                            }
                        }
                    }
                }
            });
        }
        AgentDialogController.prototype.showSelectedField = function () {
            for (var key in this.showFieldVal) {
                for (var val in this.headerArray) {
                    if (this.showFieldVal[key] === this.headerArray[val]) {
                        if (this.headerArrayDisplay.indexOf(this.showFieldVal[key]) < 0) {
                            this.headerArrayDisplay.push(this.showFieldVal[key]);
                        }
                    }
                }
            }
        };
        AgentDialogController.prototype.getSelectedFieldLength = function (obj) {
            return Object.keys(obj).length;
        };
        AgentDialogController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        AgentDialogController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        AgentDialogController.$inject = ['agentService', '$mdDialog'];
        return AgentDialogController;
    }());
    ISightApp.AgentDialogController = AgentDialogController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=agentDialogController.js.map