import {FormControl} from "@angular/forms";

export type AddItemForm = {
    name: FormControl<string>;
    type: FormControl<string>;
}

export type Item = {
    id: string;
    name: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}

export type ItemStatistic = {
    type: string;
    count: number;
}
