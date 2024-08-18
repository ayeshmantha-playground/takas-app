import {DeleteMapping, GetMapping, Middleware, PostMapping, RestController} from "../config/core.config.js";
import {json, NextFunction} from "express";

@Middleware([json()])
@RestController("/users")
export class UserHttpController {

    @PostMapping()
    async createNewAccount(req: Request, res: Response) {
        console.log("Creating new account");
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