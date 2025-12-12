import UserModel from "../model/user_model";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "key";
import bcrypt from "bcrypt";

class UserService {

    async createUser(data: any) {
        let userExit = await UserModel.findOne({
            where: { email: data.email, password: data.password }
        })
        if (userExit) {
            throw new Error('user already existed')
        }

        const hashedpassword = await bcrypt.hash(data.password, 10)
        data.password = hashedpassword;

        const result = await UserModel.create(data)

       const accessToken = jwt.sign(
        { id: result.dataValues.id, email: result.dataValues.email },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
        { id: result.dataValues.id, email: result.dataValues.email },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

        await UserModel.update(
        { token: accessToken, refresh_token: refreshToken },
        { where: { id: result.dataValues.id } }
    );

     return { 
        user: result, 
        accessToken, 
        refreshToken 
    };  

    }

    async loginUser(data: any) {

        const user: any = await UserModel.findOne({
            where: { email: data.email },
        });

        if (!user) {
            throw new Error("not found");
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new Error("Password does not match");
        }
        
         const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

        const refreshToken = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    await UserModel.update(
        { token: accessToken, refresh_token: refreshToken },
        { where: { id: user.id } }
    );
    
     return { 
        user, 
        accessToken, 
        refreshToken 
    };
    
    }

    async forgotPassword(data: any) {

        const user = await UserModel.findOne({
            where: { email: data.email }
        });
        if (!user) {
            throw new Error("Email not found");
        }

        const hashedPassword = await bcrypt.hash(data.newPassword, 10);
        await UserModel.update(
            { password: hashedPassword },
            { where: { email: data.email } }
        );
        return { message: "Password updated successfully" };
    }

    async decodeToken(token: string) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error: any) {
        throw new Error("Invalid or expired token");
    }
}

async refreshToken(data: any) {
    const { refreshToken } = data;

    const user = await UserModel.findOne({
        where: { refresh_token: refreshToken }
    });

    if (!user) {
        throw new Error("Invalid refresh token");
    }

    try {
        
        const decoded: any = jwt.verify(refreshToken, JWT_SECRET);

        const newAccessToken = jwt.sign(
            { id: decoded.id, email: decoded.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        await UserModel.update(
            { token: newAccessToken },
            { where: { id: user.dataValues.id } }
        );

        return { accessToken: newAccessToken };

    } catch (error) {
        throw new Error("Expired refresh token");
    }
}

async getUser(){
    const result=await UserModel.findAll();
    return result
}

async getUserById(id:any){
    const result=await UserModel.findByPk(id);
    return result
}

async deleteUser(id: string) {

    const user = await UserModel.findOne({
        where: { id }
    });

    if (!user) {
        throw new Error("User not found");
    }

    await UserModel.update(
        { is_deleted: true },
        { where: { id } }
    );

    return { message: "User deleted successfully (soft delete)" };
}

async getUserName(user_name:any){
    const result=await UserModel.findOne({
        where:{user_name:user_name}
    })
    return result
}

}
export default new UserService