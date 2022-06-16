import express from 'express'
import { User } from './models/User'
import { Groomer } from './models/Groomer'
import { Animal } from './models/Animal'
import { Doctor } from './models/Doctor'
import { Dates } from './models/Consult'
import { Queries } from './models/Queries'
import { HistoryConsult } from './models/HistoryConsult'
import { HistoryAnimal } from './models/HistoryAnimal'
import { Services } from './models/Services'
import { Agendarservices } from './models/AgendarService'
import { error } from 'console'

export const routes = express.Router()

// Gerar date

routes.get('/gerarDate', async (req, res) => {
  function gerarDate() {
    // gerar data e hora
    const data = new Date()
    data.setDate(data.getDate() + 8) 
    data.setHours(16, 0, 0, 0)

    return data
  }

  console.log(gerarDate())

  const newDate = await Dates.create({ datasGeradas: gerarDate()})

  try {
    await newDate.save()

    res.send(newDate)
  } catch (error) {
    res.status(500).send(error)
  }
})

// public route
routes.get('/', (req, res) => {
  res.send('Hello World!')
})

/*
// private route
routes.get(
  '/user/:id',
  checkToken,
  async (req: express.Request, res: express.Response) => {
    const id = req.params.id

    const user = await User.findById(id, '-password')

    if (!user) {
      return res.status(404).send({ msg: 'Usuario não encontrado' })
    }

    res.send(user)
  }
)
*/

// Registering the user

routes.post('/usuario/register', async (req, res) => {
  const { name, email, password, passwordRecovery } = req.body

  if (!name) {
    return res.status(422).send({ error: 'O nome é obrigátorio' })
  }

  if (!passwordRecovery) {
    return res
      .status(422)
      .send({ error: 'O email de recuperação é obrigátoria' })
  }

  if (!email) {
    return res.status(422).send({ error: 'O email é obrigátorio' })
  }

  if (!password) {
    return res.status(422).send({ error: 'A senha é obrigátorio' })
  }

  const userExists = await User.findOne({ email: email })

  if (userExists) {
    return res.status(422).send({ error: 'Usuário já existe' })
  }

  const user = await User.create({
    name,
    email,
    password,
    passwordRecovery
  })

  try {
    await user.save()

    res.status(201).send({ msg: 'Usuário criado com sucesso', email: email })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Erro ao criar usuário' })
  }
})

// Registrar groomer

routes.post('/groomer/register', async (req, res) => {
  const { name, email, password, passwordRecovery, activities } = req.body

  if (!name) {
    return res.status(422).send({ error: 'O nome é obrigátorio' })
  }

  if (!passwordRecovery) {
    return res
      .status(422)
      .send({ error: 'O email de recuperação é obrigátoria' })
  }

  if (!email) {
    return res.status(422).send({ error: 'O email é obrigátorio' })
  }

  if (!password) {
    return res.status(422).send({ error: 'A senha é obrigátorio' })
  }

  if (!activities) {
    return res.status(422).send({ error: 'As atividade é obrigátoria' })
  }

  const userExists = await Groomer.findOne({ email: email })

  if (userExists) {
    return res.status(422).send({ error: 'Usuário já existe' })
  }

  const user = await Groomer.create({
    name,
    email,
    password,
    passwordRecovery,
    activities
  })

  try {
    await user.save()

    res
      .status(201)
      .send({ msg: 'funcionario criado com sucesso', email: email })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Erro ao criar funcionário' })
  }
})

// Registrar animal

routes.post('/animal/register/:email', async (req, res) => {
  const email = req.params.email

  const data = req.body

  const user = await User.findOne({ email }, '-password')

  if (!user) {
    return res.status(404).send({ msg: 'Usuario não encontrado' })
  }

  if (!data.dadosAnimal.nome) {
    return res.status(422).send({ error: 'O nome é obrigátorio' })
  }

  const animalExists = (await Animal.find()).map(item => {
    return item.toJSON().dadosAnimal.nome
  })

  console.log(animalExists)

  if (animalExists.includes(data.dadosAnimal.nome)) {
    return res.status(422).send({ error: 'Animal já cadastrado' })
  }

  const dados = await Animal.create({
    donoAnimal: { nome: user.name, email: user.email },
    dadosAnimal: data.dadosAnimal
  })

  try {
    await dados.save()

    res
      .status(201)
      .send({
        msg: 'Animal adicionado com sucesso',
        dadosAnimal: data.dadosAnimal
      })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Erro ao adicionar animal' })
  }
})

// mostrar dados para consulta

routes.get('/consulta/agendar/:email', async (req, res) => {
  const email = req.params.email

  const user = await Animal.findOne({ email: email })

  const dataAgendamentos = await Dates.find()

  const doctor = await Doctor.find({})

  const groomer = await Groomer.find({})

  const dadosDono = user!.donoAnimal

  const nomeAnimal = user!.dadosAnimal.nome

  res.send({
    dadosDono,
    nomeAnimal,
    veterinario: doctor[0].name,
    funcionario: groomer[0].name,
    dataAgendamentos
  })
})

// agendar consulta e apagar horário

