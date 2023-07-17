const { app, BrowserWindow, Notification} = require('electron')
// include the Node.js 'path' module at the top of your file
const path = require('path')

// modify your existing createWindow() function
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: "./icons/icon.png",
    titleBarStyle: 'hidden',
    titleBarOverlay: false
    
  })

  win.loadFile('index.html')
 }
// ...


// Importing the required modules
const WebSocketServer = require('ws');
 
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 })
 
// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");
 
    // sending message to client
    ws.send('Welcome, you are connected!');
 
    //on message from client
    ws.on("message", data => {
        //Looks at the message content
        console.log(`Client has sent us: ${data}`)
        if (data == 'Send Me') {
            showNotification()
        }
    });
 
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has disconnected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");

  app.whenReady().then(() => {
    createWindow()
  })



const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({
     title: NOTIFICATION_TITLE,
     body: NOTIFICATION_BODY,
     icon: './icons/icon.png'
    }).show()
}

// app.whenReady().then(createWindow).then(showNotification)


  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

