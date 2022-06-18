import { Button, Flex, Img } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import consultaImg from '../../assets/Agendesuaconsulta.png';

export function AgendarConsultaImage() {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  return (
    <Flex w='100vw' alignItems="center" flexDir='column'>
      <Img w='400px' mt={10} h='auto' src={consultaImg} />
      <Button 
      bg='green.400' 
      color='white' 
      _hover={{bg: 'green.600'}} 
      onClick={() => !email ? navigate('/login/user') : navigate('/agendar/servico')}
      >
        Agendar consulta
    </Button>
    </Flex>
  )
}