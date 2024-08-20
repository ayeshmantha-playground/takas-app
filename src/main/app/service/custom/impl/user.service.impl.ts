import {UserTo} from "../../../to/user.to";
import {UserService} from "../user.service";
import {pool} from "../../../config/database.config.js";
import {FactoryRepository, RepositoryType} from "../../../repository/factory.repository";
import {UserRepository} from "../../../repository/custom/user.repository";

export class UserServiceImpl implements UserService {
    async createNewUserAccount(user: UserTo): Promise<void> {
        const connection = await pool.connect();

        //Business validation

        const userRepo = FactoryRepository.getInstance().getRepository(RepositoryType.USER, connection) as UserRepository;

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

    existUserAccount(email: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    getUserAccountDetails(email: string): Promise<UserTo[]> {
        throw new Error("Method not implemented.");
    }

    deleteUserAccount(email: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}