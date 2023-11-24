import {FormControl} from "@angular/forms";
import {User} from "../../main/user/types/user.type";

export type AuthForm = {
    username: FormControl<string>;
    password: FormControl<string>;
}

export type AuthResponse = {
    user: User;
    token: string;
}
