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
            ->add('mainEvent', 'entity', array(
                'class' => 'fibeEventBundle:MainEvent',
                'required' => 'true',
                'multiple' => false,
            ))
            ->add('events', 'entity', array(
                'class' => 'fibeEventBundle:Event',
                'required' => 'false',
                'multiple' => true,
            ))
            ->add('category', 'entity', array(
                'class' => 'fibeEventBundle:Category',
                'required' => 'true',
                'multiple' => false,
            ));

    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'fibe\EventBundle\Entity\CategoryVersion',
            'csrf_protection' => false
        ));
    }

    public function getName()
    {
        return 'fibe_eventbundle_categoryversion_type';
    }
}
