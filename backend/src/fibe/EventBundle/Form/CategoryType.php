<?php


namespace fibe\EventBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class CategoryType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id')
            ->add('label')
            ->add('description')
            ->add('color')
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
            'data_class'      => 'fibe\EventBundle\Entity\Category',
            'csrf_protection' => false
        ));
    }

    public function getName()
    {
        return 'fibe_eventbundle_category_type';
    }
}
