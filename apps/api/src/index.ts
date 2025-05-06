import { Hono } from 'hono'
import { describeRoute, openAPISpecs } from 'hono-openapi'
import { resolver, validator as vValidator } from 'hono-openapi/arktype'
import { Scalar } from 'npm:@scalar/hono-api-reference'
import { cors } from 'npm:hono/cors'

import { auth } from '@workspace/auth'
import { db, schema } from '@workspace/db'
import { add } from '@workspace/lib'
import { User } from '@workspace/schema'

import type { InsertUser } from '@workspace/db'

const app = (new Hono()).get(
	'/user',
	describeRoute({
		description: 'Say hello to the user',
		responses: {
			200: {
				description: 'Successful response',
				content: {
					'application/json': { schema: resolver(User) },
				},
			},
		},
	}),
	vValidator('query', User),
	(c) => {
		const query = c.req.valid('query')
		return c.json(query)
	},
).get('/', (c) => {
	return c.text('Hello Hono!')
})

app.get('add', (c) => {
	const value = add(1, 2)
	return c.json({ value })
})
app.use(
	'/api/auth/**', // or replace with "*" to enable cors for all routes
	// "*",
	cors({
		origin: 'http://localhost:5173', // replace with your origin
		allowHeaders: ['Content-Type', 'Authorization'],
		allowMethods: ['POST', 'GET', 'OPTIONS'],
		exposeHeaders: ['Content-Length'],
		maxAge: 600,
		credentials: true,
	}),
)

app.get(
	'/openapi',
	openAPISpecs(app, {
		documentation: {
			info: {
				title: 'Hono API',
				version: '1.0.0',
				description: 'Greeting API',
			},
			servers: [{ url: 'http://localhost:3001', description: 'Local Server' }],
		},
	}),
)

app.get('/scalar', Scalar({ url: '/openapi' }))

app.on(['POST', 'GET'], '/api/auth/**', (c) => {
	return auth.handler(c.req.raw)
})

export async function createDummyUser(data: InsertUser) {
	await db.insert(schema.users).values(data)
}

const port = 3001
console.log(`Server is running on http://localhost:${port}`)
console.log(`Database URL: ${Deno.env.get('DATABASE_URL') ?? 'Not set'}`)

Deno.serve({ port }, app.fetch)

export type AppType = typeof app
