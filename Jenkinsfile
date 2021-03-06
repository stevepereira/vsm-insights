env.dockerimagename="devopsbasservice/buildonframework:insightsPUI3-JenkinsUpgradeV201"
node {

	//Parse commitID (E.g, buildon-abc1234 to abc1234)
	gitCommitID = sh (
		script: 'echo $commitID | cut -d "-" -f2',
		returnStdout: true
	).trim()
	echo gitCommitID
	stage('SCM Checkout') {
		checkout scm	
	}
	// All single and double quotes in this file are used in a certain format.Do not alter in any step build
	//ApacheLicense Check in java and Python files. Exclude .sha1 file from TestNG as part of security analysis Fix.	
	stage ('LicenseCheck') {          
    	    def commit = sh (returnStdout: true, script: '''var=''
			for file in $(find . -print | grep -i -e .*[.]java -e .*[.]py -e .*[.]sh -e .*[.]bat | grep -Eiv "*__init__.py*" | grep -Eiv "*.sha1" )
			do
				if grep -q "Apache License" $file; then
					updated="License is updated $file" ##Dummy line
					else
					file_temp=`echo $file | cut -c 3-`
					fileName="$fileName,$file_temp"
					fi
			done
			if [ ! -z $fileName ]; then
					echo $fileName > files.txt 
			fi
			echo " " ''').split()
			
			if (fileExists('files.txt')) {
				echo "#################################################################################################################"
				echo "**********************LICENSE IS NOT UPDATED IN THE FOLLOWING LIST OF COMMA SEPARATED FILES *********************"
				sh 'cat files.txt'
				echo "*****************************************************************************************************************"
				echo "#################################################################################################################"
					slackSend channel: '#insightsjenkins', color: 'good', message: "Insights Build Failed for commitID - *$gitCommitID*, Branch - *$branchName* because Apache License is not updated in few files. \n List of files can be found at the bottom of the page @ https://buildon.cogdevops.com/buildon/HistoricCIWebController?commitId=$gitCommitID",  teamDomain: 'insightscogdevops',  token: slackToken
					sh 'rm -rf files.txt'
					sh 'exit 1'
			} else {
				echo 'License is up to date'
			}
  	} //License Check ends	

	
   // Platform Service Starts
	try{
		// Doxygen Report
		stage ('Doxygen_generate_report'){
			sh 'cd /var/jenkins/jobs/$commitID/workspace && mvn doxygen:report'
			sh 'cd /var/jenkins/jobs/$commitID/workspace/DoxygenReport && zip -r Doxygen.zip doxygen'	
		}
			
		//Build
		stage ('Insight_PS_Build') {	
			sh 'cd /var/jenkins/jobs/$commitID/workspace/PlatformUI3 && npm install'
			sh 'cd /var/jenkins/jobs/$commitID/workspace && mvn clean install -DskipTests'	
		}	
		
		//Below step will be enabled in next release to include security analysis..
		stage ('Insight_PS_IQ') {	
			sh 'mvn com.sonatype.clm:clm-maven-plugin:evaluate -Dclm.applicationId=Insights'
		} 

		stage ('Insight_PS_CodeAnalysis') {
			sh 'mvn sonar:sonar -Dmaven.test.failure.ignore=true -DskipTests=true -Dsonar.sources=src/main/java -pl !PlatformUI3'		
		}	

		stage ('Insight_PUI3_CodeAnalysis') {		
			sh 'cd /var/jenkins/jobs/$commitID/workspace/PlatformUI3 && mvn sonar:sonar -Dmaven.test.failure.ignore=true -DskipTests=true -Dsonar.sources=src/app/com/cognizant/devops/platformui/modules -Dsonar.language=js -Dsonar.javascript.file.suffixes=.ts'
		}
			
		stage ('Insight_PS_NexusUpload') {       	
			sh 'mvn clean deploy -DskipTests'	       	
		}

		stage ('Doxygen_NexusUpload') {	
			sh "cd /var/jenkins/jobs/$commitID/workspace && mvn -B help:evaluate -Dexpression=project.version | grep -e '^[^[]' > /var/jenkins/jobs/$commitID/workspace/version"
				doxyversion=readFile("/var/jenkins/jobs/$commitID/workspace/version").trim()  //Get version from pom.xml to form the nexus repo URL
			if(!doxyversion.contains("SNAPSHOT")){
				NEXUSREPO="https://repo.cogdevops.com/repository/InsightsRelease"
				sh "mvn deploy:deploy-file -DgroupId=com.cognizant.devops -DartifactId=PlatformDoxygen -Dversion=${doxyversion} -Dpackaging=zip -Dfile=/var/jenkins/jobs/${commitID}/workspace/DoxygenReport/Doxygen.zip -DrepositoryId=nexus -Durl=${NEXUSREPO}"
			}
		}
	}catch (err){
		slackSend channel: '#insightsjenkins', color: 'bad', message: "Insights Build Failed for commitID - *$gitCommitID*, Branch - *$branchName* \n Build Log can be found @ https://buildon.cogdevops.com/buildon/HistoricCIWebController?commitId=$gitCommitID", teamDomain: "insightscogdevops", token: slackToken
		sh 'exit 1'
	}	
	// Platform Service Ends	   
	   
    //Send Notification to Slack Channel
	stage ('SlackNotification') {
	
	//Framing Nexus URL for artifact uploaded to Nexus with unique timestamp
		//PlatformService version
	    	sh "cd /var/jenkins/jobs/$commitID/workspace/PlatformService && mvn -B help:evaluate -Dexpression=project.version | grep -e '^[^[]' > /var/jenkins/jobs/$commitID/workspace/PlatformService/version"
	   	pomversionService=readFile("/var/jenkins/jobs/$commitID/workspace/PlatformService/version").trim()  //Get version from pom.xml to form the nexus repo URL
		
		//PlatformEngine version
		sh "cd /var/jenkins/jobs/$commitID/workspace/PlatformEngine && mvn -B help:evaluate -Dexpression=project.version | grep -e '^[^[]' > /var/jenkins/jobs/$commitID/workspace/PlatformEngine/version"
	    	pomversionEngine=readFile("/var/jenkins/jobs/$commitID/workspace/PlatformEngine/version").trim()  //Get version from pom.xml to form the nexus repo URL
			
		//PlatformInsights version
			//Framing Nexus URL for artifact uploaded to Nexus with unique timestamp
		sh "cd /var/jenkins/jobs/$commitID/workspace/PlatformInsights && mvn -B help:evaluate -Dexpression=project.version | grep -e '^[^[]' > /var/jenkins/jobs/$commitID/workspace/PlatformInsights/version"
       		pomversion=readFile("/var/jenkins/jobs/$commitID/workspace/PlatformInsights/version").trim()  //Get version from pom.xml to form the nexus repo URL
	   
	    //PlatformUI version
		//Framing Nexus URL for artifact uploaded to Nexus with unique timestamp													
		sh "cd /var/jenkins/jobs/$commitID/workspace/PlatformUI3 && mvn -B help:evaluate -Dexpression=project.version | grep -e '^[^[]' > /var/jenkins/jobs/$commitID/workspace/PlatformUI3/version"
       		pomUI3version=readFile("/var/jenkins/jobs/$commitID/workspace/PlatformUI3/version").trim()  
		
		if(pomversionService.contains("SNAPSHOT") && pomversionEngine.contains("SNAPSHOT") && pomversion.contains("SNAPSHOT") && pomUI3version.contains("SNAPSHOT")){
		
			NEXUSREPO="https://repo.cogdevops.com/repository/buildonInsights"
			
			//get artifact info (artifactID,classifier,timestamp, buildnumber,version) from maven-metadata.xml
		sh "curl -s ${NEXUSREPO}/com/cognizant/devops/PlatformService/${pomversionService}/maven-metadata.xml  | grep -oP '(?<=<artifactId>).*?(?=</artifactId>)|(?<=<version>).*?(?=</version>)|(?<=<timestamp>).*?(?=</timestamp>)|(?<=<buildNumber>).*?(?=</buildNumber>)|(?<=<classifier>).*?(?=</classifier>)' | paste -sd- - | sed 's/-SNAPSHOT//g' | sed 's/--/-/g' | sed 's/\$/.war/' > /var/jenkins/jobs/$commitID/workspace/PlatformService/PS_artifact"
		
		//get artifact info (artifactID,classifier,timestamp, buildnumber,version) from maven-metadata.xml
		sh "curl -s ${NEXUSREPO}/com/cognizant/devops/PlatformEngine/${pomversionEngine}/maven-metadata.xml  | grep -oP '(?<=<artifactId>).*?(?=</artifactId>)|(?<=<version>).*?(?=</version>)|(?<=<timestamp>).*?(?=</timestamp>)|(?<=<buildNumber>).*?(?=</buildNumber>)|(?<=<classifier>).*?(?=</classifier>)' | paste -sd- - | sed 's/-SNAPSHOT//g' | sed 's/--/-/g' | sed 's/\$/.jar/' > /var/jenkins/jobs/$commitID/workspace/PlatformEngine/PE_artifact"
		
		//get artifact info (artifactID,classifier,timestamp, buildnumber,version) from maven-metadata.xml
		sh "curl -s ${NEXUSREPO}/com/cognizant/devops/PlatformInsights/${pomversion}/maven-metadata.xml  | grep -oP '(?<=<artifactId>).*?(?=</artifactId>)|(?<=<version>).*?(?=</version>)|(?<=<timestamp>).*?(?=</timestamp>)|(?<=<buildNumber>).*?(?=</buildNumber>)|(?<=<classifier>).*?(?=</classifier>)' | paste -sd- - | sed 's/-SNAPSHOT//g' | sed 's/--/-/g' | sed 's/\$/.jar/' > /var/jenkins/jobs/$commitID/workspace/PlatformInsights/PI_artifact"
		
		//get artifact info (artifactID,classifier,timestamp, buildnumber,version) from maven-metadata.xml
	   	sh "curl -s ${NEXUSREPO}/com/cognizant/devops/PlatformUI3/${pomUI3version}/maven-metadata.xml  | grep -oP '(?<=<artifactId>).*?(?=</artifactId>)|(?<=<version>).*?(?=</version>)|(?<=<timestamp>).*?(?=</timestamp>)|(?<=<buildNumber>).*?(?=</buildNumber>)|(?<=<classifier>).*?(?=</classifier>)' | paste -sd- - | sed 's/-SNAPSHOT//g' | sed 's/--/-/g' | sed 's/\$/.zip/' > /var/jenkins/jobs/$commitID/workspace/PlatformUI3/PUI3_artifact"		
		
		
		} else {
		
		    NEXUSREPO="https://repo.cogdevops.com/repository/InsightsRelease"
			
			//get artifact info (artifactID,classifier,timestamp, buildnumber,version) from maven-metadata.xml
		sh "curl -s ${NEXUSREPO}/com/cognizant/devops/PlatformService/maven-metadata.xml  | grep -oP '(?<=<artifactId>).*?(?=</artifactId>)|(?<=<release>).*?(?=</release>)|(?<=<timestamp>).*?(?=</timestamp>)|(?<=<buildNumber>).*?(?=</buildNumber>)|(?<=<classifier>).*?(?=</classifier>)' | paste -sd- - | sed 's/-SNAPSHOT//g' | sed 's/--/-/g' | sed 's/\$/.war/' > /var/jenkins/jobs/$commitID/workspace/PlatformService/PS_artifact"
		
		//get artifact info (artifactID,classifier,timestamp, buildnumber,version) from maven-metadata.xml
		sh "curl -s ${NEXUSREPO}/com/cognizant/devops/PlatformEngine/maven-metadata.xml  | grep -oP '(?<=<artifactId>).*?(?=</artifactId>)|(?<=<release>).*?(?=</release>)|(?<=<timestamp>).*?(?=</timestamp>)|(?<=<buildNumber>).*?(?=</buildNumber>)|(?<=<classifier>).*?(?=</classifier>)' | paste -sd- - | sed 's/-SNAPSHOT//g' | sed 's/--/-/g' | sed 's/\$/.jar/' > /var/jenkins/jobs/$commitID/workspace/PlatformEngine/PE_artifact"
		
		//get artifact info (artifactID,classifier,timestamp, buildnumber,version) from maven-metadata.xml
		sh "curl -s ${NEXUSREPO}/com/cognizant/devops/PlatformInsights/maven-metadata.xml  | grep -oP '(?<=<artifactId>).*?(?=</artifactId>)|(?<=<release>).*?(?=</release>)|(?<=<timestamp>).*?(?=</timestamp>)|(?<=<buildNumber>).*?(?=</buildNumber>)|(?<=<classifier>).*?(?=</classifier>)' | paste -sd- - | sed 's/-SNAPSHOT//g' | sed 's/--/-/g' | sed 's/\$/.jar/' > /var/jenkins/jobs/$commitID/workspace/PlatformInsights/PI_artifact"

		//get artifact info (artifactID,classifier,timestamp, buildnumber,version) from maven-metadata.xml
	   	sh "curl -s ${NEXUSREPO}/com/cognizant/devops/PlatformUI3/maven-metadata.xml  | grep -oP '(?<=<artifactId>).*?(?=</artifactId>)|(?<=<release>).*?(?=</release>)|(?<=<timestamp>).*?(?=</timestamp>)|(?<=<buildNumber>).*?(?=</buildNumber>)|(?<=<classifier>).*?(?=</classifier>)' | paste -sd- - | sed 's/-SNAPSHOT//g' | sed 's/--/-/g' | sed 's/\$/.zip/' > /var/jenkins/jobs/$commitID/workspace/PlatformUI3/PUI3_artifact"	
				
		}
		
        //Platform Service
		PS_artifactName=readFile("/var/jenkins/jobs/$commitID/workspace/PlatformService/PS_artifact").trim()
		PS_artifact="${NEXUSREPO}/com/cognizant/devops/PlatformService/${pomversionService}/${PS_artifactName}"			
		
		//Platform Engine
		PE_artifactName=readFile("/var/jenkins/jobs/$commitID/workspace/PlatformEngine/PE_artifact").trim()
		PE_artifact="${NEXUSREPO}/com/cognizant/devops/PlatformEngine/${pomversionEngine}/${PE_artifactName}"
				
		//Platform Insights
		PI_artifactName=readFile("/var/jenkins/jobs/$commitID/workspace/PlatformInsights/PI_artifact").trim()
		PI_artifact="${NEXUSREPO}/com/cognizant/devops/PlatformInsights/${pomversion}/${PI_artifactName}"
		
		//Platform UI3
		PUI3_artifactName=readFile("/var/jenkins/jobs/$commitID/workspace/PlatformUI3/PUI3_artifact").trim()
		PUI3_artifact="${NEXUSREPO}/com/cognizant/devops/PlatformUI3/${pomUI3version}/${PUI3_artifactName}"
		
   	    slackSend channel: '#insightsjenkins', color: 'good', message: "Insights Build Success. \n New artifacts are uploaded to Nexus for commitID : *${env.commitID}* ,Branch - *${env.branchName}* \n *PlatformService* ${PS_artifact} \n *PlatformUI3* ${PUI3_artifact} \n *PlatformEngine* ${PE_artifact} \n *PlatformInsights*  ${PI_artifact} \n\n *For detail Build Log can be found @* https://buildon.cogdevops.com/buildon/HistoricCIWebController?commitId=$gitCommitID", teamDomain: 'insightscogdevops', token: slackToken // "*" is for making the text bold in slack notification
	}
}