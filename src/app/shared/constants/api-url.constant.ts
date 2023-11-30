import {environment} from "../../../environments/environment";

const api = environment.apiUrl;

export const API_URL = {
    auth: {
        login: `${api}/auth/sign-in`,
        signUp: `${api}/auth/sign-up`
    },
    item: {
        items: `${api}/items`,
        edit: (id: string) => `${api}/items/${id}`,
        statistic:  `${api}/items/statistic`,
    }
}
