/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Injector } from '@angular/core';
import * as _ from 'lodash';
import { SemMediaService } from '../../sem-media.service';
var SemMediaContainerComponent = /** @class */ (function () {
    function SemMediaContainerComponent(_mediaService, injector) {
        // this.widget = this.injector.get('widget');
        // if(this.widget.componentName === 'SemMediaContainerComponent') {
        //   console.log('Got the wysiwyg data', this.widget);
        // }
        var _this = this;
        this._mediaService = _mediaService;
        this.injector = injector;
        this.widget = {
            componentName: '',
            data: "\n    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer ook a galley of type\n    and scrambled it to make a type specimen book. It has survived not only five ce nturies, but also the leap into electronic\n    typesetting, remaining essentially unchanged. It was popu larised in the 1960s with the release of Letraset sheets\n    containing"
        };
        this.userImages = [];
        this.editVisible = false;
        this.uploadPanelFlag = true;
        this.imageNameList = [];
        this.isTestAOpened = false;
        this._mediaService.imageComponentChanges.subscribe(function (allImages) {
            /** @type {?} */
            var editMode = false;
            _this.imageNameList = [];
            _this.userImages = allImages;
            try {
                for (var allImages_1 = tslib_1.__values(allImages), allImages_1_1 = allImages_1.next(); !allImages_1_1.done; allImages_1_1 = allImages_1.next()) {
                    var image = allImages_1_1.value;
                    editMode = editMode || image.editMode;
                    _this.imageNameList.push(image.fileName);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (allImages_1_1 && !allImages_1_1.done && (_a = allImages_1.return)) _a.call(allImages_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            setTimeout(function () {
                _this.editVisible = editMode;
            });
            var e_1, _a;
        });
        this._mediaService.imageConfigChanges.subscribe(function (config) {
            _this.config = _.cloneDeep(config);
        });
        this._mediaService.imageLoadChanges.subscribe(function (allImages) {
            _this.tempImages = allImages;
            _this.imageNameList = [];
            _this.userImages = allImages;
            try {
                for (var allImages_2 = tslib_1.__values(allImages), allImages_2_1 = allImages_2.next(); !allImages_2_1.done; allImages_2_1 = allImages_2.next()) {
                    var image = allImages_2_1.value;
                    _this.imageNameList.push(image.fileName);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (allImages_2_1 && !allImages_2_1.done && (_a = allImages_2.return)) _a.call(allImages_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            _this.key = allImages.length - 1;
            _this.editVisible = false;
            if (allImages.length > 1) {
                _this.uploadPanelFlag = false;
            }
            var e_2, _a;
        });
        this._mediaService.tempChanges.subscribe(function (allImages) {
            _this.tempImages = allImages;
        });
    }
    /**
     * @return {?}
     */
    SemMediaContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} image
     * @return {?}
     */
    SemMediaContainerComponent.prototype.uploadedImage = /**
     * @param {?} image
     * @return {?}
     */
    function (image) {
        this._mediaService.putImage(image);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SemMediaContainerComponent.prototype.onEnableEditImage = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._mediaService.onEditEnable(index);
        this.uploadPanelFlag = true;
        this.key = index;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SemMediaContainerComponent.prototype.onEditImage = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.key = index;
        this._mediaService.onEditEnable(index);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SemMediaContainerComponent.prototype.onDeleteImage = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._mediaService.onDeleteImage(index);
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    SemMediaContainerComponent.prototype.onMenu = /**
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        switch (mode) {
            case 'IMAGES':
                this.uploadPanelFlag = true;
                break;
            case 'DUPLICATE':
                break;
            case 'SETTINGS':
                break;
            case 'DELETE':
                this._mediaService.clearImages();
                this.imageNameList = [];
                this.uploadPanelFlag = true;
                break;
        }
    };
    /**
     * @param {?} formData
     * @return {?}
     */
    SemMediaContainerComponent.prototype.onChangedForm = /**
     * @param {?} formData
     * @return {?}
     */
    function (formData) {
        this._mediaService.formChanged(this.key, formData);
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    SemMediaContainerComponent.prototype.onChangedEditMode = /**
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        if (mode === 'APPLY') {
            // this.editVisible = false;
            if (this.imageNameList.length > 1) {
                this.uploadPanelFlag = false;
            }
        }
        this._mediaService.onEditImage(this.key, mode);
        this._mediaService.clearConfig(this.key);
    };
    /**
     * @param {?} index
     * @param {?} croppedImage
     * @return {?}
     */
    SemMediaContainerComponent.prototype.onCroppedImage = /**
     * @param {?} index
     * @param {?} croppedImage
     * @return {?}
     */
    function (index, croppedImage) {
        this._mediaService.putCroppedImage(index, croppedImage);
    };
    /**
     * @param {?} isOpened
     * @return {?}
     */
    SemMediaContainerComponent.prototype.openTestA = /**
     * @param {?} isOpened
     * @return {?}
     */
    function (isOpened) {
        this.isTestAOpened = isOpened;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SemMediaContainerComponent.prototype.croppedImage = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        console.log('not sure', item);
    };
    SemMediaContainerComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector,
                    selector: '[sem-media-container]',
                    template: "<div class=\"sem-dnd-container sem-media-container\">\n\n\n\n  <div *ngIf=\"userImages\" class=\"preview-container\">\n    <div sem-cropper\n      *ngFor=\"let image of userImages;let key = index\"\n      [imageData]=\"image.uploadedImage\"\n      [croppedImage]=\"image.croppedImage\"\n      [editMode]=\"image.editMode\"\n      [config]=\"config\"\n      [key]=\"key\"\n      (enabledCropper)=\"onEnableEditImage(key)\"\n      (croppedImageEvent)=\"onCroppedImage(key, $event)\"\n    ></div>\n  </div>\n\n\n  <div class=\"sem-dnd-container--nav\">\n    <button\n      sem-btn-fab\n      corner=\"top-right\"\n      semui-theme=\"light\"\n      class=\"absolute top-0 right-0 \"\n      sem-importance=\"secondary\"\n      #chatOverlay=\"cdkOverlayOrigin\"\n      cdkOverlayOrigin\n      (click)=\"openTestA(!isTestAOpened)\"\n    >\n        <span class=\"sem-icon-profile-accent\">\n        <span class=\"path1\"></span><span class=\"path2\"></span>\n        </span>\n    </button>\n    <semui-overlay-dialog\n      [overlayOrigin]=\"chatOverlay\"\n      [isOpened]=\"isTestAOpened\"\n      (close)=\"openTestA(false)\"\n      (open)=\"openTestA(true)\"\n      [overlayWidth]=\"'auto'\"\n    >\n\n      <div *ngIf=\"uploadPanelFlag\" class=\"temp-container dialog-container bg-default left\">\n        <div class=\"dialog-container--body\">\n          <sem-panel\n            [editVisible]=\"editVisible\"\n            [key]=\"key\"\n            [imageNameList]=\"imageNameList\"\n            (cropped)=\"croppedImage($event)\"\n            (uploaded)=\"uploadedImage($event)\"\n            (changedForm)=\"onChangedForm($event)\"\n            (editImage)=\"onEditImage($event)\"\n            (deleteImage)=\"onDeleteImage($event)\"\n            (changedEditMode)=\"onChangedEditMode($event)\"\n            (showUploadEvent)=\"editVisible = false\"\n            [userImages]=\"userImages\"\n          ></sem-panel>\n        </div>\n      </div>\n      <div *ngIf=\"!uploadPanelFlag\"\n           class=\"settings-container dialog-container bg-default mt4\">\n        <sem-settings\n          (pressedImages)=\"onMenu('IMAGES')\"\n          (pressedDuplicate)=\"onMenu('DUPLICATE')\"\n          (pressedSettings)=\"onMenu('SETTINGS')\"\n          (pressedDelete)=\"onMenu('DELETE')\"\n        >\n        </sem-settings>\n      </div>\n\n    </semui-overlay-dialog>\n  </div>\n</div>\n",
                    styles: [":host(){background-color:#f5e5e5;display:block;border:1px solid #8b0000;height:100%}"]
                },] },
    ];
    SemMediaContainerComponent.ctorParameters = function () { return [
        { type: SemMediaService },
        { type: Injector }
    ]; };
    return SemMediaContainerComponent;
}());
export { SemMediaContainerComponent };
if (false) {
    /** @type {?} */
    SemMediaContainerComponent.prototype.widget;
    /** @type {?} */
    SemMediaContainerComponent.prototype.userImages;
    /** @type {?} */
    SemMediaContainerComponent.prototype.editVisible;
    /** @type {?} */
    SemMediaContainerComponent.prototype.key;
    /** @type {?} */
    SemMediaContainerComponent.prototype.uploadPanelFlag;
    /** @type {?} */
    SemMediaContainerComponent.prototype.imageNameList;
    /** @type {?} */
    SemMediaContainerComponent.prototype.config;
    /** @type {?} */
    SemMediaContainerComponent.prototype.tempImages;
    /** @type {?} */
    SemMediaContainerComponent.prototype.isTestAOpened;
    /** @type {?} */
    SemMediaContainerComponent.prototype._mediaService;
    /** @type {?} */
    SemMediaContainerComponent.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLW1lZGlhLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9jb250YWluZXJzL3NlbS1tZWRpYS1jb250YWluZXIvc2VtLW1lZGlhLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUF3QyxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBRS9HLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUxRDtJQWtHRSxvQ0FBb0IsYUFBOEIsRUFBVSxRQUFrQjtRQUM1RSw2Q0FBNkM7UUFDN0MsbUVBQW1FO1FBQ25FLHNEQUFzRDtRQUN0RCxJQUFJO1FBSk4saUJBcUNDO1FBckNtQixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBbkJ2RSxXQUFNLEdBQUc7WUFDZCxhQUFhLEVBQUUsRUFBRTtZQUNqQixJQUFJLEVBQUcsMFlBSUk7U0FDWixDQUFDO1FBR0YsZUFBVSxHQUFnQixFQUFFLENBQUM7UUFDN0IsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFN0Isb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMsa0JBQWEsR0FBa0IsRUFBRSxDQUFDO1FBR2xDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBUXBCLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLFVBQUEsU0FBUzs7Z0JBQ3RELFFBQVEsR0FBRyxLQUFLO1lBQ3BCLEtBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDOztnQkFDNUIsR0FBRyxDQUFDLENBQWdCLElBQUEsY0FBQSxpQkFBQSxTQUFTLENBQUEsb0NBQUE7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QUMvQixDQUFDOztnQkE5TEYsU0FBUyxTQUFDOztvQkFFVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUUsazFFQXdFWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxzRkFBc0YsQ0FBQztpQkFDakc7OztnQkEvRVEsZUFBZTtnQkFIa0MsUUFBUTs7SUFvTWxFLGlDQUFDO0NBQUEsQUEvTEQsSUErTEM7U0FqSFksMEJBQTBCOzs7SUFDckMsNENBT0U7O0lBR0YsZ0RBQTZCOztJQUM3QixpREFBNkI7O0lBQzdCLHlDQUFZOztJQUNaLHFEQUFnQzs7SUFDaEMsbURBQWtDOztJQUNsQyw0Q0FBWTs7SUFDWixnREFBdUI7O0lBQ3ZCLG1EQUFzQjs7SUFFVixtREFBc0M7O0lBQUUsOENBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsICBPdXRwdXQsIEluamVjdG9yLCBWaWV3Q2hpbGQsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFNlbU1lZGlhU2VydmljZSB9IGZyb20gJy4uLy4uL3NlbS1tZWRpYS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3IsXG4gIHNlbGVjdG9yOiAnW3NlbS1tZWRpYS1jb250YWluZXJdJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwic2VtLWRuZC1jb250YWluZXIgc2VtLW1lZGlhLWNvbnRhaW5lclwiPlxuXG5cblxuICA8ZGl2ICpuZ0lmPVwidXNlckltYWdlc1wiIGNsYXNzPVwicHJldmlldy1jb250YWluZXJcIj5cbiAgICA8ZGl2IHNlbS1jcm9wcGVyXG4gICAgICAqbmdGb3I9XCJsZXQgaW1hZ2Ugb2YgdXNlckltYWdlcztsZXQga2V5ID0gaW5kZXhcIlxuICAgICAgW2ltYWdlRGF0YV09XCJpbWFnZS51cGxvYWRlZEltYWdlXCJcbiAgICAgIFtjcm9wcGVkSW1hZ2VdPVwiaW1hZ2UuY3JvcHBlZEltYWdlXCJcbiAgICAgIFtlZGl0TW9kZV09XCJpbWFnZS5lZGl0TW9kZVwiXG4gICAgICBbY29uZmlnXT1cImNvbmZpZ1wiXG4gICAgICBba2V5XT1cImtleVwiXG4gICAgICAoZW5hYmxlZENyb3BwZXIpPVwib25FbmFibGVFZGl0SW1hZ2Uoa2V5KVwiXG4gICAgICAoY3JvcHBlZEltYWdlRXZlbnQpPVwib25Dcm9wcGVkSW1hZ2Uoa2V5LCAkZXZlbnQpXCJcbiAgICA+PC9kaXY+XG4gIDwvZGl2PlxuXG5cbiAgPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyLS1uYXZcIj5cbiAgICA8YnV0dG9uXG4gICAgICBzZW0tYnRuLWZhYlxuICAgICAgY29ybmVyPVwidG9wLXJpZ2h0XCJcbiAgICAgIHNlbXVpLXRoZW1lPVwibGlnaHRcIlxuICAgICAgY2xhc3M9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIFwiXG4gICAgICBzZW0taW1wb3J0YW5jZT1cInNlY29uZGFyeVwiXG4gICAgICAjY2hhdE92ZXJsYXk9XCJjZGtPdmVybGF5T3JpZ2luXCJcbiAgICAgIGNka092ZXJsYXlPcmlnaW5cbiAgICAgIChjbGljayk9XCJvcGVuVGVzdEEoIWlzVGVzdEFPcGVuZWQpXCJcbiAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcHJvZmlsZS1hY2NlbnRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwYXRoMVwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cInBhdGgyXCI+PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPHNlbXVpLW92ZXJsYXktZGlhbG9nXG4gICAgICBbb3ZlcmxheU9yaWdpbl09XCJjaGF0T3ZlcmxheVwiXG4gICAgICBbaXNPcGVuZWRdPVwiaXNUZXN0QU9wZW5lZFwiXG4gICAgICAoY2xvc2UpPVwib3BlblRlc3RBKGZhbHNlKVwiXG4gICAgICAob3Blbik9XCJvcGVuVGVzdEEodHJ1ZSlcIlxuICAgICAgW292ZXJsYXlXaWR0aF09XCInYXV0bydcIlxuICAgID5cblxuICAgICAgPGRpdiAqbmdJZj1cInVwbG9hZFBhbmVsRmxhZ1wiIGNsYXNzPVwidGVtcC1jb250YWluZXIgZGlhbG9nLWNvbnRhaW5lciBiZy1kZWZhdWx0IGxlZnRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy1jb250YWluZXItLWJvZHlcIj5cbiAgICAgICAgICA8c2VtLXBhbmVsXG4gICAgICAgICAgICBbZWRpdFZpc2libGVdPVwiZWRpdFZpc2libGVcIlxuICAgICAgICAgICAgW2tleV09XCJrZXlcIlxuICAgICAgICAgICAgW2ltYWdlTmFtZUxpc3RdPVwiaW1hZ2VOYW1lTGlzdFwiXG4gICAgICAgICAgICAoY3JvcHBlZCk9XCJjcm9wcGVkSW1hZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAodXBsb2FkZWQpPVwidXBsb2FkZWRJbWFnZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChjaGFuZ2VkRm9ybSk9XCJvbkNoYW5nZWRGb3JtKCRldmVudClcIlxuICAgICAgICAgICAgKGVkaXRJbWFnZSk9XCJvbkVkaXRJbWFnZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChkZWxldGVJbWFnZSk9XCJvbkRlbGV0ZUltYWdlKCRldmVudClcIlxuICAgICAgICAgICAgKGNoYW5nZWRFZGl0TW9kZSk9XCJvbkNoYW5nZWRFZGl0TW9kZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChzaG93VXBsb2FkRXZlbnQpPVwiZWRpdFZpc2libGUgPSBmYWxzZVwiXG4gICAgICAgICAgICBbdXNlckltYWdlc109XCJ1c2VySW1hZ2VzXCJcbiAgICAgICAgICA+PC9zZW0tcGFuZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICpuZ0lmPVwiIXVwbG9hZFBhbmVsRmxhZ1wiXG4gICAgICAgICAgIGNsYXNzPVwic2V0dGluZ3MtY29udGFpbmVyIGRpYWxvZy1jb250YWluZXIgYmctZGVmYXVsdCBtdDRcIj5cbiAgICAgICAgPHNlbS1zZXR0aW5nc1xuICAgICAgICAgIChwcmVzc2VkSW1hZ2VzKT1cIm9uTWVudSgnSU1BR0VTJylcIlxuICAgICAgICAgIChwcmVzc2VkRHVwbGljYXRlKT1cIm9uTWVudSgnRFVQTElDQVRFJylcIlxuICAgICAgICAgIChwcmVzc2VkU2V0dGluZ3MpPVwib25NZW51KCdTRVRUSU5HUycpXCJcbiAgICAgICAgICAocHJlc3NlZERlbGV0ZSk9XCJvbk1lbnUoJ0RFTEVURScpXCJcbiAgICAgICAgPlxuICAgICAgICA8L3NlbS1zZXR0aW5ncz5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9zZW11aS1vdmVybGF5LWRpYWxvZz5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdCgpe2JhY2tncm91bmQtY29sb3I6I2Y1ZTVlNTtkaXNwbGF5OmJsb2NrO2JvcmRlcjoxcHggc29saWQgIzhiMDAwMDtoZWlnaHQ6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1NZWRpYUNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyB3aWRnZXQgPSB7XG4gICAgY29tcG9uZW50TmFtZTogJycsXG4gICAgZGF0YTogIGBcbiAgICBMb3JlbSBJcHN1bSBoYXMgYmVlbiB0aGUgaW5kdXN0cnkncyBzdGFuZGFyZCBkdW1teSB0ZXh0IGV2ZXIgc2luY2UgdGhlIDE1MDBzLCB3aGVuIGFuIHVua25vd24gcHJpbnRlciBvb2sgYSBnYWxsZXkgb2YgdHlwZVxuICAgIGFuZCBzY3JhbWJsZWQgaXQgdG8gbWFrZSBhIHR5cGUgc3BlY2ltZW4gYm9vay4gSXQgaGFzIHN1cnZpdmVkIG5vdCBvbmx5IGZpdmUgY2UgbnR1cmllcywgYnV0IGFsc28gdGhlIGxlYXAgaW50byBlbGVjdHJvbmljXG4gICAgdHlwZXNldHRpbmcsIHJlbWFpbmluZyBlc3NlbnRpYWxseSB1bmNoYW5nZWQuIEl0IHdhcyBwb3B1IGxhcmlzZWQgaW4gdGhlIDE5NjBzIHdpdGggdGhlIHJlbGVhc2Ugb2YgTGV0cmFzZXQgc2hlZXRzXG4gICAgY29udGFpbmluZ2BcbiAgfTtcblxuXG4gIHVzZXJJbWFnZXM/OiBBcnJheTxhbnk+ID0gW107XG4gIGVkaXRWaXNpYmxlOiBCb29sZWFuID0gZmFsc2U7XG4gIGtleTogTnVtYmVyO1xuICB1cGxvYWRQYW5lbEZsYWc6IEJvb2xlYW4gPSB0cnVlO1xuICBpbWFnZU5hbWVMaXN0OiBBcnJheTxzdHJpbmc+ID0gW107XG4gIGNvbmZpZzogYW55O1xuICB0ZW1wSW1hZ2VzOiBBcnJheTxhbnk+O1xuICBpc1Rlc3RBT3BlbmVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVkaWFTZXJ2aWNlOiBTZW1NZWRpYVNlcnZpY2UsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgLy8gdGhpcy53aWRnZXQgPSB0aGlzLmluamVjdG9yLmdldCgnd2lkZ2V0Jyk7XG4gICAgLy8gaWYodGhpcy53aWRnZXQuY29tcG9uZW50TmFtZSA9PT0gJ1NlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50Jykge1xuICAgIC8vICAgY29uc29sZS5sb2coJ0dvdCB0aGUgd3lzaXd5ZyBkYXRhJywgdGhpcy53aWRnZXQpO1xuICAgIC8vIH1cblxuICAgIHRoaXMuX21lZGlhU2VydmljZS5pbWFnZUNvbXBvbmVudENoYW5nZXMuc3Vic2NyaWJlKGFsbEltYWdlcyA9PiB7XG4gICAgICBsZXQgZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdCA9IFtdO1xuICAgICAgdGhpcy51c2VySW1hZ2VzID0gYWxsSW1hZ2VzO1xuICAgICAgZm9yIChjb25zdCBpbWFnZSBvZiBhbGxJbWFnZXMpIHtcbiAgICAgICAgZWRpdE1vZGUgPSBlZGl0TW9kZSB8fCBpbWFnZS5lZGl0TW9kZTtcbiAgICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0LnB1c2goaW1hZ2UuZmlsZU5hbWUpO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZWRpdFZpc2libGUgPSBlZGl0TW9kZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5pbWFnZUNvbmZpZ0NoYW5nZXMuc3Vic2NyaWJlKGNvbmZpZyA9PiB7XG4gICAgICB0aGlzLmNvbmZpZyA9IF8uY2xvbmVEZWVwKGNvbmZpZyk7XG4gICAgfSk7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmltYWdlTG9hZENoYW5nZXMuc3Vic2NyaWJlKGFsbEltYWdlcyA9PiB7XG4gICAgICB0aGlzLnRlbXBJbWFnZXMgPSBhbGxJbWFnZXM7XG4gICAgICB0aGlzLmltYWdlTmFtZUxpc3QgPSBbXTtcbiAgICAgIHRoaXMudXNlckltYWdlcyA9IGFsbEltYWdlcztcbiAgICAgIGZvciAoY29uc3QgaW1hZ2Ugb2YgYWxsSW1hZ2VzKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdC5wdXNoKGltYWdlLmZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMua2V5ID0gYWxsSW1hZ2VzLmxlbmd0aCAtIDE7XG4gICAgICB0aGlzLmVkaXRWaXNpYmxlID0gZmFsc2U7XG4gICAgICBpZiAoYWxsSW1hZ2VzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UudGVtcENoYW5nZXMuc3Vic2NyaWJlKGFsbEltYWdlcyA9PiB7XG4gICAgICB0aGlzLnRlbXBJbWFnZXMgPSBhbGxJbWFnZXM7XG4gICAgfSk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gIH1cbiAgdXBsb2FkZWRJbWFnZShpbWFnZTogRmlsZSkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5wdXRJbWFnZShpbWFnZSk7XG4gIH1cbiAgb25FbmFibGVFZGl0SW1hZ2UoaW5kZXgpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2Uub25FZGl0RW5hYmxlKGluZGV4KTtcbiAgICB0aGlzLnVwbG9hZFBhbmVsRmxhZyA9IHRydWU7XG4gICAgdGhpcy5rZXkgPSBpbmRleDtcbiAgfVxuICBvbkVkaXRJbWFnZShpbmRleCkge1xuICAgIHRoaXMua2V5ID0gaW5kZXg7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLm9uRWRpdEVuYWJsZShpbmRleCk7XG4gIH1cbiAgb25EZWxldGVJbWFnZShpbmRleCkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5vbkRlbGV0ZUltYWdlKGluZGV4KTtcbiAgfVxuICBvbk1lbnUobW9kZSkge1xuICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgY2FzZSAnSU1BR0VTJzpcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0RVUExJQ0FURSc6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnU0VUVElOR1MnOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0RFTEVURSc6XG4gICAgICAgIHRoaXMuX21lZGlhU2VydmljZS5jbGVhckltYWdlcygpO1xuICAgICAgICB0aGlzLmltYWdlTmFtZUxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgb25DaGFuZ2VkRm9ybShmb3JtRGF0YTogYW55KSB7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmZvcm1DaGFuZ2VkKHRoaXMua2V5LCBmb3JtRGF0YSk7XG4gIH1cbiAgb25DaGFuZ2VkRWRpdE1vZGUobW9kZTogc3RyaW5nKSB7XG4gICAgaWYgKG1vZGUgPT09ICdBUFBMWScpIHtcbiAgICAgIC8vIHRoaXMuZWRpdFZpc2libGUgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmltYWdlTmFtZUxpc3QubGVuZ3RoID4gMSkge1xuICAgICAgICB0aGlzLnVwbG9hZFBhbmVsRmxhZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9tZWRpYVNlcnZpY2Uub25FZGl0SW1hZ2UodGhpcy5rZXksIG1vZGUpO1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5jbGVhckNvbmZpZyh0aGlzLmtleSk7XG4gIH1cbiAgb25Dcm9wcGVkSW1hZ2UoaW5kZXgsIGNyb3BwZWRJbWFnZSkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5wdXRDcm9wcGVkSW1hZ2UoaW5kZXgsIGNyb3BwZWRJbWFnZSk7XG4gIH1cbiAgb3BlblRlc3RBKGlzT3BlbmVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5pc1Rlc3RBT3BlbmVkID0gaXNPcGVuZWQ7XG4gIH1cbiAgY3JvcHBlZEltYWdlKGl0ZW0pe1xuICAgIGNvbnNvbGUubG9nKCdub3Qgc3VyZScsIGl0ZW0pXG4gIH1cbn1cbiJdfQ==