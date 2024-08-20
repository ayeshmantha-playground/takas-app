import {FactoryService} from "../service/factory.service";
import {PoolClient} from "pg";
import {UserRepositoryImpl} from "./custom/impl/user.repository.impl";
import {AdRepositoryImpl} from "./custom/impl/ad.repository.impl";
import {ImageRepositoryImpl} from "./custom/impl/image.repository.impl";
import {QueryRepositoryImpl} from "./custom/impl/query.repository.impl";

export enum RepositoryType {
    AD = 0, USER, IMAGE, QUERY
}


export class FactoryRepository {

    private static INSTANCE: FactoryRepository = new FactoryRepository();

    private constructor() {

    }

    static getInstance(): FactoryRepository {
        return this.INSTANCE;
    }

    getRepository(type: RepositoryType, connection: PoolClient) {
        switch (type) {
            case RepositoryType.USER:
                return new UserRepositoryImpl(connection);
            case RepositoryType.AD:
                return new AdRepositoryImpl(connection);
            case RepositoryType.IMAGE:
                return new ImageRepositoryImpl(connection);
                case RepositoryType.QUERY:
                    return new QueryRepositoryImpl(connection);
            default:
                return null;
        }
    }

}