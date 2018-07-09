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

import java.io.Serializable;

public class Questionnaire  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3448756578783588128L;
	
	Integer SrNo = 0;
	String Vector;
	String Activity;
	String Question;
	String Category;
	String ResponseSource;
	String ExpectedResponse;
	String Response;
	Integer Score = 0;
	String ComparisonOperation;
	String InputDataType;
	String SourceName;
	String Query;
	
	public Integer getSrNo() {
		return SrNo;
	}
	public void setSrNo(Integer srNo) {
		SrNo = srNo;
	}
	public String getVector() {
		return Vector;
	}
	public void setVector(String vector) {
		Vector = vector;
	}
	public String getActivity() {
		return Activity;
	}
	public void setActivity(String activity) {
		Activity = activity;
	}
	public String getQuestion() {
		return Question;
	}
	public void setQuestion(String question) {
		Question = question;
	}
	public String getCategory() {
		return Category;
	}
	public void setCategory(String category) {
		Category = category;
	}
	public String getResponseSource() {
		return ResponseSource;
	}
	public void setResponseSource(String responseSource) {
		ResponseSource = responseSource;
	}
	public String getExpectedResponse() {
		return ExpectedResponse;
	}
	public void setExpectedResponse(String expectedResponse) {
		ExpectedResponse = expectedResponse;
	}
	public String getResponse() {
		return Response;
	}
	public void setResponse(String response) {
		Response = response;
	}
	public Integer getScore() {
		return Score;
	}
	public void setScore(Integer score) {
		Score = score;
	}
	public String getComparisonOperation() {
		return ComparisonOperation;
	}
	public void setComparisonOperation(String comparisonOperation) {
		ComparisonOperation = comparisonOperation;
	}
	public String getInputDataType() {
		return InputDataType;
	}
	public void setInputDataType(String inputDataType) {
		InputDataType = inputDataType;
	}
	public String getSourceName() {
		return SourceName;
	}
	public void setSourceName(String sourceName) {
		SourceName = sourceName;
	}
	public String getQuery() {
		return Query;
	}
	public void setQuery(String query) {
		Query = query;
	}
	
}
