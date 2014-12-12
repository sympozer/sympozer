<?php

namespace fibe\SecurityBundle\Form;

use fibe\CommunityBundle\Form\PersonType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class TeammateType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id')
            ->add('person', 'sympozer_entity_type', array(
                'type' => new PersonType(),
                'required' => true,
                'cascade_persist' => false,
                'allow_extra_fields' => true,
            ))
            ->add('team', 'sympozer_entity_type', array(
                'type' => new TeamType(),
                'required' => true,
                'cascade_persist' => false,
                'allow_extra_fields' => true,
            ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'fibe_user_teammate';
    }
}