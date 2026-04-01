require('dotenv').config();
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3000;

//swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Alumni API',
      version: '1.0',
      description: 'Blind bidding system for alumni spotlight'
    },
    servers: [
      { url: `http://localhost:${PORT}` }
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
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'student@university.ac.uk' },
            password: { type: 'string', example: 'Password123!' }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'student@university.ac.uk' },
            password: { type: 'string', example: 'Password123!' }
          }
        },
        MakeBidRequest: {
          type: 'object',
          required: ['amount'],
          properties: {
            amount: { type: 'number', example: 100 }
          }
        },
        ProfileRequest: {
          type: 'object',
          properties: {
            linkedinUrl: { type: 'string', example: 'https://linkedin.com/in/user' },
            profilePic: { type: 'string', example: 'https://image-url.com/pic.jpg' }
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
            error: { type: 'string', example: 'Error message' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

//middleware
app.use(express.json());
app.use(express.static('public'));

//routes
const alumnirouter = require('./routes/alumnirouter');
const bidrouter = require('./routes/bidrouter');

app.use('/alumni', alumnirouter);
app.use('/bid', bidrouter);


//global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

//starts server
app.listen(PORT, () => {
  console.log(`Alumni Service running on PORT ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`); //bonus message log for easy access to docs
});