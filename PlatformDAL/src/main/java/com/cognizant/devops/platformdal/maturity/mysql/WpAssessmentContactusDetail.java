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


/**
 * The persistent class for the wp_assessment_contactus_details database table.
 * 
 */
@Entity
@Table(name="wp_assessment_contactus_details")
@NamedQuery(name="WpAssessmentContactusDetail.findAll", query="SELECT w FROM WpAssessmentContactusDetail w")
public class WpAssessmentContactusDetail implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer idAssessment;

	private String applicationName;

	@Column(name="assessor_known")
	private String assessorKnown;

	private String deAssessor;

	private String devopsAssessor;

	private String horizontal;

	private Integer id;

	private String invites;

	private Integer projectID;

	private String status;

	private String vertical;

	public WpAssessmentContactusDetail() {
	}

	public Integer getIdAssessment() {
		return this.idAssessment;
	}

	public void setIdAssessment(Integer idAssessment) {
		this.idAssessment = idAssessment;
	}

	public String getApplicationName() {
		return this.applicationName;
	}

	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}

	public String getAssessorKnown() {
		return this.assessorKnown;
	}

	public void setAssessorKnown(String assessorKnown) {
		this.assessorKnown = assessorKnown;
	}

	public String getDeAssessor() {
		return this.deAssessor;
	}

	public void setDeAssessor(String deAssessor) {
		this.deAssessor = deAssessor;
	}

	public String getDevopsAssessor() {
		return this.devopsAssessor;
	}

	public void setDevopsAssessor(String devopsAssessor) {
		this.devopsAssessor = devopsAssessor;
	}

	public String getHorizontal() {
		return this.horizontal;
	}

	public void setHorizontal(String horizontal) {
		this.horizontal = horizontal;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getInvites() {
		return this.invites;
	}

	public void setInvites(String invites) {
		this.invites = invites;
	}

	public Integer getProjectID() {
		return this.projectID;
	}

	public void setProjectID(Integer projectID) {
		this.projectID = projectID;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getVertical() {
		return this.vertical;
	}

	public void setVertical(String vertical) {
		this.vertical = vertical;
	}

}