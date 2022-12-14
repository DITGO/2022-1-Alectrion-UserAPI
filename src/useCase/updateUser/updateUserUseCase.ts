import { UseCase, UseCaseReponse } from '../protocols/useCase'
import { Repository } from '../../repository/protocol/repository'
import { Encryptor } from '../../services/encryptor'

export interface UpdateUserData {
  userId: string
  name?: string
  email?: string
  username?: string
  jobFunction?: string
  password?: string
}

export class UpdateUserError extends Error {
  constructor() {
    super('Não foi possivel atualizar o usuário.')
    this.name = 'UpdateUserError'
  }
}

export class UpdateUserUseCase implements UseCase<{ message: string }> {
  constructor(
    private readonly userRepository: Repository,
    private readonly encryptor: Encryptor
  ) {}

  async execute(
    userUpdate: UpdateUserData
  ): Promise<UseCaseReponse<{ message: string }>> {
    const { userId, name, email, jobFunction, username } = userUpdate

    if (userUpdate.password !== undefined) {
      const hashedPassword = this.encryptor.encrypt(userUpdate.password)
      await this.userRepository.updateOne({
        ...userUpdate,
        password: hashedPassword
      })
      return { isSuccess: true, data: { message: 'Usuário atualizado!' } }
    } else {
      return (await this.userRepository.updateOne({
        userId,
        name,
        email,
        jobFunction,
        username
      }))
        ? { isSuccess: true, data: { message: 'Usuário atualizado!' } }
        : {
            isSuccess: false,
            error: new UpdateUserError()
          }
    }
  }
}
