import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        width: '100vw',
        height: '100vh',
        fontFamily: 'Roboto, sans-serif',
        bg: 'gray.100',
        margin: 0,
        padding: 0
      },
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline'
        }
      }
    }
  }
})
