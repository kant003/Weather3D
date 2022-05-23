
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';
const app = express()
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


app.use(express.urlencoded());
app.use(express.json())
app.use(cors())
app.use(helmet())
dotenv.config()


app.use(express.static(__dirname + '/public'))


/*app.get('/', (req, res) => {
    res.status(200).send('Bienvenid@ al backend')
})*/

app.get('/',function(req,res) {
    res.sendFile('index.html');
  });
  
  app.get('/RapidAPIHost',function(req,res) {
    res.send(process.env.RapidAPIHost)
  });
app.get('/weather', async (req, res) => {
    const url = 'https://weatherapi-com.p.rapidapi.com/ip.json?q=83.37.21.90'

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': process.env.RapidAPIHost,
            'X-RapidAPI-Key': process.env.RapidAPIKey
        }
    };
    const response = await fetch(url, options)
    const data = await response.json()
    res.json(data)
})

app.get('/weathers', (req, res) => {
    res.status(200).send('Bienvenid@ al backend')
})


const run = async () => {
    await app.listen(process.env.PORT || 3000)
    console.log('Server starter')
}

run().catch(error => console.log('Error to start:' + error))
