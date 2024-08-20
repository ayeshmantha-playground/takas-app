import { UserTo } from "../to/user.to";
import { validate } from "class-validator";
import { ErrorTo } from "../to/error.to";
export class Validator {
    static async validateUser(req, res, next) {
        const user = new UserTo();
        Object.assign(user, req.body);
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).json(new ErrorTo(400, "Bad Request", "Data Vaidation Failed", req.baseUrl + req.url, errors));
        }
        else {
            next();
        }
    }
}
//# sourceMappingURL=validator.middlware.js.map