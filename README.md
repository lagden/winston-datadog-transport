# winston-datadog-transport

[![NPM version][npm-img]][npm]
[![Node.js CI][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]

[npm-img]:         https://img.shields.io/npm/v/@tadashi/winston-datadog-transport.svg
[npm]:             https://www.npmjs.com/package/@tadashi/winston-datadog-transport
[ci-img]:          https://github.com/lagden/winston-datadog-transport/actions/workflows/nodejs.yml/badge.svg
[ci]:              https://github.com/lagden/winston-datadog-transport/actions/workflows/nodejs.yml
[coveralls-img]:   https://coveralls.io/repos/github/lagden/winston-datadog-transport/badge.svg?branch=main
[coveralls]:       https://coveralls.io/github/lagden/winston-datadog-transport?branch=main


Custom transport for Winston.


## Install

```
$ npm i -S @tadashi/winston-datadog-transport
```

## API


### DDTransport( \[options\]): TransportStream

> Type: TransportStream


#### options 

> Type: object  
> Default: {}


Name        | Type      | Default                        | Required
----------- | --------- | -----------------              | ------------
DD_HOST     | string    | http-intake.logs.datadoghq.com | no
DD_PATH     | string    | /v1/input                      | no
DD_TAGS     | string    | -                              | no
DD_KEY      | string    | -                              | yes


## Usage

```js
import winston from 'winston'
import DDTransport from '@tadashi/winston-datadog-transport'

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

const logger = createLogger({...opts, transports: [new DDTransport({
  DD_KEY: 'cbadf2...',
})]})

logger.log({
  level: 'info',
  message: 'Apenas um show'
})
```


## License

MIT © [Thiago Lagden](https://github.com/lagden)
