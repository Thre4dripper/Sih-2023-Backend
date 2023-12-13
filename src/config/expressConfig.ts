import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as path from 'path'
import { sequelize } from './sequelizeConfig'

const server = async () => {
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(
        cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: [
                'Content-Type',
                'Authorization',
                'X-Requested-With',
                'Accept',
                'Origin',
                'Access-Control-Allow-Headers',
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Methods',
                'Accept-Encoding',
                'Accept-Language',
                'Cache-Control',
                'Connection',
                'Content-Length',
                'Host',
                'Pragma',
                'Referer',
                'User-Agent',
                'X-Forwarded-For',
                'X-Forwarded-Proto',
            ],
            exposedHeaders: [
                'Content-Type',
                'Authorization',
                'X-Requested-With',
                'Accept',
                'Origin',
                'Access-Control-Allow-Headers',
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Methods',
                'Accept-Encoding',
                'Accept-Language',
                'Cache-Control',
                'Connection',
                'Content-Length',
                'Host',
                'Pragma',
                'Referer',
                'User-Agent',
                'X-Forwarded-For',
                'X-Forwarded-Proto',
            ],
            optionsSuccessStatus: 204,
            credentials: true,
            preflightContinue: false,
        })
    )
    // app.use(helmet())
    app.use(express.static(path.join(__dirname, '../public')))
    // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(getFinalSwagger()));
    app.use(function (_req, res) {
        res.render(path.join(__dirname, '../views/error/404'), {
            head: {
                title: 'Page Not Found',
            },
            content: {
                title: 'OOPS!',
                description: 'Page Not Found. Error Code: 404',
            },
        })
    })

    try {
        await(async () => {
            await sequelize.authenticate()
            console.log('\x1b[32m%s\x1b[0m', 'Database Connected successfully.')
            await sequelize.sync({ alter: false })
            console.log('\x1b[32m%s\x1b[0m', 'Database Synced successfully.')
        })()
    } catch (err) {
        console.error('Unable to connect to the database:', err)
    }
    return app
}

export default server