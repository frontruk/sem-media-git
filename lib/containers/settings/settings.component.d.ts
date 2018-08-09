import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SemMediaService } from '../../sem-media.service';
export declare class SemSettingsComponent {
    _mediaService: SemMediaService;
    private _fb;
    pressedImages: EventEmitter<any>;
    pressedDelete: EventEmitter<any>;
    pressedDuplicate: EventEmitter<any>;
    pressedSettings: EventEmitter<any>;
    isLeftVisible: Boolean;
    viewModeForm: FormGroup;
    constructor(_mediaService: SemMediaService, _fb: FormBuilder);
    onDelete(): void;
    onImages(): void;
    onDuplicate(): void;
    onSettings(): void;
}
