#! /bin/bash
#turn on bash's job control
set -m

set -e

sleep 10

#ENV
yum install -y  wget unzip
cd /usr/ &&  mkdir INSIGHTS_HOME
cd /usr/INSIGHTS_HOME && wget $insightsConfigURL
cd /usr/INSIGHTS_HOME && unzip InSightsConfig.zip && rm -rf InSightsConfig.zip
cd /usr/INSIGHTS_HOME && cp -R InSightsConfig/.InSights/ . && rm -rf InSightsConfig
cd /usr/INSIGHTS_HOME
export INSIGHTS_HOME=/usr/INSIGHTS_HOME
echo INSIGHTS_HOME=/usr/INSIGHTS_HOME | tee -a /etc/environment
echo "export INSIGHTS_HOME=/usr/INSIGHTS_HOME" | tee -a /etc/profile
source /etc/environment
source /etc/profile

#JAVA
yum update -y
cd /opt && wget $jdkURL
tar xzf jdk-8u151-linux-x64.tar.gz && rm -rf jdk-8u151-linux-x64.tar.gz

export JAVA_HOME=/opt/jdk1.8.0_151
 echo JAVA_HOME=/opt/jdk1.8.0_151  |  tee -a /etc/environment
 echo "export" JAVA_HOME=/opt/jdk1.8.0_151 |  tee -a /etc/profile
export JRE_HOME=/opt/jdk1.8.0_151/jre
 echo JRE_HOME=/opt/jdk1.8.0_151/jre |  tee -a /etc/environment
 echo "export" JRE_HOME=/opt/jdk1.8.0_151/jre |  tee -a /etc/profile
export PATH=$PATH:/opt/jdk1.8.0_151/bin:/opt/jdk1.8.0_151/jre/bin
echo PATH=$PATH:/opt/jdk1.8.0_151/bin:/opt/jdk1.8.0_151/jre/bin |  tee -a /etc/environment
 alternatives --install /usr/bin/java java /opt/jdk1.8.0_151/bin/java 20000
 update-alternatives --install "/usr/bin/java" "java" "/opt/jdk1.8.0_151/bin/java" 1
 update-alternatives --install "/usr/bin/javac" "javac" "/opt/jdk1.8.0_151/bin/javac" 1
 update-alternatives --install "/usr/bin/javaws" "javaws" "/opt/jdk1.8.0_151/bin/javaws" 1
 update-alternatives --set java /opt/jdk1.8.0_151/bin/java
 update-alternatives --set javac /opt/jdk1.8.0_151/bin/javac
 update-alternatives --set javaws /opt/jdk1.8.0_151/bin/javaws
source /etc/environment
source /etc/profile

# Python 2.7.11
echo "#################### Installing Python 2.7.11 with Virtual Env ####################"
yum upgrade -y
yum groupinstall 'Development Tools' -y
yum install zlib-devel openssl-devel -y
mkdir -p /opt/python && cd /opt/python &&  wget https://platform.cogdevops.com/insights_install/installationScripts/latest/RHEL/python/Python-2.7.11.tgz
tar -zxf Python-2.7.11.tgz && cd Python-2.7.11 && yum install gcc -y &&  ./configure --prefix=/opt/
make install && wget https://platform.cogdevops.com/insights_install/installationScripts/latest/RHEL/python/get-pip.py -O /opt/python/Python-2.7.11/get-pip.py
python /opt/python/Python-2.7.11/get-pip.py
pip install pika==0.11.2 requests apscheduler python-dateutil xmltodict pytz requests_ntlm


#UPDATE IPs -SERVER_CONFIG.JSON
elasticSearchEndpoint="http:\/\/$elasticIP:9200"
neo4jEndpoint="http:\/\/$neo4jIP:7474"
grafanaEndpoint="http:\/\/$hostIP:3000"
grafanaDBEndpoint="jdbc:postgresql:\/\/$postgresIP:5432\/grafana"
insightsDBUrl="jdbc:postgresql:\/\/$postgresIP:5432\/insight"
grafanaDBUrl="jdbc:postgresql:\/\/$postgresIP:5432\/grafana"

