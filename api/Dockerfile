FROM node:10-alpine

COPY server.ts /server.ts

RUN npm install -g redis@4.0.1

CMD [ "node", "/server.ts" ]
