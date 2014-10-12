Sympozer
=============

Sympozer is an Angular/Symfony web application allowing event organizers to manage efficiently their communication with collaborators and attendees.


----------------
##Requirements

	- Apache Server, php (Wamp,Mamp...).
	- Git : http://git-scm.com/.
	- Composer :  http://getcomposer.org/download/	(Download file for Windows : http://getcomposer.org/Composer-Setup.exe) .
	- Symfony 2.

----------------

## Installation guide
----------------
##Clone Repository


	cd <path to the www folder of your Apache Server>
	git clone https://github.com/BenoitDdlp/Sympozer-event-manager-app.git sympozer
	cd sympozer
	
##create app/config/parameters.yml
Next, create a parameters.yml file with this text :

<code>

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
        mailer_host:       127.0.0.1
        mailer_host:       smtp.gmail.com
        mailer_user:       john.doe@gmail.com
        mailer_password:   password
</code>	



For  "database_user" put your mysql user name, and "database_password" , and use your mysql password.
After that, save and add this file to : app/config
	

#quick initialize

    ./reset.sh
    ./cache.sh

#step-by-step initialize

----------------
##initialize db, generate assets
Now to create the database and install the assets.
	
		php app/console doctrine:database:create
		php app/console doctrine:schema:update --force
		php app/console assets:install web


----------------
##create an admin
Create your user using the Git xterm :

        php app/console sympozer:admin:create admin admin@admin.fr admin
    
----------------
Finally populate database with basic conference informations :

    	php app/console wwwconf:database:init
	
    
----------------		
In one copy-paste :

		php app/console doctrine:database:create
		php app/console doctrine:schema:update --force
		php app/console assets:install web
    	php app/console fos:user:create admin admin@example.com admin
    	php app/console fos:user:promote admin ROLE_ADMIN
    	php app/console wwwconf:database:init
    
----------------		
Start your Apache server and go to :


    - localhost/sympozer/web/app_dev.php/
	
One of the most common issue is that folders app/cache and app/logs don't have write access by Symfony. To fix this, do a chmod or [refer here](http://symfony.com/doc/current/book/installation.html#configuration-and-setup) for more informations. or run the "cache" script ( ./cache ) 