import { sequelize } from './sequelizeConfig'

require('dotenv').config()
import express from 'express'
import * as process from 'process'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
        app.listen(process.env.PORT, () => {
            console.log(`app listening at http://localhost:${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err)
    })