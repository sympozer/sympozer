var wsConfig = {
api : {
urls: {
get_organizations      : "http://localhost/sympozer/backend/web/app_dev.php/organizations",
get_persons            : "http://localhost/sympozer/backend/web/app_dev.php/persons",
get_events             : "http://localhost/sympozer/backend/web/app_dev.php/events",
get_categories         : "http://localhost/sympozer/backend/web/app_dev.php/categories",
get_mainEvents         : "http://localhost/sympozer/backend/web/app_dev.php/mainEvents",
get_teammates          : "http://localhost/sympozer/backend/web/app_dev.php/teammates",
get_locations          : "http://localhost/sympozer/backend/web/app_dev.php/locations",
get_equipments         : "http://localhost/sympozer/backend/web/app_dev.php/equipments",
get_roles              : "http://localhost/sympozer/backend/web/app_dev.php/roles",
get_roleLabels         : "http://localhost/sympozer/backend/web/app_dev.php/roleLabels",
get_papers             : "http://localhost/sympozer/backend/web/app_dev.php/papers",
get_topics             : "http://localhost/sympozer/backend/web/app_dev.php/topics",

get_import_header      : "http://localhost/sympozer/backend/web/app_dev.php/import",

login                  : "http://localhost/sympozer/backend/web/app_dev.php/login/login_check?_format=json",
logout                 : "http://localhost/sympozer/backend/web/app_dev.php/logout",
registration           : "http://localhost/sympozer/backend/web/app_dev.php/signup",
confirm                : "http://localhost/sympozer/backend/web/app_dev.php/user/confirm",
changepwd              : "http://localhost/sympozer/backend/web/app_dev.php/user/change_pwd",
reset_pwd_request      : "http://localhost/sympozer/backend/web/app_dev.php/reset_pwd_request",
reset_pwd              : "http://localhost/sympozer/backend/web/app_dev.php/reset_pwd",


socialnetworks         : [
  {
  name        : "google",
  urls        : {
  login: "http://localhost/sympozer/backend/web/app_dev.php/connect/google",
  enrich: "http://localhost/sympozer/backend/web/app_dev.php/enrich/google"
  },
  can_register: true  }
,  {
  name        : "twitter",
  urls        : {
  login: "http://localhost/sympozer/backend/web/app_dev.php/connect/twitter",
  enrich: "http://localhost/sympozer/backend/web/app_dev.php/enrich/twitter"
  },
  can_register: false  }
,  {
  name        : "facebook",
  urls        : {
  login: "http://localhost/sympozer/backend/web/app_dev.php/connect/facebook",
  enrich: "http://localhost/sympozer/backend/web/app_dev.php/enrich/facebook"
  },
  can_register: true  }
,  {
  name        : "linkedin",
  urls        : {
  login: "http://localhost/sympozer/backend/web/app_dev.php/connect/linkedin",
  enrich: "http://localhost/sympozer/backend/web/app_dev.php/enrich/linkedin"
  },
  can_register: true  }
]
}
}
};