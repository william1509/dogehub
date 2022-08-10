docker build -t dogehub_client:dev .

docker run -it --rm -v ${PWD}:/client -v /client/node_modules -p 3000:3000 dogehub_client:dev

docker-compose up --build

docker run -d --rm 81bdb01bb16b sleep 3600