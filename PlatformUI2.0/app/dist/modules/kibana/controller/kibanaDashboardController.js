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
    var KibanaDashboardController = /** @class */ (function () {
        function KibanaDashboardController(elasticSearchService, $sce) {
            this.elasticSearchService = elasticSearchService;
            this.$sce = $sce;
            this.icon = {
                iconSrc: 'dist/icons/svg/ic_dashboard_24px.svg', name: 'SCM'
            };
            var self = this;
            this.elasticSearchService
                .loadKibanaIndex()
                .then(function (data) {
                var model = [];
                var dataArray = data.dashboards;
                dataArray.forEach(function (element) {
                    model.push(new ISightApp.KibanaDashboardModel(element.title, element.id, element.url));
                });
                self.kibanaDashboards = model;
                self.setSelectedDashboard(model[0]);
            });
        }
        KibanaDashboardController.prototype.openMenu = function ($mdOpenMenu, ev) {
            //this.originatorEv = ev;
            $mdOpenMenu(ev);
        };
        KibanaDashboardController.prototype.setSelectedDashboard = function (dashboard) {
            this.selectedDashboard = dashboard;
            dashboard.url = this.$sce.trustAsResourceUrl(dashboard.url);
        };
        KibanaDashboardController.prototype.loadDashboard = function (dashboard) {
            this.setSelectedDashboard(dashboard);
        };
        KibanaDashboardController.$inject = ['elasticSearchService', '$sce'];
        return KibanaDashboardController;
    }());
    ISightApp.KibanaDashboardController = KibanaDashboardController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=kibanaDashboardController.js.map