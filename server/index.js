require('dotenv').config();
const path = require('path');
const express = require('express')
const app = express()
const port = process.env.PORT||3001
const device = require('express-device');
Object.assign(global,{raiz:path.join(__dirname, '../')});
console.log(global.raiz);
app.use(device.capture());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Origin", "10.120.132.7");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.header("Control-Svr", os.hostname());
  next();
});

app.use('/public', express.static(path.join(global.raiz, './public/')));
app.use('/public/js', express.static(path.join(global.raiz, './js/')));
app.use('/public/css', express.static(path.join(global.raiz, './css/')));
app.use('/assets', express.static(path.join(global.raiz, './public/assets')));
app.get('/', (req, res) => {
  res.sendFile(path.join(global.raiz, './views', 'index.html'));
})

const home = require(path.join(global.raiz, './routes/home/route'));
app.use('/home', home);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

