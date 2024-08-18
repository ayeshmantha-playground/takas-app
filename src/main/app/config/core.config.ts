import express, {IRouterHandler, RequestHandler} from "express";

type Handler = {
    name?: string,
    path?: string,
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    middlewares?: Array<RequestHandler>
}

type Handlers = {
    [handler: string]: Handler
}

type Controller = {
    path?: string,
    middlewares?: Array<RequestHandler>,
    handlers?: Handlers,
    constructor: Function
}

type Controllers = {
    [controller: string]: Controller
}

const CONTROLLERS: Controllers = {};

export function Module(controllers: Array<Function>){
    return function(constructor: Function){}
}

export function RestController(path: string = "/"){
    return function(constructor: Function){
        CONTROLLERS[constructor.name].path = path;
        CONTROLLERS[constructor.name].constructor = constructor;
    }
}

export function Middleware(middlewares: Array<RequestHandler>){
    return function(target: Object | Function, name?: string, descriptor?: PropertyDescriptor){
        if (!name && !descriptor){
            // Class
            if (!CONTROLLERS[(target as Function).name]) CONTROLLERS[(target as Function).name] = {};
            CONTROLLERS[(target as Function).name].middlewares = middlewares;
        }else{
            // Method
            if (!CONTROLLERS[target.constructor.name]) CONTROLLERS[target.constructor.name] = {};
            if (!CONTROLLERS[target.constructor.name].handlers) CONTROLLERS[target.constructor.name].handlers = { };
            if (!CONTROLLERS[target.constructor.name].handlers![name!]) CONTROLLERS[target.constructor.name].handlers![name!] = {
                name
            };
            CONTROLLERS[target.constructor.name].handlers![name!].middlewares = middlewares;
        }
    }
}

export function GetMapping(path: string = "/"){
    return function(prototype: Object, name: string, descriptor: PropertyDescriptor){
        if (!CONTROLLERS[prototype.constructor.name]) CONTROLLERS[prototype.constructor.name] = {};
        if (!CONTROLLERS[prototype.constructor.name].handlers) CONTROLLERS[prototype.constructor.name].handlers = {};
        CONTROLLERS[prototype.constructor.name].handlers![name] = {
            name,
            path,
            method: 'GET'
        }
    }
}

export function PostMapping(path: string = "/"){
    return function(prototype: Object, name: string, descriptor: PropertyDescriptor){
        if (!CONTROLLERS[prototype.constructor.name]) CONTROLLERS[prototype.constructor.name] = {};
        if (!CONTROLLERS[prototype.constructor.name].handlers) CONTROLLERS[prototype.constructor.name].handlers = {};
        CONTROLLERS[prototype.constructor.name].handlers![name] = {
            name,
            path,
            method: 'POST'
        }
    }
}

export function PutMapping(path: string = "/"){
    return function(prototype: Object, name: string, descriptor: PropertyDescriptor){
        if (!CONTROLLERS[prototype.constructor.name]) CONTROLLERS[prototype.constructor.name] = {};
        if (!CONTROLLERS[prototype.constructor.name].handlers) CONTROLLERS[prototype.constructor.name].handlers = {};
        CONTROLLERS[prototype.constructor.name].handlers![name] = {
            name,
            path,
            method: 'PUT'
        }
    }
}

export function DeleteMapping(path: string = "/"){
    return function(prototype: Object, name: string, descriptor: PropertyDescriptor){
        if (!CONTROLLERS[prototype.constructor.name]) CONTROLLERS[prototype.constructor.name] = {};
        if (!CONTROLLERS[prototype.constructor.name].handlers) CONTROLLERS[prototype.constructor.name].handlers = {};
        CONTROLLERS[prototype.constructor.name].handlers![name] = {
            name,
            path,
            method: 'DELETE'
        }
    }
}

export function PatchMapping(path: string = "/"){
    return function(prototype: Object, name: string, descriptor: PropertyDescriptor){
        if (!CONTROLLERS[prototype.constructor.name]) CONTROLLERS[prototype.constructor.name] = {};
        if (!CONTROLLERS[prototype.constructor.name].handlers) CONTROLLERS[prototype.constructor.name].handlers = {};
        CONTROLLERS[prototype.constructor.name].handlers![name] = {
            name,
            path,
            method: 'PATCH'
        }
    }
}

export class ExpressApp {
    static create(module: Function){
        const app = express();

        for (const controllerObj of Object.values(CONTROLLERS)) {
            if (!controllerObj.constructor) continue;  // << IMP
            const router = express.Router();
            const controller = new (controllerObj.constructor as (new ()=> any))();

            if (!controllerObj.middlewares)
                for (const middleware of controllerObj.middlewares!) {
                    router.use(middleware);
                }

            for (const handler of Object.values(controllerObj.handlers!)) {
                switch (handler.method){
                    case "GET":
                        if (handler.middlewares){
                            router.get(handler.path!, [...handler.middlewares, controller[handler.name!]])
                        }else {
                            router.get(handler.path!, controller[handler.name!]);
                        }
                        break;
                    case "POST":
                        if (handler.middlewares){
                            router.post(handler.path!, [...handler.middlewares, controller[handler.name!]])
                        }else {
                            router.post(handler.path!, controller[handler.name!]);
                        }
                        break;
                    case "PUT":
                        if (handler.middlewares){
                            router.put(handler.path!, [...handler.middlewares, controller[handler.name!]])
                        }else {
                            router.put(handler.path!, controller[handler.name!]);
                        }
                        break;
                    case "DELETE":
                        if (handler.middlewares){
                            router.delete(handler.path!, [...handler.middlewares, controller[handler.name!]])
                        }else {
                            router.delete(handler.path!, controller[handler.name!]);
                        }
                        break;
                    case "PATCH":
                        if (handler.middlewares){
                            router.patch(handler.path!, [...handler.middlewares, controller[handler.name!]])
                        }else {
                            router.patch(handler.path!, controller[handler.name!]);
                        }
                        break;
                }
            }

            app.use(controllerObj.path!, router);
        }

        return app;
    }
}