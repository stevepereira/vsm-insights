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
package com.cognizant.devops.platformservice.rest.AccessGroupManagement;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.NewCookie;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.devops.platformcommons.config.ApplicationConfigProvider;
import com.cognizant.devops.platformcommons.config.GrafanaData;
import com.cognizant.devops.platformcommons.dal.rest.RestHandler;
import com.cognizant.devops.platformdal.grafana.user.UserDAL;
import com.cognizant.devops.platformservice.rest.util.PlatformServiceUtil;
import com.cognizant.devops.platformservice.security.config.SpringAuthorityUtil;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sun.jersey.api.client.ClientResponse;

@RestController
@RequestMapping("/accessGrpMgmt")
public class AccessGroupManagement {
	private static Logger log = LogManager.getLogger(AccessGroupManagement.class.getName());
	private static String authHeader = null;

	@Autowired
	private HttpServletRequest httpRequest;

	@RequestMapping(value = "/getOrgs", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public JsonObject getOrgs() {
		log.debug("\n\nInside getOrgs method call");
		String apiUrl = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaEndpoint() + "/api/orgs";
		log.debug("getOrgs API is: " + apiUrl);
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("Authorization", buildAuthenticationHeader());
		ClientResponse response = RestHandler.doGet(apiUrl, null, headers);
		return PlatformServiceUtil
				.buildSuccessResponseWithData(new JsonParser().parse(response.getEntity(String.class)));
	}

	@RequestMapping(value = "/switchUserOrg", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public JsonObject switchUserOrg(@RequestParam int orgId) {
		log.debug("\n\nInside switchUserOrg method call, and the Org ID is: " + orgId);
		Map<String, String> headers = new HashMap<String, String>();
		String grafanaCookie = getUserCookies();
		headers.put("Cookie", grafanaCookie);

		String apiUrl = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaEndpoint() + "/api/user/using/"
				+ orgId;
		ClientResponse response = RestHandler.doPost(apiUrl, null, headers);
		log.debug("API URL is: " + apiUrl);
		log.debug("Headers: " + headers);

		// Since Access group has changed, need to check and update user role to
		// new
		// Access group
		// Update cookies and SpringAuthorities accordingly
		Map<String, String> grafanaResponseCookies = new HashMap<String, String>();
		String grafanaCurrentOrg = getGrafanaCurrentOrg(headers);
		grafanaResponseCookies.put("grafanaOrg", grafanaCurrentOrg);
		String grafanaCurrentOrgRole = getCurrentOrgRole(headers, grafanaCurrentOrg);
		grafanaResponseCookies.put("grafanaRole", grafanaCurrentOrgRole);

		httpRequest.setAttribute("responseHeaders", grafanaResponseCookies);

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		List<GrantedAuthority> updatedAuthorities = new ArrayList<>(auth.getAuthorities());
		updatedAuthorities.add(SpringAuthorityUtil.getSpringAuthorityRole(grafanaCurrentOrgRole));
		Authentication newAuth = new UsernamePasswordAuthenticationToken(auth.getPrincipal(), auth.getCredentials(),
				updatedAuthorities);
		SecurityContextHolder.getContext().setAuthentication(newAuth);

		return PlatformServiceUtil
				.buildSuccessResponseWithData(new JsonParser().parse(response.getEntity(String.class)));
	}

	@RequestMapping(value = "/getCurrentUserOrgs", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public JsonObject getCurrentUserOrgs() {
		log.debug("\n\nInside getCurrentUserOrgs method call");
		Map<String, String> headers = new HashMap<String, String>();
		String cookies = getUserCookies();
		headers.put("Cookie", cookies);

		log.debug("Inside getCurrentUserOrgs() - Cookies -- " + cookies);

		String apiUrl = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaEndpoint() + "/api/user/orgs";
		ClientResponse response = RestHandler.doGet(apiUrl, null, headers);
		log.debug(" response "+ response);
		return PlatformServiceUtil
				.buildSuccessResponseWithData(new JsonParser().parse(response.getEntity(String.class)));
	}

	@RequestMapping(value = "/createOrg", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public String createOrg(@RequestParam String orgName) {
		String apiUrl = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaEndpoint() + "/api/orgs";
		JsonObject request = new JsonObject();
		request.addProperty("name", orgName);
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("Authorization", buildAuthenticationHeader());
		ClientResponse response = RestHandler.doPost(apiUrl, request, headers);
		return response.getEntity(String.class);
	}

	@RequestMapping(value = "/getUser", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public JsonObject getUser() {
		log.debug("\n\nInside getUser method call");
		String apiUrl = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaEndpoint() + "/api/user";
		log.debug("API URL is: " + apiUrl);
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("Cookie", getUserCookies());
		ClientResponse response = RestHandler.doGet(apiUrl, null, headers);
		log.debug("Headers: " + headers + "\n\n");
		return PlatformServiceUtil
				.buildSuccessResponseWithData(new JsonParser().parse(response.getEntity(String.class)));
	}
	
	@RequestMapping(value = "/addUserInOrg", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public String addUser(@RequestParam int orgId,@RequestParam String name, @RequestParam String email, @RequestParam String role,@RequestParam String userName,@RequestParam String orgName ,@RequestParam String password){
		Map<String, String> headersName = new HashMap<String, String>();
		headersName.put("Cookie", getUserCookies());
		String apiUrlName = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaEndpoint()+"/api/users/lookup?loginOrEmail="+name;
		ClientResponse responseName = RestHandler.doGet(apiUrlName, null, headersName);
		JsonObject jsonResponseName = new JsonParser().parse(responseName.getEntity(String.class)).getAsJsonObject();
		//log.error("jsonResponseName-----------------"+jsonResponseName);
		//log.error(orgId);
		if(jsonResponseName.get("id") != null){
			String apiUrlUserOrgs = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaEndpoint()+"/api/users/"+jsonResponseName.get("id").getAsInt()+"/orgs";
			Map<String, String> headersUserOrgs = new HashMap<String, String>();
			headersUserOrgs.put("Authorization", buildAuthenticationHeader());
			ClientResponse responseUserOrgs = RestHandler.doGet(apiUrlUserOrgs, null, headersUserOrgs);
			JsonArray userOrgs=new JsonParser().parse(responseUserOrgs.getEntity(String.class)).getAsJsonArray();
			boolean orgFlag=false;
			String orgCurrentRole="";
			for (JsonElement totalOrgs: userOrgs){
				JsonObject orgs=totalOrgs.getAsJsonObject();
				int responseOrgId=orgs.get("orgId").getAsInt();
				String responseOrgRole=orgs.get("role").getAsString();
				//log.error(responseOrgId+responseOrgRole);
				//log.error(responseOrgId==orgId);
				if (responseOrgId== orgId ) {
					orgFlag=true;
					orgCurrentRole=responseOrgRole;
				}
			}
			//log.error(orgFlag);
			if(orgFlag) {
				if (role.equals(orgCurrentRole)) {
					return "{\"message\":\" user existss in currrent org with same role "+orgCurrentRole+"\"}";
                }
                else {
                      return "{\"message\":\" user existss in currrent org with different  role "+orgCurrentRole+"\"}";}

			}else {
				String apiUrlorg = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaEndpoint()+"/api/orgs/"+orgId+"/users";
				JsonObject requestOrg = new JsonObject();
				requestOrg.addProperty("loginOrEmail", email);
				requestOrg.addProperty("role", role);
				//request.addProperty("name", orgName);
				//requestOrg.addProperty("Password", "admin");
				Map<String, String> headersOrg = new HashMap<String, String>();
				headersOrg.put("Authorization", buildAuthenticationHeader());
				ClientResponse responseOrg = RestHandler.doPost(apiUrlorg, requestOrg,headersOrg);
				//log.error("requestOrg top------------- "+responseOrg.getEntity(String.class));
				return responseOrg.getEntity(String.class);
			}
			
		}else {
			Map<String, String> headersEmail = new HashMap<String, String>();
			headersName.put("Cookie", getUserCookies());
			String apiUrlEmail = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaEndpoint()+"/api/users/lookup?loginOrEmail="+email;
			ClientResponse responseEmail = RestHandler.doGet(apiUrlEmail, null, headersEmail);
			JsonObject jsonResponseEmail = new JsonParser().parse(responseEmail.getEntity(String.class)).getAsJsonObject();
			//log.error("jsonResponseEmail--------------------"+jsonResponseEmail);
			if(jsonResponseEmail.get("id") != null){
				return jsonResponseEmail.toString();
			}else {
				String apiUrlCreate = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaEndpoint()+"/api/admin/users";
				JsonObject requestCreate = new JsonObject();
				requestCreate.addProperty("name", name);
				requestCreate.addProperty("login", userName);
				requestCreate.addProperty("email", email);
				requestCreate.addProperty("role", role);
				requestCreate.addProperty("password", password);
				Map<String, String> headersCreate = new HashMap<String, String>();
				headersCreate.put("Authorization", buildAuthenticationHeader());
				ClientResponse responseCreate = RestHandler.doPost(apiUrlCreate, requestCreate, headersCreate);
				JsonObject jsonResponse = new JsonParser().parse(responseCreate.getEntity(String.class)).getAsJsonObject();
				//log.error(jsonResponseCreate);
				if(jsonResponse.get("id") != null && orgId!=1){
					//update DB for removing the password.
					String apiUrlorg = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaEndpoint()+"/api/orgs/"+orgId+"/users";
					JsonObject requestOrg = new JsonObject();
					requestOrg.addProperty("loginOrEmail", email);
					requestOrg.addProperty("role", role);
					//request.addProperty("name", orgName);
					//requestOrg.addProperty("Password", admin);
					Map<String, String> headersOrg = new HashMap<String, String>();
					headersOrg.put("Authorization", buildAuthenticationHeader());
					ClientResponse responseOrg = RestHandler.doPost(apiUrlorg, requestOrg,headersOrg);
					//log.error(requestOrg+""+headersOrg+" "+responseOrg.getEntity(String.class));
					return responseOrg.getEntity(String.class);
				}else if(jsonResponse.get("id") != null && orgId==1 && role.equals("Viewer")!=true){
					JsonObject createdUserId=jsonResponse.getAsJsonObject();
					int userIdRole=createdUserId.get("id").getAsInt();
					String apiUrlRole = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaEndpoint()+"/api/orgs/"+orgId+"/users/"+userIdRole;
					JsonObject requestRole = new JsonObject();
					requestRole.addProperty("role", role);
					Map<String, String> headersRole = new HashMap<String, String>();
					headersRole.put("Authorization", buildAuthenticationHeader());
					ClientResponse responseRole = RestHandler.doPatch(apiUrlRole, requestRole, headersRole);
					return responseRole.getEntity(String.class);
				}else {
					return jsonResponse.toString();
				}	
			}
		}
	}
	
	@RequestMapping(value = "/getGrafanaVersion", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public JsonObject getGrafanaVersion() {
		log.debug("\n\nInside getGrafanaVersion method call");
		JsonObject grafanaVersionJson = new JsonObject();
		String grafanaVersion = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaVersion();
		if (grafanaVersion == null) {
			grafanaVersion = "4.6.2";
		}
		grafanaVersionJson.addProperty("version", grafanaVersion);
		return PlatformServiceUtil.buildSuccessResponseWithData(grafanaVersionJson);
	}

	private String getUserCookies() {
		log.debug("\n\nInside getUserCookies method call");
		Map<String, String> cookieMap = (Map) httpRequest.getAttribute("responseHeaders");
		if (cookieMap == null || cookieMap.get("grafana_sess") == null) {
			Cookie[] cookies = httpRequest.getCookies();
			cookieMap = new HashMap<String, String>();
			if (cookies != null) {
				for (Cookie cookie : cookies) {
					cookieMap.put(cookie.getName(), cookie.getValue());
				}
			}
			if (!cookieMap.containsKey("grafana_sess")) {
				try {
					String authHeader = httpRequest.getHeader("Authorization");
					String decodedAuthHeader = new String(Base64.getDecoder().decode(authHeader.split(" ")[1]),
							"UTF-8");
					String[] authTokens = decodedAuthHeader.split(":");
					JsonObject loginRequestParams = new JsonObject();
					loginRequestParams.addProperty("user", authTokens[0]);
					loginRequestParams.addProperty("password", authTokens[1]);
					String loginApiUrl = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaEndpoint()
							+ "/login";
					//log.debug("Getting user cookies from: " + loginApiUrl);
					ClientResponse grafanaLoginResponse = RestHandler.doPost(loginApiUrl, loginRequestParams, null);
					List<NewCookie> cookies2 = grafanaLoginResponse.getCookies();
					for (NewCookie cookie : cookies2) {
						cookieMap.put(cookie.getName(), cookie.getValue());
					}
				} catch (UnsupportedEncodingException e) {
					log.error("Unable to get grafana session.", e);
				}
			}
		}
		StringBuffer grafanaCookies = new StringBuffer();
		for (Map.Entry<String, String> entry : cookieMap.entrySet()) {
			grafanaCookies.append(entry.getKey()).append("=").append(entry.getValue()).append(";");
		}
		log.debug("Grafana's cookies: " + grafanaCookies.toString() + "\n\n");
		return grafanaCookies.toString();
	}

	private String getCurrentOrgRole(Map<String, String> headers, String grafanaCurrentOrg) {
		log.debug("\n\nInside getCurrentOrgRole method call");
		String userOrgsApiUrl = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaEndpoint()
				+ "/api/user/orgs";
		log.debug("userOrgs API URL is: " + userOrgsApiUrl);
		//log.debug("Headers: " + headers);
		ClientResponse grafanaCurrentOrgResponse = RestHandler.doGet(userOrgsApiUrl, null, headers);
		JsonArray grafanaOrgs = new JsonParser().parse(grafanaCurrentOrgResponse.getEntity(String.class))
				.getAsJsonArray();
		String grafanaCurrentOrgRole = null;
		for (JsonElement org : grafanaOrgs) {
			if (grafanaCurrentOrg.equals(org.getAsJsonObject().get("orgId").toString())) {
				grafanaCurrentOrgRole = org.getAsJsonObject().get("role").getAsString();
				break;
			}
		}
		log.debug("Current grafana org role: " + grafanaCurrentOrgRole + "\n\n");
		return grafanaCurrentOrgRole;
	}

	private String getGrafanaCurrentOrg(Map<String, String> headers) {
		log.debug("\n\nInside getGrafanaCurrentOrg method call");
		String loginApiUrl = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaEndpoint() + "/api/user";
		ClientResponse grafanaCurrentOrgResponse = RestHandler.doGet(loginApiUrl, null, headers);
		JsonObject responseJson = new JsonParser().parse(grafanaCurrentOrgResponse.getEntity(String.class))
				.getAsJsonObject();
		String grafanaCurrentOrg = responseJson.get("orgId").toString();
		log.debug("The Current Grafana OrgId is: " + grafanaCurrentOrg + "\n\n");
		return grafanaCurrentOrg;
	}

	private List<NewCookie> getValidGrafanaSession(String userName, String password) {
		JsonObject loginRequestParams = new JsonObject();
		loginRequestParams.addProperty("user", userName);
		loginRequestParams.addProperty("password", password);
		String loginApiUrl = ApplicationConfigProvider.getInstance().getGrafana().getGrafanaEndpoint() + "/login";
		ClientResponse grafanaLoginResponse = RestHandler.doPost(loginApiUrl, loginRequestParams, null);
		return grafanaLoginResponse.getCookies();
	}

	private String buildAuthenticationHeader() {
		GrafanaData grafana = ApplicationConfigProvider.getInstance().getGrafana();
		if (authHeader == null) {
			authHeader = "Basic " + Base64.getEncoder()
					.encodeToString((grafana.getAdminUserName() + ":" + grafana.getAdminUserPassword()).getBytes());
		}
		return authHeader;
	}
}
