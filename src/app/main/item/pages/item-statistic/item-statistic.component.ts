import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConstantHelper} from "../../../../shared/classes/constant-helper";

@Component({
    selector: 'app-item-statistic',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './item-statistic.component.html',
    styleUrls: ['./item-statistic.component.scss']
})
export default class ItemStatisticComponent extends ConstantHelper implements OnInit {
    constructor() {
        super();
    }

    public ngOnInit(): void {
    }
}
