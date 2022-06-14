import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react'
import { api } from '../libs/api'
import { useNavigate } from 'react-router-dom'

export function CreateGroomer() {
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values: any) {
    api.post('/groomer/register', {
      name: values.name,
      email: values.email,
      password: values.password,
      passwordRecovery: values.passwordRecovery,
      activities: values.activities
    }).then(event => {
      localStorage.setItem('email', values.email)

      navigate('/dashboard')
    })
    .catch(error => alert('email já existe'))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex w='100vw'height='100vh' display='flex' justifyContent='center' alignItems='center' flexDir='column'>
      <FormControl w={['86vw', '60vw', '30vw']} isInvalid={errors.name || errors.email || errors.password || errors.passwordRecovery || errors.activities}>
        <FormLabel htmlFor='name'>Name</FormLabel>
        <Input
          id='name'
          {...register('name', {
            required: 'Nome é obrigátorio',
            minLength: { value: 4, message: 'Seu nome completo' },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
        <FormLabel htmlFor='name'>Email</FormLabel>
        <Input
          id='email'
          type='email'
          {...register('email', {
            required: 'Email é obrigátorio',
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
        <FormLabel htmlFor='name'>Senha</FormLabel>
        <Input
          id='password'
          type='password'
          {...register('password', {
            required: 'Senha é obrigátoria',
            minLength: { value: 6, message: 'Senha deve ter no mínimo 6 caracteres' },
            pattern: {
              value: /^(?=.*[a-z])/, message: 'Senha deve ter no mínimo uma letra',
            }
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
        <FormLabel htmlFor='name'>Email de recuperação</FormLabel>
        <Input
          id='passwordRecovery'
          type='email'
          {...register('passwordRecovery', {
            required: 'Email de recuperação é obrigátorio',
          })}
        />
        <FormErrorMessage>
          {errors.passwordRecovery && errors.passwordRecovery.message}
        </FormErrorMessage>
        <FormLabel htmlFor='name'>Atividades</FormLabel>
        <Input
          id='activities'
          type='text'
          {...register('activities', {
            required: 'Atividades obrigátorio',
          })}
        />
        <FormErrorMessage>
          {errors.activities && errors.activities.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} width='30%' colorScheme='teal' isLoading={isSubmitting} type='submit'>
        cadastrar
      </Button>
      </Flex>
    </form>
  )
}