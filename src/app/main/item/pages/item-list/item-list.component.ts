import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConstantHelper} from "../../../../shared/classes/constant-helper";

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export default class ItemListComponent extends ConstantHelper implements OnInit {
    constructor() {
      super();
    }

    public ngOnInit(): void {
    }
}
