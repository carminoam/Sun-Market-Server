# alpine + node
FROM node:18-alpine3.15

#Workign directory
WORKDIR /app

#Copy the app to the working directory
COPY package*.json .

#Run a command line inside the image during image building:
RUN npm install

#Copy all source code:
COPY . /app

#Environment variables
ENV PORT=3001 \
    ENVIRONMENT=Development \
    PROGRAMMER=Moishe

# Run a command line when image starts
CMD ["npm", "start"]    