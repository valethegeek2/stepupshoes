#!/bin/bash
set -e

# Replace placeholders in 01_init.sql with actual env vars
sed -i -e "s|\${MYSQL_USER}|$MYSQL_USER|g" \
       -e "s|\${MYSQL_PASSWORD}|$MYSQL_PASSWORD|g" \
       /docker-entrypoint-initdb.d/01_init.sql

# Call the original MySQL entrypoint
exec docker-entrypoint.sh mysqld
