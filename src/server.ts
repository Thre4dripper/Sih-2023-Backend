import server from './config/expressConfig'

const port = process.env.PORT || 3000;

(async () => {
    const app = await server()
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
})()