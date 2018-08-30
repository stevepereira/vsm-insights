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