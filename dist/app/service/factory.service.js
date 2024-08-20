import { UserServiceImpl } from "./custom/impl/user.service.impl";
import { AdServiceImpl } from "./custom/impl/ad.service.impl";
export var ServiceType;
(function (ServiceType) {
    ServiceType[ServiceType["USER"] = 0] = "USER";
    ServiceType[ServiceType["AD"] = 1] = "AD";
})(ServiceType || (ServiceType = {}));
export class FactoryService {
    static INSTANCE = new FactoryService();
    constructor() {
    }
    static getInstance() {
        return this.INSTANCE;
    }
    getService(type) {
        switch (type) {
            case ServiceType.USER:
                return new UserServiceImpl();
            case ServiceType.AD:
                return new AdServiceImpl();
        }
    }
}
//# sourceMappingURL=factory.service.js.map