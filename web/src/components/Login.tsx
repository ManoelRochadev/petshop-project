import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Text,
} from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    navigate('/dashboard')
    
    console.log(email, password)
  }

  return (
    <form onSubmit={handleSubmit}>
    <FormControl>
      <FormLabel htmlFor='email'>Email</FormLabel>
      <Input
        id='email'
        type='email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormLabel htmlFor='password'>Senha</FormLabel>
      <Input
        id='password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
            mt={4}
            colorScheme='teal'
            bgColor="#008188"
            type='submit'
            width="100%"
          >
            Entrar
          </Button>
    <Text textAlign="center" mt={4}>Ou cadraste-se <a href="/register">aqui</a></Text>
    </FormControl>
    </form>
  )
}