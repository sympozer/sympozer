php app/console doctrine:database:drop --force
php app/console doctrine:database:create
php app/console doctrine:schema:update --force
php app/console sympozer:database:init
php app/console sympozer:admin:create admin admin@admin.fr admin
php app/console sympozer:admin:create admin2 admin2@admin.fr admin2
php app/console sympozer:admin:create admin3 admin3@admin.fr admin3
php app/console cache:clear
./chcache.sh