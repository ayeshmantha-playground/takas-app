import {UserServiceImpl} from "./custom/impl/user.service.impl";
import {AdServiceImpl} from "./custom/impl/ad.service.impl";

export enum ServiceType {
    USER = 0, AD = 1,
}

export class FactoryService {
    private static readonly INSTANCE = new FactoryService();

    private constructor() {

    }

    static getInstance(): FactoryService {
        return this.INSTANCE
    }

    getService(type: ServiceType) {
        switch (type) {
            case ServiceType.USER:
                return new UserServiceImpl();
            case ServiceType.AD:
                return new AdServiceImpl();
        }
    }


}