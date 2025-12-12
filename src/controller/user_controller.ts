import { FastifyRequest,FastifyReply } from "fastify";
import UserService from '../services/user_service';
import { error } from "node:console";

class UserController{

async createUser(req:FastifyRequest,rep:FastifyReply){
    try{
        const data=req.body as any
        const result=await UserService.createUser(data)
        rep.send({
            status:201,
            message:"sign Up sucessfully",
            result
        })
    }catch(error:any){
        rep.status(409).send({
            status:409,
            message:"user already exist",
        })
    }
}

async loginUser(req:FastifyRequest,rep:FastifyReply){
    try{
        let data = {
    email: (req.body as any).email,
    password: (req.body as any).password
};

        const result=await UserService.loginUser(data)
        rep.send({
            status:200,
            message:"login sucessfully",
            result
        })
    }catch(error:any){
        rep.status(500).send({
            status:404,
            message:"Email and Password does not match"
        })
    }
}

async forgotPassword(req:FastifyRequest,rep:FastifyReply){
    try{
        const data=req.body as any
         const result = await UserService.forgotPassword({
            email: data.email,
            newPassword: data.newPassword
        });
        rep.send({
            status:200,
            message:result.message,
            result
        })
    }catch(error:any){
         rep.status(400).send({
            status: 400,
            message: error.message || "Failed to reset password"
        });
    }
}

async decodeToken(req: FastifyRequest, rep: FastifyReply) {
    try {
        const token = (req.body as any).token;

        const result = await UserService.decodeToken(token);

        rep.send({
            status: 200,
            message: "Token decoded successfully",
            result
        });
    } catch (error: any) {
        rep.status(400).send({
            status: 400,
            message: error.message || "Failed to decode token"
        });
    }
}    

async refreshToken(req: FastifyRequest, rep: FastifyReply) {
    try {
        const data = req.body as any;

        const result = await UserService.refreshToken(data);

        rep.send({
            status: 200,
            message: "Access token refreshed",
            result
        });

    } catch (error: any) {
        rep.status(400).send({
            status: 400,
            message: error.message || "Failed to refresh token"
        });
    }
}

async getUser(req:FastifyRequest,rep:FastifyReply){
    try{
        const result=await UserService.getUser();
        rep.send({
            status:200,
            message:"get user sucessfully",
            result
        })
    }catch(error){
        throw error
    }
}

async getUserById(req:FastifyRequest,rep:FastifyReply){
    try{
        const {id}=req.params as any
        const result=await UserService.getUserById(id);
        rep.send({
            status:200,
            message:"get user sucessfully",
            result
        })
    }catch(error:any){
        throw error
    }
}

async deleteUser(req: FastifyRequest, rep: FastifyReply) {
    try {
        const id = (req.params as any).id;

        const result = await UserService.deleteUser(id);

        rep.send({
            status: 200,
            message: result.message
        });

    } catch (error: any) {
        rep.status(400).send({
            status: 400,
            message: error.message || "Failed to delete user"
        });
    }
}

async getUserName(req:FastifyRequest,rep:FastifyReply){
    try{
        const {user_name}=req.query as any
        const result=await UserService.getUserName(user_name);
        rep.send({
            status:200,
            message:"get user name sucessfully",
            result
        })
    }catch(error:any){
        throw error
    }
}

}

export default new UserController