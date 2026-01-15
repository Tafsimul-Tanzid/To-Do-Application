"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const todo_entity_1 = require("../entities/todo.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USER || 'todo_user',
    password: process.env.DB_PASSWORD || 'todo_password',
    database: process.env.DB_NAME || 'todo_db',
    entities: [user_entity_1.User, todo_entity_1.Todo],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: false,
});
//# sourceMappingURL=data-source.js.map