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
package com.cognizant.devops.platformengine.message.subscriber;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.cognizant.devops.platformcommons.config.ApplicationConfigProvider;
import com.cognizant.devops.platformcommons.dal.neo4j.GraphDBException;
import com.cognizant.devops.platformcommons.dal.neo4j.GraphResponse;
import com.cognizant.devops.platformcommons.dal.neo4j.Neo4jDBHandler;
import com.cognizant.devops.platformcommons.dal.neo4j.NodeData;
import com.cognizant.devops.platformengine.message.core.AgentDataConstants;
import com.cognizant.devops.platformengine.message.core.MessageConstants;
import com.cognizant.devops.platformengine.message.factory.EngineSubscriberResponseHandler;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.rabbitmq.client.AMQP.BasicProperties;
import com.rabbitmq.client.Envelope;

public class AgentDataSubscriber extends EngineSubscriberResponseHandler{
	private static Logger log = Logger.getLogger(AgentDataSubscriber.class.getName());
	
	public AgentDataSubscriber(String routingKey) throws Exception {
		super(routingKey);
	}
	private boolean dataUpdateSupported;
	private String uniqueKey;
	private String category;
	
	public AgentDataSubscriber(String routingKey, boolean dataUpdateSupported, String uniqueKey, String category) throws Exception {
		super(routingKey);
		this.dataUpdateSupported = dataUpdateSupported;
		this.uniqueKey = uniqueKey;
		this.category = category;
	}

	public void handleDelivery(String consumerTag, Envelope envelope, BasicProperties properties, byte[] body) throws IOException{
		ApplicationConfigProvider.performSystemCheck();
		Neo4jDBHandler dbHandler = new Neo4jDBHandler();
		String message = new String(body, MessageConstants.MESSAGE_ENCODING);
		String routingKey = envelope.getRoutingKey();
		List<String> labels = new ArrayList<String>();
		labels.add("RAW");
		labels.addAll(Arrays.asList(routingKey.split(MessageConstants.ROUTING_KEY_SEPERATOR)));
		List<JsonObject> dataList = new ArrayList<JsonObject>();
		JsonElement json = new JsonParser().parse(message);
		boolean dataUpdateSupported = this.dataUpdateSupported;
		String uniqueKey = this.uniqueKey;
/*		if(json.isJsonObject()) {
			JsonObject messageObject = json.getAsJsonObject();
			json = messageObject.get("data");
			if(messageObject.has("metadata")) {
				JsonObject metadata = messageObject.get("metadata").getAsJsonObject();
				if(metadata.has("labels")) {
					JsonArray additionalLabels = metadata.get("labels").getAsJsonArray();
					for(JsonElement additionalLabel : additionalLabels) {
						String label = additionalLabel.getAsString();
						if(!labels.contains(label)) {
							labels.add(label);
						}
					}
				}
				if(metadata.has("dataUpdateSupported")) {
					dataUpdateSupported = metadata.get("dataUpdateSupported").getAsBoolean();
				}
				if(metadata.has("uniqueKey")) {
					uniqueKey = metadata.get("uniqueKey").getAsString();
				}
			}
		}
		
		if(json.isJsonArray()){
			JsonArray asJsonArray = json.getAsJsonArray();
			for(JsonElement e : asJsonArray){
				if(e.isJsonObject()){
					dataList.add(e.getAsJsonObject());
				}
			}
			try {
				String cypherQuery = "";
				String queryLabel = "";
				for(String label : labels){
					if(label != null && label.trim().length() > 0) {
						queryLabel += ":"+label;
					}
				}
				if(dataUpdateSupported){
					cypherQuery = buildCypherQuery(queryLabel, uniqueKey);
				}else{
					cypherQuery = "UNWIND {props} AS properties CREATE (n"+queryLabel+") set n=properties return count(n)";
				}
				List<List<JsonObject>> partitionList = partitionList(dataList, 1000);
				for(List<JsonObject> chunk : partitionList){
					JsonObject graphResponse = dbHandler.bulkCreateNodes(chunk, labels, cypherQuery);
					if(graphResponse.get("response").getAsJsonObject().get("errors").getAsJsonArray().size() > 0){
						log.error("Unable to insert nodes for routing key: "+routingKey+", error occured: "+graphResponse);
						//log.error(chunk);
					}
				}
				getChannel().basicAck(envelope.getDeliveryTag(), false);
			} catch (GraphDBException e) {
				log.error("GraphDBException occured.", e);
			}
	}
	*/	
		Map<String,Map<String,NodeData>> metaDataMap=new HashMap<String,Map<String,NodeData>>();
		String nodeJsonStr =null;
		Gson gson = new Gson();

		//MetaData from neo4j as map
		metaDataMap= getMetaData(dbHandler);

		if(json.isJsonArray()){
			JsonArray asJsonArray = json.getAsJsonArray();
			
			for(JsonElement e : asJsonArray){
				if(e.isJsonObject()){
					//dataList.add(e.getAsJsonObject());

					NodeData nodeData =new NodeData();

					nodeData = applyDataTagging(e.getAsJsonObject(),metaDataMap);

					nodeJsonStr = gson.toJson(nodeData.getPropertyMap());

					JsonObject finalJson = mergeProperty(e,nodeJsonStr);

					dataList.add(finalJson);

				}
			}
			try {
				String cypherQuery = "";
				String queryLabel = "";
				for(String label : labels){
					if(label != null && label.trim().length() > 0) {
						queryLabel += ":"+label;
					}
				}
				if(dataUpdateSupported){
					cypherQuery = buildCypherQuery(queryLabel, uniqueKey);
				}else{
					cypherQuery = "UNWIND {props} AS properties CREATE (n"+queryLabel+") set n=properties return count(n)";
				}
				List<List<JsonObject>> partitionList = partitionList(dataList, 1000);
				for(List<JsonObject> chunk : partitionList){
					JsonObject graphResponse = dbHandler.bulkCreateNodes(chunk, labels, cypherQuery);
					if(graphResponse.get("response").getAsJsonObject().get("errors").getAsJsonArray().size() > 0){
						log.error("Unable to insert nodes for routing key: "+routingKey+", error occured: "+graphResponse);
						//log.error(chunk);
					}
				}
				getChannel().basicAck(envelope.getDeliveryTag(), false);
			} catch (GraphDBException e) {
				log.error("GraphDBException occured.", e);
			}
		}
		
	}
	
