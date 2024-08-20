export class AdRepository {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    async count() {
        const { rowCount } = await this.connection.query("SELECT * FROM ad");
        return rowCount;
    }
    save(ad) {
    }
    update(ad) {
    }
    deleteById(id) {
    }
    findById(id) {
    }
    findAll() {
    }
    existsById(id) {
    }
}
//# sourceMappingURL=ad.repository.js.map