#UPDATE ServiceEndpoint - uiConfig.json and server-config.json
ServiceEndpoint="http:\/\/$hostIP:8080"

configPath='/usr/INSIGHTS_HOME/.InSights/server-config.json'
sed -i -e "s/.*elasticSearchEndpoint.*/  \"elasticSearchEndpoint\": \"$elasticSearchEndpoint\"/g" $configPath
sed -i -e "s/.endpoint\":.*/\"endpoint\": \"$neo4jEndpoint\",/g" $configPath
sed -i -e "s/.*grafanaEndpoint.*/    \"grafanaEndpoint\": \"$grafanaEndpoint\",/g" $configPath
sed -i -e "s/.*grafanaDBEndpoint.*/    \"grafanaDBEndpoint\": \"$grafanaDBEndpoint\",/g" $configPath
sed -i -e "s/.*insightsDBUrl.*/\t\t\"insightsDBUrl\": \"$insightsDBUrl\",/g" $configPath
sed -i -e "s/.*grafanaDBUrl.*/\t\t\"grafanaDBUrl\": \"$grafanaDBUrl\"/g" $configPath
sed -i -e "s/.*insightsServiceURL.*/    \"insightsServiceURL\": \"$ServiceEndpoint\",/g" $configPath

sed -i 's/\r$//g' $configPath

#RabbitMq
echo "#################### Installing Erlang , required for Rabbit MQ ####################"
 mkdir erlang && cd erlang
 wget https://platform.cogdevops.com/insights_install/installationScripts/latest/RHEL/rabbitmq/erlang-20.0.5-1.el6.x86_64.rpm
 yum install -y erlang-20.0.5-1.el6.x86_64.rpm
echo "#################### Installing Rabbit MQ with configs and user creation ####################"
 mkdir rabbitmq && cd rabbitmq
 wget https://platform.cogdevops.com/insights_install/installationScripts/latest/RHEL/rabbitmq/rabbitmq-server-3.6.5-1.noarch.rpm
 rpm --import https://platform.cogdevops.com/insights_install/installationScripts/latest/RHEL/rabbitmq/rabbitmq-signing-key-public.asc
 yum install -y rabbitmq-server-3.6.5-1.noarch.rpm
 wget https://platform.cogdevops.com/insights_install/installationScripts/latest/RHEL/rabbitmq/RabbitMQ-3.6.5.zip
 unzip RabbitMQ-3.6.5.zip && cd RabbitMQ-3.6.5 &&  cp rabbitmq.config /etc/rabbitmq/
 chkconfig rabbitmq-server on &&  service rabbitmq-server start
 rabbitmq-plugins enable rabbitmq_management
#sleep 15
curl -X PUT -u guest:guest -H "Content-Type: application/json" -d '{"password":"iSight","tags":"administrator"}' "http://localhost:15672/api/users/iSight"
#sleep 15
curl -X PUT -u guest:guest -H "Content-Type: application/json" -d '{"configure":".*","write":".*","read":".*"}' "http://localhost:15672/api/permissions/%2f/iSight"

#AgentDaemon
echo "Set up Agent_Daemon"
cd /opt/ && mkdir insightsagents
chmod -R 755 insightsagents/
cd insightsagents
export INSIGHTS_AGENT_HOME=`pwd`
echo INSIGHTS_AGENT_HOME=`pwd` | tee -a /etc/environment
echo "export" INSIGHTS_AGENT_HOME=`pwd` | tee -a /etc/profile
 mkdir AgentDaemon
 mkdir PlatformAgents
chmod -R 755 AgentDaemon
chmod -R 755 PlatformAgents
echo $INSIGHTS_AGENT_HOME
cd AgentDaemon
 wget https://platform.cogdevops.com/insights_install/release/latest/agentdaemon.zip -O agentdaemon.zip
 unzip agentdaemon.zip &&  rm -rf agentdaemon.zip
