import express, {Application, Request, Response} from 'express'
import cors from 'cors'
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';



const app : Application = express()


//parser
app.use(express.json());
app.use(cors());


// application routes
app.use('/api', router);


const getController=(req:Request, res:Response) => {
  res.send('Hello World!')
}


app.get('/', getController);

//Global Error Handler
app.use(globalErrorHandler);

//Not Found route
app.use(notFound);


export default app;