<?php

namespace fibe\SecurityBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Security\Acl\Permission\MaskBuilder;

/**
 * Command who create a new admin in database
 *
 * Class newAdminCommand
 * @package fibe\EventBundle\Command
 */
class newAdminCommand extends ContainerAwareCommand
{
    /**
     * @see Command
     */
    protected function configure()
    {
        $this
            ->setName('sympozer:admin:create')
            ->setDescription('Create a user.')
            ->setDefinition(array(
                new InputArgument('username', InputArgument::REQUIRED, 'The username'),
                new InputArgument('email', InputArgument::REQUIRED, 'The email'),
                new InputArgument('password', InputArgument::REQUIRED, 'The password'),
                new InputOption('super-admin', null, InputOption::VALUE_NONE, 'Set the user as super admin'),
                new InputOption('inactive', null, InputOption::VALUE_NONE, 'Set the user as inactive'),
            ))
            ->setHelp(<<<EOT
The <info>fos:user:create</info> command creates a user:

  <info>php app/console fos:user:create matthieu</info>

This interactive shell will ask you for an email and then a password.

You can alternatively specify the email and password as the second and third arguments:

  <info>php app/console fos:user:create matthieu matthieu@example.com mypassword</info>

You can create a super admin via the super-admin flag:

  <info>php app/console fos:user:create admin --super-admin</info>

You can create an inactive user (will not be able to log in):

  <info>php app/console fos:user:create thibault --inactive</info>

EOT
            );
    }


    /**
     * @see Command
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $username = $input->getArgument('username');
        $email = $input->getArgument('email');
        $password = $input->getArgument('password');
        $inactive = $input->getOption('inactive');
        $superadmin = $input->getOption('super-admin');

        $manipulator = $this->getContainer()->get('fos_user.util.user_manipulator');
        $newUser = $manipulator->create($username, $password, $email, !$inactive, $superadmin);
        $newUser->addRole('ROLE_ADMIN');

        $em = $this->getContainer()->get('doctrine')->getManager('default');
        $this->getContainer()->get('fibe.UserService')->post($newUser);
        $em->flush();

        $aclHelper = $this->getContainer()->get('fibe_security.acl_user_permission_helper');
        $aclHelper->performUpdateUserACL($newUser, MaskBuilder::MASK_OWNER, $newUser->getPerson());


        $output->writeln(sprintf('Created user <comment>%s</comment>', $username));
    }

    /**
     * @TODO comment
     *
     * @see Command
     */
    protected function interact(InputInterface $input, OutputInterface $output)
    {
        if (!$input->getArgument('username'))
        {
            $username = $this->getHelper('dialog')->askAndValidate(
                $output,
                'Please choose a username:',
                function ($username)
                {
                    if (empty($username))
                    {
                        throw new \Exception('Username can not be empty');
                    }

                    return $username;
                }
            );
            $input->setArgument('username', $username);
        }

        if (!$input->getArgument('email'))
        {
            $email = $this->getHelper('dialog')->askAndValidate(
                $output,
                'Please choose an email:',
                function ($email)
                {
                    if (empty($email))
                    {
                        throw new \Exception('Email can not be empty');
                    }

                    return $email;
                }
            );
            $input->setArgument('email', $email);
        }

        if (!$input->getArgument('password'))
        {
            $password = $this->getHelper('dialog')->askAndValidate(
                $output,
                'Please choose a password:',
                function ($password)
                {
                    if (empty($password))
                    {
                        throw new \Exception('Password can not be empty');
                    }

                    return $password;
                }
            );
            $input->setArgument('password', $password);
        }
    }
}
