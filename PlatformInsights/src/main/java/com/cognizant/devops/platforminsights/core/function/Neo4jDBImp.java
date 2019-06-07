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
package com.cognizant.devops.platforminsights.core.function;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.cognizant.devops.platformcommons.dal.neo4j.GraphResponse;
import com.cognizant.devops.platformcommons.dal.neo4j.Neo4jDBHandler;
import com.cognizant.devops.platforminsights.core.BaseActionImpl;
import com.cognizant.devops.platforminsights.datamodel.KPIDefinition;
import com.cognizant.devops.platforminsights.exception.InsightsSparkJobFailedException;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class Neo4jDBImp extends BaseActionImpl {
	public Neo4jDBImp(KPIDefinition kpiDefinition) {
		super(kpiDefinition);
	}

	private static final Logger log = Logger.getLogger(Neo4jDBImp.class);

	public List<Map<String, Object>> getNeo4jResult(){
	Neo4jDBHandler graphDBHandler =  new Neo4jDBHandler();
	List<Map<String, Object>> resultList = new ArrayList<>();
	try {
		log.debug("Database type found to be Neo4j");
		String graphQuery = kpiDefinition.getDataQuery();
		GraphResponse graphResp = graphDBHandler.executeCypherQuery(graphQuery);
		JsonArray graphJsonResult = graphResp.getJson().getAsJsonArray("results");
		Map<String, Object> resultMap = new HashMap<>();
		String groupByFieldVal = "";
		Long groupByFieldValResult = 0L;
		
		for (JsonElement obj : graphJsonResult)
	    {
			JsonObject innerJson = obj.getAsJsonObject();
			JsonArray data = innerJson.getAsJsonArray("data");
			for (JsonElement dataObj : data){
				JsonObject row = dataObj.getAsJsonObject();
				JsonArray rowData = row.getAsJsonArray("row");
				int i = 0;
				for (JsonElement key : rowData){
					if (i == 0){
						groupByFieldVal = key.getAsString();
						i++;
					} else {
						groupByFieldValResult = key.getAsLong();
					}
				}
				resultMap = getResultMap(groupByFieldValResult, groupByFieldVal);
				resultList.add(resultMap);
				
			}
	    }
	} catch (Exception e) {
		log.error("Exception while running neo4j operation", e);
	}
	return resultList;
	}

	@Override
	protected Map<String, Object> execute() throws InsightsSparkJobFailedException {
		// TODO Auto-generated method stub
		return null;
	}
	
}
