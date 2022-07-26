require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();


app.use(express.static('public'));

//rutas
app.get('/', (req, res) => {res.sendFile( path.join(__dirname, 'views', 'index.html'));});
app.get('/carrito', (req, res) => {res.sendFile( path.join(__dirname, 'views', 'productCart.html'));});
app.get('/producto', (req, res) => {res.sendFile( path.join(__dirname, 'views', 'productDetail.html'));});
app.get('/login', (req, res) => {res.sendFile( path.join(__dirname, 'views', 'login.html'));});
app.get('/register', (req, res) => {res.sendFile( path.join(__dirname, 'views', 'register.html'));});
app.get('/prueba', (req, res) => {res.sendFile( path.join(__dirname, 'views', 'prueba.html'));});


//iniciar servidor
app.listen(process.env.PORT || 3030, () => {
    console.log(`Servidor iniciado en puerto http://localhost: ${process.env.PORT || 3030}`);
});