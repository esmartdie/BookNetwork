FROM node:20 AS build-stage

WORKDIR /app

COPY ../../book-network-front/package*.json ./

RUN npm install

COPY ../../book-network-front/ .

RUN npm run build --prod

FROM nginx:alpine

COPY ../../book-network-front/nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist/book-network-front/browser /usr/share/nginx/html

RUN mv /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html

EXPOSE 80
