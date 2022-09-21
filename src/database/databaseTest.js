import { getUserById, createNewUser, deleteUserById, updateUserById, getUserByEmail } from '../repositories/user.js'

const mockRequestCreateUser = {
  name: 'Test01',
  email: 'teste@teste.com',
  password: 'teste123'
}

const databaseTest = async () => {
  try {
    const user = await getUserByEmail(mockRequestCreateUser.email)
    if (user) {
      console.log(`Usuário ${user.email} já existe, deletando.`)
      await deleteUserById(user.id)
    }
    const newUser = await createNewUser(mockRequestCreateUser)
    console.log('Novo usuário criado: ', newUser.email)

    const updatedUser = await updateUserById(newUser.id, { name: 'Test02' })
    console.log(`Alterando nome de usuário de ${newUser.name} para ${updatedUser.name}.`)

    const userResponse = await getUserById(updatedUser.id)
    console.log(`Todos os testes com o usuário ${userResponse.email} foram finalizados com sucesso!`)
  } catch {
    console.log('Ocorreu um erro ao se comunicar com o banco de dados.')
  }
}

export default databaseTest