routes.post('/consulta/marcar/', async (req, res) => {
  const { nomeDono, emailDono, nomeAnimal, medico, descricao, horario } =
    req.body

  const user = await Animal.findOne({ email: emailDono })

  if (!user) {
    return res.status(404).send({ msg: 'Usuario não encontrado' })
  }

  const dados = await Queries.create({
    nomeDono,
    emailDono,
    nomeAnimal,
    medico,
    descricao,
    horario
  })

  try {
    await Dates.deleteOne(horario)

    await dados.save()

    res.status(201).send({ msg: 'consulta marcada com sucesso' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Erro marcar consulta' })
  }
})

// Registrar veterinario
routes.post('/doctor/register', async (req, res) => {
  const { name, email, password, passwordRecovery, CRMV, especializacao } =
    req.body

  if (!name) {
    return res.status(422).send({ error: 'O nome é obrigátorio' })
  }

  if (!passwordRecovery) {
    return res
      .status(422)
      .send({ error: 'O email de recuperação é obrigátoria' })
  }

  if (!email) {
    return res.status(422).send({ error: 'O email é obrigátorio' })
  }

  if (!password) {
    return res.status(422).send({ error: 'A senha é obrigátorio' })
  }

  if (!CRMV) {
    return res.status(422).send({ error: 'O CRMV é obrigátorio' })
  }
  if (!especializacao) {
    return res.status(422).send({ error: 'Especialização é obrigátorio' })
  }

  const userExists = await Doctor.findOne({ email: email })

  if (userExists) {
    return res.status(422).send({ error: 'Usuário já existe' })
  }

  const user = await Doctor.create({
    name,
    email,
    password,
    passwordRecovery,
    CRMV,
    especializacao
  })

  try {
    await user.save()

    res
      .status(201)
      .send({ msg: 'Veterinário criado com sucesso', email: email })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Erro ao criar usuário' })
  }
})

// mostrar historico de consultas

routes.get('/consulta/historico/:animal', async (req, res) => {
  const nomeAnimal = req.params.animal

  const user = await HistoryConsult.find({ nomeAnimal })

  res.send(user)
})

// mostrar historico de serviços do Animal

routes.get('/historico/animal/:email', async (req, res) => {
  const email = req.params.email

  // historico de serviços do animal
  const historicoServicos = await HistoryAnimal.find({ email })

  // historico de consultas do animal
  const historicoConsultas = await HistoryConsult.find({ email })

  res.send({
    historicoServicos,
    historicoConsultas
  })
})

// agendar serviço

routes.get('/servicos/:email', async (req, res) => {
  const email = req.params.email

  const user = await Animal.findOne({ email: email })

  const dataAgendamentos = await Dates.find({})

  const servicos = await Services.findOne({}, '-_id')

  const dadosDono = user!.donoAnimal

  const nomeAnimal = user!.dadosAnimal.nome

  res.send({
    dadosDono,
    nomeAnimal,
    servicos: servicos,
    dataAgendamentos
  })
})

// agendar serviço e apagar horário

routes.post('/agendar/servico/:email', async (req, res) => {
  const email = req.params.email

  const { nomeDono, nomeAnimal, servico, horarios, _id } = req.body

  const dados = await Agendarservices.create({
    emailDono: email,
    nomeDono,
    nomeAnimal,
    servico,
    horarios,
    _id
  })

  try {
    await Dates.deleteOne({ _id })

    await dados.save()

    res.status(201).send({ msg: 'serviço marcado com sucesso' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Erro marcar serviço' })
  }
})

// gerar relatorio de consultas

routes.get('/relatorio/consultas/:email', async (req, res) => {
  const email = req.params.email

  const relatorios = await HistoryConsult.find({ email })

  res.send(relatorios)
})

// O sistema deve permitir gerar relatórios de consultas realizadas no mês. O sistema deve permitir gerar relatórios de serviços realizados no mês. O sistema deve permitir gerar relatórios de pacientes no mês.

routes.get('/relatorios/:email', async (req, res) => {
  const email = req.params.email

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - 30)

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const data1 = await Dates.find({
    createdAt: {
      $gte: start,
      $lte: end
    }
  })

  console.log(data1)

  
 
  /*
  const data1Filter = data1.filter(item => item.toJSON().emailDono === email)

  const tst = data1Filter.map(item => {
    const dataDb = item.toJSON().realizada

    const newDate = new Date()

    const subtrairDias = newDate.setMonth(dataDb.getMonth() - 1)

    console.log(subtrairDias)
  })
 
  const data2 = await HistoryAnimal.find({
    createdAt: {
      $gte: startOfDay(dataAtual as Date),
      $lte: endOfDayfrom(dataAtual as Date)
    }
  })
  const data2Filter = data2.filter(item => item.toJSON().emailDono === email)
  let servicos = data2Filter
  */

  res.send()
})
// Login the user de outro projeto


routes.post('/auth/login', async (req, res) => {
  const { email, password } = req.body

  if (!email) {
    return res.status(422).send({ error: 'O email é obrigátorio' })
  }

  if (!password) {
    return res.status(422).send({ error: 'A senha é obrigátorio' })
  }

  const user = await User.findOne({ email: email })

  const verifyPassword = user?.toJSON().password

  if (!user) {
    return res.status(404).send({ error: 'Usuário não existe' })
  }

  const passwordExists = verifyPassword === password ? true : false

  if (!passwordExists) {
    res.status(400).send({msg: 'senha incorreta'})
  } else {
    res.send({msg: 'usuário logado com sucesso'})
  }
})
