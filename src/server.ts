import express from 'express';
import v1Router from './routers/v1/index.router';
import v2Router from './routers/v2/index.router';
import { appErrorHandler, genericErrorHandler } from './middlewares/error.middleware';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
const app = express();

app.use(express.json());

/**
 * Registering all the routers and their corresponding routes with out app server object.
 */

app.use(attachCorrelationIdMiddleware);
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router); 

app.get("/",(req,res)=>{
    res.status(200).json({message:"This is Abhik"})
})

/**
 * Add the error handler middleware
 */

app.use(appErrorHandler);
app.use(genericErrorHandler);


// app.listen(serverConfig.PORT, () => {
//     logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
//     logger.info(`Press Ctrl+C to stop the server.`);
// });

export default app;