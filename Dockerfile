# From: https://logfetch.com/docker-typescript-production/
# Step 1: Build Typescript
FROM node:16-alpine as ts-compiler
WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Step 2: Copy compiled artifacts and run npm
FROM node:16-alpine as ts-remover
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/build ./
RUN npm install --only=production

# Start
CMD [ "npm", "run", "start" ]

# Add Github Labels
LABEL org.opencontainers.image.source https://github.com/Nightwire/docker-names