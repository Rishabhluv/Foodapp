const express = require('express')
const app = express()

const path=  require('path');

const port = 5000

const mongodb = require('./db')

app.use(express.json())

const cors =require ("cors");   
app.use(cors());

app.use(express.static(path.resolve(__dirname,'../build')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With ,Content-Type,Accept"
//   );
//   next();
// })

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.use('/api/', require("./Routes/CreateUser"));
app.use('/api/', require("./Routes/DisplayData"));
app.use('/api/', require("./Routes/OrderData"));

mongodb();