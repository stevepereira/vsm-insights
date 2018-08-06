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

module ISightApp {
	export class devopsMaturityController {

		static $inject = ['$location', '$window', '$mdDialog', '$scope',
			'$filter', 'devopsMaturityService', '$resource', '$http', '$route', '$cookies', 'restAPIUrlService'];
		constructor(private $location, private $window, private $mdDialog, private $scope, private $filter, private devopsMaturityService, private $resource, private $http, private $route, private $cookies, private restAPIUrlService: IRestAPIUrlService) {

			var self = this;
			var elem = document.querySelector('#homePageTemplateContainer');
			var homePageControllerScope = angular.element(elem).scope();
			var homePageController = homePageControllerScope['homePageController'];
			self.homeController = homePageController;


			this.init($scope, $filter, devopsMaturityService, $resource, $http, $route, $window, homePageController, self.homeController, $cookies, restAPIUrlService);
		}

		homeController: HomePageController;
		backupDatatype: string;
		fileLocation: string;
		rowLimit: string;
		fileFormat: string = "JSON";
		fileName: string;
		retention: string;
		settingsType: string;
		listView: boolean = true;
		saveView: boolean = false;
		showConfirmMessage: string;
		showThrobber: boolean;
		datalist = {};
		settingData = {};
		nextRunTime: string;
		lastRunTime: string;
		settingJsonstring: string;
		settingJsonObj = {};
		activeFlag: string;
		lastModifiedByUser: string;
		editIconSrc = "dist/icons/svg/userOnboarding/Edit_icon_MouseOver.svg";
		showTble: boolean = true;
		dataFreq: string = "";
		selectedType: string = "";
		showTextArea: boolean = true;
		files = [];
		headers = [];
		lines = [];
		linesToShow = [];
		isTypeError: string = "";
		placeholderStr: string = "";
		showFiledownloadError: boolean = false;
		filename: string = "";
		fileUploadSuccessMessage: boolean = false;
		selectedImage: string = 'logo';
		lastModifiedDate: string = '';
		arr = [];
		maturityFileDownloadPath = "/PlatformService/admin/settings/download/DEVOPSMATURITY";
		maxSizeErr: boolean = false;
		isDevOpsMaturityFilePresent: boolean = false;
		isUploadDataConfirmation: boolean = false;
		showFileUploadConfirmMessage: string = "";

