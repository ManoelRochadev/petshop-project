import { Button, Flex, Img } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import tosaImg from '../../assets/agendetosa.png';

export function AgendarTosaImage() {
 const email = localStorage.getItem('email')

  const navigate = useNavigate();

  return (
    <Flex w='100vw' alignItems="center" flexDir='column'>
      <Img w='400px' mt={10} h='auto' src={tosaImg} />
      <Button 
      bg='green.400' 
      color='white' 
      _hover={{bg: 'green.600'}} 
      onClick={() => !email ? navigate('/login/user') : navigate('/agendar/servico') }
      >
        Agendar serviço
    </Button>
    </Flex>
  )
}