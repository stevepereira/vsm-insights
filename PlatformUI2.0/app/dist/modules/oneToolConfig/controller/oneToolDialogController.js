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
//// <reference path="../../../_all.ts" />
var ISightApp;
(function (ISightApp) {
    var ShowTemplateResponseDialogController = /** @class */ (function () {
        function ShowTemplateResponseDialogController($mdDialog, $route) {
            this.$mdDialog = $mdDialog;
            this.$route = $route;
            this.agentData = '';
            this.agentData = this['locals'].agentData;
        }
        ShowTemplateResponseDialogController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        ShowTemplateResponseDialogController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        ShowTemplateResponseDialogController.$inject = ['$mdDialog', '$route'];
        return ShowTemplateResponseDialogController;
    }());
    ISightApp.ShowTemplateResponseDialogController = ShowTemplateResponseDialogController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=oneToolDialogController.js.map