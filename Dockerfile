FROM dunglas/frankenphp

RUN install-php-extensions \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    opcache

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader

COPY --from=node:20 /usr/local/bin/node /usr/local/bin/node
COPY --from=node:20 /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node:20 /usr/local/bin/npm /usr/local/bin/npm

RUN npm install && npm run build

RUN cp .env.example .env

EXPOSE 8080

CMD ["sh", "-c", "php artisan migrate --force && php artisan storage:link && php artisan optimize && frankenphp run --config /etc/caddy/Caddyfile"]