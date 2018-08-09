#!/bin/bash
myextip=$(wget -qO- icanhazip.com)
echo $myextip
TEST="curl -X POST -u admin:admin --header \"Authorization: Basic token\" http://${myextip}:8080/PlatformService/user/authenticate"
#echo $TEST

RESPONSE=`$TEST`
echo "Testing"
echo $RESPONSE


if [[ $RESPONSE = *"\"status\":\"SUCCESS\""* ]]; then
  echo "Login is working with $TEST" > login.log
else
  echo "Login is not working TEST" > login.log
fi
