
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logs.log' })
    ]
  });
  
  exports.addLog = async function  (method, number1, number2) {
    console.log(`Request for ${method} two numbers ${number1} and ${number2}`);
    logger.info(`Request for ${method} two numbers ${number1} and ${number2}`);
}

exports.addErrorLog = async function  (message) {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const dateString = date.toLocaleDateString();
    console.log( message);
    logger.error( message)
}