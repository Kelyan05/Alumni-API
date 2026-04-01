require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Alumni API',
      version: '1.0',
      description: 'Blind bidding system for alumni spotlight'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        RegisterRequest: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'student@university.ac.uk' },
            password: { type: 'string', example: 'Password123!' }
          }
        },
        LoginRequest: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' }
          }
        },
        BidRequest: {
          type: 'object',
          properties: {
            amount: { type: 'number', example: 100 }
          }
        },
        ProfileRequest: {
          type: 'object',
          properties: {
            linkedinUrl: { type: 'string' },
            profilePic: { type: 'string' }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: { type: 'object' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string' }
          }
        }
      }
    }
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