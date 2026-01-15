"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1736668800000 = void 0;
const typeorm_1 = require("typeorm");
class InitialMigration1736668800000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '36',
                    isPrimary: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'createdAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'todos',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '36',
                    isPrimary: true,
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['PENDING', 'IN_PROGRESS', 'DONE'],
                    default: "'PENDING'",
                },
                {
                    name: 'createdAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'userId',
                    type: 'varchar',
                    length: '36',
                },
            ],
        }), true);
        await queryRunner.createIndex('todos', new typeorm_1.TableIndex({
            name: 'IDX_todos_userId',
            columnNames: ['userId'],
        }));
        await queryRunner.createForeignKey('todos', new typeorm_1.TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('todos', true);
        await queryRunner.dropTable('users', true);
    }
}
exports.InitialMigration1736668800000 = InitialMigration1736668800000;
//# sourceMappingURL=1736668800000-InitialMigration.js.map