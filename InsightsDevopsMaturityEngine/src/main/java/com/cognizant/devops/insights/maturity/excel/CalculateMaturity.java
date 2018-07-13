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
package com.cognizant.devops.insights.maturity.excel;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;


import com.cognizant.devops.platformcommons.config.ApplicationConfigCache;
import com.cognizant.devops.platformcommons.config.ApplicationConfigProvider;
import com.cognizant.devops.platformcommons.dal.neo4j.GraphResponse;
import com.cognizant.devops.platformcommons.dal.neo4j.Neo4jDBHandler;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonIOException;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import com.cognizant.devops.platformcommons.constants.ConfigOptions;
import com.cognizant.devops.platformcommons.config.ApplicationConfigCache;


@SuppressWarnings("restriction")
public class CalculateMaturity {

	public void calculateMaturity() {
		String file_name = ApplicationConfigProvider.getInstance().getMaturityModel().getFileMaturelocation();//filematurelocation
		JsonArray excelData = getExcelDataAsJsonObject(file_name);
		List<Questionnaire> questionList = initialize(excelData);
		Map<String,Integer> vectorScore = new HashMap<>(5);
		calculateVectorScore(questionList,vectorScore);
		System.out.println("Vector scores "+vectorScore);
		Integer totalmaturityScore = 0;
		for(Map.Entry<String, Integer> entry :vectorScore.entrySet()) {
			totalmaturityScore += entry.getValue();
		}
		System.out.println("Total Devops Maturity Score - "+totalmaturityScore);
	}
	
	private void calculateVectorScore(List<Questionnaire> questionList,
			Map<String, Integer> vectorScore) {
		Integer totalScore = 0;
		Integer currentScore = 0;
		String source;
		String operation;
		String leftHandValue;
		String rightHandValue;
		String comparisonDataType;
		Integer inputScore;
		String vector;
		String tempVectorName = "";
		String activity;
		List<Questionnaire> rulePassedQuestionList = new ArrayList<>();
		for(Questionnaire data :questionList) {
			
			source = data.getResponseSource();
			operation = data.getComparisonOperation();
			leftHandValue = data.getExpectedResponse();
			comparisonDataType = data.getInputDataType();
			inputScore = data.getScore();
			vector = data.getVector();
			activity = data.getActivity();
			
			if(!tempVectorName.isEmpty() && !tempVectorName.equals(vector)) {
				vectorScore.put(tempVectorName, totalScore);
				totalScore = 0;
			}
			if ("Input".equalsIgnoreCase(source)) {
				rightHandValue = data.getResponse();
				if(operation(operation, leftHandValue, rightHandValue,comparisonDataType)) {
					totalScore += inputScore;
					currentScore = inputScore;
					System.out.println(operation(operation, leftHandValue, rightHandValue,comparisonDataType) + " -- " + rightHandValue );
					
					rulePassedQuestionList.add(data);
				}
			} else if ("DB".equalsIgnoreCase(source)) {
				rightHandValue = calculateScoreFromGraphDB(data.getQuery());
				if(operation(operation, leftHandValue, rightHandValue,comparisonDataType)) {
					totalScore += inputScore;
					currentScore = inputScore;
					rulePassedQuestionList.add(data);
				}
			}
			data.setCurrentScore(currentScore);
			tempVectorName = vector;
			
		}
		//System.out.println(rulePassedQuestionList);
		Map<String,Integer> scoreByVector = questionList.stream().collect(Collectors.groupingBy(Questionnaire::getVector,
														Collectors.summingInt(Questionnaire::getCurrentScore)));
		
		Map<String,Double> scoreAvgByVector = questionList.stream().collect(Collectors.groupingBy(Questionnaire::getVector,
				Collectors.averagingInt(Questionnaire::getCurrentScore)));
		
		System.out.println("GroupB SUM"+scoreByVector);
		System.out.println("GroupB Avr"+scoreAvgByVector);
		
		Map<String, Map<String,Set<String>>> mappingByVectorToActivityToCategory
        = questionList.stream().collect(Collectors.groupingBy(Questionnaire::getVector,Collectors.groupingBy(Questionnaire::getActivity, Collectors.mapping(Questionnaire::getCategory,Collectors.toSet()))));
		System.out.println(mappingByVectorToActivityToCategory);
		
		Map<String, Map<String,Map<String,Integer>>> mappingByVectorToActivityToCategoryToScore
        = questionList.stream().collect(Collectors.groupingBy(Questionnaire::getVector,Collectors.groupingBy(Questionnaire::getActivity, 
        		Collectors.groupingBy(Questionnaire::getCategory,Collectors.summingInt(Questionnaire::getCurrentScore)))));
		
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
	    gson.toJson(mappingByVectorToActivityToCategoryToScore, System.out);
	    
		//System.out.println(mappingByVectorToActivityToCategoryToScore);
		
		
			vectorScore.put(tempVectorName, totalScore);
	}
	
	private String calculateScoreFromGraphDB(String query) {
		try {
			Neo4jDBHandler neo4jDBHandler = new Neo4jDBHandler();
			GraphResponse response = neo4jDBHandler.executeCypherQuery(query);
			JsonObject responseJson = response.getJson();
			return responseJson.getAsJsonArray("results").get(0).getAsJsonObject()
					.getAsJsonArray("data").get(0).getAsJsonObject()
					.getAsJsonArray("row").get(0).getAsString();
			
			
		} catch (Exception e) {
		}
		return ""; 
	}

