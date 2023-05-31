FROM node:14.17.4-stretch
# Create app directory
WORKDIR /Twiddit_interface

# Install app dependencies
COPY package.json /Twiddit_interface/
RUN npm install

# Bundle app source
COPY . /Twiddit_interface/

EXPOSE 9000

CMD ["npm", "run", "start"]
