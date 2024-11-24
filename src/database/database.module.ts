import { SequelizeModule } from "@nestjs/sequelize";


export const databaseModule = SequelizeModule.forRoot({
    dialect: "postgres",
    host: "localhost",
    port: 5435,
    username: "admin",
    password: "admin1",
    database: "future-city",
    autoLoadModels: true,
    
})