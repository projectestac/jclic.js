#!/bin/bash
# 
# Minimizes an svg file removing comments and spaces, converts it to a base64 string,
# quotes and concats each string fragment to produce a valid JavaScript expression
#
# Command 'xmlpretty' is in package libxml-handler-yawriter-perl
#
echo "'data:image/svg+xml;base64,' +"
xmlpretty --NoWhiteSpace --NoComments $1 | base64 | sed -e "s/\(.*\)/    '\1' +/g"
echo "'';"

