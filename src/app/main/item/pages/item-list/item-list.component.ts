import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConstantHelper} from "../../../../shared/classes/constant-helper";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {AddItemForm, Item} from "../../types/item.type";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {ItemService} from "../../services/item.service";

@Component({
    selector: 'app-item-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatToolbarModule,
        RouterLink,
        MatTableModule,
        MatPaginatorModule,
    ],
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss']
})
export default class ItemListComponent extends ConstantHelper implements OnInit {

    public addItemForm!: FormGroup<AddItemForm>;
    public itemList: MatTableDataSource<Item> = new MatTableDataSource<Item>([]);
    public itemsTotal: number = 0;
    public readonly tableColumns: string[] = ['name', 'type', 'actions'];
    @ViewChild('paginator')
    private matPaginator: MatPaginator | undefined;

    constructor(
        private fb: FormBuilder,
        private itemService: ItemService,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.addItemForm = this.fb.group({
            name: this.fb.control('', {validators: [Validators.required], nonNullable: true}),
            type: this.fb.control('', {validators: [Validators.required], nonNullable: true}),
        });
        this.getItemsList();
    }

    public addNewItem(): void {
        if (this.addItemForm.valid) {
            this.itemService.api.addNewItem(this.addItemForm.getRawValue())
                .subscribe(() => {
                    this.addItemForm.reset({name: '', type: ''});
                    this.getItemsList();
                    if (this.matPaginator) {
                        this.matPaginator.pageIndex = 0;
                        console.log(this.matPaginator);
                    }
                })
        }
    }

    public loadMoreItem(ev: PageEvent): void {
        this.getItemsList(ev.pageIndex + 1);
    }

    public editItem(item: Item): void {
        this.itemService.editItemData(item)
            .subscribe((newItem) => {
                if (newItem) {
                    this.itemList.data = this.itemList.data.map((el) => {
                        if (el.id === newItem.id) {
                            return newItem;
                        }
                        return el;
                    })
                }
            });
    }

    public deleteItem(item: Item): void {
        this.itemService.deleteItemById(item.id)
            .subscribe((res) => {
                if (res) {
                    this.getItemsList((this.matPaginator?.pageIndex || 0) + 1)
                }
            })
    }

    private getItemsList(page: number = 1): void {
        this.itemService.api.getItems(page)
            .subscribe((res) => {
                if (res) {
                    this.itemList.data = res.data;
                    this.itemsTotal = res.total;
                }
            })
    }
}
