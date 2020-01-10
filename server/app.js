const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8989 });

const users = [];

const broadcast = (data, ws) => {
  console.log('broadcast : ', JSON.stringify(data));
  
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      console.log('send@broadcast');
      
      client.send(JSON.stringify(data));
    }
  });
};

wss.on("connection", ws => {
  console.log("on_connection");
  let index;
  ws.on("message", message => {
    const data = JSON.parse(message);
    console.log("on_message : ", data);
    switch (data.type) {
      case "ADD_USER": {
        index = users.length;
        users.push({ name: data.name, id: index + 1 });
        console.log(
          "send@on_message : ",
          JSON.stringify({
            type: "USERS_LIST",
            users
          })
        );
        ws.send(
          JSON.stringify({
            type: "USERS_LIST",
            users
          })
        );
        broadcast({ type: "USERS_LIST", users }, ws);
        break;
      }
      case "ADD_MESSAGE":
        broadcast({ type: "ADD_MESSAGE", message: data.message, author: data.author }, ws);
        break;
      default:
        break;
    }
  });

  ws.on("close", () => {
    users.splice(index, 1);
    broadcast(
      {
        type: "USERS_LIST",
        users
      },
      ws
    );
  });
});
