import axios, { AxiosInstance, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { NttString } from '../utils/ntt-string';
import { loadingService } from './loading.service';
import { tokenService } from './token-service';
export class HttpService {

    protected showErrorMessage = false;
    protected axiosInstance: AxiosInstance = this.initAxiosInstance();

    public enableShowErrorMessage(showErrorMessage: boolean) {
        this.showErrorMessage = showErrorMessage;
    }

    public initAxiosInstance(): AxiosInstance {
        // Creamos la instancia de axios
        return axios.create({
            headers: this.composeHeaders(),
        });
    }

    public composeHeaders(): AxiosRequestHeaders {
        if (tokenService.hasToken()) {
            return { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken() };
        } else {
            return { 'Content-Type': 'application/json' };
        }
    }

    public updateTokenHeader() {
        this.axiosInstance.defaults.headers.common = this.composeHeaders();
    }

    // Método para hacer una petición 'GET' al API
    //   - url: la url completa
    //   - params: parámetros
    //   - fullResponse: por defecto se devuelve solo el 'data' resultado de la petición,
    //                   pero se puede indicar false para obtener la Response entera
    //   - showMessageError: muestra un toast con el error
    public get(
        url: string, params?: any, showLoading = true, fullResponse = false,
        showErrorMessage = this.showErrorMessage) {
        this.enableLoading(showLoading);

        return this.axiosInstance.get(url, params)
            .then((res) => this.processResponse(res, showLoading, fullResponse))
            .catch((res) => this.processError(res, showLoading, showErrorMessage));
    }

    // Método para hacer una petición 'POST' al API
    // (ver la explicación de los parámetros en el método 'get')
    public post(
        url: string, params: any, showLoading = true, fullResponse = false,
        showErrorMessage = this.showErrorMessage) {
        this.enableLoading(showLoading);

        return this.axiosInstance.post(url, params)
            .then((res) => this.processResponse(res, showLoading, fullResponse))
            .catch((res) => this.processError(res, showLoading, showErrorMessage));
    }

    // Método para hacer una petición 'PUT' al API
    // (ver la explicación de los parámetros en el método 'get')
    public put(
        url: string, params: any, showLoading = true, fullResponse = false,
        showErrorMessage = this.showErrorMessage) {
        this.enableLoading(showLoading);

        return this.axiosInstance.put(url, params)
            .then((res) => this.processResponse(res, showLoading, fullResponse))
            .catch((res) => this.processError(res, showLoading, showErrorMessage));
    }

    // Método para hacer una petición 'DELETE' al API
    // (ver la explicación de los parámetros en el método 'get')
    public delete(
        url: string, params: any, showLoading = true, fullResponse = false,
        showErrorMessage = this.showErrorMessage) {
        this.enableLoading(showLoading);

        return this.axiosInstance.delete(url, params)
            .then((res) => this.processResponse(res, showLoading, fullResponse))
            .catch((res) => this.processError(res, showLoading, showErrorMessage));
    }

    // Método para hacer una petición 'PATCH' al API
    // (ver la explicación de los parámetros en el método 'get')
    public patch(
        url: string, params: any, showLoading = true, fullResponse = false,
        showErrorMessage = this.showErrorMessage) {
        this.enableLoading(showLoading);

        return this.axiosInstance.patch(url, params)
            .then((res) => this.processResponse(res, showLoading, fullResponse))
            .catch((res) => this.processError(res, showLoading, showErrorMessage));
    }

    // Método para recuperar la instancia de axios
    // usado por jest en testing
    public getAxiosInstance(): AxiosInstance {
        return this.axiosInstance;
    }

    public getErrorMessageFromResponse(error: any): string {
        return error.response.data.Message ||
            error.message ||
            error.Message ||
            error.response.statusText ||
            this.getStatusTextFromCode(error.response.statusCode);
    }

    public getStatusTextFromCode(code: number): string {
        const errors: { [key: number]: string } = {
            400: 'Bad request: The server did not understand the request',
            401: 'Unauthorized: The request needs a username and a password or your session has expired',
            402: 'Payment Required: You can not use thos code yet',
            403: 'Forbidden: Access is forbidden to the requested page',
            404: 'Not Found: The server can not find de requested page',
            405: 'Method Not Allowed: The method specified in the request is not allowed',
            406: 'Not Acceptable: the server can only generate a response that is not accepted by the client',
            407: 'Proxy Authentication Required: You must authenticate with a proxy server before this request can be served.',
            408: 'Request Timeout: The reuqest took longer than the server was prepared to wait',
            409: 'Conflict: The request could not be completed because of a conflict',
            410: 'Gone: The requested page is no longer available',
            411: 'Length Required: The "Content-Length" is not defined. The server will not accept the request without it',
            412: 'Precondition Failed: The pre condition given in the request evaluated to false by the server',
            413: 'Request Entity Too Large: The server will not accept the request, because the request entity is too large',
            414: 'Request-url Too Long: The server will not accept the request, because the url is too long. Occurs when you convert a "post" request to a "get" request with a long query information',
            415: 'Unsupported Media Type: The server will not accept the request, because the mediatype is not supported',
            416: 'Requested Range Not Satisfiable: The requested byte range is not available and is out of bounds',
            417: 'Expectation Failed: The expectation given in an Expect request-header field could not be met by this server',
            500: 'Internal Server Error: The request was not completed. The server met an unexpected condition',
            501: 'Not Implemented: The request was not completed. The server did not support the functionality required',
            502: 'Bad Gateway: The request was not completed. The server received an invalid response from the upstream server',
            503: 'Service Unavailable: The request was not completed. The server is temporarily overloading or down',
            504: 'Gateway Timeout: The gateway has timed out',
            505: 'HTTP Version Not Supported: The server does not support the "http protocol" version'
        }
        return errors[code] ?? 'Unavailable Code';
    }

    protected processResponse(response: AxiosResponse, showLoading: boolean, fullResponse: boolean = false) {
        if (showLoading) {
            loadingService.disableLoading();
        }
        return fullResponse ? response : response.data;
    }

    protected processError(error: any, showLoading: boolean, showMessageError: boolean) {
        if (showLoading) {
            loadingService.disableLoading();
        }

        if (showMessageError) {
            const message = this.getErrorMessageFromResponse(error);

            if (!NttString.IsNullOrWhiteSpace(message)) {
                // nttMessageService.toast(message, zolicitaMessageService.TypeError);
            }
        }

        throw error;
    }

    protected enableLoading(showLoading: boolean) {
        if (showLoading) {
            loadingService.enableLoading();
        }
    }

}

export const httpService = new HttpService();