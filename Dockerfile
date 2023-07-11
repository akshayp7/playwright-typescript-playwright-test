FROM mcr.microsoft.com/playwright:v1.35.0-jammy

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

#Install chrome on Docker container
RUN npx playwright install chrome

COPY . .

#Adding a non root User named "turing"
RUN useradd -m turing

#Giving Read/Write Access to non-root user to main project folder  "/app"
RUN chown -R turing /app

#Switching from root user to non-root user(turing)
USER turing

CMD npm run test:serial --ENV="qa"