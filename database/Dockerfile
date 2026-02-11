# Create a database container

# Use official MySQL image based on Debian Bookworm
FROM mysql:lts

# Expose MySQL default port
EXPOSE 3306

# Declare the default volume for persistent database data
VOLUME ["/var/lib/mysql"]

# When a container is started for the first time, 
# it will execute files with extensions .sh, .sql etc.
# that are found in /docker-entrypoint-initdb.d
RUN mkdir -p /docker-entrypoint-initdb.d

COPY ./sql_scripts/*.sql /docker-entrypoint-initdb.d

# Copy our custom entrypoint
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
# We need an entrypoint because using RUN to replace environment
# variables does not work since RUN is build time and not run time.
