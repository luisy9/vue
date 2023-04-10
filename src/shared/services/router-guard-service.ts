import { tokenService } from "./token-service";

export class RouterGuardService {

    public pathLogin: string = '/login';

    public beforeEnter(to: any, from: any, next: any) {
        if (tokenService.hasToken()) {
            next();
        } else {
            next(this.pathLogin);
        }
    }

    public setPathLogin(pathLogin: string) {
        this.pathLogin = pathLogin;
    }

}

export const routerGuardService = new RouterGuardService();