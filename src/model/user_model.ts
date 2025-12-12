import { DataTypes,Model } from "sequelize";
import sequelize from "../db/connection";

class UserModel extends Model{}
UserModel.init({
id:{
    type:DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    allowNull:false,
    primaryKey:true
},
user_name:{
    type:DataTypes.STRING,
    allowNull:false,
},

email:{
    type:DataTypes.STRING,
    allowNull:false
},
password:{
    type:DataTypes.STRING,
    allowNull:false
},
token:{                         
    type: DataTypes.TEXT,
    allowNull: true
},

refresh_token:{            
    type: DataTypes.TEXT,
    allowNull: true
},

is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
}

},{
sequelize,
timestamps:false,
tableName:'user'
})

export default UserModel