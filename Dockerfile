FROM node:alpine
WORKDIR /app/

# copy data to container
COPY ./*.json /app/
COPY ./build/ /app/build/
# Install all Packages
RUN npm install

# Start
CMD [ "npm", "run", "start" ]
