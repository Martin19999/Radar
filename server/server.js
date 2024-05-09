/**
 * server.js
 * 
 * Nodejs backend running Express. 
 * Receives input from client in POST, send corresponding JSON back in GET.
 *     
 */


const url = 'http://localhost:3000';
const express = require('express');

const app = express();

app.listen(process.env.PORT ||5000); 

module.exports = app;  
