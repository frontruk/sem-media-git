import { EventEmitter, OnInit, OnChanges } from '@angular/core';
export declare class SemMediaPanelSettingsComponent implements OnInit, OnChanges {
    private readonly platformId;
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
    itemSeelcted: any;
    constructor(platformId: any);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    onImageLoaded(file: any): void;
    onChangedMode(mode: any): void;
    onEdit(index: any, item: any): void;
    onDelete(index: any): void;
    onChangedForm(formData: any): void;
    closeDialog(): void;
    editSelected(item: any): void;
}
