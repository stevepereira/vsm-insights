/*******************************************************************************
 *  * Copyright 2017 Cognizant Technology Solutions
 *  * 
 *  * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  * use this file except in compliance with the License.  You may obtain a copy
 *  * of the License at
 *  * 
 *  *   http://www.apache.org/licenses/LICENSE-2.0
 *  * 
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 *  * License for the specific language governing permissions and limitations under
 *  * the License.
 *******************************************************************************/
package com.cognizant.devops.platformservice.test.grafanaUser;

import javax.servlet.http.Cookie;

public class GrafanaUserDetailsTestData {

	Cookie[] cookies = { new Cookie("JSESSIONID", "=02F3AE7D5FD2676423C5722A022DED04"), new Cookie("grafanaOrg", "1"),
			new Cookie("grafanaRole", "Admin"), new Cookie("XSRF-TOKEN", "f9f94f42-c640-4605-897c-a27efd86024b") };

	String accept = "application/json, text/plain, */*";
	String authorization = "U2FsdGVkX19iC6B0l+WGQc2eNquBuRKS7G60LibwrzAkq40yGp0tdq4mgC7tgxQned8b6baa-225f-4";
	String origin = "http://localhost:8181";
	String referer = "http://localhost:8181/app";
	String contentType = "application/json";
	String XSRFTOKEN = "8ec7b1b7-b6e2-4f60-a5c8-d9c3c6c3a470";

	String authorizationException = "U2FsdGVkX19JhITWUbrNyDOnMMGVnhEEBuA9amQyivsYidvmeG1p9McCMkdEUxl0ec1a14d0-2600-4";
	String host = "insights.cogdevops.com";
	String contentTypeException = "application/json";
}