		init($scope, $filter, devopsMaturityService, $resource, $http, $route, $window, homePageController, homeController, $cookies, restAPIUrlService): void {
			$scope.placeholderStr = "Select Frequency";
			$scope.dataFreq = "";
			addData();
			//listData();
			console.log($scope);
			function addData() {
				//$scope.placeholderStr = "Select Frequency";
				$scope.listView = false;
				$scope.saveView = true;
				console.log("This is from devops maturity controller " + $scope.saveView);
			};
			$scope.changeSelected = function () {
				if ($scope.selectedType && $scope.selectedType.length > 0) {
					$scope.showTextArea = true;
				}

			};

			$scope.saveData = function () {
				//console.log($scope.homeController);

				var self = this;
				$scope.listView = true;
				$scope.saveView = true;

				$scope.settingsType = "DEVOPSMATURITY";
				$scope.activeFlag = "Y";
				//$scope.lastModifiedByUser = $scope.homeController.userName;
				$scope.lastModifiedByUser = "Admin";
				$scope.settingJsonObj = {
					"dataArchivalFrequency": self.dataFreq,
					"lastRunTime": $scope.lastRunTime,
					"nextRunTime": ''
				}
				console.log($scope.settingJsonObj);
				$scope.settingJsonstring = encodeURIComponent(JSON.stringify($scope.settingJsonObj));

				devopsMaturityService.saveDevopsMaturity($scope.settingsType, $scope.activeFlag, $scope.lastModifiedByUser, $scope.settingJsonstring)
					.then(function (data) {

						if (data.status == "success") {
							$scope.showConfirmMessage = "Saved successfully";
							$scope.fileUploadSuccessMessage = true;
							homePageController.templateName = 'devopsMaturitySettings';
						} else {
							$scope.showConfirmMessage = "Failed to save settings";
						}
						$scope.listData();
					})
					.catch(function (data) {
						$scope.listView = false;
						$scope.saveView = true;
						$scope.showConfirmMessage = "Failed to save settings";
						$scope.listData();
					});
			};
			$scope.listData = function () {
				console.log("This is coming from list data DEVOPSMATURITY model.=");
				$scope.listView = true;
				var self = this;
				$scope.saveView = true;
				devopsMaturityService.listDevopsMaturity("DEVOPSMATURITY")
					.then(function (response) {

						$scope.showThrobber = false;
						if (response.status == "success") {

							if (response.hasOwnProperty('data')) {
								$scope.showTble = false;
								$scope.datalist = response.data;
								console.log(response.data);
								console.log(response.data.settingFile.length);
								if (response.data.settingFile.length > 0) {
									console.log("true");
									$scope.isDevOpsMaturityFilePresent = true;
								}
								$scope.settingData = JSON.parse($scope.datalist['settingsJson']);
								$scope.lastModifiedDate = $scope.datalist['lastModifiedDate'];
								if ($scope.settingData.dataArchivalFrequency == undefined) {
									self.placeholderStr = "Select Frequency";
								}
								else {
									self.placeholderStr = $scope.settingData.dataArchivalFrequency;

								}
								/*
								if ($scope.settingData.dataFreq == undefined)
								{
									console.log("----------");
									console.log($scope.lastModifiedDate);
									$scope.placeholderStr = "Select Frequency";
								}
								else
								{
									$scope.placeholderStr = $scope.dataFreq;
									console.log("********");
									
								}
								*/
								$scope.$apply();
								//console.log($scope.datalist);
								console.log($scope);



							} else {
								$scope.showTble = true;
							}
						}
						else {
							$scope.showConfirmMessage = "Something wrong with service, please try again";
						}

					})
					.catch(function (response) {
						$scope.showThrobber = false;
						$scope.showConfirmMessage = "Something wrong with service, please try again";
					});

				setTimeout(function () {
					$scope.showConfirmMessage = "";
					document.getElementById('confrmMsg').innerHTML = "";
				}, 3500);

			};

			$scope.previewData = function () {
				console.log("coming here");
				var self = this;
				var inputFileById = (<HTMLInputElement>document.getElementById("fileInput"));
				var uploadedFile = inputFileById.files[0];
				let reader: FileReader = new FileReader();
				console.log(uploadedFile);
				reader.readAsText(uploadedFile);
				reader.onload = (e) => {
					let csv: string = reader.result;
					let allTextLines = csv.split(/\r|\n|\r/);
					allTextLines[0] = allTextLines[0].replace(/"/g, "");
					let headers = allTextLines[0].split(',');
					$scope.headers = headers;
					$scope.lines = [];
					for (let i = 1; i < allTextLines.length; i++) {
						// split content based on comma

						allTextLines[i] = allTextLines[i].replace(/"/g, "");
						let data = allTextLines[i].split(',');
						if (data.length === headers.length) {
							let tarr = {};
							for (let j = 0; j < headers.length; j++) {
								tarr[headers[j]] = data[j];
							}
							console.log(tarr);
							$scope.lines.push(tarr);
						}
					}
				}



			};
			$scope.uploadFile = function () {
				console.log("DataFreq " + $scope.dataFreq);
				console.log("DataFreq " + $scope.placeholderStr);
				var inputFileById = (<HTMLInputElement>document.getElementById("fileInput"));
				var uploadedFile = inputFileById.files[0];
				var fd = new FormData();
				fd.append("file", inputFileById.files[0])
				fd.append("action", "upload");
				$scope.showThrobber = true;
				var authToken = $cookies.get('Authorization');
				var restCallUrl = restAPIUrlService.getRestCallUrl("DEVOPS_MATURITY_MODEL");
				console.log(restCallUrl);
				console.log(fd);
				$scope.showDisabled = true;
				$http.post(restCallUrl, fd, {
					headers: {
						'Content-Type': undefined,
						'Authorization': authToken
					},
					transformRequest: angular.identity
				}).then(function (data, status, headers, config) {
					$scope.showThrobber = false;
					$scope.showDisabled = false;
					if (data.data.status == "failure") {

						$scope.showError = true;
						$scope.showErrorMessage = data.data.message;
						$window.scrollTo(0, 0);
					} else {
						console.log(data);
						$scope.fileUploadSuccessMessage = true;
						$scope.showConfirmMessage = "Settings uploaded successfully";
						$scope.showFileUploadConfirmMessage = "Settings uploaded successfully";
						homePageController.templateName = 'devopsMaturitySettings';
						setTimeout(function () {
							$scope.showFileUploadConfirmMessage = "";
						}, 1000);
					}

				}, function (data) {

					$scope.showThrobber = false;
					$scope.showDisabled = false;
					$scope.showError = true;

				});


			};

		}

		uploadDataConfirmation() {
			var self = this;
			self.isUploadDataConfirmation = true;
		}


	}

}

