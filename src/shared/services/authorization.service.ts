
import router from '@/router';
import { DataContextDto } from '../dtos/data-context.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { LoginDto } from '../dtos/login.dto';
import { UserDto } from '../dtos/user.dto';
import { NttString } from '../utils/ntt-string';
import { httpService } from './http-client.service';
import { sessionContextService } from './session-context.service';
import { tokenService } from './token-service';
export default class AuthorizationService {
    userName: string = NttString.Empty;

    login(login: LoginDto): Promise<any> {
        if(login.user === 'reactic' && login.password === 'reactic') {
            const fakeResponse = {success: true, name: login.user, token: 'aaaa-bbbb-cccc-dddd' };
            this.onLogin(fakeResponse);
            return Promise.resolve(fakeResponse);
        }
        return Promise.reject({message: 'You need check credentials'});
/*         return nttHttpService.post(API.login, {user: login.user, password: login.password}, true, false, true)
            .then(this.onLogin.bind(this))
            .catch(this.loginFail.bind(this)); */
    }

    logout() {
        this.userName = NttString.Empty;
        tokenService.clearToken();
        httpService.updateTokenHeader();
        const contxt = new DataContextDto({
            generatorsList: [], 
            user: new UserDto({
                userName: NttString.Empty, 
                isActive: false
                })
        });
        sessionContextService.updateDataContext(contxt);
        router.push('/landing');
    }

    completeLogin(token: string) {
        tokenService.setToken(token);
        httpService.updateTokenHeader();
        
        const contxt = new DataContextDto({
            generatorsList: [], 
            user: new UserDto({
                userName: this.userName, 
                isActive: true,
                hasAvatar: false
                })
        });
        sessionContextService.updateDataContext(contxt);
    }

    private onLogin(res: any) {
        const rtn: LoginResponseDto = new LoginResponseDto({ success: res.success, token: res.token });
        if (res.success) {
            this.userName = res.name;
            this.completeLogin(res.token);
        }
        return rtn;
    }

    private loginFail(res: any) {
        return new LoginResponseDto({success: res.success});
    }
}

export const authorizationService = new AuthorizationService();
