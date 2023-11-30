import {FormControl} from "@angular/forms";

export type AddItemForm = {
    name: FormControl<string>;
    type: FormControl<string>;
}

export type Item = {
    _id: string;
    name: string;
    type: string;
    createdAt: Date;
}

export type ItemStatistic = {
    type: string;
    count: number;
}
