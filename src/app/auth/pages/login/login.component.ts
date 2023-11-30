import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConstantHelper} from "../../../shared/classes/constant-helper";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthForm} from "../../types/auth.type";
import {AuthApiService} from "../../services/auth-api.service";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['../../auth.component.scss', './login.component.scss']
})
export default class LoginComponent extends ConstantHelper implements OnInit {

    public loginForm!: FormGroup<AuthForm>;

    constructor(
        private fb: FormBuilder,
        private authApiService: AuthApiService,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: this.fb.control('', {nonNullable: true, validators: [Validators.required]}),
            password: this.fb.control('', {nonNullable: true, validators: [Validators.required, Validators.minLength(this.constants.minPasswordLength)]}),
        })
    }

    public signIn(): void {
        if (this.loginForm.valid) {
            this.authApiService.signIn(this.loginForm.getRawValue()).subscribe();
        }
    }

}
