import { type } from 'arktype'

export const User = type({
	name: 'string',
	platform: "'android' | 'ios'",
	'versions?': '(number | string)[]',
})
