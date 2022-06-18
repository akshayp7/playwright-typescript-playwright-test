FROM mcr.microsoft.com/playwright:v1.22.0-focal

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npx playwright install chrome

CMD ["npx","cross-env","ENV=qa","npm","run","test:serial"]