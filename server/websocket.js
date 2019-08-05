export const wsInit = (app, expressWs) => {

  expressWs.getWss().on('connection', function (ws) {
    ws.send('connection open')
  })

  //*Advanced Task: blocking API
  // Add functionality to block the API when the correct ws messages will arrive from client
  const ws = (ws, req) => {
    ws.on('message', msg => {
      if (msg === "block") {
      }
      if (msg === "unblock") {
      }
    })
    ws.on('open', msg => {
      ws.send('hello')
    })
  }
  app.ws('/ws', ws);
  return ws;
}
