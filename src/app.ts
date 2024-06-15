import express, {Application, Request, Response} from 'express'
import cors from 'cors'
import router from './app/routes';



const app : Application = express()


//parser
app.use(express.json());
app.use(cors());


// application routes
// student route
app.use('/api/ph-university', router);


const getController=(req:Request, res:Response) => {
  res.send('Hello World!')
}


app.get('/', getController);

// app.use(globalErrorHandler);

// //Not Found route
// app.use(notFound);


export default app;