	private   JsonObject mergeProperty(JsonElement e, String jsonStr) {
		JsonParser jsonParser = new JsonParser();
		JsonObject jsonObj = (JsonObject)jsonParser.parse(jsonStr);
		Map<String,String> metaDataJson = new Gson().fromJson(jsonObj, HashMap.class);
		Map<String,String> agentJson = new Gson().fromJson(e.getAsJsonObject(), HashMap.class);
		Map<String,String> finalobj = new HashMap<String,String>();
		finalobj.putAll(metaDataJson);
		finalobj.putAll(agentJson);
		String resultJson = new Gson().toJson(finalobj);
		JsonObject finalJson=(JsonObject)jsonParser.parse(resultJson);
		return finalJson;
	}


	private  NodeData applyDataTagging(JsonObject asJsonObject, Map<String, Map<String, NodeData>> metaDataMap) {

		NodeData nodeData = new NodeData() ;
		StringBuilder sb=null;

		for (String key : metaDataMap.keySet()){
			StringTokenizer token = new StringTokenizer(key,AgentDataConstants.COLON);
			sb= new StringBuilder();

			while (token.hasMoreElements()) {
				String agentJsonkey=token.nextElement().toString();

				if(asJsonObject.has(agentJsonkey)){
					sb.append(asJsonObject.get(agentJsonkey).getAsString());
					sb.append(AgentDataConstants.COLON);
				}
			}  

			Map<String ,NodeData> innerMap=metaDataMap.get(key);

			String innerKey=StringUtils.stripEnd(sb.toString(),AgentDataConstants.COLON);
			if(innerMap.containsKey(innerKey)){

				nodeData = innerMap.get(innerKey);

			}


		}

		return nodeData;
	}

