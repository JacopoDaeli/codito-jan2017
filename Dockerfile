FROM node:7
EXPOSE 8080
COPY . /codito
WORKDIR /codito
CMD ["node", "src/server.js"]
