FROM node:alpine

WORKDIR /app

EXPOSE 4444

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]

