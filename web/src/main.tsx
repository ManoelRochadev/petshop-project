import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreateUser } from './components/CreateUser'
import { CreateGroomer } from './components/CreateGroomer'
import { CreateDoctor } from './components/CreateDoctor'
import { Dashboard } from './components/Dashboard'
import { Login } from './components/Login'
import { PetRegister } from './components/PetRegister'
import { AgendarConsulta } from './components/AgendarConsulta'
import { AgendarService } from './components/AgendarService'
import { AgendarConsultaImage } from './components/AgendarConsultaImage'
import { AgendarTosaImage } from './components/AgendarTosaImage'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/register/user" element={<CreateUser/>}/>
      <Route path='/register/groomer' element={<CreateGroomer />} />
      <Route path='/register/doctor' element={<CreateDoctor />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/login/user' element={<Login />}/>
      <Route path='/register/pet' element={<PetRegister />}/>
      <Route path='/agendar/consulta' element={<AgendarConsulta />}/>
      <Route path='/agendar/servico' element={<AgendarService />}/>
      <Route path='/consulta' element={<AgendarConsultaImage />}/>
      <Route path='/servico' element={<AgendarTosaImage />}/>
    </Routes>
    </ChakraProvider>
  </React.StrictMode>
  </BrowserRouter>
)
