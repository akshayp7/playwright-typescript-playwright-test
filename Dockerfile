FROM mcr.microsoft.com/playwright:next

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npx playwright install chrome

CMD ["npm","run","test:serial"]




