FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json .

RUN npm install

# Get vulnerability reports
# RUN npm audit

# Bundle app source
COPY . .
RUN rm -fr ./drawBoard \
  && sed -i 's#http://localhost:3500#https://tie-lukioplus.rd.tuni.fi/drawboard#' src/components/ArtBoards/Frame.tsx \
  && npm run build

EXPOSE 3000
CMD [ "npm", "start" ]
