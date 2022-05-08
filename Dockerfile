FROM mcr.microsoft.com/playwright:next

#Create a new Folder to provide permissions for non root user
RUN mkdir -p /newfolder

WORKDIR /newfolder

#Switched to root user to install dependencies
USER root 

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npx playwright install chrome

#Creating a User(Turing) with non Root Permissions 
RUN useradd -u 8877 Turing

#Permission inside newfolder so that reports can be generated
RUN chown Turing /newfolder

#Switch from root user to non root user
USER Turing

CMD ["npx","cross-env","ENV=qa","npm","run","test:serial"]