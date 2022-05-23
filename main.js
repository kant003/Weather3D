
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
const app = express()



app.use(express.urlencoded());
app.use(express.json())
app.use(cors())
app.use(helmet())
dotenv.config()


app.get('/', (req, res) => {
    res.status(200).send('Bienvenid@ al backend')
})

app.get('/weather/:country', (req, res) => {
    res.status(200).send('Bienvenid@ al backend')
})

app.get('/weathers', (req, res) => {
    res.status(200).send('Bienvenid@ al backend')
})


const run = async () => {
    await app.listen(process.env.PORT || 3000)
    console.log('Server starter')
}

run().catch(error => console.log('Error to start:' + error))