	private Boolean operation(String operation, String leftHandValue, String rightHandValue,String comparisonDataType) {
		Boolean result = Boolean.FALSE;
		switch(OPERATION.valueOf(operation)) {
			case EQS :
					result = getEqualsComparisonOutput(leftHandValue,rightHandValue, comparisonDataType);
				break;
			case GT :
				if(ObjectUtils.compare(getDoubleNumber(leftHandValue), getDoubleNumber(rightHandValue)) < 0) {
					result = Boolean.TRUE;	
				}
				break;
			case LT :
				if(ObjectUtils.compare(getDoubleNumber(leftHandValue), getDoubleNumber(rightHandValue)) > 0) {
					result = Boolean.TRUE;	
				}
				break;
			case GTE :
				if(getDoubleNumber(leftHandValue) <= getDoubleNumber(rightHandValue)) {
					result = Boolean.TRUE;	
				}
				break;
			case LTE :
				if(getDoubleNumber(leftHandValue) >= getDoubleNumber(rightHandValue)) {
					result = Boolean.TRUE;	
				}
				break;
			case NEQ :
				result = !getEqualsComparisonOutput(leftHandValue,rightHandValue, comparisonDataType);
				break;
			case RANGE :
				String [] values = leftHandValue.split(" ");
				if(getDoubleNumber(values[0]) <= getDoubleNumber(rightHandValue) 
						&& getDoubleNumber(values[2]) >= getDoubleNumber(rightHandValue)) {
					result = Boolean.TRUE;
				}
				break;
			default :
		}
		
		return result;
	}
	
	private Boolean getEqualsComparisonOutput(String leftHandValue, String rightHandValue,String comparisonDataType) {
		Boolean result = false;
		try {
			switch(comparisonDataType.toLowerCase()) {
			case "string" :
					if(leftHandValue != null && rightHandValue != null && 
							leftHandValue.equals(rightHandValue)) {
						result = true;
					}
						
				break;
			case "number" :
				Double leftNumberValue = getDoubleNumber(leftHandValue);
				Double rightNumberValue = getDoubleNumber(rightHandValue);
				if(leftNumberValue.equals(rightNumberValue)) {
					result = true;
				}
				
				break;
			case "boolean" :
				Boolean leftBooleanValue = BooleanUtils.toBooleanObject(leftHandValue);
				Boolean rightBooleanValue = BooleanUtils.toBooleanObject(rightHandValue);
				if(leftBooleanValue.equals(rightBooleanValue)) {
					result = true;
				} 
				break;
				
			default :
				System.out.println();
			}
		} catch (Exception e) {
			
		}
		return result;
	}
	
	
	private Double getDoubleNumber(String value) {
		return Double.valueOf(value);
	}

	public JsonArray getExcelDataAsJsonObject(String excelFileName) {
		
		JsonObject sheetsJsonObject = new JsonObject();
		JsonArray sheetArray = new JsonArray();
		try (InputStream excelFile = new FileInputStream(new File(excelFileName));
				Workbook workbook = WorkbookFactory.create(excelFile);) {

			for (int i = 0; i < workbook.getNumberOfSheets(); i++) {

				ArrayList<String> columnNames = new ArrayList<String>();
				Sheet sheet = workbook.getSheetAt(i);
				if(!"Questionnaire".equals(sheet.getSheetName())) {
					continue;
				}
				Iterator<Row> sheetIterator = sheet.iterator();
				
				while (sheetIterator.hasNext()) {

					Row currentRow = sheetIterator.next();
					JsonObject jsonObject = new JsonObject();

					if (currentRow.getRowNum() != 0) {

						for (int j = 0; j < columnNames.size(); j++) {
							if (currentRow.getCell(j) != null) {
								createCellValue(columnNames.get(j), currentRow.getCell(j), jsonObject);
							} else {
								jsonObject.addProperty(columnNames.get(j), "");
							}

						}

						sheetArray.add(jsonObject);

					} else {
						// store column names
						for (int k = 0; k < currentRow.getPhysicalNumberOfCells(); k++) {
							if(currentRow.getCell(k) != null && currentRow.getCell(k).getStringCellValue() != null) {
								columnNames.add(currentRow.getCell(k).getStringCellValue());
							}
						}
					}

				}

				sheetsJsonObject.add(workbook.getSheetName(i), sheetArray);
				
				break;

			}
		} catch (InvalidFormatException | IOException e) {
			System.out.println(e);
		} 
		return sheetArray;

	}

	private void createCellValue(String columnName, Cell cell, JsonObject jsonObject) {

		switch (cell.getCellTypeEnum()) {
		case BOOLEAN:
			jsonObject.addProperty(columnName, cell.getBooleanCellValue());
			break;
		case STRING:
			jsonObject.addProperty(columnName, cell.getStringCellValue().trim());
			break;
		case NUMERIC:
			if (DateUtil.isCellDateFormatted(cell)) {
				jsonObject.addProperty(columnName, cell.getDateCellValue().toInstant().toString());
			} else {
				jsonObject.addProperty(columnName, cell.getNumericCellValue());
			}
			break;
		case FORMULA:
			System.out.print(cell.getCellFormula());
			break;
		case BLANK:
			System.out.print("");
			break;
		default:
			System.out.print("");
		}
	}
	
	private List<Questionnaire> initialize(JsonArray sheetArray) {
		List<Questionnaire> questions = null;
		java.lang.reflect.Type listType = new TypeToken<List<Questionnaire>>(){}.getType();
		try {
			Gson gson = new Gson();
			questions = gson.fromJson(sheetArray.toString(), listType);
		} catch (JsonIOException e) {
		} catch (JsonSyntaxException e) {
		}
		return questions;
	}

	public static void main(String... args) {
		ApplicationConfigCache.loadConfigCache();
		CalculateMaturity maturity = new CalculateMaturity();
		maturity.calculateMaturity();
	}

}
