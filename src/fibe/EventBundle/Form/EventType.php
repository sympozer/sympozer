<?php

namespace fibe\EventBundle\Form;

use fibe\ContentBundle\Form\LocationType;
use fibe\ContentBundle\Form\PaperType;
use fibe\ContentBundle\Form\TopicType;
use fibe\EventBundle\Form\VEventType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class EventType extends VEventType
{

    protected $categoriesLevels;

    public function __construct()
    {
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);
        $builder
            ->add('papers', 'entity', array(
                'class' => 'fibeContentBundle:Paper',
                'required' => 'false',
                'multiple' => true,
            ))
            ->add('category', 'entity', array(
                'class' => 'fibeEventBundle:CategoryVersion',
                'required' => 'true',
                'multiple' => false,
            ))
            ->add('mainEvent', 'entity', array(
                'class' => 'fibeEventBundle:MainEvent',
                'required' => 'true',
                'multiple' => false,
            ))
            ->add('roles', 'entity', array(
                'class' => 'fibeContentBundle:Role',
                'required' => 'false',
                'multiple' => true,
            ))
            ->add('topics', 'entity', array(
                'class' => 'fibeContentBundle:Topic',
                'required' => 'false',
                'multiple' => true,
            ));

    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'fibe\EventBundle\Entity\Event',
            'csrf_protection' => false
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'fibe_eventbundle_event';
    }
}
