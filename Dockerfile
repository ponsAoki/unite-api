FROM node:19 AS builder
ENV NODE_ENV=development
ENV DISABLE_ERD=true
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npm run generate

COPY . .

RUN npm run build

FROM node:19-slim
ENV NODE_ENV=production
ENV DISABLE_ERD=true
RUN apt-get -qy update

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]