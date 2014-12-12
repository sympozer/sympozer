<?php


namespace fibe\EventBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class CategoryVersionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id')
            ->add('label')
            ->add('description')
            ->add('color')
            ->add('mainEvent', 'sympozer_entity_type', array(
                'type'               => new MainEventType(),
                'required'           => true,
                'cascade_persist'    => false,
                'allow_extra_fields' => true,
            ))
            ->add('events', 'sympozer_collection_type', array(
                'type'               => new EventType(),
                'required'           => false,
                'cascade_persist'    => false,
                'allow_extra_fields' => true,
            ));

    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class'      => 'fibe\EventBundle\Entity\CategoryVersion',
            'csrf_protection' => false
        ));
    }

    public function getName()
    {
        return 'fibe_eventbundle_categoryversion_type';
    }
}
