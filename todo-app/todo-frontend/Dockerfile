FROM node:24

WORKDIR /usr/src/app

COPY . .

RUN npm i

RUN npm run build

RUN npm i -g serve

CMD serve -n dist