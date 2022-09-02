import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('API running...')
})

app.listen(3333, () => console.log('SERVER RUNNING: POST 3333'))
