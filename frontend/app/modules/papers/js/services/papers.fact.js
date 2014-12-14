/**
 * Papers Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('papersApp').factory('papersFact',
    ['$resource', '$cachedResource', '$routeParams', function ($resource, $cachedResource, $routeParams)
    {
        var resource = $resource(
            globalConfig.api.urls.get_papers,
            {},
            {
                get            : {method: 'GET', url: globalConfig.api.urls.get_papers + '/:id', params: {'id': '@id', cache: true}, isArray: false},
                create         : {method: 'POST', params: {}, isArray: false},
                update         : {method: 'PUT', url: globalConfig.api.urls.get_papers + '/:id', params: {id: '@id'}, isArray: false},
                patch          : {method: 'PATCH', url: globalConfig.api.urls.get_papers + '/:id', params: {id: '@id'}},
                delete         : {method: 'DELETE', url: globalConfig.api.urls.get_papers + '/:id', params: {id: '@id'}, isArray: false},
                all            : {method: 'GET', params: {}, isArray: false},
                allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/papers', params: {'mainEventId': '@mainEventId'}, isArray: false}

            }
        );
//        authors: [{id: 1, label: "admin@admin.fr ", email: "admin@admin.fr", firstName: "admin@admin.fr"}]
//        id: 3
//        label: "fe"dd"
//        mainEvent: {id: 2, startAt: "2014-12-12T00:00:00+0100", endAt: "2015-01-10T00:00:00+0100",…}

        //Construct a DTO object to send to server (Data Transfert Object)
        resource.serialize = function (object)
        {
            //Serialize DTO object to be sent
            var DTObject = {
                'id'         : object.id,
                'label'      : object.label,
                'mainEvent'  : object.mainEvent ? {id: object.mainEvent.id} : undefined,
                'abstract'   : object.abstract,
                'publisher'  : object.publisher,
                'publishDate': object.publishDate,
                'url'        : object.url,
                'authors'    : []
            };
            for (var i = 0; i < object.authors.length; i++)
            {
                DTObject.authors.push({id: object.authors[i].id});
            }

            //create the new resource object from DTObject
            return new resource(DTObject);
        };
        return resource;
    }]);

//fez = {
//0: "#0 /var/www/sympozer/backend/vendor/symfony/symfony/src/Symfony/Component/Form/ResolvedFormType.php(140): fibe\CommunityBundle\Form\PersonType->buildForm(Object(Symfony\Component\Form\FormBuilder), Array)"
//1: "#1 /var/www/sympozer/backend/vendor/symfony/symfony/src/Symfony/Component/Form/Extension/DataCollector/Proxy/ResolvedTypeDataCollectorProxy.php(103): Symfony\Component\Form\ResolvedFormType->buildForm(Object(Symfony\Component\Form\FormBuilder), Array)"
//2: "#2 /var/www/sympozer/backend/vendor/symfony/symfony/src/Symfony/Component/Form/FormFactory.php(91): Symfony\Component\Form\Extension\DataCollector\Proxy\ResolvedTypeDataCollectorProxy->buildForm(Object(Symfony\Component\Form\FormBuilder), Array)"
//3: "#3 /var/www/sympozer/backend/vendor/symfony/symfony/src/Symfony/Component/Form/FormBuilder.php(106): Symfony\Component\Form\FormFactory->createNamedBuilder('__name__', Object(fibe\CommunityBundle\Form\PersonType), NULL, Array)"
//4: "#4 /var/www/sympozer/backend/vendor/symfony/symfony/src/Symfony/Component/Form/Extension/Core/Type/CollectionType.php(32): Symfony\Component\Form\FormBuilder->create('__name__', Object(fibe\CommunityBundle\Form\PersonType), Array)"
//5: "#5 /var/www/sympozer/backend/vendor/symfony/symfony/src/Symfony/Component/Form/ResolvedFormType.php(140): Symfony\Component\Form\Extension\Core\Type\CollectionType->buildForm(Object(Symfony\Component\Form\FormBuilder), Array)"
//6: "#6 /var/www/sympozer/backend/vendor/symfony/symfony/src/Symfony/Component/Form/Extension/DataCollector/Proxy/ResolvedTypeDataCollectorProxy.php(103): Symfony\Component\Form\ResolvedFormType->buildForm(Object(Symfony\Component\Form\FormBuilder), Array)"
//7: "#7 /var/www/sympozer/backend/vendor/symfony/symfony/src/Symfony/Component/Form/ResolvedFormType.php(137): Symfony\Component\Form\Extension\DataCollector\Proxy\ResolvedTypeDataCollectorProxy->buildForm(Object(Symfony\Component\Form\FormBuilder), Array)"
//8: "#8 /var/www/sympozer/backend/vendor/symfony/symfony/src/Symfony/Component/Form/Extension/DataCollector/Proxy/ResolvedTypeDataCollectorProxy.php(103): Symfony\Component\Form\ResolvedFormType->buildForm(Object(Symfony\Component\Form\FormBuilder), Array)"
//9: "#9 /var/www/sympozer/backend/vendor/symfony/symfony/src/Symfony/Component/Form/FormFactory.php(91): Symfony\Component\Form\Extension\DataCollector\Proxy\ResolvedTypeDataCollectorProxy->buildForm(Object(Symfony\Component\Form\FormBuilder), Array)"
//10: "#10 /var/www/sympozer/backend/vendor/symfony/symfony/src/Symfony/Component/Form/FormBuilder.php(106): Symfony\Component\Form\FormFactory->createNamedBuilder('authors', 'sympozer_collec...', NULL, Array)"
//11: "#11 /var/www/sympozer/backend/vendor/symfony/symfony/src/Symfony/Component/Form/FormBuilder.php(268): Symfony\Component\Form\FormBuilder->create('authors', 'sympozer_collec...', Array)"
//12: "#12 /var/www/sympozer/backend/vendor/symfony/symfony/src/Symfony/Component/Form/FormBuilder.php(216): Symfony\Component\Form\FormBuilder->resolveChildren()"
//13: "#13 /var/www/sympozer/backend/vendor/symfony/symfony/src/Symfony/Component/Form/FormFactory.php(39): Symfony\Component\Form\FormBuilder->getForm()"
//14: "#14 /var/www/sympozer/backend/src/fibe/RestBundle/Handler/CrudHandler.php(86): Symfony\Component\Form\FormFactory->create(Object(fibe\ContentBundle\Form\PaperType), Object(fibe\ContentBundle\Entity\Paper), Array)"
//15: "#15 /var/www/sympozer/backend/src/fibe/ContentBundle/Controller/PaperRESTController.php(112): fibe\RestBundle\Handler\CrudHandler->processForm(Object(Symfony\Component\HttpFoundation\Request), 'fibe\ContentBun...', 'fibe\ContentBun...', 'PUT', '3')"
//16: "#16 [internal function]: fibe\ContentBundle\Controller\PaperRESTController->putPaperAction(Object(Symfony\Component\HttpFoundation\Request), '3')"
//17: "#17 /var/www/sympozer/backend/app/bootstrap.php.cache(3008): call_user_func_array(Array, Array)"
//18: "#18 /var/www/sympozer/backend/app/bootstrap.php.cache(2970): Symfony\Component\HttpKernel\HttpKernel->handleRaw(Object(Symfony\Component\HttpFoundation\Request), 1)"
//19: "#19 /var/www/sympozer/backend/app/bootstrap.php.cache(3119): Symfony\Component\HttpKernel\HttpKernel->handle(Object(Symfony\Component\HttpFoundation\Request), 1, true)"
//20: "#20 /var/www/sympozer/backend/app/bootstrap.php.cache(2364): Symfony\Component\HttpKernel\DependencyInjection\ContainerAwareHttpKernel->handle(Object(Symfony\Component\HttpFoundation\Request), 1, true)"
//21: "#21 /var/www/sympozer/backend/web/app_dev.php(36): Symfony\Component\HttpKernel\Kernel->handle(Object(Symfony\Component\HttpFoundation\Request))"
//22: "#22 {main}"}