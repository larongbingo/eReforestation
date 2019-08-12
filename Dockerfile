# This builds an image for the server/API of the project
# REQUIRES TO DEFINE THE MAIL_SMTP, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD env vars

FROM node:lts

WORKDIR /usr/src/app

COPY ./src .

RUN cd server && npm install
RUN cd server && npm run build

EXPOSE 8080
CMD cd server && npm start
