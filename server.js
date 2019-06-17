const app = require('./index')

const PORT = process.env.PORT || 3000

console.log(`Qrcode service started at port ${PORT}`)

app.listen(PORT)
