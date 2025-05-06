import { hc } from 'hono/client'

import type { AppType } from '@apps/api'

export default (...args: Parameters<typeof hc>) => hc<AppType>(...args)
