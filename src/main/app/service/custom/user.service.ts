import {UserTo} from "../../to/user.to";

export interface UserService {
    createNewUserAccount(user: UserTo): Promise<void>;

    existUserAccount(email: string): Promise<boolean>;

    getUserAccountDetails(email: string): Promise<UserTo[]>;

    deleteUserAccount(email: string): Promise<void>;


}