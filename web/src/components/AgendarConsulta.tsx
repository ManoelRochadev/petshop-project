import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Button,
  Text
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { api } from "../libs/api";

interface UserProps {
  dadosDono: {
    nome: string;
    email: string;
  };
  dataAgendamentos: {
    _id: string;
    datasGeradas: string;
  };
  nomeAnimal: string[];
  veterinario: string;
  funcionario: string;
}

interface DateProps {
  _id: string;
   datasGeradas: Date;
}

export function AgendarConsulta() {
  const navigate = useNavigate()
  const userLocalStorage = localStorage.getItem("email");
  if (!userLocalStorage) {
    navigate("/login/user");
  }
  
  const emailDono = localStorage.getItem('email')
  const [userData, setUserData] = useState<UserProps>({} as UserProps)
  const [user, setUser] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [petData, setPetData] = useState<string[]>([])
  const [veterinario, setVeterinario] = useState<string>('')
  const [date, setDate] = useState<[DateProps]>([{}] as [DateProps])

  useEffect(() => {
    api.get(`/consulta/agendar/${emailDono}`).then(event => {
      setUserData(event.data)
      setUser(event.data.dadosDono.nome)
      setPetData(event.data.nomeAnimal)
      setVeterinario(event.data.veterinario)
      setDate(event.data.dataAgendamentos)
      setEmail(event.data.dadosDono.email)
    })
  }, [])

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values: any) {

    const date = values.dataconsulta

    const date2 = date.indexOf(',')

    const id = date.substring(date2 + 2)

    api.post('consulta/marcar/', {
      nomeDono: user,
      emailDono: email,
      nomeAnimal: values.pet,
      medico: veterinario,
      descricao: values.observacoes,
      horario: {
        data: values.dataconsulta,
        id: id
      }
    }).then(event => {
      alert('Consulta marcada com sucesso!')
      navigate('/dashboard')
    })
    .catch(error => console.log(error))

  }
  return (
    <Flex h='100vh' w='100vw' justifyContent='center' alignItems='center' flexDir='column'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.Pet || errors.veterinario || errors.dataconsulta || errors.observacoes}>
          <FormLabel htmlFor='pet'>Nome Pet</FormLabel>
          <Select
            placeholder="Selecione o pet"
            {...register('pet', {
              required: 'Pet é obrigátorio',
            })}>
            {
              petData.map((data, key) => {

                return <option key={key}>{data}</option>
              })
            }
          </Select>
          <FormErrorMessage>
            {errors.pet && errors.pet.message}
          </FormErrorMessage>
          <FormLabel htmlFor='veterinário'>Veterinário</FormLabel>
          <Select
            placeholder="Selecione o veterinário"
            {...register('veterinario', {
              required: 'Veterinário é obrigátorio',
            })}>
              <option >{veterinario}</option>
        </Select>
          <FormErrorMessage>
            {errors.veterinario && errors.veterinario.message}
          </FormErrorMessage>
          <FormLabel htmlFor='dataconsulta'>Dia para consulta</FormLabel>
          <Select
            placeholder="Selecione o dia"
            {...register('dataconsulta', {
              required: 'Data para consulta é obrigátorio',
            })}
          >
            {
              date.map((data, key) => {
                const date = new Date(data.datasGeradas)
                const hora = date.getHours()
                const id = data._id
                return <option key={key}>{`${date.toLocaleDateString()} , ${id} `}</option>
              })
            }
          </Select>
          <FormErrorMessage>
            {errors.dataconsulta && errors.dataconsulta.message}
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