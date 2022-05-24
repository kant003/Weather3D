
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';
import countries from './countries.js'
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

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.get('/RapidAPIHost', function (req, res) {
    res.send(process.env.RapidAPIHost)
});

/*app.get('/weather/:location', async (req, res) => {
    const { location } = req.params
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + location

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': process.env.RapidAPIHost,
            'X-RapidAPI-Key': process.env.RapidAPIKey
        }
    };
    const response = await fetch(url, options)
    const data = await response.json()
    data.current.condition.spanishDayText = weatherConditions.find(c => c.code === data.current.condition.code).languages[0].day_text
    data.current.condition.spanishNightText = weatherConditions.find(c => c.code === data.current.condition.code).languages[0].night_text
    // console.log(data)
    res.json(data)
})*/

app.get('/info/:ip', async (req, res) => {
    const { ip } = req.params

    const url = 'https://weatherapi-com.p.rapidapi.com/ip.json?q=' + ip

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

app.get('/icon/:icon', (req, res) => {
    const { icon } = req.params
    res.sendFile()
    res.status(200).send('Bienvenid@ al backend')
})


app.get('/weathers', (req, res) => {
    res.status(200).json(weathers)
})


const run = async () => {
    await app.listen(process.env.PORT || 3000)
    console.log('Server starter')
}

async function preLoadWeatherConditions() {
    const url = 'https://www.weatherapi.com/docs/conditions.json'
    const response = await fetch(url)
    const data = await response.json()
    //console.log(data)
    const spanishTraductions = data.map(a => ({ ...a, languages: a.languages.filter(l => l.lang_name === 'Spanish') }))
    return spanishTraductions
}

async function preLoadWeathers() {
    const results = []
   // let a = countries;
    let cs = []
    console.log(countries.length)
    for (let i = 0; i < 60; i++) {
        cs.push(countries[i])
    }
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': process.env.RapidAPIHost,
            'X-RapidAPI-Key': process.env.RapidAPIKey
        }
    };
     cs.forEach(async (c) => {
        const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + c.latitude+','+c.longitude
        const response = await fetch(url, options)
        const data = await response.json()

        //console.log(c.latitude+','+c.longitude,data.current)
        if(data.error) {
            console.log(data.error)
            return
        } 
        //if(data.current.condition!==undefined){
        //console.log(data.current.condition)
           
        data.current.condition.spanishDayText = weatherConditions.find(c => c.code === data.current.condition.code).languages[0].day_text
        data.current.condition.spanishNightText = weatherConditions.find(c => c.code === data.current.condition.code).languages[0].night_text
        data.current.condition.icon = weatherConditions.find(c => c.code === data.current.condition.code).icon
            
        //}
          // console.log(data)
       // console.log(data)
        results.push(data)
    })
    console.log(results)
    return results;
}



const weatherConditions = await preLoadWeatherConditions()
const weathers = await preLoadWeathers()
console.log('a',weathers)
//console.log(weatherConditions)
run().catch(error => console.log('Error to start:' + error))
