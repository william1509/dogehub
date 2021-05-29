FROM node:14

COPY server/ /root/server/

EXPOSE 3000

WORKDIR /root/server

RUN npm install

RUN npm run build

CMD [ "npm", "start" ]
