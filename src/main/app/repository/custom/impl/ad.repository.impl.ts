import {PoolClient} from "pg";
import {AdEntity} from "../../../entity/ad.entity";
import {AdRepository} from "../ad.repository";

export class AdRepositoryImpl implements AdRepository {
    constructor(private connection: PoolClient) {

    }

    count(): Promise<number> {
        throw new Error("Method not implemented.");
    }
    save(entity: AdRepository): Promise<PropertyKey> {
        throw new Error("Method not implemented.");
    }
    update(entity: AdRepository): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteById(pk: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findById(pk: number): Promise<TestComplete> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<AdRepository[]> {
        throw new Error("Method not implemented.");
    }
    existById(pk: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }




}