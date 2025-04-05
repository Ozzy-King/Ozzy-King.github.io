# Use the official NGINX image from the Docker Hub
FROM nginx:latest

# Copy your app's files into the default NGINX html directory
COPY . /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start NGINX in the foreground (this is done by default in the official image)
CMD ["nginx", "-g", "daemon off;"]
