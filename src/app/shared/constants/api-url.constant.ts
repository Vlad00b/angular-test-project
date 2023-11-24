import {environment} from "../../../environments/environment";

const api = environment.apiUrl;

export const API_URL = {
    auth: {
        login: `${api}/auth/sign-in`,
        signUp: `${api}/auth/sign-up`
    }
}
