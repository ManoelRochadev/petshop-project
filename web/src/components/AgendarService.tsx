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

export function AgendarService() {
  const navigate = useNavigate()
  const userLocalStorage = localStorage.getItem("email");
  if (!userLocalStorage) {
    navigate("/login/user");
  }
  
  const emailDono = localStorage.getItem('email')
  
  const [user, setUser] = useState<string>('')
  const [petData, setPetData] = useState<string[]>([])
  const [servico, setServico] = useState<string[]>([])
  const [date, setDate] = useState<[DateProps]>([{}] as [DateProps])

  useEffect(() => {
    api.get(`/servicos/${emailDono}`).then(event => {
      setPetData(event.data.nomeAnimal)
      setDate(event.data.dataAgendamentos)
      setServico(event.data.servicos)
      setUser(event.data.dadosDono.nome)
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

    api.post(`/agendar/servico/${emailDono}`, {
      nomeDono: user,
      nomeAnimal: values.pet,
      servico: values.service,
      descricao: values.observacoes,
      _id: id,
      horario: {
        data: values.dataconsulta,
      }
    }).then(event => {
      alert('Serviço marcado com sucesso!')
      navigate('/dashboard')
    })
    .catch(error => console.log(error))

  }
  return (
    <Flex h='100vh' w='100vw' justifyContent='center' alignItems='center' flexDir='column'>
      <Text as={'h1'} fontSize={'3xl'} mb={8} fontFamily='heading'>Agendar serviço</Text>
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
          <FormLabel htmlFor='pet'>Serviço</FormLabel>
          <Select
            placeholder="Selecione o serviço para seu pet" 
            {...register('service', {
              required: 'Serviço é obrigátorio',
            })}>
            {
              servico.map((data, key) => {

                return <option key={key}>{data}</option>
              })
            }
          </Select>
          <FormErrorMessage>
            {errors.service && errors.service.message}
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
        </FormControl>
        <Button mt={4} width='100%' colorScheme='teal' isLoading={isSubmitting} type='submit'>
          cadastrar
        </Button>
      </form>
    </Flex>
  )
}