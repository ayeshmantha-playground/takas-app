import {DeleteMapping, GetMapping, Middleware, PostMapping, RestController} from "../config/core.config.js";
import {json,Request, Response} from "express";
import {Validator} from "../middleware/validator.middlware";
import {FactoryService, ServiceType} from "../service/factory.service";
import {UserService} from "../service/custom/user.service";

@Middleware([json()])
@RestController("/users")
export class UserHttpController {

    @Middleware([Validator.validateUser])
    @PostMapping()
    async createNewAccount(req: Request, res: Response) {
        const userService =
            FactoryService.getInstance().getService(ServiceType.USER) as UserService;
        try{
            await userService.createNewUserAccount(req.body);
            res.sendStatus(200);
        }catch (e){
            console.log(e);
            res.sendStatus(500);
        }
    }

    @DeleteMapping("/:user")
    async deleteAccount(req: Request, res: Response) {
        console.log("Deleting account");
    }

    @GetMapping("/:user")
    async getUserAccount(req: Request, res: Response) {
        console.log("Get User Account");
    }

}