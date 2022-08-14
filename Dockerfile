FROM node:16-alpine as ts-compiler

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build
# If you are building your code for production
#RUN npm ci --only=production

CMD [ "npm", "run", "start" ]

# Add Github Labels
LABEL org.opencontainers.image.source https://github.com/Nightwire/docker-names