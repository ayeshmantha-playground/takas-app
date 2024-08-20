var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DeleteMapping, GetMapping, Middleware, PostMapping, RestController } from "../config/core.config.js";
import { json } from "express";
import { Validator } from "../middleware/validator.middlware";
import { FactoryService, ServiceType } from "../service/factory.service";
let UserHttpController = class UserHttpController {
    async createNewAccount(req, res) {
        const userService = FactoryService.getInstance().getService(ServiceType.USER);
        try {
            await userService.createNewUserAccount(req.body);
            res.sendStatus(200);
        }
        catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
    async deleteAccount(req, res) {
        console.log("Deleting account");
    }
    async getUserAccount(req, res) {
        console.log("Get User Account");
    }
};
__decorate([
    Middleware([Validator.validateUser]),
    PostMapping()
], UserHttpController.prototype, "createNewAccount", null);
__decorate([
    DeleteMapping("/:user")
], UserHttpController.prototype, "deleteAccount", null);
__decorate([
    GetMapping("/:user")
], UserHttpController.prototype, "getUserAccount", null);
UserHttpController = __decorate([
    Middleware([json()]),
    RestController("/users")
], UserHttpController);
export { UserHttpController };
//# sourceMappingURL=user.http.controller.js.map