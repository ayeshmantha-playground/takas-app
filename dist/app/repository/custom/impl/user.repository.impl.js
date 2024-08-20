export class UserRepositoryImpl {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    async count() {
        const { rowCount } = await this.connection.query('SELECT * FROM "user"');
        return rowCount;
    }
    async save(user) {
        await this.connection.query('INSERT INTO "user" (email, name, contact) VALUES ($1,$2,$3)', [user.email, user.name, user.contact]);
        return user.email;
    }
    async update(user) {
        await this.connection.query('UPDATE "user" SET name=$1, contact=$2 WHERE email=$3', [
            user.name, user.contact, user.email
        ]);
    }
    async deleteById(email) {
        await this.connection.query('DELETE FROM "user" WHERE email=$1', [email]);
    }
    async findById(email) {
        const { rows: [user] } = await this.connection.query('SELECT * FROM "user" WHERE email=$1', [email]);
        return user;
    }
    async findAll() {
        const { rows } = await this.connection.query('SELECT * FROM "user"');
        return rows;
    }
    async existById(email) {
        return (!!(await this.findById(email)));
    }
}
//# sourceMappingURL=user.repository.impl.js.map