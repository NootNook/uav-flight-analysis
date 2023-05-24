FROM node:18
RUN mkdir -p /frontend
WORKDIR /frontend
COPY ./ .

RUN npm install -g pnpm
RUN pnpm install

EXPOSE 8000

CMD [ "pnpm", "run", "dev" ]