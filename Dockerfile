FROM php:8.2-apache

# MySQL extension kurulumu
RUN docker-php-ext-install mysqli

COPY . /var/www/html/

EXPOSE 80