import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
 
dotenv.config();
 
const sequelize = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(
          path.join(__dirname, "../../certificates/ca.pem")
        ),
      },
    },
  }
);
 
export default sequelize;