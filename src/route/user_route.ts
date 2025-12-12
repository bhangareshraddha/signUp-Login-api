import { FastifyInstance } from "fastify";
import UserController from '../controller/user_controller';

async function userRoute(app:FastifyInstance) {

    app.post('/signUp',UserController.createUser);
    app.post('/login',UserController.loginUser);
    app.put('/forgotPassword',UserController.forgotPassword);
    app.post('/decodeToken', UserController.decodeToken); 
    app.post('/refreshToken', UserController.refreshToken);
    app.get('/getuser',UserController.getUser);
    app.get('/getuserbyid/:id',UserController.getUserById);
    app.delete('/deleteUser/:id', UserController.deleteUser);
    app.get('/user/:name', UserController.getUserName);

    
}

export default userRoute