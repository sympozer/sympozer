<?php
namespace fibe\EventBundle\Command;

use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use fibe\CommunityBundle\Entity\Person;
use fibe\ContentBundle\Entity\Equipment;
use fibe\ContentBundle\Entity\Location;
use fibe\ContentBundle\Entity\Role;
use fibe\ContentBundle\Entity\RoleLabel;
use fibe\ContentBundle\Entity\Topic;
use fibe\EventBundle\Entity\Category;
use fibe\EventBundle\Entity\Event;
use fibe\EventBundle\Entity\MainEvent;
use fibe\SecurityBundle\Entity\Team;
use fibe\SecurityBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Security\Acl\Permission\MaskBuilder;

/**
 * Initialization command for the DataBase
 *
 * Class databaseInitCommand
 * @package fibe\EventBundle\Command
 */
class databaseInitCommand extends ContainerAwareCommand
{

    protected function configure()
    {
        $this
            ->setName('sympozer:database:init')
            ->setDescription('Insert data for conference managment');
    }

    /**
     * Executes the current command.
     *
     * This method is not abstract because you can use this class
     * as a concrete class. In this case, instead of defining the
     * execute() method, you set the code to execute by passing
     * a Closure to the setCode() method.
     *
     * @param InputInterface $input An InputInterface instance
     * @param OutputInterface $output An OutputInterface instance
     *
     * @return null|integer null or 0 if everything went fine, or an error code
     *
     * @throws \LogicException When this abstract method is not implemented
     * @see    setCode()
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        /** @var \fibe\SecurityBundle\Entity\User $admin */
        $admin = $this->getContainer()->get("fos_user.user_manager")->findUserByUsername("admin");
        $aclHelper = $this->getContainer()->get('fibe_security.acl_user_permission_helper');

        $em = $this->getContainer()->get('doctrine')->getManager('default');

        //Equipments
        $equipments = [];
        $computer = new Equipment();
        $computer->setLabel("Computer")->setIcon("laptop");
        $em->persist($computer);
        $equipments['computer'] = $computer;

        $speaker = new Equipment();
        $speaker->setLabel("Speaker")
            ->setIcon("volume-up");
        $em->persist($speaker);
        $equipments['speaker'] = $speaker;

        $wifi = new Equipment();
        $wifi->setLabel("Wifi")
            ->setIcon("rss");
        $em->persist($wifi);
        $equipments['wifi'] = $wifi;

        $screen = new Equipment();
        $screen->setLabel("Screen")
            ->setIcon("film");
        $em->persist($screen);
        $equipments['screen'] = $screen;

        $ohp = new Equipment();
        $ohp->setLabel("OHP")
            ->setIcon("video-camera");
        $em->persist($ohp);
        $equipments['ohp'] = $ohp;

        $microphone = new Equipment();
        $microphone->setLabel("Microphone")
            ->setIcon("microphone");
        $em->persist($microphone);
        $equipments['microphone'] = $microphone;

        $conferenceBlend = $this->createBlendConference($em, $admin, $equipments);


        $em->flush();
        //give right to admin
        $aclHelper->performUpdateUserACL($admin, MaskBuilder::MASK_OWNER, $conferenceBlend);

