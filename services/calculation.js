
const winston = require('winston');
const w_logger = require('./logger')
exports.addition = async function (req, res, nxt) {
    try {
        var number1 = req.body.number1;
        var number2 = req.body.number2;
        addLog('adding', number1, number2)
        var result = await add(number1, number2)
        res.json({ statusCode: 200, result: result, message: 'Success' })
        console.log(req.query)

    } catch (error) {
        addErrorLog(error.message);
        res.json({ statusCode: 500, result: null, message: error.message })
    }
}
exports.subtraction = async function (req, res, nxt) {
    try {
        var number1 = req.body.number1;
        var number2 = req.body.number2;
        addLog('subtracting', number1, number2)
        var result = await subtract(number1, number2)
        res.json({ statusCode: 200, result: result, message: 'Success' })
        console.log(req.query)

    } catch (error) {
        addErrorLog(error.message);
        console.log(error)
        res.json({ statusCode: 500, result: null, message: error.message })
    }
}
exports.multiplication = async function (req, res, nxt) {
    try {
        var number1 = req.body.number1;
        var number2 = req.body.number2;
        addLog('multipling', number1, number2)
        var result = await multiply(number1, number2)
        res.json({ statusCode: 200, result: result, message: 'Success' })
        console.log(req.query)

    } catch (error) {
        addErrorLog(error.message);
        res.json({ statusCode: 500, result: null, message: error.message })
    }
}
exports.division = async function (req, res, nxt) {
    try {
        var number1 = req.body.number1;
        var number2 = req.body.number2;
        addLog('division', number1, number2)
        var result = await divide(number1, number2)
        res.json({ statusCode: 200, result: result, message: 'Success' })
        console.log(req.query)

    } catch (error) {
        console.log(error.message)
        addErrorLog(error);
        res.json({ statusCode: 500, result: null, message: error.message })
    }
}
exports.n_addition = async function (req, res, nxt) {
    try {
        var number_string = req.query.numbers
        if (number_string.match(/^ *\d+ *(?:, *\d+ *)*$/g)) {
            var numbers = number_string.split(',');
            var result = 0;
            for (let num of numbers) {
                result += parseInt(num);
            }
            console.log(req.query)
            res.json({ statusCode: 200, result: result, message: 'Success' })
        }
        else {
            res.json({ statusCode: 200, result: 'Incorrect String Value. Expecting coma seperated numbers', message: 'Error' })
        }
    } catch (error) {
        logger.error( error.message)
        return (error.message);
    }
}

const multiply = (number1, number2) => {
    try {
        if (!isInteger(number1) || !isInteger(number2)) {
            var message = 'One or both of the parameters is not a number.'
            addErrorLog(message);
            throw new Error(message);
        }
        return parseFloat(number1) * parseFloat(number2);
    } catch (error) {
        logger.error( error.message)
        return (error.message);
    }
}
const subtract = (number1, number2) => {
    try {
        if (!isInteger(number1) || !isInteger(number2)) {
            var message = 'One or both of the parameters is not a number.'
            addErrorLog(message);
            throw new Error(message);
        }
        return parseFloat(number1) - parseFloat(number2);
    } catch (error) {
        logger.error( error.message)
        return (error.message);
    }
}
const add = (number1, number2) => {
    try {
        if (!isInteger(number1) || !isInteger(number2)) {
            var message = 'One or both of the parameters is not a number.'
            addErrorLog(message);
            throw new Error(message);
        }
        return parseFloat(number1) + parseFloat(number2);
    } catch (error) {
        logger.error( error.message)
        return (error.message);
    }
}
const divide = (number1, number2) => {
    try {
        if (!isInteger(number1) || !isInteger(number2)) {
            var message = 'One or both of the parameters is not a number.'
            addErrorLog(message);
            throw new Error(message);
        }
        if (parseFloat(number2) === 0) {
            addErrorLog('Cannot divide by zero.');
            throw new Error('Cannot divide by zero.');
        }
        return parseFloat(number1) / parseFloat(number2);
    } catch (error) {
        logger.error( error.message)
        return (error.message);
    }
}
const isInteger = (str) => {
    console.log(str)
    return /^-?\d+$/.test(str);
};
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
const addLog = (method, number1, number2) => {
    console.log(`Request for ${method} two numbers ${number1} and ${number2}`);
    logger.info(`Request for ${method} two numbers ${number1} and ${number2}`);
}
const addErrorLog = (message) => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const dateString = date.toLocaleDateString();
    console.log( message);
    logger.error( message)
}

