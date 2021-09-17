import {hostname as _hostname} from 'node:os'
import got from 'got'

async function dispatch(data, opts) {
	const {
		DD_HOST = 'http-intake.logs.datadoghq.com',
		DD_PATH = '/v1/input',
		DD_KEY,
		DD_TAGS: ddtags = '',
	} = opts

	const hostname = _hostname()
	const ddsource = 'js'

	const endpoint = `https://${DD_HOST}${DD_PATH}/${DD_KEY}`
	await got.post(endpoint, {
		json: {
			hostname,
			ddsource,
			...data,
		},
		searchParams: {
			ddtags,
		},
	})

	return data
}

export default dispatch
