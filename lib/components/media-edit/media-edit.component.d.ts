import { OnInit, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
export declare class MediaEditComponent implements OnInit, OnChanges {
    private _fb;
    selectedEditMode: EventEmitter<any>;
    formChanged: EventEmitter<any>;
    formData: any;
    myForm: FormGroup;
    constructor(_fb: FormBuilder);
    ngOnChanges(changes: any): void;
    ngOnInit(): void;
    onPress(mode: any): void;
}
