import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ConstantHelper} from "../../../shared/classes/constant-helper";
import {AuthForm} from "../../types/auth.type";
import {RouterModule} from "@angular/router";
import {AuthApiService} from "../../services/auth-api.service";
import {ToastService} from "../../../shared/services/toast.service";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterModule,
        MatIconModule
    ],
    templateUrl: './registration.component.html',
    styleUrls: ['../../auth.component.scss', './registration.component.scss']
})
export default class RegistrationComponent extends ConstantHelper implements OnInit {
    public registrationForm!: FormGroup<AuthForm & {confirmPassword: FormControl<string>}>;
    public hidePassword: boolean = true;
    public hideConfirmPassword: boolean = true;

    constructor(
        private fb: FormBuilder,
        private authApiService: AuthApiService,
        private toastService: ToastService,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.registrationForm = this.fb.group({
            username: this.fb.control('', {nonNullable: true, validators: [Validators.required]}),
            password: this.fb.control('', {nonNullable: true, validators: [Validators.required, Validators.minLength(this.constants.minPasswordLength)]}),
            confirmPassword: this.fb.control('', {nonNullable: true, validators: [Validators.required, Validators.minLength(this.constants.minPasswordLength)]}),
        }, {
            validators: this.checkPasswordMatch
        });
    }

    public signUp(): void {
        if (this.registrationForm.invalid && this.registrationForm.errors && this.registrationForm.errors['passwordsMissMatch']) {
            this.toastService.showErrorToast(this.errorMessages.passwordsMissMatch);
            return;
        }
        if (this.registrationForm.valid) {
            const {confirmPassword, ...value} = this.registrationForm.getRawValue();
            this.authApiService.signUp(value).subscribe();
        }
    }

    private checkPasswordMatch(form: typeof this.registrationForm): ValidationErrors | null {
        if (form.controls.password.valid && form.controls.confirmPassword.valid &&
            form.controls.password.value !== form.controls.confirmPassword.value
        ) {
            return {passwordsMissMatch: true};
        }
        return null;
    }
}
