package com.cognizant.devops.platformcommons.core.enums;

public enum InsightsSettingTypes {

	DATAPURGING("DATAPURGING"),
	DEVOPSMATURITY("DEVOPSMATURITY");
	
    private String value;

    InsightsSettingTypes(final String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return this.getValue();
    }
}
