FROM node:latest

ADD ./site /srv
WORKDIR /srv
RUN npm install
RUN ls -la

# -p 3000:3000

ENTRYPOINT ["nodejs", "bin/www"]
