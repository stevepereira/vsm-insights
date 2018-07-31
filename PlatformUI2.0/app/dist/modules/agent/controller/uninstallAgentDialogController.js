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
    var UninstallAgentDialogController = /** @class */ (function () {
        function UninstallAgentDialogController(agentService, $mdDialog, $route, $location) {
            this.agentService = agentService;
            this.$mdDialog = $mdDialog;
            this.$route = $route;
            this.$location = $location;
            var self = this;
            self.statusObject = self['locals'].statusObject;
            self.agentKey = self['locals'].agentKey;
            self.toolName = self['locals'].toolName;
            self.osVersion = self['locals'].osVersion;
            var elem = document.querySelector('#agentTemplateContainer');
            var agentListControllerScope = angular.element(elem).scope();
            var agentController = agentListControllerScope['agentListController'];
            this.agentListController = agentController;
        }
        UninstallAgentDialogController.prototype.confirmation = function () {
            var self = this;
            self.agentService.agentUninstall(self.agentKey, self.toolName, self.osVersion).then(function (data) {
                self.agentListController.getRegisteredAgents();
            }).catch(function (data) {
                self.agentListController.showConfirmMessage = "service_error";
                self.agentListController.getRegisteredAgents();
            });
            self.hide();
        };
        UninstallAgentDialogController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        UninstallAgentDialogController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        UninstallAgentDialogController.$inject = ['agentService', '$mdDialog', '$route', '$location'];
        return UninstallAgentDialogController;
    }());
    ISightApp.UninstallAgentDialogController = UninstallAgentDialogController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=uninstallAgentDialogController.js.map