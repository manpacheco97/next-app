FROM node:18-alpine

RUN apk add --no-cache bash netcat-openbsd
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY wait-for-db.sh .
RUN chmod +x wait-for-db.sh

EXPOSE 3000

CMD ["npm", "run", "dev"]
