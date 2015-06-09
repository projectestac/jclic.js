#!/bin/bash
# 
# Takes a gif file and converts it to a base64 string. Each output line is
# quoted and concatenated to produce a valid JavaScript expression
#
echo "'data:image/gif;base64,' +"
base64 $1 | sed -e "s/\(.*\)/    '\1' +/g"
echo "'';"

