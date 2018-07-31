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
var ISightApp;
(function (ISightApp) {
    var InsightsController = /** @class */ (function () {
        function InsightsController(iconService, $mdDialog, $routeParam, $cookies, $timeout, restEndpointService, insightsService, $sce, $resource, $location) {
            this.iconService = iconService;
            this.$mdDialog = $mdDialog;
            this.$routeParam = $routeParam;
            this.$cookies = $cookies;
            this.$timeout = $timeout;
            this.restEndpointService = restEndpointService;
            this.insightsService = insightsService;
            this.$sce = $sce;
            this.$resource = $resource;
            this.$location = $location;
            this.agentNodes = [];
            this.selectedType = ['POSITIVE', 'NEGATIVE', 'NEUTRAL'];
            this.selectedKpi = ['BUILD', 'CODEQUALITY', 'DEPLOYMENT', 'DEFECTS', 'DEVELOPMENT'];
            this.selectedSchedule = "DAILY";
            this.selectedNumberOfkpis = 0;
            this.allSelectedValues = [];
            this.agentToolsIcon = {};
            this.notAuthorizeMsg = "";
            this.toolsData = [];
            this.chartType = "BarChart";
            this.showTemplateAfterLoad = false;
            this.accordianData = [];
            this.imageurl1 = "dist/icons/svg/CI-new.svg";
            this.imageurl2 = "dist/icons/svg/code-quality-new.svg";
            this.imageurl3 = "dist/icons/svg/deployment-new.svg";
            this.grafanaHost = this.restEndpointService.getGrafanaHost();
            this.mouseentered = false;
            this.data1 = '50';
            this.data2 = '60';
            this.graphcolor = "#90b4ed";
            this.populateChartObj = [];
            this.numberofkpi = 0;
            this.selectedChartType = 'BarChart';
            this.typeList = [{ "name": "POSITIVE", "checked": false }, { "name": "NEGATIVE", "checked": false }, { "name": "NEUTRAL", "checked": false }];
            this.vectorList = [{ "name": "BUILD", "checked": false }, { "name": "CODEQUALITY", "checked": false }, { "name": "DEPLOYMENT", "checked": false }, { "name": "DEFECTS", "checked": false }, { "name": "DEVELOPMENT", "checked": false }];
            this.collapse = function (data) {
                var self = this;
                for (var i in self.accordianData) {
                    if (self.accordianData[i] != data) {
                        self.accordianData[i].expanded = false;
                    }
                }
                data.expanded = !data.expanded;
            };
            this.expandAll = function () {
                var self = this;
                for (var i in self.accordianData) {
                    if (self.accordianData[i]) {
                        self.accordianData[i].expanded = true;
                    }
                }
                self.expandedAll = true;
            };
            this.showHide = function (eleId) {
                var x = document.getElementById(eleId);
                if (x.style.display === "none" || x.style.display === "") {
                    x.style.display = "block";
                }
                else {
                    x.style.display = "none";
                }
            };
            this.highlight = function (text, search) {
                var re = new RegExp(search, 'gi');
                if (!search || !re.test(text)) {
                    return this.$sce.trustAsHtml('<span class="highlightedText">' + text + '</span>');
                }
                return this.$sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
            };
            this.collapseAll = function () {
                var self = this;
                for (var i in self.accordianData) {
                    if (self.accordianData[i]) {
                        self.accordianData[i].expanded = false;
                    }
                }
                self.expandedAll = false;
            };
            this.onChangeRadio = function () {
                var self = this;
                self.allSelectedValues = [];
                self.allSelectedValues.push(self.selectedChartType);
                // self.allSelectedValues.push(self.numberofkpi);
                self.allSelectedValues.push(self.selectedSchedule);
                for (var i = 0; i < self.typeList.length; i++) {
                    if (self.typeList[i].checked) {
                        self.allSelectedValues.push(self.typeList[i].name);
                    }
                }
                for (var i = 0; i < self.vectorList.length; i++) {
                    if (self.vectorList[i].checked) {
                        self.allSelectedValues.push(self.vectorList[i].name);
                    }
                }
            };
            var self = this;
            var elem = document.querySelector('#homePageTemplateContainer');
            var homePageControllerScope = angular.element(elem).scope();
            var homePageController = homePageControllerScope['homePageController'];
            this.homeController = homePageController;
            this.homeController.templateName = 'insights';
            //this.$timeout = $timeout;
            this.showThrobber = true;
            self.insightsService.getInsightsDetails("DAILY").then(function (response) {
                self.showThrobber = false;
                self.accordianData = response.data;
                var accordianLength = self.accordianData.length;
                if (typeof self.accordianData[0] != 'undefined') {
                    self.accordianData[0].expanded = true;
                }
                if (typeof self.accordianData != 'undefined' && self.accordianData.length) {
                    for (var i = 0; i < accordianLength; i++) {
                        var objSentiment = self.accordianData[i].inferenceDetails[0].sentiment;
                        var graphColor = self.getGraphColor(objSentiment);
                        self.accordianData[i].noOfPositives = self.accordianData[i].inferenceDetails.filter(function (element) {
                            return element.sentiment === 'POSITIVE';
                        }).length;
                        self.accordianData[i].noOfNegatives = self.accordianData[i].inferenceDetails.filter(function (element) {
                            return element.sentiment === 'NEGATIVE';
                        }).length;
                        self.accordianData[i].noOfNeutral = self.accordianData[i].inferenceDetails.filter(function (element) {
                            return element.sentiment === 'NEUTRAL';
                        }).length;
                        var obj = new ISightApp.ChartObjModel(self.accordianData[i].inferenceDetails[0].lastResult, self.accordianData[i].inferenceDetails[0].currentResult, self.accordianData[i].inferenceDetails[0].inference, self.accordianData[i].inferenceDetails[0].sentiment, graphColor, self.processArray(self.accordianData[i].inferenceDetails[0].resultSet, graphColor), "BarChart");
                        self.populateChartObj[i] = obj;
                    }
                }
            });
            var location = this.$location;
            var uiConfigJsonUrl = location.absUrl().replace(location.path(), "");
            if (uiConfigJsonUrl.length > uiConfigJsonUrl.lastIndexOf('/')) {
                uiConfigJsonUrl = uiConfigJsonUrl.substr(0, uiConfigJsonUrl.lastIndexOf('/'));
            }
            uiConfigJsonUrl += "/uiConfig.json";
            var configResource = this.$resource(uiConfigJsonUrl);
            var data = configResource.get().$promise.then(function (data) {
                self.showOptionsPanel = data.showOptionsPanel;
            });
        }
        InsightsController.prototype.getChartObjJson = function (index) {
            var obj = this.populateChartObj[index];
            var objSentiment = obj.sentiment;
            if (objSentiment === "POSITIVE") {
                obj.graphcolor = "#7dc65b";
            }
            else if (objSentiment === "NEGATIVE") {
                obj.graphcolor = "red";
            }
            else if (objSentiment === "NEUTRAL") {
                obj.graphcolor = "#90b4ed";
            }
            return {
                "type": obj.chartType,
                "data": {
                    "cols": [{
                            "id": "t",
                            "label": "week",
                            "type": "string"
                        },
                        {
                            "id": "s",
                            "label": "value",
                            "type": "number"
                        },
                        {
                            role: "style",
                            type: "string"
                        }
                    ],
                    "rows": obj.resultSet
                },
                "options": {
                    "title": obj.inference,
                    legend: {
                        position: 'none'
                    }
                }
            };
        };
        ;
        InsightsController.prototype.getGraphColor = function (sentiment) {
            var graphColor = '';
            if (sentiment === "POSITIVE") {
                graphColor = "#7dc65b";
            }
            else if (sentiment === "NEGATIVE") {
                graphColor = "red";
            }
            else if (sentiment === "NEUTRAL") {
                graphColor = "#90b4ed";
            }
            return graphColor;
        };
        InsightsController.prototype.processArray = function (json, graphColor) {
            var chartData = [];
            for (var i = 0, l = json.length; i < l; i++) {
                chartData.push({ c: [{ "v": json[i].resultDate }, { "v": json[i].value }, { "v": graphColor }] });
            }
            return chartData;
        };
        InsightsController.prototype.showAboutInsights = function (params) {
            var self = this;
            self.$mdDialog.show({
                controller: ISightApp.QuickViewDialogController,
                controllerAs: 'quickViewDialogController',
                templateUrl: './dist/modules/insights/view/quickViewDialogViewTemplate.tmp.html',
                parent: angular.element(document.body),
                targetEvent: params,
                preserveScope: true,
                clickOutsideToClose: true,
                locals: {
                    chartType: self.chartType,
                    selectedKpi: self.selectedKpi,
                    selectedNumberOfkpis: self.selectedNumberOfkpis,
                    selectedType: self.selectedType,
                    selectedSchedule: self.selectedSchedule
                },
                bindToController: true
            }).then(function (responseObj) {
                self.submit(false);
            }, function (selectedType) {
                console.log('You cancelled the dialog.' + selectedType);
            });
        };
        InsightsController.prototype.openNav = function () {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("accrdion").style.width = "80%";
            document.getElementById("accrdion").style.marginLeft = "200px";
            document.getElementById("accrdion").style.transition = "0.5s";
            document.getElementById("settingsbtn").style.visibility = "hidden";
        };
        /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
        InsightsController.prototype.closeNav = function () {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("accrdion").style.marginLeft = "0";
            document.getElementById("accrdion").style.width = "100%";
            document.getElementById("accrdion").style.transition = "0.5s";
            document.getElementById("settingsbtn").style.visibility = "visible";
        };
        InsightsController.prototype.viewData = function (params, lastestData, lastData, sentiment, inference, index, resultSet, charttype) {
            var self = this;
            var statusObject = {
                'status': false
            };
            this.mouseentered = true;
            var graphColor = self.getGraphColor(sentiment);
            var obj = new ISightApp.ChartObjModel(lastData, lastestData, inference, sentiment, graphColor, self.processArray(resultSet, graphColor), charttype);
            self.populateChartObj[index] = obj;
        };
        InsightsController.prototype.submit = function (clrAll) {
            var self = this;
            if (clrAll) {
                for (var i = 0; i < this.typeList.length; i++) {
                    if (this.typeList[i].checked) {
                        this.typeList[i].checked = false;
                    }
                }
                for (var i = 0; i < this.vectorList.length; i++) {
                    if (this.vectorList[i].checked) {
                        this.vectorList[i].checked = false;
                    }
                }
                this.selectedType = [];
                this.selectedKpi = [];
                this.numberofkpi = 0;
                this.selectedChartType = "BarChart";
                this.selectedSchedule = "DAILY";
                this.chartType = "BarChart";
                this.selectedNumberOfkpis = 0;
                self.onChangeRadio();
            }
            else {
                var selectedTypes = [];
                var selectedKpis = [];
                //this.selectedType = obj.selectedTypes;
                //this.selectedKpi = obj.selectedKpis;
                for (var i = 0; i < this.typeList.length; i++) {
                    if (this.typeList[i].checked) {
                        selectedTypes.push(this.typeList[i].name);
                    }
                }
                for (var i = 0; i < this.vectorList.length; i++) {
                    if (this.vectorList[i].checked) {
                        selectedKpis.push(this.vectorList[i].name);
                    }
                }
                self.selectedType = selectedTypes;
                self.selectedKpi = selectedKpis;
                var selectedNumberOfkpis = this.numberofkpi;
                //selectedNumberOfkpis = parseInt(selectedNumberOfkpis);
                this.selectedNumberOfkpis = selectedNumberOfkpis;
                var selectedChartType = this.selectedChartType;
                var chartTypes = "BarChart";
                if (selectedChartType) {
                    chartTypes = selectedChartType;
                }
                this.chartType = chartTypes;
                var schedule = this.selectedSchedule;
                this.selectedSchedule = schedule;
            }
            self.showThrobber = true;
            self.insightsService.getInsightsDetails(this.selectedSchedule).then(function (response) {
                self.showThrobber = false;
                self.accordianData = response.data;
                if (typeof self.selectedKpi != 'undefined' && self.accordianData.length && self.selectedKpi.length > 0) {
                    self.accordianData = self.accordianData.filter(function (element) {
                        return self.selectedKpi.indexOf(element.heading) > -1;
                    });
                }
                var accordianLength = self.accordianData.length;
                if (typeof self.accordianData[0] != 'undefined') {
                    self.accordianData[0].expanded = true;
                }
                if (typeof self.accordianData != 'undefined' && self.accordianData.length) {
                    for (var i = 0; i < accordianLength; i++) {
                        var objSentiment = self.accordianData[i].inferenceDetails[0].sentiment;
                        self.accordianData[i].noOfPositives = self.accordianData[i].inferenceDetails.filter(function (element) {
                            return element.sentiment === 'POSITIVE';
                        }).length;
                        self.accordianData[i].noOfNegatives = self.accordianData[i].inferenceDetails.filter(function (element) {
                            return element.sentiment === 'NEGATIVE';
                        }).length;
                        self.accordianData[i].noOfNeutral = self.accordianData[i].inferenceDetails.filter(function (element) {
                            return element.sentiment === 'NEUTRAL';
                        }).length;
                        if (self.selectedType.length > 0) {
                            self.accordianData[i].inferenceDetails = self.accordianData[i].inferenceDetails.filter(function (element) {
                                return self.selectedType.indexOf(element.sentiment) > -1;
                            });
                        }
                        if (selectedNumberOfkpis > 0) {
                            self.accordianData[i].inferenceDetails = self.accordianData[i].inferenceDetails.slice(0, self.selectedNumberOfkpis);
                        }
                        var graphColor = self.getGraphColor(objSentiment);
                        if (self.accordianData[i].inferenceDetails[0]) {
                            var obj = new ISightApp.ChartObjModel(self.accordianData[i].inferenceDetails[0].lastResult, self.accordianData[i].inferenceDetails[0].currentResult, self.accordianData[i].inferenceDetails[0].inference, self.accordianData[i].inferenceDetails[0].sentiment, graphColor, self.processArray(self.accordianData[i].inferenceDetails[0].resultSet, graphColor), self.chartType);
                            self.populateChartObj[i] = obj;
                        }
                    }
                }
            });
            return true;
        };
        InsightsController.prototype.getIconUrl = function (text, expanded) {
            var url = '';
            if (expanded) {
                if (text.toLowerCase().indexOf('build') !== -1) {
                    url = "dist/icons/svg/insightsPage/Build-active.svg";
                }
                else if (text.toLowerCase().indexOf('code') !== -1) {
                    url = "dist/icons/svg/insightsPage/Code-Quality-active.svg";
                }
                else if (text.toLowerCase().indexOf('deploy') !== -1) {
                    url = "dist/icons/svg/insightsPage/Deployment-active.svg";
                }
                else if (text.toLowerCase().indexOf('productivity') !== -1 || text.toLowerCase().indexOf('development') !== -1) {
                    url = "dist/icons/svg/insightsPage/Developer-productivity.svg";
                }
                else if (text.toLowerCase().indexOf('environment') !== -1) {
                    url = "dist/icons/svg/insightsPage/Environment-active.svg";
                }
                else if (text.toLowerCase().indexOf('performance') !== -1) {
                    url = "dist/icons/svg/insightsPage/Performance-active.svg";
                }
                else if (text.toLowerCase().indexOf('release') !== -1) {
                    url = "dist/icons/svg/insightsPage/release-active.svg";
                }
                else if (text.toLowerCase().indexOf('defects') !== -1) {
                    url = "dist/icons/svg/insightsPage/Developer-productivity.svg";
                }
            }
            else {
                if (text.toLowerCase().indexOf('build') !== -1) {
                    url = "dist/icons/svg/insightsPage/Build-inactive.svg";
                }
                else if (text.toLowerCase().indexOf('code') !== -1) {
                    url = "dist/icons/svg/insightsPage/Code-Quality-inactive.svg";
                }
                else if (text.toLowerCase().indexOf('deploy') !== -1) {
                    url = "dist/icons/svg/insightsPage/Deployment-inactive.svg";
                }
                else if (text.toLowerCase().indexOf('productivity') !== -1 || text.toLowerCase().indexOf('development') !== -1) {
                    url = "dist/icons/svg/insightsPage/Developer-productivity-inactive.svg";
                }
                else if (text.toLowerCase().indexOf('environment') !== -1) {
                    url = "dist/icons/svg/insightsPage/Environment-inactive.svg";
                }
                else if (text.toLowerCase().indexOf('performance') !== -1) {
                    url = "dist/icons/svg/insightsPage/Performance-inactive.svg";
                }
                else if (text.toLowerCase().indexOf('release') !== -1) {
                    url = "dist/icons/svg/insightsPage/release-inactive.svg";
                }
                else if (text.toLowerCase().indexOf('defects') !== -1) {
                    url = "dist/icons/svg/insightsPage/Developer-productivity-inactive.svg";
                }
            }
            return url;
        };
        InsightsController.prototype.gotoDashboard = function (dashboardType) {
            this.homeController.selectedIndex = 2;
            if (dashboardType.toLowerCase().indexOf('build') !== -1) {
                this.homeController.selectedDashboardUrl = this.grafanaHost + "/dashboard/db/ci-dashboard";
            }
            else if (dashboardType.toLowerCase().indexOf('code') !== -1) {
                this.homeController.selectedDashboardUrl = this.grafanaHost + "/dashboard/db/code-quality-dashboard";
            }
            else if (dashboardType.toLowerCase().indexOf('deploy') !== -1) {
                this.homeController.selectedDashboardUrl = this.grafanaHost + "/dashboard/db/deployment-dashboard";
            }
            setTimeout(function () {
                document.getElementById('dashboardTab').click();
            }, 0);
            this.homeController.templateName = 'dashboards';
            this.homeController.selectAct('dashboards');
            this.homeController.redirect('dashboards');
            console.log(this.homeController);
        };
        InsightsController.$inject = ['iconService', '$mdDialog', '$routeParams', '$cookies', '$timeout', 'restEndpointService', 'insightsService', '$sce', '$resource', '$location'];
        return InsightsController;
    }());
    ISightApp.InsightsController = InsightsController;
})(ISightApp || (ISightApp = {}));
//# sourceMappingURL=insightsController.js.map