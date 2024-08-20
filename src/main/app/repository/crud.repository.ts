export interface CrudRepository<T, PK> {
    count(): Promise<number>;

    save(entity: T): Promise<PropertyKey>;

    update(entity: T): Promise<void>;

    deleteById(pk: PK): Promise<void>;

    findById(pk: PK): Promise<TestComplete>;

    findAll(): Promise<Array<T>>;

    existById(pk: PK): Promise<boolean>;
}