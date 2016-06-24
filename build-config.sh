#!/bin/bash

sed -i s/SHOUT_PASSWD/$SHOUT_PASSWD/g users/*.json
sed -i s/IRC_PASSWD/$IRC_PASSWD/g     users/*.json

unset SHOUT_PASSWD
unset IRC_PASSWD
