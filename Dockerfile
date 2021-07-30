# FROM node:14.13-alpine As development

# WORKDIR /app

# COPY package*.json ./

# RUN npm install --only=development

# COPY . .

# CMD ["node", "dist/main"]

FROM node:14.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]