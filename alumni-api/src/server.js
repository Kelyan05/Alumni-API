require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: { title: 'Alumni API', version: '1.0', description: 'Coursework Backend' },
    servers: [{ url: 'http://localhost:3000' }]
  },
  apis: ['./routes/*.js']
};



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));
// Routers
const alumnirouter = require('./routes/alumnirouter')
const bidrouter = require('./routes/bidrouter')

// Middleware
app.use(express.json())
app.use(express.static('public'))

// Routes
app.use('/alumni', alumnirouter)
app.use('/bid', bidrouter)

app.listen(PORT, () => {
    console.log(`Alumni Service running on PORT ${PORT}`)
})