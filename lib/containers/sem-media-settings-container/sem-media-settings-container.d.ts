import { OnInit, Injector } from '@angular/core';
import { SemMediaService } from '../../sem-media.service';
export declare class SemMediaSettingsContainerComponent implements OnInit {
    private _mediaService;
    private injector;
    widget: {
        componentName: string;
        data: string;
    };
    userImages?: Array<any>;
    editVisible: Boolean;
    key: Number;
    uploadPanelFlag: Boolean;
    imageNameList: Array<string>;
    config: any;
    tempImages: Array<any>;
    isTestAOpened: boolean;
    constructor(_mediaService: SemMediaService, injector: Injector);
    ngOnInit(): void;
    uploadedImage(image: File): void;
    onEnableEditImage(index: any): void;
    onEditImage(index: any): void;
    onDeleteImage(index: any): void;
    onMenu(mode: any): void;
    onChangedForm(formData: any): void;
    onChangedEditMode(mode: string): void;
    onCroppedImage(index: any, croppedImage: any): void;
    openTestA(isOpened: boolean): void;
    croppedImage(item: any): void;
}
