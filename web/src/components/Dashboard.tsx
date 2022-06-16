import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, useColorModeValue, useDisclosure, Text, useBreakpointValue, Stack, Button, Collapse, Img } from "@chakra-ui/react";
import imageLogo from '../../assets/ifaro.png'
import { useNavigate, Link as LinkRouter } from 'react-router-dom';
import { DesktopNav, MobileNav } from "../App";

export function Dashboard() {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();

  function destroySession() {
    localStorage.removeItem('email')
    navigate('/')
  }

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
                bg:  'green.400',
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
    <div>
      <h1>Olá {localStorage.getItem('email')}</h1>
    </div>
    </>
  )
}