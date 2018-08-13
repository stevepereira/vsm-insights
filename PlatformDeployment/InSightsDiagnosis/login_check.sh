#!/bin/bash


myextip=$(wget -qO- icanhazip.com)
echo "PlatformService STATUS CHECK" >> login.log
echo "TimeStamp : " $(date '+%F %T')""   >> login.log
echo "IP: ${myextip}, PORT : 8080, User: admin, Password: admin" >> login.log

curl_command="curl -X POST -u admin:admin --header \"Authorization: Basic YWRtaW46YWRtaW4=\" http://${myextip}:8080/PlatformService/user/authenticate"
RESPONSE=`$curl_command`

if [[ $RESPONSE = *"\"status\":\"SUCCESS\""* ]]; then
  echo "        Login is working with $curl_command" >> login.log
else
  echo "        Login is not working $RESPONSE" >> login.log
fi
