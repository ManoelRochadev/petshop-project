import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Select } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { api } from '../libs/api'

export function PetRegister() {
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const emailDono = localStorage.getItem('email')

  function onSubmit(values: any) {
    api.post(`animal/register/${emailDono}`, {
      dadosAnimal: {
        nome: values.nome,
        especie: values.especie,
        raca: values.raca,
        sexo: values.sexo,
        nascimento: values.nascimento,
        observacoes: values.observacoes,
      }
    }).then(event => navigate('/dashboard'))
    .catch(error => alert('Animal já cadrastrado'))
  }
  return (
    <Flex mt={8} mb={8} w='100%' height='auto' display='flex' justifyContent='center' alignItems='center' flexDir='column'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl w={['86vw', '60vw', '30vw']} isInvalid={errors.nome || errors.raca || errors.especie || errors.sexo || errors.nascimento}>
          <FormLabel htmlFor='nome'>Nome do pet</FormLabel>
          <Input
            id='nome'
            {...register('nome', {
              required: 'espécie é obrigátorio',
            })}
          />
          <FormErrorMessage>
            {errors.nome && errors.nome.message}
          </FormErrorMessage>
          <FormLabel htmlFor='raça'>Raça</FormLabel>
          <Input
            id='raca'
            {...register('raca', {
              required: 'Raça é obrigátorio',
            })}
          />
          <FormErrorMessage>
            {errors.raca && errors.raca.message}
          </FormErrorMessage>
          <FormLabel htmlFor='espécie'>Espécie</FormLabel>
          <Input
            id='especie'
            type='text'
            {...register('especie', {
              required: 'espécie é obrigátoria',
            })}
          />
          <FormErrorMessage>
            {errors.especie && errors.especie.message}
          </FormErrorMessage>
          <FormLabel htmlFor='sexo'>Sexo</FormLabel>
          <Select 
          id="sexo" 
          placeholder='Selecione uma opção'
          {...register('sexo', {
            required: 'Sexo é obrigátorio',
          })}
          >
            <option value="fêmea">fêmea</option>
            <option value="macho">macho</option>
          </Select>
          <FormErrorMessage>
            {errors.sexo && errors.sexo.message}
          </FormErrorMessage>
          <FormLabel htmlFor='Nascimento'>Nascimento</FormLabel>
          <Input
            id='nascimento'
            type='date'
            {...register('nascimento', {
              required: 'Nascimento é obrigátorio',
            })}
          />
          <FormErrorMessage>
            {errors.nascimento && errors.nascimento.message}
          </FormErrorMessage>
          <FormLabel htmlFor='observações'>Observações</FormLabel>
          <Input
            id='observacoes'
            type='text'
            {...register('observacoes')}
          />
          <FormErrorMessage>
            {errors.observacoes && errors.observacoes.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} width='100%' colorScheme='teal' isLoading={isSubmitting} type='submit'>
          cadastrar
        </Button>
      </form>
    </Flex>
  )
}