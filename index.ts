
import Fastify from 'fastify';
import sequelize from './src/db/connection';
import dotenv from 'dotenv';
import userRoute from './src/route/user_route';


dotenv.config();

const app = async () => {
  
  const app=Fastify({logger:true}) 

  await sequelize.authenticate();

  console.log("DB CONNECT SUCESSFULLY");
  
  await sequelize.sync({alter:true});

  const PORT:any=process.env.Port || 9999

  app.register(userRoute);
  

  app.listen({port:PORT},async()=>{
    console.log(`server is running on port ${PORT}`)
  })

  console.log("Connected DB =", process.env.DB_NAME);


};

app();