import {UserEntity} from "../../../entity/user.entity";
import {ImageEntity} from "../../../entity/image.entity";
import {ImageRepository} from "../image.repository";
import {PoolClient} from "pg";

export class ImageRepositoryImpl implements ImageRepository {
    constructor(private connection:PoolClient) {

    }

    count(): Promise<number> {
        throw new Error("Method not implemented.");
    }

    save(entity: ImageEntity): Promise<PropertyKey> {
        throw new Error("Method not implemented.");
    }

    update(entity: ImageEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

    deleteById(pk: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findById(pk: number): Promise<TestComplete> {
        throw new Error("Method not implemented.");
    }

    findAll(): Promise<ImageEntity[]> {
        throw new Error("Method not implemented.");
    }

    existById(pk: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


}