        $output->writeln("conferenceBlend inserted successfully");
    }

    /**
     * @param EntityManagerInterface $em
     * @param User $owner
     * @param array $equipments
     * @return MainEvent
     */
    private function createBlendConference(EntityManagerInterface $em, User $owner, array $equipments)
    {


        /***** Conference definition *******/
        $conferenceLocation = new Location();
        $conferenceLocation->setAddress("Lyon, France");
        $conferenceLocation->setLabel("Lyon, France");
        $conferenceLocation->setCity("Lyon");
        $conferenceLocation->setCountry("France");
        $em->persist($conferenceLocation);

        $conferenceBlend = new MainEvent();
        $conferenceBlend->setDescription("BlendWebMix est la plus importante conférence web francophone. C’est un lieu idéal pour apprendre, comprendre, et se rencontrer, entre « webmakers ». BlendWebMix, c’est 2 jours pour être plus efficace les 363 autres jours de l’année !");
        $conferenceBlend->setLabel("Blend 2013");
        $conferenceBlend->setComment("La meilleur conférence francophone");
        $conferenceBlend->setLogo("http://img.clubic.com/07602795-photo-blend-web-mix.jpg");
        $conferenceBlend->setStartAt(new DateTime("2015-10-28T00:00:00+0100"));
        $conferenceBlend->setEndAt(new DateTime("2015-10-29T00:00:00+0100"));
        $conferenceBlend->setFacebook("https://www.facebook.com/blendwebmix?fref=ts");
        $conferenceBlend->setTwitter("blendwebmix");
        $conferenceBlend->setYoutube("https://www.youtube.com/channel/UCVA4ZOoyUyLB_LS6flBjhRg");
        $conferenceBlend->setUrl("http://www.blendwebmix.com/");
        $conferenceBlend->setLocation($conferenceLocation);
        $conferenceBlend->setOwner($owner->getPerson());
        $em->persist($conferenceBlend);

        $conferenceLocation->setMainEvent($conferenceBlend);
        $em->persist($conferenceLocation);

        $conferenceTeam = new Team();
        $conferenceTeam->setMainEvent($conferenceBlend);
        $em->persist($conferenceTeam);

        /***** Role labels *******/
        $intervenant = new RoleLabel();
        $intervenant->setLabel("Intervenant");
        $em->persist($intervenant);


        /***** Topics *******/
        $business = new Topic();
        $business->setLabel("Business");
        $em->persist($business);

        $design = new Topic();
        $design->setLabel("Design");
        $em->persist($design);

        $marketing = new Topic();
        $marketing->setLabel("Marketing");
        $em->persist($marketing);

        $recherche = new Topic();
        $recherche->setLabel("Recherche");
        $em->persist($recherche);

        $tech = new Topic();
        $tech->setLabel("Tech");
        $em->persist($tech);

        /***** Categories *******/
        $BreakEvent = new Category();
        $BreakEvent->setLabel("Break event");
        $em->persist($BreakEvent);

        $KeynoteEvent = new Category();
        $KeynoteEvent->setLabel("Keynote event");
        $em->persist($KeynoteEvent);

        $TrackEvent = new Category();
        $TrackEvent->setLabel("Track event");
        $em->persist($TrackEvent);

        $PanelEvent = new Category();
        $PanelEvent->setLabel("Panel Event");
        $em->persist($PanelEvent);

        $WorkshopEvent = new Category();
        $WorkshopEvent->setLabel("Workshop event");
        $em->persist($WorkshopEvent);

        $SessionEvent = new Category();
        $SessionEvent->setLabel("Session event");
        $em->persist($SessionEvent);

        $TalkEvent = new Category();
        $TalkEvent->setLabel("Talk event");
        $em->persist($TalkEvent);


        /***** Locations *******/
        $auditorium = new Location();
        $auditorium->setLabel("Auditorium");
        $auditorium->setMainEvent($conferenceBlend);
        $auditorium->setCapacity(1000);
        $auditorium->setEquipments([
            $equipments['microphone'], $equipments['ohp'], $equipments['screen'], $equipments['computer']
        ]);
        $em->persist($auditorium);

        $salonGratteCiel = new Location();
        $salonGratteCiel->setMainEvent($conferenceBlend);
        $salonGratteCiel->setLabel("Grand Salon Gratte Ciel");
        $salonGratteCiel->setCapacity(200);
        $salonGratteCiel->setEquipments([$equipments['microphone'], $equipments['screen'], $equipments['computer']]);
        $em->persist($salonGratteCiel);


        $salleTeteDor1 = new Location();
        $salleTeteDor1->setMainEvent($conferenceBlend);
        $salleTeteDor1->setLabel("Salle Tête d’Or 1");
        $salleTeteDor1->setCapacity(240);
        $salleTeteDor1->setEquipments([$equipments['microphone'], $equipments['screen'], $equipments['computer']]);
        $em->persist($salleTeteDor1);


        /***** Speakers + events *******/

        //Christophe proteneuve
        $christophe_porteneuve = new Person();
        $christophe_porteneuve->setFamilyName("Porteneuve");
        $christophe_porteneuve->setFirstName("Christophe");
        $christophe_porteneuve->setDescription("Christophe Porteneuve conçoit des pages web depuis 1995. Co-créateur du premier portail JSP en Europe, en 1999, il passe par J2EE avant de tomber dans Ruby, Rails puis Node. Auteur du best-seller « Bien développer pour le Web 2.0 » chez Eyrolles, il a également écrit la référence  « Prototype and script.aculo.us » chez Pragmatic Programmers, des articles dans divers magazines en ligne, et il est speaker pour plusieurs conférences petites et grosses.");
        $christophe_porteneuve->setTwitter("porteneuve");
        $christophe_porteneuve->setWebsite("http://tddsworld.com");
        $christophe_porteneuve->setImg("http://www.blendwebmix.com/wp-content/uploads/2013/07/christophe-porteneuve-269x200.png");
        $em->persist($christophe_porteneuve);

        $christophe_porteneuve_talk = new Event();
        $christophe_porteneuve_talk->setLabel("GIT PROTIPS : FAIRE DU GIT PLUS VITE ET MIEUX GRÂCE À CETTE SÉLECTION D’ASTUCES");
        $christophe_porteneuve_talk->setDescription("Git est devenu la gestion de sources de référence, mais la très grande majorité s’en sert (très) mal, ou à tout le moins ne fait qu’effleurer ses possibilités.
Dans cet atelier, Christophe mettra en lumière toute une série d’astuces dans les commandes Git visant à rendre votre utilisation quotidienne plus agréable et efficace.
Objectif : Gagner quotidiennement en productivité et en souplesse de travail.");
        $christophe_porteneuve_talk->setCategory($TalkEvent);
        $christophe_porteneuve_talk->setLocation($auditorium);
        $christophe_porteneuve_talk->setTopics([$tech]);
        $christophe_porteneuve_talk->setStartAt(new DateTime("2015-10-28T13:30:00+0100"));
        $christophe_porteneuve_talk->setEndAt(new DateTime("2015-10-28T14:00:00+0100"));
        $christophe_porteneuve_talk->setMainEvent($conferenceBlend);
        $em->persist($christophe_porteneuve_talk);

        $christophe_porteneuve_role = new Role();
        $christophe_porteneuve_role->setEvent($christophe_porteneuve_talk);
        $christophe_porteneuve_role->setPerson($christophe_porteneuve);
        $christophe_porteneuve_role->setRoleLabel($intervenant);
        $christophe_porteneuve_role->setMainEvent($conferenceBlend);
        $em->persist($christophe_porteneuve_role);


        //Guilhem bertholet
        $guilhem_bertholet = new Person();
        $guilhem_bertholet->setFamilyName("Bertholet");
        $guilhem_bertholet->setFirstName("Guilhem");
        $guilhem_bertholet->setDescription("Saltimbanque & Entrepreneur depuis 1981 // #ContentMarketing @invoxfr // #NoeudPap @blendwebmix & @lacuisineduweb // Happy.");
        $guilhem_bertholet->setTwitter("guilhem");
        $guilhem_bertholet->setWebsite("http://www.guilhembertholet.com/blog/");
        $guilhem_bertholet->setImg("https://pbs.twimg.com/profile_images/435793447589404672/m-7_Cier_400x400.jpeg");
        $em->persist($guilhem_bertholet);


        $guilhem_bertholet_talk = new Event();
        $guilhem_bertholet_talk->setLabel("PLENIERE D'OUVERTURE, LET'D BLEND!");
        $guilhem_bertholet_talk->setDescription("Le plein de surprises, d’intervenants mystères, et de croisement des idéesTech+Biz+Design ! Vivez le MIX !");
        $guilhem_bertholet_talk->setCategory($KeynoteEvent);
        $guilhem_bertholet_talk->setLocation($auditorium);
        $guilhem_bertholet_talk->setStartAt(new DateTime("2015-10-28T09:30:00+0100"));
        $guilhem_bertholet_talk->setEndAt(new DateTime("2015-10-28T12:30:00+0100"));
        $guilhem_bertholet_talk->setMainEvent($conferenceBlend);
        $guilhem_bertholet_talk->setLocation($auditorium);
        $em->persist($guilhem_bertholet_talk);

        $guilhem_bertholet_role = new Role();
        $guilhem_bertholet_role->setEvent($guilhem_bertholet_talk);
        $guilhem_bertholet_role->setPerson($guilhem_bertholet);
        $guilhem_bertholet_role->setRoleLabel($intervenant);
        $guilhem_bertholet_role->setMainEvent($conferenceBlend);
        $em->persist($guilhem_bertholet_role);


        //Damien mathieu
        $damien_mathieu = new Person();
        $damien_mathieu->setFamilyName("Mathieu");
        $damien_mathieu->setFirstName("Damien");
        $damien_mathieu->setDescription("Ingénieur logiciel polyglotte particulièrement intéressé par le web, je travaille chez Heroku, ou je fais du support technique et des outils interne. Particulièrement intéressé par la scalabilité et la stabilité, je m'intéresse beaucoup aux problèmes architecturaux de stabilité logicielle. Ancien Lyonnais, j'habite aujourd'hui Toulouse.");
        $damien_mathieu->setTwitter("Dstroii");
        $damien_mathieu->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/herve_mischler-269x200.jpg");
        $em->persist($damien_mathieu);


        //Herve mischler
        $herve_mischler = new Person();
        $herve_mischler->setFamilyName("Mischler");
        $herve_mischler->setFirstName("Hervé");
        $herve_mischler->setDescription("Hervé Mischler est Designer d’expérience utilisateur chez Salesforce.com le leader du cloud computing et du CRM. Après une formation de designer industriel, il débute dans le web en 1999. Passionné par le code et le design, son approche technique prend en compte les problématiques liées à l’expérience utilisateur.");
        $herve_mischler->setTwitter("dmathieu");
        $herve_mischler->setWebsite("http://dmathieu.com/");
        $herve_mischler->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/qYxmw_yS_400x400-269x200.png");
        $em->persist($herve_mischler);

        $herve_mischler_talk = new Event();
        $herve_mischler_talk->setLabel("« VOYAGE AUX FRONTIÈRES DU DESIGN » – LE FUTUR DU DESIGN POUR L’ENTREPRISE");
        $herve_mischler_talk->setDescription("Il fut un temps pas si lointain où personne n’aurait pu s’imaginer qu’une application d’entreprise puisse être conviviale et simple d’utilisation. Ces systèmes complexes on toujours été perçu comme étant extrêmement compliqué et difficile à utiliser et pourtant, dans ce monde ou créer de nouvelles applications est plus simple que jamais et où la simplicité est devenu un standard, les entreprise sont loin d’être à la traîne dans ce domaine.
Non seulement les logiciels existant sont peu à peu remplacé par  le “Cloud”, mais la place de l’utilisateur est devenu une préoccupation centrale au coeur des grandes organisations.
Les applications grand publics ont eu un impact énorme dans ce domaine et nous allons explorer dans cette présentation quel est leur lien avec le monde de l’entreprise et comment le design a un rôle essentiel dans cette mutation.");
        $herve_mischler_talk->setCategory($TalkEvent);
        $herve_mischler_talk->setTopics([$design]);
        $herve_mischler_talk->setLocation($auditorium);
        $herve_mischler_talk->setStartAt(new DateTime("2015-10-28T13:30:00+0100"));
        $herve_mischler_talk->setEndAt(new DateTime("2015-10-29T14:00:00+0100"));
        $herve_mischler_talk->setMainEvent($conferenceBlend);
        $em->persist($herve_mischler_talk);

        $herve_mischler_role = new Role();
        $herve_mischler_role->setEvent($herve_mischler_talk);
        $herve_mischler_role->setPerson($herve_mischler);
        $herve_mischler_role->setRoleLabel($intervenant);
        $herve_mischler_role->setMainEvent($conferenceBlend);
        $em->persist($herve_mischler_role);

        //Darja gartner
        $darja_gartner = new Person();
        $darja_gartner->setFamilyName("Gartner");
        $darja_gartner->setFirstName("Darja");
        $darja_gartner->setDescription("Après avoir travaillé en agence en Slovénie (son pays natal) et en freelance à Paris, Darja est maintenant Directrice Artistique de Netinfluence, une agence digitale à Lausanne. Grande sportive dans l’éternel, elle partage son temps libre entre le running, le yoga, et les différents side-projects et événements organisés avec 17slash (le studio qu’elle a fondé avec Jérémie).");
        $darja_gartner->setTwitter("gartner");
        $darja_gartner->setWebsite("http://darja.me");
        $darja_gartner->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/Darja-Gatner-269x200.jpg");
        $em->persist($darja_gartner);


        $darja_gartner_talk = new Event();
        $darja_gartner_talk->setLabel("AU PAYS DU DESIGN");
        $darja_gartner_talk->setDescription("Après avoir travaillé en agence en Slovénie (son pays natal) et en freelance à Paris, Darja est maintenant Directrice Artistique de Netinfluence, une agence digitale à Lausanne. Grande sportive dans l’éternel, elle partage son temps libre entre le running, le yoga, et les différents side-projects et événements organisés avec 17slash (le studio qu’elle a fondé avec Jérémie).");
        $darja_gartner_talk->setCategory($TalkEvent);
        $darja_gartner_talk->setTopics([$design]);
        $darja_gartner_talk->setLocation($auditorium);
        $darja_gartner_talk->setStartAt(new DateTime("2015-10-28T14:00:00+0100"));
        $darja_gartner_talk->setEndAt(new DateTime("2015-10-28T15:00:00+0100"));
        $darja_gartner_talk->setMainEvent($conferenceBlend);
        $em->persist($darja_gartner_talk);

        $darja_gartner_role = new Role();
        $darja_gartner_role->setEvent($darja_gartner_talk);
        $darja_gartner_role->setPerson($darja_gartner);
        $darja_gartner_role->setRoleLabel($intervenant);
        $darja_gartner_role->setMainEvent($conferenceBlend);
        $em->persist($darja_gartner_role);

        //Damien gosset
        $damien_gosset = new Person();
        $damien_gosset->setFamilyName("Gosset");
        $damien_gosset->setFirstName("Damien");
        $damien_gosset->setDescription("Dirigeant une société spécialisée dans le développement d'applications mobiles et les technologies Apple, il partage aujourd'hui son temps entre son équipe et les aéroports.
Passionné de nouvelles technologies et d'innovation, il intervient en temps que formateur et conférencier auprès d'écoles et d'universités en France et à l'international (Europe, Chine, Canada, USA, Brésil…).");
        $damien_gosset->setTwitter("dgosset");
        $damien_gosset->setWebsite("http://fr.linkedin.com/in/damiengosset");
        $damien_gosset->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/damien-gosset-269x200.png");
        $em->persist($damien_gosset);

        $damien_gosset_talk = new Event();
        $damien_gosset_talk->setLabel("SWIFT, OPPORTUNITÉS ET PERSPECTIVES DU DERNIER LANGAGE D’APPLE");
        $damien_gosset_talk->setDescription("Cette conférence aura pour objectif de passer en revue le dernier langage d’Apple Swift.
Au programme :
- Swift, un nouveau langage entre ambition et réalité
- Perspectives dans le paysage technologique mobile
- Playgrounds : jouons un peu avec Swift");
        $damien_gosset_talk->setCategory($TalkEvent);
        $damien_gosset_talk->setTopics([$tech]);
        $damien_gosset_talk->setLocation($auditorium);
        $damien_gosset_talk->setStartAt(new DateTime("2015-10-28T15:00:00+0100"));
        $damien_gosset_talk->setEndAt(new DateTime("2015-10-28T16:00:00+0100"));
        $damien_gosset_talk->setMainEvent($conferenceBlend);
        $em->persist($damien_gosset_talk);

        $damien_gosset_role = new Role();
        $damien_gosset_role->setEvent($damien_gosset_talk);
        $damien_gosset_role->setPerson($damien_gosset);
        $damien_gosset_role->setRoleLabel($intervenant);
        $damien_gosset_role->setMainEvent($conferenceBlend);
        $em->persist($damien_gosset_role);

        //Benjamain clay
        $benjamin_clay = new Person();
        $benjamin_clay->setFamilyName("Clay");
        $benjamin_clay->setFirstName("Benjamin");
        $benjamin_clay->setDescription("Passionné du Web depuis plus de 15 ans et diplômé de l’EISTI, Benjamin Clay travaille depuis 2008 en tant que développeur puis expert PHP / Symfony2. Early adopter de Titanium, il se concentre pleinement sur cette technologie dès la sortie de TiAlloy qu'il affectionne particulièrement pour concocter des applications mobiles cross-platforms performantes, innovantes et pailletées.");
        $benjamin_clay->setTwitter("ternel");
        $benjamin_clay->setWebsite("http://jolicode.com");
        $benjamin_clay->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/09/ternel-11-210x200.jpg");
        $em->persist($benjamin_clay);

        $benjamin_clay_role = new Role();
        $benjamin_clay_role->setPerson($benjamin_clay);
        $benjamin_clay_role->setRoleLabel($intervenant);
        $benjamin_clay_role->setMainEvent($conferenceBlend);
        $em->persist($benjamin_clay_role);

        //Mathieu parisot
        $mathieu_parisot = new Person();
        $mathieu_parisot->setFamilyName("Parisot");
        $mathieu_parisot->setFirstName("Mathieu");
        $mathieu_parisot->setDescription("Développeur Java et web passionné de nouvelles technologies et d’innovation, impliqué dans de nombreuses communautés et co-organisateur des HumanTalks à Paris. Après avoir fait du Java pendant de nombreuses années, Mathieu s’intéresse maintenant principalement aux problématiques web : HTML5, CSS3, Responsive Web Design, conception de sites web pour smartphones.");
        $mathieu_parisot->setTwitter("matparisot");
        $mathieu_parisot->setWebsite("http://blog.soat.fr");
        $mathieu_parisot->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/Mathieu-parisot-mini-175x200.jpg");
        $em->persist($mathieu_parisot);

        $mathieu_parisot_role = new Role();
        $mathieu_parisot_role->setPerson($mathieu_parisot);
        $mathieu_parisot_role->setRoleLabel($intervenant);
        $mathieu_parisot_role->setMainEvent($conferenceBlend);
        $em->persist($mathieu_parisot_role);

        //Jade le maitre
        $jade_lemaitre = new Person();
        $jade_lemaitre->setFamilyName("Le maître");
        $jade_lemaitre->setFirstName("Jade");
        $jade_lemaitre->setDescription("Einstein took science, I took curiosity... Entre science et social média, Jade Le Maître est une passionnée d'innovation et live-tweeteuse compulsive. Elle rêve d‘interfaces entre le web et les différents acteurs des sciences – laboratoires, instituts, universités, entreprises.");
        $jade_lemaitre->setTwitter("Aratta");
        $jade_lemaitre->setWebsite("http://www.jadelemaitre.fr/");
        $jade_lemaitre->setImg("http://www.blendconference.com/wp-content/uploads/2013/07/jade-lm-aratta-269x200.jpg");
        $em->persist($jade_lemaitre);

        $jade_lemaitre_talk = new Event();
        $jade_lemaitre_talk->setLabel("RÉSEAUX SOCIAUX ET ÉVÉNEMENTIEL : COMMENT MAINTENIR L’INTÉRÊT D’UNE COMMUNAUTÉ ?");
        $jade_lemaitre_talk->setDescription("Les réseaux sociaux s’imposent aujourd’hui pendant les événements. Mais quid de l’animation de la communauté tout au long de l’année ? Comment maintenir l’intérêt de la communauté ?
Je souhaite faire un retour d’expérience sur l’animation d’une communauté liée à un évènement sur les réseaux sociaux. Comment faire monter l’intérêt, quelles sont les ficelles, etc….
3 études de cas : Innorobo, Museomix et Maker Faire Paris.");
        $jade_lemaitre_talk->setCategory($TalkEvent);
        $jade_lemaitre_talk->setTopics([$tech]);
        $jade_lemaitre_talk->setLocation($auditorium);
        $jade_lemaitre_talk->setStartAt(new DateTime("2015-10-28T16:00:00+0100"));
        $jade_lemaitre_talk->setEndAt(new DateTime("2015-10-28T17:00:00+0100"));
        $jade_lemaitre_talk->setMainEvent($conferenceBlend);
        $em->persist($jade_lemaitre_talk);

        $jade_lemaitre_role = new Role();
        $jade_lemaitre_role->setPerson($jade_lemaitre);
        $jade_lemaitre_role->setRoleLabel($intervenant);
        $jade_lemaitre_role->setMainEvent($conferenceBlend);
        $em->persist($jade_lemaitre_role);

        //Goulven champenois
        $goulven_champenois = new Person();
        $goulven_champenois->setFamilyName("Champenois");
        $goulven_champenois->setFirstName("Goulven");
        $goulven_champenois->setDescription("Intégrateur passionné, Goulven Champenois jongle avec l’accessibilité, l’ergonomie, les performances et le mobile pour une expérience utilisateur optimale intégrant les dernières évolutions technologiques. Après une expérience chez Alptis en tant que développeur front-end, il se lance en freelance en 2012. Formé en grande partie grâce aux sites OpenWeb et Pompage, il rejoint ce projet en 2006.");
        $goulven_champenois->setTwitter("goulvench");
        $goulven_champenois->setWebsite("http://userland.fr/");
        $goulven_champenois->setImg("http://www.blendconference.com/wp-content/uploads/2013/07/Capture-d%E2%80%99%C3%A9cran-2013-07-12-%C3%A0-14.42.35-269x200.png");
        $em->persist($goulven_champenois);

        $goulven_champenois_talk = new Event();
        $goulven_champenois_talk->setLabel("DESIGNER ET INTÉGRATEUR : BFF");
        $goulven_champenois_talk->setDescription("Après des années à subir la trop stricte séparation entre designers et intégrateurs, nous avons dit « STOP ! » et mis en place un fonctionnement bien plus efficace et satisfaisant pour toutes les parties impliquées, et même pour d’autres corps de métiers.
Nous vous le présenterons à quatre mains, Marie-Cécile Paccard (designer) et Goulven Champenois (intégrateur), d’une manière dynamique et illustrée parce qu’il ne faut pas se leurrer : le web, plus on est, mieux c’est !
Cette présentation caricaturale et théâtrale du problème actuel de la stricte séparation entre designers et intégrateurs se veut amusante, captivante, pleine de clins d’œil, et montre une autre approche de nos métiers plus centrée sur les objectifs projets, les spécificités du médium, et les valeurs humaines (rien que ça !). Bon en vrai, nous voulons juste que les designers et intégrateurs arrêtent de se taper dessus, qu’on les laisse faire des sites aux petits oignons et que la paix revienne dans le monde.");
        $goulven_champenois_talk->setCategory($TalkEvent);
        $goulven_champenois_talk->setTopics([$tech, $design]);
        $goulven_champenois_talk->setStartAt(new DateTime("2015-10-28T09:30:00+0100"));
        $goulven_champenois_talk->setEndAt(new DateTime("2015-10-28T10:30:00+0100"));
        $goulven_champenois_talk->setLocation($salonGratteCiel);
        $goulven_champenois_talk->setMainEvent($conferenceBlend);
        $em->persist($goulven_champenois_talk);

        $goulven_champenois_role = new Role();
        $goulven_champenois_role->setPerson($goulven_champenois);
        $goulven_champenois_role->setRoleLabel($intervenant);
        $goulven_champenois_role->setMainEvent($conferenceBlend);
        $em->persist($goulven_champenois_role);

        //Mathieu lux
        $mathieu_lux = new Person();
        $mathieu_lux->setFamilyName("Lux");
        $mathieu_lux->setFirstName("Mathieu");
        $mathieu_lux->setDescription("Développeur et formateur Java EE et Web au sein de l'agence lyonnaise de Zenika. (@Swiip & http://swiip.github.com/) Ma contribution technique à de nombreux projets Web m’a permis d'être expert à la fois dans les architectures Java EE (Spring, Hibernate, JPA ...), et le Web (HTML5, AngularJS, NodeJS, Grunt...). Passionné de JavaScript, je suis également administrateur du Lyon JS.");
        $mathieu_lux->setTwitter("Swiip");
        $mathieu_lux->setWebsite("http://swiip.github.io/");
        $mathieu_lux->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/MLUX-269x200.jpg");
        $em->persist($mathieu_lux);


        $mathieu_lux_role = new Role();
        $mathieu_lux_role->setPerson($mathieu_lux);
        $mathieu_lux_role->setRoleLabel($intervenant);
        $mathieu_lux_role->setMainEvent($conferenceBlend);
        $em->persist($mathieu_lux_role);


        //Julien Deniau
        $julien_deniau = new Person();
        $julien_deniau->setFamilyName("Deniau");
        $julien_deniau->setFirstName("Julien");
        $julien_deniau->setDescription("Développeur, principalement sur PHP depuis 2006, j'ai passé plusieurs années en SSII, notamment pour M6Web. J'ai débuté l'aventure Mapado.com il y a un an et demi. Je passe une bonne partie de ma journée à faire du PHP, mais start-up oblige, je touche aussi à un peu de Javascript, du Python, à du management de serveur, à de l'intégration, etc.");
        $julien_deniau->setTwitter("j_deniau");
        $julien_deniau->setWebsite("http://www.mapado.com");
        $julien_deniau->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/j_deniau-269x200.jpg");
        $em->persist($julien_deniau);

        $julien_deniau_role = new Role();
        $julien_deniau_role->setPerson($julien_deniau);
        $julien_deniau_role->setRoleLabel($intervenant);
        $julien_deniau_role->setMainEvent($conferenceBlend);
        $em->persist($mathieu_lux_role);

        //Brice favre
        $brice_favre = new Person();
        $brice_favre->setFamilyName("Favre");
        $brice_favre->setFirstName("Brice");
        $brice_favre->setDescription("De 1998 à 2002 je débute ma carrière chez l'opérateur téléphonique A-Telecom où je poursuis mes études d'ingénieur en alternance. Par la suite je participe à plusieurs longues missions en indépendant pour divers clients, comme Cegetel. Spécialiste du PHP je rejoins la société SQLI en tant qu'Architecte orienté PHP. J'ai la charge de la création du pôle d'architecture PHP et je méne plusieurs projets autour du framework copix et du CMS Drupal.");
        $brice_favre->setTwitter("briceatwork");
        $brice_favre->setWebsite("http://pelmel.org/");
        $brice_favre->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/FAVRE_Brice_sousleau-269x200.jpg");
        $em->persist($brice_favre);

        $brice_favre_talk = new Event();
        $brice_favre_talk->setLabel("DETTE TECHNIQUE, RESPONSABILITÉ COLLECTIVE, SOLUTION INDIVIDUELLE?");
        $brice_favre_talk->setDescription("Tout s’est passé un lundi matin. Comme bien souvent ces jours là, je reçois un document de spécification. Au milieu de considérations diverses se trouve ce que je dois faire. Mauvaise nouvelle, il s’agit de reprendre un code antédiluvien (c’est à dire d’il y’a 6 mois en langage informatique). Depuis nous avons changé de framework javascript (j’y connais pas grand chose), fait évoluer nos chartes (j’y comprends encore moins) et maintenu notre backend (ça je maîtrise). Deux choix s’offrent à moi, une solution simple et sûre consistant à faire une simple évolution, soit une solution plus risquée à court terme qui passe par une remise à niveau rapide du code et de mes compétences.
C’est bien évidemment ce deuxième choix que j’ai fait.
J’introduirais donc la présentation par cette petite histoire puis, dans une première partie détaillerai le déroulé de la réalisation de la spécification en questions :
Quels ont été les moments clés?
Comment j’ai abordé les différents aspects du développement?
Comment j’ai agi, par rapport à mes compétences, sur la partie graphique, la partie code front end et code backend.
Quelles leçons j’en ai retiré ?
Ensuite, dans une deuxième partie, je détaillerais une série de conseils et d’avis pour se mettre dans une position d’évolution :
Pratiques simples à mettre en oeuvre
Communiquer auprès des équipes et des responsables.
Réduire sa dette de compétence
Et enfin je conclurai par une invitation à les mettre en place dès le lundi matin suivant.");
        $brice_favre_talk->setCategory($TalkEvent);
        $brice_favre_talk->setTopics([$tech]);
        $brice_favre_talk->setStartAt(new DateTime("2015-10-28T10:30:00+0100"));
        $brice_favre_talk->setEndAt(new DateTime("2015-10-28T11:30:00+0100"));
        $brice_favre_talk->setLocation($salonGratteCiel);
        $brice_favre_talk->setMainEvent($conferenceBlend);
        $em->persist($brice_favre_talk);

        $brice_favre_role = new Role();
        $brice_favre_role->setPerson($brice_favre);
        $brice_favre_role->setRoleLabel($intervenant);
        $brice_favre_role->setMainEvent($conferenceBlend);
        $em->persist($brice_favre_role);


        //Jean philippe cabaroc
        $jean_philippe_cabaroc = new Person();
        $jean_philippe_cabaroc->setFamilyName("Cabaroc");
        $jean_philippe_cabaroc->setFirstName("Jean-Philippe");
        $jean_philippe_cabaroc->setDescription("Designer et directeur artistique, Jean-Philippe Cabaroc aime les designs qui racontent une histoire. Il a fondé son studio de création graphique en 2009 après avoir travaillé 5 ans en agence de communication. Spécialisé dans la conception d’identités visuelles, Cabaroc taille sur mesure l'image des entreprises pour le décliner de l'imprimé au numérique en passant par les supports vidéos.");
        $jean_philippe_cabaroc->setTwitter("cabaroc");
        $jean_philippe_cabaroc->setWebsite("http://www.cabaroc.com");
        $jean_philippe_cabaroc->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/09/Cabaroc-269x200.jpg");
        $em->persist($jean_philippe_cabaroc);

        $jean_philippe_cabaroc_talk = new Event();
        $jean_philippe_cabaroc_talk->setLabel("IDENTITÉS VISUELLES ET NUMÉRIQUES HUMAINES");
        $jean_philippe_cabaroc_talk->setDescription("Comment faire de votre entreprise cette individu que l’on a envie de rencontrer.
Pour une entreprise, une identité visuelle est plus qu’un simple habillage graphique, c’est son visage, son look, sa façon de parler, de marcher. Une entreprise est comme une personne, on s’en fait une idée dès la première minute. Il est donc important pour une société de faire bonne impression auprès de ses clients et de garder une image cohérente sur tous ses supports de communication.
Nous allons voir comment certaines entreprises grandes ou petites arrivent à garder une image forte du papier au web mais surtout comment elles arrivent à se démarquer en devenant cette personne que l’on a envie de rencontrer.");
        $jean_philippe_cabaroc_talk->setCategory($TalkEvent);
        $jean_philippe_cabaroc_talk->setTopics([$design]);
        $jean_philippe_cabaroc_talk->setStartAt(new DateTime("2015-10-28T11:30:00+0100"));
        $jean_philippe_cabaroc_talk->setEndAt(new DateTime("2015-10-28T12:30:00+0100"));
        $jean_philippe_cabaroc_talk->setLocation($salonGratteCiel);
        $jean_philippe_cabaroc_talk->setMainEvent($conferenceBlend);
        $em->persist($jean_philippe_cabaroc_talk);

        $jean_philippe_cabaroc_role = new Role();
        $jean_philippe_cabaroc_role->setPerson($jean_philippe_cabaroc);
        $jean_philippe_cabaroc_role->setRoleLabel($intervenant);
        $jean_philippe_cabaroc_role->setMainEvent($conferenceBlend);
        $jean_philippe_cabaroc_role->setEvent($jean_philippe_cabaroc_talk);
        $em->persist($jean_philippe_cabaroc_role);


        //LAURENCE BRICTEUX
        $laurence_bricteux = new Person();
        $laurence_bricteux->setFamilyName("Bricteux");
        $laurence_bricteux->setFirstName("Laurence");
        $laurence_bricteux->setDescription("A la tête des Ateliers-Goûters du Code lancés en mars 2014, chargée de cours de stratégie digitale dans une école à Marseille, coach de startups en incubation à Kedge Business Nursery et StartupWE, représentante de Girls In Tech à Marseille, j'ai acquis mon expérience des nouvelles technologies au sein d'Apple EMEA à Paris et Londres, où j'ai été chargée pendant 10 ans (soit du 1er imac au second iPhone en langue Apple) de la communication produits, et ensuite du marketing du marché de l’Education.");
        $laurence_bricteux->setTwitter("laurence0501");
        $laurence_bricteux->setWebsite("http://www.ateliergouterducode.org");
        $laurence_bricteux->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/09/Laurence-Bricteux-269x200.jpg");
        $em->persist($laurence_bricteux);

        $laurence_bricteux_talk = new Event();
        $laurence_bricteux_talk->setLabel("APPRENDRE LE CODE, À TOUT ÂGE, C’EST FACILE, AMUSANT, ET UTILE. RETOUR D’EXPÉRIENCE.");
        $laurence_bricteux_talk->setDescription("Le code est la langue commune que comprennent aujourd’hui les startups du monde entier. Il est capital d’en inculquer les principes, afin de permettre à chacun d’être acteur de sa vie digitale.
Partage de l’expérience Heure du Code au USA, et au UK.
Démonstration pratique des apprentissages constatés lors de nos ateliers du code.
Mise en perspective des perspectives des débouchés proposés par cet apprentissage de base.");
        $laurence_bricteux_talk->setCategory($TalkEvent);
        $laurence_bricteux_talk->setTopics([$tech]);
        $laurence_bricteux_talk->setStartAt(new DateTime("2015-10-28T13:30:00+0100"));
        $laurence_bricteux_talk->setEndAt(new DateTime("2015-10-28T14:30:00+0100"));
        $laurence_bricteux_talk->setLocation($salonGratteCiel);
        $laurence_bricteux_talk->setMainEvent($conferenceBlend);
        $em->persist($laurence_bricteux_talk);

        $laurence_bricteux_role = new Role();
        $laurence_bricteux_role->setPerson($laurence_bricteux);
        $laurence_bricteux_role->setRoleLabel($intervenant);
        $laurence_bricteux_role->setMainEvent($conferenceBlend);
        $laurence_bricteux_role->setEvent($laurence_bricteux_talk);
        $em->persist($laurence_bricteux_role);


        //SÉBASTIEN CHARRIER
        $sebastien_charrier = new Person();
        $sebastien_charrier->setFamilyName("Charrier");
        $sebastien_charrier->setFirstName("Sébastien");
        $sebastien_charrier->setDescription("Après quelques années d'études dans l'informatique, Sébastien était convaincu que développeur n'était pas un vrai boulot, qu'il lui fallait être au moins chef de projet pour réussir sa vie. Il est donc passé par des postes de consultant, chef de produit, chef de projet, directeur technique avant de revenir à ses premières amours : le développement.");
        $sebastien_charrier->setTwitter("scharrier");
        $sebastien_charrier->setWebsite("http://craftsmen.io");
        $sebastien_charrier->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/CRAFTSMEN_7715_carree-269x200.jpg");
        $em->persist($sebastien_charrier);

        $sebastien_charrier_talk = new Event();
        $sebastien_charrier_talk->setLabel("COMMENT (NE PAS) FOIRER UN PRODUIT EN BEAUTÉ");
        $sebastien_charrier_talk->setDescription("Nous connaissons tous des produits qui se sont vendus par millions, tout en étant juste de grosses blagues. Comment en arrive-t-on à ça ? Retour d’expérience d’un mec qui s’est foiré quelques fois.
Le talk se structure autour de 3 points principaux, traités en une vingtaine de minutes :
– la vision (ne pas fonctionner en mode opportuniste)
– l’équipe (remettre les développeurs à leur place, ne plus les considérer comme de simples exécutants)
– les clients (savoir écouter / savoir ne pas écouter)
J’aborde ces thématiques de façon amusante, voire un peu cynique, en n’hésitant pas à clasher un peu ces dirigeants qui n’ont pas confiance en leurs équipes, ces chefs de produit ou de projet qui considèrent leurs développeurs comme de gentilles machines à pondre du code, et tous ceux qui contribuent à l’échec de produits qui auraient pu être de vraies réussites.");
        $sebastien_charrier_talk->setCategory($TalkEvent);
        $sebastien_charrier_talk->setTopics([$business]);
        $sebastien_charrier_talk->setStartAt(new DateTime("2015-10-28T14:30:00+0100"));
        $sebastien_charrier_talk->setEndAt(new DateTime("2015-10-28T15:30:00+0100"));
        $sebastien_charrier_talk->setLocation($salonGratteCiel);
        $sebastien_charrier_talk->setMainEvent($conferenceBlend);
        $em->persist($sebastien_charrier_talk);

        $sebastien_charrier_role = new Role();
        $sebastien_charrier_role->setPerson($sebastien_charrier);
        $sebastien_charrier_role->setRoleLabel($intervenant);
        $sebastien_charrier_role->setMainEvent($conferenceBlend);
        $sebastien_charrier_role->setEvent($sebastien_charrier_talk);
        $em->persist($sebastien_charrier_role);


        //BERTRAND COCHET
        $bertrand_cochet = new Person();
        $bertrand_cochet->setFamilyName("Cochet");
        $bertrand_cochet->setFirstName("Bertrand");
        $bertrand_cochet->setDescription("Bertrand Cochet est consultant ergonome senior pour l'agence Wax Interactive (SQLI Group). Ancien directeur artistique, il s'est tourné vers la conception de dispositifs numériques en 2004 où il a déployé des méthodes expertes et collaboratives destinées à optimiser l'expérience utilisateur et l'utilisabilité des interfaces.");
        $bertrand_cochet->setTwitter("bcochet");
        $bertrand_cochet->setWebsite("http://www.fittsize-me.com");
        $bertrand_cochet->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/09/Bertrand-Cochet-269x200.jpg");
        $em->persist($bertrand_cochet);

        $bertrand_cochet_talk = new Event();
        $bertrand_cochet_talk->setLabel("LE SERVICE DESIGN COMME MODÈLE DE CONCEPTION : ÉNIÈME MÉTHODE UX OU VÉRITABLE RÉVOLUTION ?");
        $bertrand_cochet_talk->setDescription("Le milieu de la conception web est habituée à accueillir épisodiquement des méthodes de travail adaptées pour améliorer la productivité et faciliter les échanges entre équipes.
Le design de service fait partie de ces innovations qui méritent que l’on s’y attarde. En effet, ce n’est pas une simple méthode de plus mais une réelle invitation à changer la façon dont nous appréhendons un projet, avec des équipes investies et une vision partagée par l’ensemble de l’organisation.
Cette conférence se propose d’illustrer simplement comment intégrer le Service Design à ses projets et comment bien accompagner les équipes commerciales, dirigeantes, designers… pour en maîtriser la puissance et gagner en compétitivité.");
        $bertrand_cochet_talk->setCategory($TalkEvent);
        $bertrand_cochet_talk->setTopics([$design]);
        $bertrand_cochet_talk->setStartAt(new DateTime("2015-10-28T15:30:00+0100"));
        $bertrand_cochet_talk->setEndAt(new DateTime("2015-10-28T17:00:00+0100"));
        $bertrand_cochet_talk->setLocation($salonGratteCiel);
        $bertrand_cochet_talk->setMainEvent($conferenceBlend);
        $em->persist($bertrand_cochet_talk);

        $bertrand_cochet_role = new Role();
        $bertrand_cochet_role->setPerson($bertrand_cochet);
        $bertrand_cochet_role->setRoleLabel($intervenant);
        $bertrand_cochet_role->setMainEvent($conferenceBlend);
        $bertrand_cochet_role->setEvent($bertrand_cochet_talk);
        $em->persist($bertrand_cochet_role);

        //BENJAMIN DURAND
        $benjamin_durand = new Person();
        $benjamin_durand->setFamilyName("Durand");
        $benjamin_durand->setFirstName("Benjamin");
        $benjamin_durand->setDescription("Mon parcours scolaire est assez classique avec un DUT Technico-commercial à l’IUT d’Annecy et un Bachelor en communication à Paris à L’Ecole Supérieure de Publicité. Mes études m'ont surtout permis de rencontrer mes premiers associés pour créer ma première société en 2008. J'ai remporté, en 2007, le concours Graines d’Entrepreneurs de la CCI Haute-Savoie qui récompensait le meilleur projet d’entreprise.");
        $benjamin_durand->setTwitter("Benjamin_Durand");
        $benjamin_durand->setWebsite("http://bealder.com/");
        $benjamin_durand->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/Benjamin-DURAND-photo-269x200.jpg");
        $em->persist($benjamin_durand);

        $benjamin_durand_talk = new Event();
        $benjamin_durand_talk->setLabel("LES BEACONS, L’AVENIR DU RETAIL ?");
        $benjamin_durand_talk->setDescription("Comment les beacons, ces petits capteurs, vont-t-ils révolutionner le commerce pour toujours.
1. 3 grandes problématiques dans le Retail
2. Solutions (Beacon)
3. Comment ça marche
4. Scénario type
5. Case Study");
        $benjamin_durand_talk->setCategory($TalkEvent);
        $benjamin_durand_talk->setTopics([$business]);
        $benjamin_durand_talk->setStartAt(new DateTime("2015-10-28T09:30:00+0100"));
        $benjamin_durand_talk->setEndAt(new DateTime("2015-10-28T10:30:00+0100"));
        $benjamin_durand_talk->setLocation($salleTeteDor1);
        $benjamin_durand_talk->setMainEvent($conferenceBlend);
        $em->persist($benjamin_durand_talk);

        $benjamin_durand_role = new Role();
        $benjamin_durand_role->setPerson($benjamin_durand);
        $benjamin_durand_role->setRoleLabel($intervenant);
        $benjamin_durand_role->setMainEvent($conferenceBlend);
        $benjamin_durand_role->setEvent($benjamin_durand_talk);
        $em->persist($benjamin_durand_role);


        //XAVIER BLOT
        $xavier_blot = new Person();
        $xavier_blot->setFamilyName("Blot");
        $xavier_blot->setFirstName("Xavier");
        $xavier_blot->setDescription("Ma vie a commencée par un amour immodéré pour les sciences. Après, un diplôme d’ingénieur et un master en mécanique quantique à Toulouse, j’ai enchainé sur une thèse dans le solaire photovoltaïque, à Grenoble. Je suis en train de la terminer. Entre temps, j’ai pu travailler dans des laboratoires de recherche français et étrangers puis chez des industriels du secteur.
En parallèle j’ai participé à divers projets entrepreneuriaux dont notamment un plateforme de cours particulier qui fut un échec. Fin 2013, j’ai co-fondé BeyondLab, un réseau qui met en relation les chercheurs et leurs technologies avec les entrepreneurs capables d’en faire des applications innovantes.");
        $xavier_blot->setTwitter("XavierBlot");
        $xavier_blot->setWebsite("http://www.beyondLab.com");
        $xavier_blot->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/profil-200x200.jpg");
        $em->persist($xavier_blot);

        $xavier_blot_talk = new Event();
        $xavier_blot_talk->setLabel("ADOPTE UN CHERCHEUR");
        $xavier_blot_talk->setDescription("Chercheurs et entrepreneurs sont fait pour travailler ensembles. Malgré clichés et problèmes de communication, tous veulent résoudre des problèmes et créer des choses qui comptent.
Nous mettons cela en oeuvre au sein de BeyondLab pour les rapprocher et lancer les startups high-tech de demain. Tiré de cette expérience, nous verrons que les chercheurs développent des comportements identiques aux entrepreneurs (lean management, gout du risque, compétiteur,…) et que, moyennant certains a priori à dépasser, ils sont les profils parfaits pour lancer ou développer son activité.");
        $xavier_blot_talk->setCategory($TalkEvent);
        $xavier_blot_talk->setTopics([$business, $recherche]);
        $xavier_blot_talk->setStartAt(new DateTime("2015-10-28T10:30:00+0100"));
        $xavier_blot_talk->setEndAt(new DateTime("2015-10-28T11:30:00+0100"));
        $xavier_blot_talk->setLocation($salleTeteDor1);
        $xavier_blot_talk->setMainEvent($conferenceBlend);
        $em->persist($xavier_blot_talk);

        $xavier_blot_role = new Role();
        $xavier_blot_role->setPerson($xavier_blot);
        $xavier_blot_role->setRoleLabel($intervenant);
        $xavier_blot_role->setMainEvent($conferenceBlend);
        $xavier_blot_role->setEvent($xavier_blot_talk);
        $em->persist($xavier_blot_role);


        //MARIE EKELAND
        $marie_ekeland = new Person();
        $marie_ekeland->setFamilyName("Ekeland");
        $marie_ekeland->setFirstName("Marie");
        $marie_ekeland->setDescription("Marie Ekeland est investisseur en capital-risque et co-Présidente de France Digitale. Ancienne associée chez Elaia Partners, elle a notamment investi dans les sociétés Criteo, Mobirider, Pandacraft, Seven Academy, Scoop.it, Teads, Wyplay et Ykone. Elle a débuté sa carrière en 1997 en tant qu'informaticienne au sein de la banque d’affaires JP Morgan, d’abord à New York, où elle a participé au développement d’une application destinée aux salles de marché Fixed Income, puis à Paris, où elle a géré l’équipe en charge de son support global. Elle rejoint le capital-risque en intégrant l'équipe d'investissement de CPR Private Equity (groupe Crédit Agricole) en 2000.");
        $marie_ekeland->setTwitter("bibicheri");
        $marie_ekeland->setWebsite("http://www.francedigitale.org/");
        $marie_ekeland->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/Marie-Ekeland1-269x200.jpg");
        $em->persist($marie_ekeland);


        $marie_ekeland_role = new Role();
        $marie_ekeland_role->setPerson($marie_ekeland);
        $marie_ekeland_role->setRoleLabel($intervenant);
        $marie_ekeland_role->setMainEvent($conferenceBlend);
        $em->persist($marie_ekeland_role);


        //FRANCK VERROT
        $franck_verrot = new Person();
        $franck_verrot->setFamilyName("Verrot");
        $franck_verrot->setFirstName("Franck");
        $franck_verrot->setDescription("Franck est Product Owner et plus généralement ingénieur logiciel chez Worldline. Son intérêt pour la qualité logicielle se traduit autant par la pratique du TDD que du BDD, sujet qui lui tient à coeur depuis plusieurs années déjà, notamment au travers des approches « Executable Specifications » ou « Specification by Example ».");
        $franck_verrot->setTwitter("franckverrot");
        $franck_verrot->setWebsite("http://github.com/franckverrot");
        $franck_verrot->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/09/Franck-Verrot-269x200.jpg");
        $em->persist($franck_verrot);

        $franck_verrot_talk = new Event();
        $franck_verrot_talk->setLabel("SPÉCIFICATIONS ET MÉTHODES AGILES, UN MARIAGE D’AMOUR.");
        $franck_verrot_talk->setDescription("L’écriture de spécifications semble incompatible avec les méthodes agiles. Pourtant, je vous montrerai qu’il s’agit la d’un avantage compétitif, si tant est qu’on sache comment les rédiger.
1. Présentation agilité et pratiques
2. Présentation Waterfall/Cycle en V avec spécifications en avance de phase de développement
3. Problématique: incompatibilité d’impédance perçue entre agilité et spécifications
4. Présentation Behavior-Driven Development et spécifications exécutable
5. Présentation outillage Java/Ruby/JavaScript/.NET
6. Exemples
7. Q&R");
        $franck_verrot_talk->setCategory($TalkEvent);
        $franck_verrot_talk->setTopics([$business]);
        $franck_verrot_talk->setStartAt(new DateTime("2015-10-28T11:30:00+0100"));
        $franck_verrot_talk->setEndAt(new DateTime("2015-10-28T12:30:00+0100"));
        $franck_verrot_talk->setLocation($salleTeteDor1);
        $franck_verrot_talk->setMainEvent($conferenceBlend);
        $em->persist($franck_verrot_talk);

        $franck_verrot_role = new Role();
        $franck_verrot_role->setPerson($franck_verrot);
        $franck_verrot_role->setRoleLabel($intervenant);
        $franck_verrot_role->setMainEvent($conferenceBlend);
        $franck_verrot_role->setEvent($franck_verrot_talk);
        $em->persist($franck_verrot_role);


        //CHRISTOPHE GAGIN
        $christophe_gagin = new Person();
        $christophe_gagin->setFamilyName("Gagin");
        $christophe_gagin->setFirstName("Christophe");
        $christophe_gagin->setDescription("Je suis co-fondateur d'Azendoo.com, une application cloud qui offre une nouvelle expérience de travail collaboratif et s’intègre avec Evernote, Box, Dropbox et Google Drive. Deux ans après son lancement, Azendoo compte plus de 250.000 utilisateurs partout dans le monde. J'ai 15 ans d'expérience en Software Design, Product Management, Product Marketing, User eXperience Design, Customer Satisfaction et les ventes complexes de logiciels aux entreprises.");
        $christophe_gagin->setTwitter("chrisgagin");
        $christophe_gagin->setWebsite("http://www.azendoo.com");
        $christophe_gagin->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/09/Christophe-Gagin.jpeg");
        $em->persist($christophe_gagin);

        $christophe_gagin_talk = new Event();
        $christophe_gagin_talk->setLabel("ÉCOUTER SA COMMUNAUTÉ, LES BONS OUTILS POUR DÉVELOPPER LE MEILLEUR PRODUIT");
        $christophe_gagin_talk->setDescription("…Ou comment établir une relation one-to-one avec des milliers d’utilisateurs, comprendre leur expérience de l’application, améliorer son adoption et sa viralisation.
Je vous partagerai mes retours d’expérience sur comment identifier tout ce qui peut bloquer vos utilisateurs, comment mesurer leur utilisation à la fois globale et unitaire, interagir avec eux et les encourager à partager leur feedback sur tous les canaux à disposition.
Selon les phases de maturité de l’application et de votre organisation, les objectifs recherchés et les moyens disponibles, vous verrez que les solutions employées peuvent être très variées voir parfois inattendues.
Thématiques abordées (+ exemple)
– Mesurer les actions utilisateur et Analytics – Quoi mesurer, comment ne pas se noyer, et quoi faire de ces informations ? (cheminement utilisateur, Progressive Design, etc)
– Base de connaissance – Que mettre dedans et les erreurs à ne pas faire ?
– Suivi des tickets Support – Deux objectifs: les réduire au maximum et en faire une machine à convertir en clients.
– Feedback utilisateurs et Use Cases – Comment ne pas manquer une occasion d’identifier un cas client ?
– Emailing Marketing – Pour quoi faire et qu’en attendre ?
– Emailing Transactionnel et Segmentation – Quand commencer, quel rythme adopter ?
– Multi-langue et 24/7 – Traduire votre site, votre application, vos FAQs, répondre au support en plusieurs langues et around-the-clock … Intérêt et contraintes.
– Interaction utilisateurs – Toujours plus proche des préoccupations de vos clients pour aider l’Adoption, la Fidélisation et la Viralisation");
        $christophe_gagin_talk->setCategory($TalkEvent);
        $christophe_gagin_talk->setTopics([$business]);
        $christophe_gagin_talk->setStartAt(new DateTime("2015-10-28T13:30:00+0100"));
        $christophe_gagin_talk->setEndAt(new DateTime("2015-10-28T16:00:00+0100"));
        $christophe_gagin_talk->setLocation($salleTeteDor1);

        $christophe_gagin_talk->setMainEvent($conferenceBlend);
        $em->persist($christophe_gagin_talk);

        $christophe_gagin_role = new Role();
        $christophe_gagin_role->setPerson($christophe_gagin);
        $christophe_gagin_role->setRoleLabel($intervenant);
        $christophe_gagin_role->setMainEvent($conferenceBlend);
        $christophe_gagin_role->setEvent($christophe_gagin_talk);
        $em->persist($christophe_gagin_role);


        //JEROME MASUREL
        $jerome_mazurel = new Person();
        $jerome_mazurel->setFamilyName("Mazurel");
        $jerome_mazurel->setFirstName("Jérôme");
        $jerome_mazurel->setDescription("Jérôme Masurel commence sa carrière dans la capital-risque à New York chez NextStage, puis chez Rotschild &Cie Private Equity à Paris. Il participe au lancement du réseau Agregator qui a donné naissance au site Viadeo. En 2010 il fonde Investir en Direct pour aider les projets en amorçage à trouver des fonds auprès d’un réseau de dirigeants d’entreprises. Investir en Direct accompagne chaque année une quinzaine de levées de fonds entre 500K€ et 1M€.");
        $jerome_mazurel->setTwitter("50partners");
        $jerome_mazurel->setWebsite("http://www.50partners.fr");
        $jerome_mazurel->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/J%C3%A9r%C3%B4me-Masurel-269x200.png");
        $em->persist($jerome_mazurel);

        $jerome_mazurel_talk = new Event();
        $jerome_mazurel_talk->setLabel("KIT DE SURVIE POUR UNE STARTUP DU WEB");
        $jerome_mazurel_talk->setDescription("…Ou comment établir une relation one-to-one avec des milliers d’utilisateurs, comprendre leur expérience de l’application, améliorer son adoption et sa viralisation.
Je vous partagerai mes retours d’expérience sur comment identifier tout ce qui peut bloquer vos utilisateurs, comment mesurer leur utilisation à la fois globale et unitaire, interagir avec eux et les encourager à partager leur feedback sur tous les canaux à disposition.
Selon les phases de maturité de l’application et de votre organisation, les objectifs recherchés et les moyens disponibles, vous verrez que les solutions employées peuvent être très variées voir parfois inattendues.
Thématiques abordées (+ exemple)
– Mesurer les actions utilisateur et Analytics – Quoi mesurer, comment ne pas se noyer, et quoi faire de ces informations ? (cheminement utilisateur, Progressive Design, etc)
– Base de connaissance – Que mettre dedans et les erreurs à ne pas faire ?
– Suivi des tickets Support – Deux objectifs: les réduire au maximum et en faire une machine à convertir en clients.
– Feedback utilisateurs et Use Cases – Comment ne pas manquer une occasion d’identifier un cas client ?
– Emailing Marketing – Pour quoi faire et qu’en attendre ?
– Emailing Transactionnel et Segmentation – Quand commencer, quel rythme adopter ?
– Multi-langue et 24/7 – Traduire votre site, votre application, vos FAQs, répondre au support en plusieurs langues et around-the-clock … Intérêt et contraintes.
– Interaction utilisateurs – Toujours plus proche des préoccupations de vos clients pour aider l’Adoption, la Fidélisation et la Viralisation");
        $jerome_mazurel_talk->setCategory($TalkEvent);
        $jerome_mazurel_talk->setTopics([$business]);
        $jerome_mazurel_talk->setStartAt(new DateTime("2015-10-28T16:00:00+0100"));
        $jerome_mazurel_talk->setEndAt(new DateTime("2015-10-28T17:30:00+0100"));
        $jerome_mazurel_talk->setLocation($salleTeteDor1);
        $jerome_mazurel_talk->setMainEvent($conferenceBlend);
        $em->persist($jerome_mazurel_talk);

        $jerome_mazurel_role = new Role();
        $jerome_mazurel_role->setPerson($jerome_mazurel);
        $jerome_mazurel_role->setRoleLabel($intervenant);
        $jerome_mazurel_role->setMainEvent($conferenceBlend);
        $jerome_mazurel_role->setEvent($jerome_mazurel_talk);
        $em->persist($jerome_mazurel_role);


        //GOEFFREY DORNE
        $geoffrey_dorne = new Person();
        $geoffrey_dorne->setFamilyName("Dorne");
        $geoffrey_dorne->setFirstName("Geoffrey");
        $geoffrey_dorne->setDescription("Geoffrey Dorne est designer et a créé Design & Human. Diplômé de l’Ensad, il travaille pour la culture, la société et l'humain avec la Croix Rouge, la CNIL, la fondation Mozilla, la fondation Wikimedia, le Commissariat à l’Énergie Atomique, la recherche contre le sida, EDF, Samsung, Orange...");
        $geoffrey_dorne->setTwitter("GeoffreyDorne");
        $geoffrey_dorne->setWebsite("http://GeoffreyDorne.com");
        $geoffrey_dorne->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/Geoffrey_Dorne-269x200.jpg");
        $em->persist($geoffrey_dorne);


        $geoffrey_dorne_role = new Role();
        $geoffrey_dorne_role->setPerson($geoffrey_dorne);
        $geoffrey_dorne_role->setRoleLabel($intervenant);
        $geoffrey_dorne_role->setMainEvent($conferenceBlend);
        $em->persist($geoffrey_dorne_role);


        //ALAIN REGNIER
        $alain_regnier = new Person();
        $alain_regnier->setFamilyName("Regnier");
        $alain_regnier->setFirstName("Alain");
        $alain_regnier->setDescription("CTO d'Alto Labs, architecte Technique et Entrepreneur passionné d'innovation et ayant passé 10 ans dans la Silicon Valley. Spécialiste français des Google Glass. #GlassExplorer.");
        $alain_regnier->setTwitter("altolabs");
        $alain_regnier->setWebsite("http://fr.linkedin.com/in/alainregnier/");
        $alain_regnier->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/Alain-Regnier-225x200.jpeg");
        $em->persist($alain_regnier);


        $alain_regnier_role = new Role();
        $alain_regnier_role->setPerson($alain_regnier);
        $alain_regnier_role->setRoleLabel($intervenant);
        $alain_regnier_role->setMainEvent($conferenceBlend);
        $em->persist($alain_regnier_role);


        //OLIVIA LOR
        $olivia_lor = new Person();
        $olivia_lor->setFamilyName("Lor");
        $olivia_lor->setFirstName("Olivia");
        $olivia_lor->setDescription("Après des études d'arts appliqués et des débuts dans le webdesign, Olivia s'est orientée vers l'UX lors de son master (MICNI) à l'école Gobelins. Aujourd’hui en poste chez Ekino (filiale technique du groupe Fullsix), elle a l’occasion de côtoyer au quotidien les problématiques techniques liées au développement d’interfaces digitales, en complément des problématiques d’expérience utilisateur. Elle travaille beaucoup sur des projets en responsive design pour des grands comptes et utilise à outrance le #Bisou.");
        $olivia_lor->setTwitter("altolabs");
        $olivia_lor->setWebsite("http://fr.linkedin.com/in/olivialor/");
        $olivia_lor->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/Olivia-Lor-269x200.jpg");
        $em->persist($olivia_lor);

        $olivia_lor_role = new Role();
        $olivia_lor_role->setPerson($olivia_lor);
        $olivia_lor_role->setRoleLabel($intervenant);
        $olivia_lor_role->setMainEvent($conferenceBlend);
        $em->persist($olivia_lor_role);


        //FRANCIS CHOUQUET
        $francis_chouquet = new Person();
        $francis_chouquet->setFamilyName("Chouquet");
        $francis_chouquet->setFirstName("Francis");
        $francis_chouquet->setDescription("Graphiste depuis dix ans, j’ai toujours été très intéressé par la typographie. Ayant un bagage de dessin et de peinture, je me suis rapidement mis à crayonner des lettres et à entrer dans le grand monde du dessin de caractères. Passionné à la fois par l’époque victorienne comme par le sign painting, j’ai décidé il y a quelques années de prendre cette activité au sérieux et d’en faire une flèche supplémentaire à mon arc");
        $francis_chouquet->setTwitter("Fran6");
        $francis_chouquet->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/Francis-Chouquet-225x200.jpeg");
        $em->persist($francis_chouquet);

        $francis_chouquet_role = new Role();
        $francis_chouquet_role->setPerson($francis_chouquet);
        $francis_chouquet_role->setRoleLabel($intervenant);
        $francis_chouquet_role->setMainEvent($conferenceBlend);
        $em->persist($francis_chouquet_role);


        //NICOLAS COHEN
        $nicolas_cohen = new Person();
        $nicolas_cohen->setFamilyName("Cohen");
        $nicolas_cohen->setFirstName("Nicolas");
        $nicolas_cohen->setDescription("En 2007, Nicolas Cohen et Nicolas d’Audiffret, deux amis attirés par l’entrepreneuriat et à la recherche de projets porteurs de sens, rencontrent par hasard Igor, un artisan du Sud-Ouest de la France qui travaille la vaisselle en ardoise. En discutant avec lui, ils prennent conscience que les petits artisans et créateurs ont une problématique majeure : s’ils aiment créer, ils ne savent pas toujours mettre en valeur et vendre leur travail.");
        $nicolas_cohen->setTwitter("nicolascoh");
        $nicolas_cohen->setWebsite("http://www.alittlemarket.com/");
        $nicolas_cohen->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/07/Nicolas-Cohen-copyright-Silvere-Leprovost-269x200.jpg");
        $em->persist($nicolas_cohen);

        $nicolas_cohen_role = new Role();
        $nicolas_cohen_role->setPerson($nicolas_cohen);
        $nicolas_cohen_role->setRoleLabel($intervenant);
        $nicolas_cohen_role->setMainEvent($conferenceBlend);
        $em->persist($nicolas_cohen_role);


        //HENRI LEPIC
        $henri_lepic = new Person();
        $henri_lepic->setFamilyName("Lepic");
        $henri_lepic->setFirstName("Henri");
        $henri_lepic->setDescription("Henri Lepic, IT addict. Au démarrage du grand succès d'internet en 1999, il part vivre à Berkeley en Californie où il découvre une toute nouvelle culture. A son retour en France, il décide de prendre des cours de design. Après un master web en poche, il se tourne vers ses fondamentaux : la création de sites web, ce qui l'amène à créer Kong Interactive une agence créative située à Paris 10°. Il est rapidement amené à gérer des comptes clients exigeants tels que France Télévision Publicité ou Volkswagen ce qui le pousse vers une culture du software craftsmanship (artisanat logiciel).");
        $henri_lepic->setTwitter("henripic");
        $henri_lepic->setWebsite("");
        $henri_lepic->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/Henri-Lepic-269x200.png");
        $em->persist($henri_lepic);

        $henri_lepic_role = new Role();
        $henri_lepic_role->setPerson($henri_lepic);
        $henri_lepic_role->setRoleLabel($intervenant);
        $henri_lepic_role->setMainEvent($conferenceBlend);
        $em->persist($henri_lepic_role);


        //FRANCOIS LE PICHON
        $francois_le_pichon = new Person();
        $francois_le_pichon->setFamilyName("Le Pichon");
        $francois_le_pichon->setFirstName("François");
        $francois_le_pichon->setDescription("Diplomé en arts plastiques en 2002, François se passionne rapidement pour le web et son écosystème. Directeur artistique, il se forge également de solides connaissances en ergonomie, expérience utilisateur et développement web. Après différentes expériences en agences et start-ups, il fonde Steaw en 2008, studio de digital basé à Paris.");
        $francois_le_pichon->setTwitter("iamstark");
        $francois_le_pichon->setWebsite("http://www.steaw.com");
        $francois_le_pichon->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/Henri-Lepic-269x200.png");
        $em->persist($francois_le_pichon);

        $francois_le_pichon_role = new Role();
        $francois_le_pichon_role->setPerson($francois_le_pichon);
        $francois_le_pichon_role->setRoleLabel($intervenant);
        $francois_le_pichon_role->setMainEvent($conferenceBlend);
        $em->persist($francois_le_pichon_role);


        //MAXIME PRADES
        $maxime_prades = new Person();
        $maxime_prades->setFamilyName("Prades");
        $maxime_prades->setFirstName("Maxime");
        $maxime_prades->setDescription("Maxime Prades est Platform Product Manager chez Zendesk, plateforme de gestion de la relation client en ligne. Après plus de 6 ans passés en Chine et une école de commerce à Paris, Maxime débute sa carrière chez Novapost/People Doc, leader de la dématérialisation des documents RH. Piqué par le fameux virus du web et étant lui même pilote privé, il démarre avec deux amis Cloudy.fr une startup de logiciels pour pilotes privés et professionnels qu'ils revendent 2 ans plus tard.");
        $maxime_prades->setTwitter("prades_maxime");
        $maxime_prades->setWebsite("http://about.me/maximeprades");
        $maxime_prades->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/07/Maxime_prades-269x200.jpg");
        $em->persist($maxime_prades);

        $maxime_prades_role = new Role();
        $maxime_prades_role->setPerson($maxime_prades);
        $maxime_prades_role->setRoleLabel($intervenant);
        $maxime_prades_role->setMainEvent($conferenceBlend);
        $em->persist($maxime_prades_role);


        //OLIVIER COMBE
        $olivier_combe = new Person();
        $olivier_combe->setFamilyName("Combe");
        $olivier_combe->setFirstName("Olivier");
        $olivier_combe->setDescription("Développeur web autodidacte, Olivier Combe adore tout ce qui touche au front-end et tout particulièrement le Javascript et le CSS. Consultant chez Peaks depuis 3 ans, il a fait ses armes chez M6Web et Kreactive où il s'est pris de passion pour AngularJS.");
        $olivier_combe->setTwitter("OCombe");
        $olivier_combe->setWebsite("https://www.linkedin.com/in/oliviercombe");
        $olivier_combe->setImg("http://www.blendwebmix.com/wp-content/uploads/2014/10/olivier-combe-269x200.jpg");
        $em->persist($olivier_combe);

        $olivier_combe_role = new Role();
        $olivier_combe_role->setPerson($olivier_combe);
        $olivier_combe_role->setRoleLabel($intervenant);
        $olivier_combe_role->setMainEvent($conferenceBlend);
        $em->persist($olivier_combe_role);


        /***** EVENTS ****/

        $pause_dejeuner_audit = new Event();
        $pause_dejeuner_audit->setLabel("Pause gouter");
        $pause_dejeuner_audit->setDescription("On fait une pause et on discute");
        $pause_dejeuner_audit->setCategory($BreakEvent);
        $pause_dejeuner_audit->setStartAt(new DateTime("2015-10-28T12:30:00+0100"));
        $pause_dejeuner_audit->setEndAt(new DateTime("2015-10-28T13:30:00+0100"));
        $pause_dejeuner_audit->setMainEvent($conferenceBlend);
        $pause_dejeuner_audit->setLocation($auditorium);
        $em->persist($pause_dejeuner_audit);

        $pause_dejeuner_tete_or_1 = new Event();
        $pause_dejeuner_tete_or_1->setLabel("Pause gouter");
        $pause_dejeuner_tete_or_1->setDescription("On fait une pause et on discute");
        $pause_dejeuner_tete_or_1->setCategory($BreakEvent);
        $pause_dejeuner_tete_or_1->setStartAt(new DateTime("2015-10-28T12:30:00+0100"));
        $pause_dejeuner_tete_or_1->setEndAt(new DateTime("2015-10-28T13:30:00+0100"));
        $pause_dejeuner_tete_or_1->setMainEvent($conferenceBlend);
        $pause_dejeuner_tete_or_1->setLocation($salleTeteDor1);
        $em->persist($pause_dejeuner_tete_or_1);

        $pause_dejeuner_salon = new Event();
        $pause_dejeuner_salon->setLabel("Pause gouter");
        $pause_dejeuner_salon->setDescription("On fait une pause et on discute");
        $pause_dejeuner_salon->setCategory($BreakEvent);
        $pause_dejeuner_salon->setStartAt(new DateTime("2015-10-28T12:30:00+0100"));
        $pause_dejeuner_salon->setEndAt(new DateTime("2015-10-28T13:30:00+0100"));
        $pause_dejeuner_salon->setMainEvent($conferenceBlend);
        $pause_dejeuner_salon->setLocation($salonGratteCiel);
        $em->persist($pause_dejeuner_salon);

        return $conferenceBlend;
    }
}
