import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {AddItemForm, Item} from "../../types/item.type";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {APP_TEXT} from "../../../../shared/constants/text.constant";

@Component({
    selector: 'app-edit-item-popup',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule],
    templateUrl: './edit-item-popup.component.html',
    styleUrls: ['./edit-item-popup.component.scss']
})
export class EditItemPopupComponent implements OnInit {
    public editItemForm!: FormGroup<AddItemForm>;
    public text = APP_TEXT;

    constructor(
        @Inject(MAT_DIALOG_DATA) private item: Item,
        private fb: FormBuilder
    ) {
    }

    public ngOnInit(): void {
        this.editItemForm = this.fb.group({
            name: this.fb.control(this.item.name, {validators: [Validators.required], nonNullable: true}),
            type: this.fb.control(this.item.type, {validators: [Validators.required], nonNullable: true}),
        });
    }
}
