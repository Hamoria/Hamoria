import { createContext } from 'react-router'
import type { APIClient } from '~/clients/server-api'

export const apiContext = createContext<APIClient>()
