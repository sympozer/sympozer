<?php

namespace fibe\EventBundle\Form;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class MainEventType extends VEventType
{

    protected $user;

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
            ->add('startAt', 'datetime', array(
                'widget' => 'single_text',
            ))
            ->add('endAt', 'datetime', array(
                'widget' => 'single_text',
            ))
            ->add('acronym')
            ->add('label')
            ->add('logo')
//            ->add('startAt', 'datetime', array(
//                'widget' => 'single_text',
//            ))
//            ->add('endAt', 'datetime', array(
//                'widget' => 'single_text',
//            ))
//            ->add('eventLocations', 'sympozer_collection_type', array(
//                'type' => new LocationType(),
//                'required' => 'false'
//            ))
//            ->add('categoryVersions', 'sympozer_collection_type', array(
//                'type' => new CategoryVersionType(),
//                'required' => 'false'
//            ))
//            ->add('papers', 'sympozer_collection_type', array(
//                'type' => new PaperType(),
//                'required' => 'false'
//            ))
//            ->add('events', 'sympozer_collection_type', array(
//                'type' => new EventType(),
//                'required' => 'false'
//            ))
//            ->add('persons', 'sympozer_collection_type', array(
//                'type' => new PersonType(),
//                'required' => 'false'
//            ))
//            ->add('logo', 'file', array('required' => false,
//                'label' => 'Logo (jpeg - png - 2MO)',
//                'attr' => array('placeholder' => 'logoPath')))
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'fibe\EventBundle\Entity\MainEvent',
            'csrf_protection' => false
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'fibe_eventbundle_mainevent';
    }
}
