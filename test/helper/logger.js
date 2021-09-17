import winston from 'winston'
import DDTransport from '../../src/datadog-transport.js'

const {
	createLogger,
	config,
	format,
} = winston

const opts = {
	levels: config.syslog.levels,
	exitOnError: false,
	format: format.json(),
}

function creator(options) {
	return createLogger({...opts, transports: [new DDTransport(options)]})
}

export default creator
