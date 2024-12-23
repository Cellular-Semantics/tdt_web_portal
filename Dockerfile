FROM node:20 AS base
WORKDIR /app
RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .
RUN pnpm build

FROM node:20-alpine3.19 as release
WORKDIR /app
RUN npm i -g pnpm

COPY --from=base /app/public ./public

# COPY --from=base /app/node_modules ./node_modules
# COPY --from=base /app/package.json ./package.json
# COPY --from=base /app/.next ./.next

COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static


EXPOSE 3000

ENV NEXT_PUBLIC_NEXT_CONFIG_BASE_PATH=/tdt

# CMD ["pnpm", "start"]
CMD ["node", "server.js"]