import { EventEmitter, OnInit, OnChanges } from '@angular/core';
export declare class SemPanelSettingsComponent implements OnInit, OnChanges {
    cropped: EventEmitter<any>;
    uploaded: EventEmitter<any>;
    editImage: EventEmitter<any>;
    deleteImage: EventEmitter<any>;
    changedForm: EventEmitter<any>;
    changedEditMode: EventEmitter<any>;
    showUploadEvent: EventEmitter<any>;
    myForm: any;
    imageList: Array<any>;
    visibleControlPanel: Boolean;
    editVisible: Boolean;
    key: number;
    imageNameList: Array<string>;
    userImages: Array<any>;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    onImageLoaded(file: any): void;
    onChangedMode(mode: any): void;
    onEdit(index: any): void;
    onDelete(index: any): void;
    onChangedForm(formData: any): void;
}
