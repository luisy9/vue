import { NttString } from '../utils/ntt-string';

export class TokenService {

    private tokenName = 'token';

    public hasToken() {
        return !NttString.IsNullOrWhiteSpace(this.getToken());
    }

    public setToken(token: string) {
        window.sessionStorage.setItem(this.tokenName, token);
    }

    public getToken() {
        return window.sessionStorage.getItem(this.tokenName);
    }

    public clearToken() {
        window.sessionStorage.removeItem(this.tokenName);
    }

}

export const tokenService = new TokenService();