source /etc/environment
source /etc/profile
yum install sudo -y
 sed -i -e "s|extractionpath|/opt/insightsagents/PlatformAgents|g" /opt/insightsagents/AgentDaemon/com/cognizant/devops/platformagents/agents/agentdaemon/config.json
 chmod +x installdaemonagent.sh
 mkdir /opt/agent20
 mkdir /opt/agent20/download
 chmod -R 777 /opt/agent20
sh ./installdaemonagent.sh Linux


#GRAFANA
cd /opt
mkdir grafana-v5.2.2 && cd grafana-v5.2.2
wget $grafanaURL
tar -zxvf grafana-5.2.2.tar.gz
wget $grafanaLDAP
chmod -R 766 grafana-5.2.2
cp ldap.toml ./grafana-5.2.2/conf/ldap.toml
wget $grafanaDefaults
cp defaults.ini ./grafana-5.2.2/conf/defaults.ini
export GRAFANA_HOME=/opt/grafana-v5.2.2/
sed -i -e "s/host = localhost:5432/host = $postgresIP:5432/g"  ./grafana-5.2.2/conf/defaults.ini
cd grafana-5.2.2 && nohup ./bin/grafana-server &
sleep 40
echo $hostIP
echo $! > grafana-pid.txt
curl -X POST -u admin:admin -H "Content-Type: application/json" -d '{"name":"PowerUser","email":"PowerUser@PowerUser.com","login":"PowerUser","password":"C0gnizant@1"}' http://$hostIP:3000/api/admin/users
sleep 10
echo "GRAFANA URL :"$hostIP:3000

#TOMCAT
cd /opt && wget $insightsUI
unzip InSightsUI3.zip && rm -rf InSightsUI3.zip
sleep 20
wget $insightsWar
wget $tomcatURL
tar -zxvf apache-tomcat-8.5.27.tar.gz && rm -rf apache-tomcat-8.5.27.tar.gz
cd apache-tomcat-8.5.27 && chmod -R 755 /opt/apache-tomcat-8.5.27
cp -r /opt/app /opt/apache-tomcat-8.5.27/webapps/ && rm -rf /opt/app
sed -i -e "s/.*serviceHost.*/    \"serviceHost\": \"$ServiceEndpoint\",/g" /opt/apache-tomcat-8.5.27/webapps/app/config/uiConfig.json
sed -i -e "s/.*grafanaHost.*/    \"grafanaHost\": \"$ServiceEndpoint\"/g" /opt/apache-tomcat-8.5.27/webapps/app/config/uiConfig.json
cp /opt/PlatformService.war /opt/apache-tomcat-8.5.27/webapps/
rm -rf /opt/PlatformService.war
/opt/apache-tomcat-8.5.27/bin/startup.sh &

#Platform Engine
mkdir -p /opt/insightsengine/
cd /opt/insightsengine/ && wget $insightsEngineJar
chmod -R 755 /opt/insightsengine/
java  -Xmx1024M -Xms500M  -jar /opt/insightsengine/PlatformEngine.jar
# Apache server 
yum install httpd
cd /etc/httpd/conf
rm -f httpd.conf
wget https://platform.cogdevops.com/insights_install/installationScripts/latest/RHEL/httpd/httpd.conf
cd /etc/httpd/conf.d
rm -f httpd-vhosts.conf
wget https://platform.cogdevops.com/insights_install/installationScripts/latest/RHEL/httpd/httpd-vhosts.conf
systemctl start httpd
firewall-cmd --zone=public --permanent --add-service=http
firewall-cmd --zone=public --permanent --add-service=https
firewall-cmd --reload
/usr/sbin/setsebool -P httpd_can_network_connect 1
systemctl restart httpd

# now we bring the primary process back into the foreground
# and leave it there
fg %1
