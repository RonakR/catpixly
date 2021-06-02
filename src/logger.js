import winston from 'winston'

import config from './config.js'

const { logLevel } = config

const logger = winston.createLogger({
	level: logLevel,
	format: winston.format.json(),
	defaultMeta: { service: 'catpixly' },
	transports: [new winston.transports.Console()],
	format: winston.format.combine(winston.format.colorize({ all: true }), winston.format.simple()),
})

export default logger
