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
 * The persistent class for the wp_activitytype database table.
 * 
 */
@Entity
@Table(name="wp_activitytype")
@NamedQuery(name="WpActivitytype.findAll", query="SELECT w FROM WpActivitytype w")
public class WpActivitytype implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private byte status;

	private String type;

	public WpActivitytype() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public byte getStatus() {
		return this.status;
	}

	public void setStatus(byte status) {
		this.status = status;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

}