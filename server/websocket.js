export const wsInit = (app, expressWs) => {

  let isApiBlocked = false

  app.use('/todos',(reg, res, next) => {
    isApiBlocked ?
      res.send('api blocked') :
      next()
  })

  expressWs.getWss().on('connection', function (ws) {
    ws.send('connection open')
  })
  const ws = (ws, req) => {
    ws.on('message', msg => {
      if (msg === "block") {
        isApiBlocked = true
        console.log(JSON.stringify({type: 'block'}))
        ws.send(JSON.stringify({type: 'block'}))
      }
      if (msg === "unblock") {
        isApiBlocked = false
        console.log(JSON.stringify({type: 'unblock'}))
        ws.send(JSON.stringify({type: 'unblock'}))
      }
    })
    ws.on('open', msg => {
      ws.send('hello')
    })
  }
  app.ws('/ws', ws);
  return ws;
}
