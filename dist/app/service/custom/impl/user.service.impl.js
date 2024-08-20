import { pool } from "../../../config/database.config.js";
import { FactoryRepository, RepositoryType } from "../../../repository/factory.repository";
export class UserServiceImpl {
    async createNewUserAccount(user) {
        const connection = await pool.connect();
        //Business validation
        const userRepo = FactoryRepository.getInstance().getRepository(RepositoryType.USER, connection);
        // Finding user whether exist
        if (await userRepo.existById(user.email)) {
            throw new Error("User Already exist");
        }
        // Finding is contact associate with another user
        if ((await userRepo.findAll()).find(u => u.contact === user.contact)) {
            throw new Error("Contact number already associated with another user");
        }
        await userRepo.save(user);
        connection.release();
    }
    existUserAccount(email) {
        throw new Error("Method not implemented.");
    }
    getUserAccountDetails(email) {
        throw new Error("Method not implemented.");
    }
    deleteUserAccount(email) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=user.service.impl.js.map