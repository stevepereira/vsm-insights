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
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	private Integer activityid;

	private Integer assesid;

	private Integer comments;

	private Integer createdby;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createdon;

	@Column(name="current_score")
	private BigDecimal currentScore;

	@Column(name="future_score")
	private BigDecimal futureScore;

	private Integer modifiedby;

	@Temporal(TemporalType.TIMESTAMP)
	private Date modifiedon;

	@Column(name="question",nullable = false,columnDefinition="TEXT")
	private String question;

	
	@Column(name="question_description",nullable = false,columnDefinition="TEXT")
	private String questionDescription;

	private Integer questionid;

	private BigDecimal response;

	private Integer status;

	private Integer typeid;

	private Integer vectorid;

	public WpAssessmentquestion() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getActivityid() {
		return this.activityid;
	}

	public void setActivityid(Integer activityid) {
		this.activityid = activityid;
	}

	public Integer getAssesid() {
		return this.assesid;
	}

	public void setAssesid(Integer assesid) {
		this.assesid = assesid;
	}

	public Integer getComments() {
		return this.comments;
	}

	public void setComments(Integer comments) {
		this.comments = comments;
	}

	public Integer getCreatedby() {
		return this.createdby;
	}

	public void setCreatedby(Integer createdby) {
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

	public Integer getModifiedby() {
		return this.modifiedby;
	}

	public void setModifiedby(Integer modifiedby) {
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

	public Integer getQuestionid() {
		return this.questionid;
	}

	public void setQuestionid(Integer questionid) {
		this.questionid = questionid;
	}

	public BigDecimal getResponse() {
		return this.response;
	}

	public void setResponse(BigDecimal response) {
		this.response = response;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getTypeid() {
		return this.typeid;
	}

	public void setTypeid(Integer typeid) {
		this.typeid = typeid;
	}

	public Integer getVectorid() {
		return this.vectorid;
	}

	public void setVectorid(Integer vectorid) {
		this.vectorid = vectorid;
	}

}