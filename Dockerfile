FROM oven/bun:1.1.34

WORKDIR /app

COPY package.json .


RUN bun install

# we cant not use COPY . . because it will copy all files and bun.lockb is frozened by --production tag
COPY src src

COPY tsconfig.json .

EXPOSE 8080

ENV NODE_ENV production
CMD ["bun", "run", "start"]
