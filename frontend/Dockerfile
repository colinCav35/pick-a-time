FROM node:10-alpine

COPY server.js /server.js

RUN npm install -g redis@4.0.1

CMD [ "node", "/server.js" ]