# PHP + Apache imajı
FROM php:8.2-apache

# MySQL extension kurulumu
RUN docker-php-ext-install mysqli

# Apache'nin web root klasörünü doğru izinle ayarla
RUN chown -R www-data:www-data /var/www/html

# Dosyaları container içine kopyala (rebuild için)
COPY ./web /var/www/html/

# 80 portunu expose et
EXPOSE 80