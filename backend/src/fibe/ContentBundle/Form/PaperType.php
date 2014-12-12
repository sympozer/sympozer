<?php

namespace fibe\ContentBundle\Form;

use fibe\CommunityBundle\Form\PersonType;
use fibe\EventBundle\Form\MainEventType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class PaperType
 *
 * @package fibe\ContentBundle\Form
 */
class PaperType extends AbstractType
{

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id')
            ->add('label')
            ->add('abstract', 'textarea', array('required' => true))
            ->add('publisher', 'text', array('label' => 'Publisher', 'required' => false))
            ->add('publishDate', 'text', array('label' => 'Published date', 'required' => false))
            ->add('url')
            ->add('mainEvent', 'sympozer_entity_type', array(
                'type' => new MainEventType(),
                'required' => true,
                'cascade_persist' => false,
            ))
            ->add('authors', 'sympozer_collection_type', array(
                'type'            => new PersonType(),
                'required'        => false,
                'cascade_persist' => false,
                //                'allow_extra_fields' => true,
            ))
//      ->add('topics', 'sympozer_collection_type', array(
//        'type' => new TopicType(),
//        'required' => 'false'
//      ))
//      ->add('events', 'sympozer_collection_type', array(
//        'type' => new EventType(),
//        'required' => 'false'
//      ))
        ;
    }


    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'fibe\ContentBundle\Entity\Paper',
            'csrf_protection' => false
        ));
    }

    /**
     * Returns the name of this type.
     *
     * @return string The name of this type
     */
    public function getName()
    {
        return 'fibe_contentbundle_papertype';
    }
}
