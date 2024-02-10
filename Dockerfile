FROM --platform=linux/amd64 node:20.10.0-alpine AS build
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build

FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/analyzer-app/browser /usr/share/nginx/html
EXPOSE 4200
