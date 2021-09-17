import process from 'node:process'
import test from 'ava'
import creator from './helper/logger.js'

const {DD_KEY} = process.env

function _logger(data, opts, method = 'log') {
	return new Promise((resolve, reject) => {
		const logger = creator(opts)
		logger
			.on('error', reject)
			.on('finish', resolve)

		logger[method](data).end()
	})
}

test('logger', async t => {
	// info
	await _logger({
		level: 'info',
		message: 'info',
		hostname: 'localhost',
		service: 'datadog-transport-test',
		ddsource: 'test',
	}, {
		DD_KEY,
		DD_TAGS: 'env:test,version:1.0.0',
	})

	// warn
	await _logger({
		level: 'warning',
		message: 'warning',
		hostname: 'localhost',
		service: 'datadog-transport-test',
		ddsource: 'test',
	}, {
		DD_KEY,
		DD_TAGS: 'env:test,version:1.0.0',
	})

	// error
	await _logger({
		level: 'error',
		message: 'error',
		hostname: 'localhost',
		service: 'datadog-transport-test',
		ddsource: 'test',
	}, {
		DD_KEY,
		DD_TAGS: 'env:test,version:1.0.0',
	})

	t.pass('ok')
})

test('throws', async t => {
	const error = await t.throwsAsync(_logger({
		level: 'error',
		message: 'Xii marquinhos',
	}, {
		DD_HOST: 'localhost',
	}))

	t.snapshot(error.message)
	t.pass('ok')
})
