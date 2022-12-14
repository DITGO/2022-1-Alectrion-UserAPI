import { Controller } from '../protocols/controller'
import { badRequest, HttpResponse, ok, serverError } from '../helpers'
import { BadRequestError } from '../errors'
import {
  GetUserError,
  GetUserUseCase
} from '../../useCase/getUser/getUserUseCase'
import { User } from '../../domain/entities/user'

type HttpRequest = {
  userName?: string
  email?: string
  userId?: string
}
type Model = Error | User[]

export class GetUserController extends Controller {
  constructor(private readonly getUserUseCase: GetUserUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.getUserUseCase.execute(params)
    if (response.isSuccess && response.data) {
      return ok(response.data)
    } else {
      if (response.error instanceof GetUserError) {
        return badRequest(new BadRequestError(response.error.message))
      } else return serverError(response.error)
    }
  }
}
