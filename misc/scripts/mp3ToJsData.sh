#!/bin/bash
# 
# Takes a mp3 file and converts it to a base64 string. Each output line is
# quoted and concatenated to produce a valid JavaScript expression
#
echo "'data:audio/mpeg3;base64,' +"
base64 $1 | sed -e "s/\(.*\)/    '\1' +/g"
echo "'';"

