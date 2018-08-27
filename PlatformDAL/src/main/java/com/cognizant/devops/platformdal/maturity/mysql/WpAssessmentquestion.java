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
package com.cognizant.devops.platformdal.maturity.mysql;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the wp_assessmentquestions database table.
 * 
 */
@Entity
@Table(name="wp_assessmentquestions")
@NamedQuery(name="WpAssessmentquestion.findAll", query="SELECT w FROM WpAssessmentquestion w")
public class WpAssessmentquestion implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private int activityid;

	private int assesid;

	private int comments;

	private int createdby;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createdon;

	@Column(name="current_score")
	private BigDecimal currentScore;

	@Column(name="future_score")
	private BigDecimal futureScore;

	private int modifiedby;

	@Temporal(TemporalType.TIMESTAMP)
	private Date modifiedon;

	@Lob
	private String question;

	@Lob
	@Column(name="question_description")
	private String questionDescription;

	private int questionid;

	private BigDecimal response;

	private int status;

	private int typeid;

	private int vectorid;

	public WpAssessmentquestion() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getActivityid() {
		return this.activityid;
	}

	public void setActivityid(int activityid) {
		this.activityid = activityid;
	}

	public int getAssesid() {
		return this.assesid;
	}

	public void setAssesid(int assesid) {
		this.assesid = assesid;
	}

	public int getComments() {
		return this.comments;
	}

	public void setComments(int comments) {
		this.comments = comments;
	}

	public int getCreatedby() {
		return this.createdby;
	}

	public void setCreatedby(int createdby) {
		this.createdby = createdby;
	}

	public Date getCreatedon() {
		return this.createdon;
	}

	public void setCreatedon(Date createdon) {
		this.createdon = createdon;
	}

	public BigDecimal getCurrentScore() {
		return this.currentScore;
	}

	public void setCurrentScore(BigDecimal currentScore) {
		this.currentScore = currentScore;
	}

	public BigDecimal getFutureScore() {
		return this.futureScore;
	}

	public void setFutureScore(BigDecimal futureScore) {
		this.futureScore = futureScore;
	}

	public int getModifiedby() {
		return this.modifiedby;
	}

	public void setModifiedby(int modifiedby) {
		this.modifiedby = modifiedby;
	}

	public Date getModifiedon() {
		return this.modifiedon;
	}

	public void setModifiedon(Date modifiedon) {
		this.modifiedon = modifiedon;
	}

	public String getQuestion() {
		return this.question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getQuestionDescription() {
		return this.questionDescription;
	}

	public void setQuestionDescription(String questionDescription) {
		this.questionDescription = questionDescription;
	}

	public int getQuestionid() {
		return this.questionid;
	}

	public void setQuestionid(int questionid) {
		this.questionid = questionid;
	}

	public BigDecimal getResponse() {
		return this.response;
	}

	public void setResponse(BigDecimal response) {
		this.response = response;
	}

	public int getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getTypeid() {
		return this.typeid;
	}

	public void setTypeid(int typeid) {
		this.typeid = typeid;
	}

	public int getVectorid() {
		return this.vectorid;
	}

	public void setVectorid(int vectorid) {
		this.vectorid = vectorid;
	}

}