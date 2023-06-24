const express = require('express');
const colors = require('colors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

app = express();
puerto = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/', (req, res)=>{
  res.setHeader('Content-type', 'text/html');
  res.sendFile('./public/index.html');
})

app.get('/peliculas', (req, res)=>{
  const file = fs.readFileSync('./peliculas.json', 'UTF-8');
  res.setHeader('Content-type', 'text/json');
  res.send(file);
});

app.post('/new', (req, res)=>{
  res.setHeader('Content-type', 'text/plain');
  const nombre = req.body.nombre;
  const rating = req.body.rating;

  //Abrir archivo
  let file = fs.readFileSync('./peliculas.json', 'UTF-8');

  //Convertirlo a un arreglo
  const json = JSON.parse(file);

  //Insertar nuevo elemento
  json.peliculas.push({"nombre": nombre, "rating": parseInt(rating)});

  //Guardar Json
  file = fs.writeFileSync('./peliculas.json', JSON.stringify(json));

  res.send('Datos Guardados con exito');
});

app.listen(puerto, () =>{
  console.log('Servidor corriendo en el puerto: '.green, puerto);
});