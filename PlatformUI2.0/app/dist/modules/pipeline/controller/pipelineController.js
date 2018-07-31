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
    var PipelineController = /** @class */ (function () {
        function PipelineController(pipelineService, $mdDialog) {
            this.pipelineService = pipelineService;
            this.$mdDialog = $mdDialog;
            this.message = 'This is test';
            this.fonts = [
                { iconSrc: 'dist/icons/svg/SCM-new.svg', name: 'SCM' },
                { iconSrc: 'dist/icons/svg/CI-new.svg', name: 'CI' },
                { iconSrc: 'dist/icons/svg/code-quality-new.svg', name: 'Code Quality' },
                { iconSrc: 'dist/icons/svg/deployment-new.svg', name: 'Deployment' },
            ];
            var self = this;
            this.pipelineService
                .loadPipelineData()
                .then(function (data) {
                self.pipelineDataArray = data;
            });
        }
        PipelineController.prototype.showTabDialog = function (params, userData, appData) {
            var self = this;
            this.$mdDialog.show({
                controller: ISightApp.DialogController,
                controllerAs: 'dialog',
                templateUrl: './dist/modules/pipeline/view/tabDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: params,
                clickOutsideToClose: true,
                locals: {
                    userData: userData,
                    appData: appData
                },
                bindToController: true
            });
        };
        PipelineController.prototype.hide = function () {
            this.$mdDialog.hide();
        };
        PipelineController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        PipelineController.prototype.getToolDataLength = function (obj) {
            return Object.keys(obj).length;
        };
        PipelineController.$inject = ['pipelineService', '$mdDialog'];
        return PipelineController;
    }());
    ISightApp.PipelineController = PipelineController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=pipelineController.js.map