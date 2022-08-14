FROM node:16-alpine 
WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build
# Start
CMD [ "npm", "run", "start" ]

# Add Github Labels
LABEL org.opencontainers.image.source https://github.com/Nightwire/docker-names