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
	
##Clone Repository

	cd <path to the www folder of your Apache Server>
	git clone https://github.com/sympozer/sympozer.git sympozer
	cd sympozer
    cd backend
	
##Download vendors

    sudo mkdir vendors
    sudo chmod 777 vendors/
	composer update

##Step 1 : Create the symfony configuration file app/config/parameters.yml from the .TEMPLATE file
Next, configure a parameters.yml file with your local properties :

    sudo cp app/config/parameters.yml.TEMPLATE app/config/parameters.yml
    sudo nano app/config/parameters.yml

For  "database_user" put your mysql user name, and "database_password" , and use your mysql password.
After that, save and add this file to : app/config

##Step 2 : Prepare node and grunt

    Install node package : npm install
    Install grunt command line tool : npm install -g grunt-cli


##Step 3 : Prepare protractor web driver for e2e testing

    Update web drivers for protractors : sudo ./node_modules/protractor/bin/webdriver-manager update 
    If you have problems downloading the zip file, execute the following :
    cp control/selenium-server-standalone-2.42.2.jar node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar


##Step 4 : Setup your absolute url to app_dev.php

    sudo cp local-config.json.TEMPLATE local-config.json
    sudo nano local-config.json
    
    Open the local-config file and set up the backend access according to your domain configuration

##Step 5 : Generate links to the api according to the local config

    sudo grunt sf2-console:copy_ws_config

##Step 6 : create the database

    sudo grunt reset_db
  

##Step  7: update bower dependencies

     sudo grunt update_dependencies

##Step  8: install the theme (only if needed)

     sudo git clone https://github.com/E-Conference/sympozer-theme.git /frontend/app/assets/less/theme
 

##Step  9 : Run the backend symfony server in background

    cd backend
    php app/console server:run -v &
    
    
##Uselful cmd : 

    Reset the database : sudo grunt reset_db
    Start developpment :  sudo grunt dev
    Check prod environnement : sudo grunt build
    Launch unit test :sudo grunt test:unit
    Launch e2e tests :sudo grunt test:e2e

    Start your Apache server and go to :

    localhost/sympozer/web/app_dev.php/

One of the most common issue is that folders app/cache and app/logs don't have write access by Symfony. To fix this, [refer here](http://symfony.com/doc/current/book/installation.html#configuration-and-setup),
or run the "chcache.sh" script (linux chmod)

    ./chcache.sh