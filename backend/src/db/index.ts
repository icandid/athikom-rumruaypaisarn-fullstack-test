// eslint-disable-next-line
const knexfile = require('../../knexfile')

import {knex} from 'knex'
import config from '../config'

const knexInstance = knex(knexfile[config.env])

export default knexInstance
