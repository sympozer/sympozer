<?php

namespace fibe\SecurityBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Security\Acl\Permission\MaskBuilder;
use fibe\SecurityBundle\Services\ACLHelper;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\Form\FormEvents;

class UserConfPermissionType extends AbstractType
{
  private $user;

  public function __construct($user)
  {
    $this->user = $user;
  }

  /**
   * @param FormBuilderInterface $builder
   * @param array                $options
   */
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('confPermissions', 'collection', array(
          'type'      => new ConfPermissionType(),
          'label'     => 'Permissions for the user : ',
          'allow_add' => true,
          // 'options'  => array(
          //   'data_class' => 'fibe\SecurityBundle\Entity\ConfPermission',
          //   'required'  => true,
          // )
        )
      );

    //if there's  a user set, ther's no need to use a custom qb
    if ($builder->getData()->getUser())
    {
      $builder->add('user', 'hidden', array(
        // 'data_class' => 'fibe\SecurityBundle\Entity\User',
        'property_path' => 'user.username',
        // 'required'  => true
      ));
    }
    else
    {
      $builder->addEventListener(
        FormEvents::PRE_SET_DATA,
        function (FormEvent $event) use ($builder)
        {
          $event->getForm()->add('user', 'entity', array(
            'class'         => 'fibeSecurityBundle:User',
            'property'      => 'username',
            'required'      => true,
            'query_builder' => function (EntityRepository $er)
              {
                return $er->ManagerForSelectTeamQuery($this->user->getCurrentMainEvent()->getTeam());
              },
          ));
          // seems to be bugged https://github.com/symfony/symfony/issues/7807
          // $event->getForm()->add($builder->getFormFactory()->createNamed('confPermissions',  'collection',array(), array(
          //   'type'   => new ConfPermissionType(),
          //   'label'   => 'Permissions for the user : ',
          //   'allow_add' => true,
          //   'auto_initialize' => false,
          //   'data_class' => 'fibe\SecurityBundle\Entity\ConfPermission',
          //   'options'  => array(
          //     'data_class' => 'fibe\SecurityBundle\Entity\ConfPermission',
          //     'required'  => true,
          //   )
          // )));
          //
          // don't work neither
          // foreach ($event->getData()->getConfPermissions() as $index => $confPermission)
          // {
          //     $event->getForm()->add('confPermissions', 'form', array(
          //         'property_path' => 'confPermissions[' . $index . ']',
          //     ));
          // }
        }
      );

    };
  }

  /**
   * @return string
   */
  public function getName()
  {
    return 'fibe_user_conf_permission';
  }
}