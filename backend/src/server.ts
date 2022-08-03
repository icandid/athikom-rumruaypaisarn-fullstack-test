import config from './config'
import app from './app'

app
  .listen(config.port, () => {
    console.info('Server started on port %s.', config.port)
  })
  .on('error', err => console.log(err))
