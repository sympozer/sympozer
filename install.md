Sympozer - the best event experience, before, during and after
=============

Sympozer is an Angularjs/Symfony web application allowing event organizers and attendees to finally reach their perfect event experience.
Through its rich and powerful interface, Sympozer provides a wide set of facilitating and networking tools for attendees to keep tracking the schedule, receive notifications, and of course, meet new contacts.
The organization is now easier than ever with our specialized tools following at every step of your work.

###Requirements

	Server     : nodejs server + http server + php application server (Apache Server or Nginx with php fpm)
	Middleware : PHP > 5.4
	Database   : mysql / postgres.
	Git        : http://git-scm.com/.
	Composer   : http://getcomposer.org/download/.
	Grunt      : http://gruntjs.com/

#Installation guide
	
####Clone Repository

	cd <path to the www folder of your Apache Server>
	git clone https://github.com/BenoitDdlp/Sympozer-event-manager-app.git sympozer
	cd sympozer
	
####Download vendors

    cd backend
    sudo mkdir vendors
    sudo chmod 777 vendors/
	composer update

####Create app/config/parameters.yml from the .TEMPLATE file
Next, configure a parameters.yml file with your local properties :

    sudo cp app/config/parameters.yml.TEMPLATE app/config/parameters.yml
    sudo nano app/config/parameters.yml

For  "database_user" put your mysql user name, and "database_password" , and use your mysql password.
After that, save and add this file to : app/config

##Step 1 : Quick initialize (linux)

    php ./vendor/sensio/distribution-bundle/Sensio/Bundle/DistributionBundle/Resources/bin/build_bootstrap.php
    ./reset.sh
    ./cache.sh
    php app/console server:run -v &

###Step 1 : Step-by-step initialize
####Initialize db, generate assets

    php app/console doctrine:database:create
    php app/console doctrine:schema:update --force
    php app/console assets:install web

####Create an admin

    php app/console sympozer:admin:create admin admin@admin.fr admin


####Populate database

    php app/console wwwconf:database:init

####Generate bootstrap.php.cache

    php ./vendor/sensio/distribution-bundle/Sensio/Bundle/DistributionBundle/Resources/bin/build_bootstrap.php

####Run the backend in background

    php app/console server:run -v &

##Step 2 : FrontEnd

    cd ..
    npm install

####Setup your absolute url to app_dev.php

    sudo cp local-config.json.TEMPLATE local-config.json
    sudo nano local-config.json
    
####Bower and grunt
    cd frontend
    mkdir app
    chmod -R 777 app
    bower install

####build frontend

    sudo grunt
    


Start your Apache server and go to :

    localhost/sympozer/web/app_dev.php/

One of the most common issue is that folders app/cache and app/logs don't have write access by Symfony. To fix this, [refer here](http://symfony.com/doc/current/book/installation.html#configuration-and-setup),
or run the "chcache.sh" script (linux chmod)

    ./chcache.sh