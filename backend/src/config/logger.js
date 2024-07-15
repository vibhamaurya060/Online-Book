import winston from 'winston';
const { combine, timestamp, label, prettyPrint } = winston.format;

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        label({ label: 'right meow!' }),
        timestamp(),
        prettyPrint()
      ),
    transports: [
    
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],

  });



logger.log({
    level: 'info',
    message: 'info time is the testing at?'
  });

  logger.log({
    level: 'error',
    message: 'error time is the testing at?'
  });

  export default logger