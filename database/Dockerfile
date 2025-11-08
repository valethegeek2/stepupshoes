# Create a database container

# Use official MySQL image based on Debian Bookworm
FROM mysql:lts

# Expose MySQL default port
EXPOSE 3306

# Declare the default volume for persistent database data
VOLUME ["/var/lib/mysql"]

# Default command to run MySQL server
CMD ["mysqld"]
