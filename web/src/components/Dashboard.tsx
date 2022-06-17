import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box, Flex, IconButton, useColorModeValue, useDisclosure, Text, useBreakpointValue, Stack, Button, Collapse, Img, Heading, Container
} from "@chakra-ui/react";
import imageLogo from '../../assets/ifaro.png'
import { useNavigate, Link as LinkRouter } from 'react-router-dom';
import { DesktopNav, MobileNav } from "../App";
import { api } from "../libs/api";
import { useEffect, useState } from "react";

export function Dashboard() {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const [animais, setAnimals] = useState([]);

  function destroySession() {
    localStorage.removeItem('email')
    navigate('/')
  }

  const email = localStorage.getItem('email')

  if (!email) {
    navigate('/')
  }

  useEffect(() => {
    api.get(`/consulta/agendar/${email}`)
      .then(data => setAnimals(data.data.nomeAnimal))
      .catch(error => 'erro')
  }, []);

  const animaisList = animais.map((animal, key) => animal != null ? <Text key={key}>{animal}</Text> : null)
  return (
    <>
      <Box display='block'>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}>
              <Img boxSize='38px' w='58px' h='auto' src={imageLogo} />
            </Text>
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <Button
              type="button"
              onClick={() => destroySession()}
              fontSize={'sm'}
              fontWeight={400}
              variant={'ghost'}
              borderRadius={'md'}
              bg='green.200'
              _hover={{
                bg: 'green.400',
              }
              }
            >
              Sair
            </Button>
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
      {animais.length === 0 ? (
        <Flex w='100vw' h='85vh' alignItems='center' justifyContent='center' flexDir='column'>
          <Heading
            fontSize={'xl'}
            mb={4}
          >
            Você não possui pet cadastrado
          </Heading>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              type='button'
              onClick={() => navigate('/register/pet')}
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}>
              Cadastrar seu pet aqui
            </Button>
          </Stack>
        </Flex>
      ) : (
        <Container maxW={'3xl'}>
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}>
            <Stack
              direction={'column'}
              spacing={3}
              align={'center'}
              alignSelf={'center'}
              position={'relative'}>
              <Text
                colorScheme={'green'}
                rounded={'full'}
                px={6}
                fontSize={'xl'}
              >
                Você possui {animais.length} pet(s) cadastrado(s)
              </Text>
              {animaisList}
              <Box>
              <Button
                onClick={() => navigate('/register/pet')}
                variant={'ghost'}
                size={'sm'}
                bg={'green.400'}
                color='white'
                _hover={{ color: 'white' }}
              >
                Cadastrar novo animal
              </Button>
              </Box>
            </Stack>
          </Stack>
        </Container>
      )
      }
    </>
  )
}