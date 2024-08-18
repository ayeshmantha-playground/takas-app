import express from "express";
const CONTROLLERS = {};
export function Module(controllers) {
    return function (constructor) { };
}
export function RestController(path = "/") {
    return function (constructor) {
        CONTROLLERS[constructor.name].path = path;
        CONTROLLERS[constructor.name].constructor = constructor;
    };
}
export function Middleware(middlewares) {
    return function (target, name, descriptor) {
        if (!name && !descriptor) {
            // Class
            if (!CONTROLLERS[target.name])
                CONTROLLERS[target.name] = {};
            CONTROLLERS[target.name].middlewares = middlewares;
        }
        else {
            // Method
            if (!CONTROLLERS[target.constructor.name])
                CONTROLLERS[target.constructor.name] = {};
            if (!CONTROLLERS[target.constructor.name].handlers)
                CONTROLLERS[target.constructor.name].handlers = {};
            if (!CONTROLLERS[target.constructor.name].handlers[name])
                CONTROLLERS[target.constructor.name].handlers[name] = {
                    name
                };
            CONTROLLERS[target.constructor.name].handlers[name].middlewares = middlewares;
        }
    };
}
export function GetMapping(path = "/") {
    return function (prototype, name, descriptor) {
        if (!CONTROLLERS[prototype.constructor.name])
            CONTROLLERS[prototype.constructor.name] = {};
        if (!CONTROLLERS[prototype.constructor.name].handlers)
            CONTROLLERS[prototype.constructor.name].handlers = {};
        CONTROLLERS[prototype.constructor.name].handlers[name] = {
            name,
            path,
            method: 'GET'
        };
    };
}
export function PostMapping(path = "/") {
    return function (prototype, name, descriptor) {
        if (!CONTROLLERS[prototype.constructor.name])
            CONTROLLERS[prototype.constructor.name] = {};
        if (!CONTROLLERS[prototype.constructor.name].handlers)
            CONTROLLERS[prototype.constructor.name].handlers = {};
        CONTROLLERS[prototype.constructor.name].handlers[name] = {
            name,
            path,
            method: 'POST'
        };
    };
}
export function PutMapping(path = "/") {
    return function (prototype, name, descriptor) {
        if (!CONTROLLERS[prototype.constructor.name])
            CONTROLLERS[prototype.constructor.name] = {};
        if (!CONTROLLERS[prototype.constructor.name].handlers)
            CONTROLLERS[prototype.constructor.name].handlers = {};
        CONTROLLERS[prototype.constructor.name].handlers[name] = {
            name,
            path,
            method: 'PUT'
        };
    };
}
export function DeleteMapping(path = "/") {
    return function (prototype, name, descriptor) {
        if (!CONTROLLERS[prototype.constructor.name])
            CONTROLLERS[prototype.constructor.name] = {};
        if (!CONTROLLERS[prototype.constructor.name].handlers)
            CONTROLLERS[prototype.constructor.name].handlers = {};
        CONTROLLERS[prototype.constructor.name].handlers[name] = {
            name,
            path,
            method: 'DELETE'
        };
    };
}
export function PatchMapping(path = "/") {
    return function (prototype, name, descriptor) {
        if (!CONTROLLERS[prototype.constructor.name])
            CONTROLLERS[prototype.constructor.name] = {};
        if (!CONTROLLERS[prototype.constructor.name].handlers)
            CONTROLLERS[prototype.constructor.name].handlers = {};
        CONTROLLERS[prototype.constructor.name].handlers[name] = {
            name,
            path,
            method: 'PATCH'
        };
    };
}
export class ExpressApp {
    static create(module) {
        const app = express();
        for (const controllerObj of Object.values(CONTROLLERS)) {
            if (!controllerObj.constructor)
                continue; // << IMP
            const router = express.Router();
            const controller = new controllerObj.constructor();
            if (!controllerObj.middlewares)
                for (const middleware of controllerObj.middlewares) {
                    router.use(middleware);
                }
            for (const handler of Object.values(controllerObj.handlers)) {
                switch (handler.method) {
                    case "GET":
                        if (handler.middlewares) {
                            router.get(handler.path, [...handler.middlewares, controller[handler.name]]);
                        }
                        else {
                            router.get(handler.path, controller[handler.name]);
                        }
                        break;
                    case "POST":
                        if (handler.middlewares) {
                            router.post(handler.path, [...handler.middlewares, controller[handler.name]]);
                        }
                        else {
                            router.post(handler.path, controller[handler.name]);
                        }
                        break;
                    case "PUT":
                        if (handler.middlewares) {
                            router.put(handler.path, [...handler.middlewares, controller[handler.name]]);
                        }
                        else {
                            router.put(handler.path, controller[handler.name]);
                        }
                        break;
                    case "DELETE":
                        if (handler.middlewares) {
                            router.delete(handler.path, [...handler.middlewares, controller[handler.name]]);
                        }
                        else {
                            router.delete(handler.path, controller[handler.name]);
                        }
                        break;
                    case "PATCH":
                        if (handler.middlewares) {
                            router.patch(handler.path, [...handler.middlewares, controller[handler.name]]);
                        }
                        else {
                            router.patch(handler.path, controller[handler.name]);
                        }
                        break;
                }
            }
            app.use(controllerObj.path, router);
        }
        return app;
    }
}
//# sourceMappingURL=core.config.js.map