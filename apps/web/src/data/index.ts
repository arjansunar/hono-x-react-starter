import client from '@workspace/api-client'

const apiClient = client('/api')

export async function demoApi() {
	const res = await apiClient.user.$get({
		query: { 'name': 'name', 'platform': 'android', 'versions': [] },
	})
	return await res.json()
}
