# FROM phpdockerio/php72-fpm:latest
FROM phpdockerio/php74-fpm:latest
WORKDIR "/application"

# RUN apt-get update; \
#     apt-get -y --no-install-recommends install \
#     php7.2-gd \ 
#     php7.2-intl \ 
#     php7.2-mysql \ 
#     php7.2-redis \ 
#     php7.2-ssh2 \ 
#     php7.2-xsl; \
#     apt-get clean; \
#     rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

RUN \
    sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list \
    && sed -i s@/security.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list \
    && apt-get update \
    && apt-get -y --no-install-recommends install  php7.4-mysql php7.4-redis php7.4-gd php7.4-xsl php7.4-ssh2 php7.4-intl \
    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/* \
    && composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/