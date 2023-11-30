import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConstantHelper} from "../../../../shared/classes/constant-helper";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {ReactiveFormsModule} from "@angular/forms";
import {ItemStatistic} from "../../types/item.type";
import {ItemService} from "../../services/item.service";

@Component({
    selector: 'app-item-statistic',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatToolbarModule, RouterLink, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, ReactiveFormsModule],
    templateUrl: './item-statistic.component.html',
    styleUrls: ['./item-statistic.component.scss']
})
export default class ItemStatisticComponent extends ConstantHelper implements OnInit {
    public itemStatistic: MatTableDataSource<ItemStatistic> = new MatTableDataSource<ItemStatistic>([]);
    public itemStatisticTotal: number = 0;
    public readonly tableColumns = ['type', 'count'];
    @ViewChild('paginator')
    private matPaginator: MatPaginator | undefined;

    constructor(
        private itemService: ItemService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.getStatistic();
    }

    public loadMoreItemStatistic(ev: PageEvent): void {
        this.getStatistic(ev.pageIndex + 1);
    }

    private getStatistic(page: number = 1): void {
        this.itemService.api.getStatistic(page)
            .subscribe((res) => {
                if (res) {
                    this.itemStatistic.data = res.data;
                    this.itemStatisticTotal = res.total;
                }
            });
    }
}