	private  Map<String, Map<String, NodeData>> getMetaData(Neo4jDBHandler dbHandler) {
		List<NodeData> nodes = null;
		Map<String,NodeData> nodepropertyMap=null;
		Map<String,Map<String,NodeData>> metaDataMap=new HashMap<String,Map<String,NodeData>>();
		GraphResponse response=null;
		try {
			response = dbHandler.executeCypherQuery("MATCH (n:METADATA:DATATAGGING) return n");
			nodes=response.getNodes();
		} catch (GraphDBException e) {
			log.error(e);
		}
		if(nodes.size() > 0){
			for(NodeData node : nodes){
				StringBuilder labelVal=new StringBuilder();
				StringBuilder key=new StringBuilder();
				nodepropertyMap=new HashMap<String,NodeData>();

				if(null!=node.getProperty(AgentDataConstants.PROPERTY_1)  && !node.getProperty(AgentDataConstants.PROPERTY_1).isEmpty()){
					key.append(node.getProperty(AgentDataConstants.PROPERTY_1));
					key.append(AgentDataConstants.COLON);
				}
				if(null!=node.getProperty(AgentDataConstants.PROPERTY_2)  && !node.getProperty(AgentDataConstants.PROPERTY_2).isEmpty()){
					key.append(node.getProperty(AgentDataConstants.PROPERTY_2));
					key.append(AgentDataConstants.COLON);
				}
				if(null!=node.getProperty(AgentDataConstants.PROPERTY_3)  && !node.getProperty(AgentDataConstants.PROPERTY_3).isEmpty()){
					key.append(node.getProperty(AgentDataConstants.PROPERTY_3));
					key.append(AgentDataConstants.COLON);
				}
				if(null!=node.getProperty(AgentDataConstants.PROPERTY_4) && !node.getProperty(AgentDataConstants.PROPERTY_4).isEmpty()){
					key.append(node.getProperty(AgentDataConstants.PROPERTY_4));
					key.append(AgentDataConstants.COLON);
				}
				if(null!=node.getProperty(AgentDataConstants.PROPERTYVALUE_1) && !node.getProperty(AgentDataConstants.PROPERTYVALUE_1).isEmpty()){
					labelVal.append(node.getProperty(AgentDataConstants.PROPERTYVALUE_1));
					labelVal.append(AgentDataConstants.COLON);
				}
				if(null!=node.getProperty(AgentDataConstants.PROPERTYVALUE_2) && !node.getProperty(AgentDataConstants.PROPERTYVALUE_2).isEmpty()){
					labelVal.append(node.getProperty(AgentDataConstants.PROPERTYVALUE_2));
					labelVal.append(AgentDataConstants.COLON);	 
				}
				if(null!=node.getProperty(AgentDataConstants.PROPERTYVALUE_3) && !node.getProperty(AgentDataConstants.PROPERTYVALUE_3).isEmpty()){
					labelVal.append(node.getProperty(AgentDataConstants.PROPERTYVALUE_3));
					labelVal.append(AgentDataConstants.COLON);	 
				}
				if(null!=node.getProperty(AgentDataConstants.PROPERTYVALUE_4) && !node.getProperty(AgentDataConstants.PROPERTYVALUE_4).isEmpty()){
					labelVal.append(node.getProperty(AgentDataConstants.PROPERTYVALUE_4));
				}

				nodepropertyMap.put( StringUtils.stripEnd(labelVal.toString(),AgentDataConstants.COLON), node);
				metaDataMap.put(StringUtils.stripEnd(key.toString(),AgentDataConstants.COLON), nodepropertyMap);
			}
		}
		return metaDataMap;
	}
	
	private <T> List<List<T>> partitionList(List<T> list, final int size) {
	    List<List<T>> parts = new ArrayList<List<T>>();
	    final int N = list.size();
	    for (int i = 0; i < N; i += size) {
	       /* parts.add(new ArrayList<T>(
	            list.subList(i, Math.min(N, i + size)))
	        );*/
	    	parts.add(getPartitionSubList(list,i,size,N));                 
	    }
	    return parts;
	}
	
	private <T> ArrayList<T> getPartitionSubList(List<T> list, int index,int size, final int N){
		return new ArrayList<T>(list.subList(index, Math.min(N, index + size)));
	}
	
	private static String buildCypherQuery(String labels, String fieldName){
		StringBuffer query = new StringBuffer();
		query.append("UNWIND {props} AS properties MERGE (node:LATEST").append(labels).append(" { ");
		if(fieldName.contains(",")){
			String[] fields = fieldName.split(",");
			JsonObject searchCriteria = new JsonObject();
			for(String field : fields){
				searchCriteria.addProperty(field, field);
				query.append(field).append(" : properties.").append(field).append(",");
			}
			query.delete(query.length()-1, query.length());
			query.append(" ");
		}else {
			query.append(fieldName).append(" : ").append("properties.").append(fieldName);
		}
		query.append(" }) set node+=properties ").append(" ");
		query.append("return count(node)").append(" ");
		return query.toString();
	}
}
