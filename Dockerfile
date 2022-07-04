FROM mcr.microsoft.com/playwright:v1.22.0-focal

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

#Adding a non root User named "turing"
RUN useradd -m turing

#Giving Read/Write Access to non-root user to main project folder  "/app"
RUN chown -R turing /app

#Switching from root user to non-root user(turing)
USER turing

CMD ["npx","cross-env","ENV=qa","npm","run","test:serial"]