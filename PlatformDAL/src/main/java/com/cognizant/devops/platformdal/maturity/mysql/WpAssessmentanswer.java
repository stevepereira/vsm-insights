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
import java.util.Date;


/**
 * The persistent class for the wp_assessmentanswers database table.
 * 
 */
@Entity
@Table(name="wp_assessmentanswers")
@NamedQuery(name="WpAssessmentanswer.findAll", query="SELECT w FROM WpAssessmentanswer w")
public class WpAssessmentanswer implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private int assesid;

	@Lob
	private String comment;

	private int createdby;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createdon;

	private int invitationid;

	private int modifiedby;

	@Temporal(TemporalType.TIMESTAMP)
	private Date modifiedon;

	private int questionid;

	private String response;

	private int status;

	public WpAssessmentanswer() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getAssesid() {
		return this.assesid;
	}

	public void setAssesid(int assesid) {
		this.assesid = assesid;
	}

	public String getComment() {
		return this.comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
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

	public int getInvitationid() {
		return this.invitationid;
	}

	public void setInvitationid(int invitationid) {
		this.invitationid = invitationid;
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

	public int getQuestionid() {
		return this.questionid;
	}

	public void setQuestionid(int questionid) {
		this.questionid = questionid;
	}

	public String getResponse() {
		return this.response;
	}

	public void setResponse(String response) {
		this.response = response;
	}

	public int getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

}