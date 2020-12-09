FROM node:lts-alpine

COPY *.js ./botFile/
COPY *.json ./botFile/
WORKDIR /botFile/
RUN npm install
RUN apk update
RUN apk add ffmpeg

CMD [ "node", "index.js" ]