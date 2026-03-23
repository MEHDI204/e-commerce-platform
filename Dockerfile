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

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN npm install && npm run build

RUN cp .env.example .env

EXPOSE 8080

CMD ["sh", "-c", "php artisan migrate --force && php artisan storage:link && php artisan optimize && frankenphp run --config /etc/caddy/Caddyfile"]