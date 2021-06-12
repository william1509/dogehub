FROM node:14 AS dogehub-server

COPY server/ /root/server/

EXPOSE 3000

WORKDIR /root/server

RUN npm install

RUN npm run build

CMD [ "npm", "start-prod" ]

FROM node:14 AS dogehub-client

COPY client/ /root/client/

EXPOSE 4200

WORKDIR /root/client

RUN npm install

CMD [ "npm", "start" ]
