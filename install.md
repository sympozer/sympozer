Sympozer
=============

Sympozer is an Angular/Symfony web application allowing event organizers to manage efficiently their communication with collaborators and attendees.

###Requirements

	Apache Server, php, database (mysql postgres).
	Git : http://git-scm.com/.
	Composer :  http://getcomposer.org/download/.
	Grunt

#Installation guide
	
####Clone Repository

	cd <path to the www folder of your Apache Server>
	git clone https://github.com/BenoitDdlp/Sympozer-event-manager-app.git sympozer
	cd sympozer
	
####Download vendors

    sudo mkdir vendors
    sudo chmod 777 vendors/
	composer update

####Create app/config/parameters.yml
Next, create a parameters.yml file with this text :

    parameters:
        database_driver:   pdo_mysql
        database_host:     localhost
        database_port:     ~
        database_name:     wwwConference
        database_user:     root
        database_password: ""
        
        mailer_transport:  smtp
        mailer_encryption: ssl
        mailer_auth_mode:  login
        mailer_host:       smtp.gmail.com
        mailer_user:       john.doe@gmail.com
        mailer_username:   John Doe
        mailer_password:   password

        #used to generate frontend mail url
        front_end_path:    http://localhost/sympozer/sympozer-front/app/

For  "database_user" put your mysql user name, and "database_password" , and use your mysql password.
After that, save and add this file to : app/config

##Step 1 : Quick initialize (linux)

    cd backend
    php ./vendor/sensio/distribution-bundle/Sensio/Bundle/DistributionBundle/Resources/bin/build_bootstrap.php
    ./reset.sh
    ./cache.sh
    php app/console server:run -v &

###Step 1 : Step-by-step initialize
####Initialize db, generate assets

    cd backend
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