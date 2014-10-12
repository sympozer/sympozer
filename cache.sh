chmod -R 777 app/cache
rm -R app/cache/* app/logs/*
mkdir app/cache/dev
mkdir app/cache/prod
mkdir app/logs
php app/console cache:clear
chmod -R 777 app/cache
chmod -R 777 app/logs 
app/console doctrine:cache:clear-metadata 
app/console doctrine:cache:clear-query 
app/console doctrine:cache:clear-result 
chmod -R 777 app/cache
chmod -R 777 app/logs
