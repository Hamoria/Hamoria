/**
 * This is the API client, a class that is in charge of making the requests to
 * the API. It extends `BaseClient` to get some useful methods like `get`,
 * `post`, `patch`, and `delete`.
 *
 * The class is instantiated with the access token, which is used to
 * authenticate the requests. The access token is passed in the `Authorization`
 * header of the request automatically, so any instance of the class can be used
 * to make authenticated requests to the API automatically.
 *
 * This is similar to how Axios works, but with a more modern approach using
 * the Fetch API.
 * @module
 * @author Sergio Xalambrí
 * @copyright
 */
import { APIClient as BaseClient } from '@edgefirst-dev/api-client'
import { z } from 'zod'
// import * as Contact from '~/entities/contact'

export const Schema = z.object({
  id: z.number(),
})
export class APIClient extends BaseClient {
  constructor(protected accessToken: string) {
    super(new URL(process.env.RESOURCE_HOST || 'http://localhost:5100/api'))
  }

  //   override async before(request: Request) {
  //     request.headers.set('Authorization', `Bearer ${this.accessToken}`)
  //     return request
  //   }

  override async after(_: Request, response: Response) {
    if (response.ok) return response
    let data = await response.json()
    let { error } = z.object({ error: z.string() }).parse(data)
    throw new Error(error)
  }

  async ping(query?: string) {
    let response = query
      ? await this.get(`/docs?q=${encodeURIComponent(query.trim())}`)
      : await this.get('/docs')
    let data = await response.json()
    return z.object({ contacts: data }) // z.array(Contact.Schema) }).parse(data).contacts
  }
}
