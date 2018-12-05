/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Injector } from '@angular/core';
import * as _ from 'lodash';
import { SemMediaService } from '../../sem-media.service';
var SemMediaSettingsContainerComponent = /** @class */ (function () {
    function SemMediaSettingsContainerComponent(_mediaService, injector) {
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
    SemMediaSettingsContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} image
     * @return {?}
     */
    SemMediaSettingsContainerComponent.prototype.uploadedImage = /**
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
    SemMediaSettingsContainerComponent.prototype.onEnableEditImage = /**
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
    SemMediaSettingsContainerComponent.prototype.onEditImage = /**
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
    SemMediaSettingsContainerComponent.prototype.onDeleteImage = /**
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
    SemMediaSettingsContainerComponent.prototype.onMenu = /**
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
    SemMediaSettingsContainerComponent.prototype.onChangedForm = /**
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
    SemMediaSettingsContainerComponent.prototype.onChangedEditMode = /**
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
    SemMediaSettingsContainerComponent.prototype.onCroppedImage = /**
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
    SemMediaSettingsContainerComponent.prototype.openTestA = /**
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
    SemMediaSettingsContainerComponent.prototype.croppedImage = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        console.log('not sure', item);
    };
    SemMediaSettingsContainerComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector,
                    selector: '[sem-media-settings-container]',
                    template: " <div *ngIf=\"uploadPanelFlag\" class=\"dialog-container bg-default left\" style=\"width:100%;\">\n  <div class=\"dialog-container--body\">\n    <sem-panel\n      [editVisible]=\"editVisible\"\n      [key]=\"key\"\n      [imageNameList]=\"imageNameList\"\n      (cropped)=\"croppedImage($event)\"\n      (uploaded)=\"uploadedImage($event)\"\n      (changedForm)=\"onChangedForm($event)\"\n      (editImage)=\"onEditImage($event)\"\n      (deleteImage)=\"onDeleteImage($event)\"\n      (changedEditMode)=\"onChangedEditMode($event)\"\n      (showUploadEvent)=\"editVisible = false\"\n      [userImages]=\"userImages\"\n    ></sem-panel>\n  </div>\n</div>\n<div *ngIf=\"!uploadPanelFlag\"\n     class=\"settings-container dialog-container bg-default mt4\">\n        <sem-settings\n          (pressedImages)=\"onMenu('IMAGES')\"\n          (pressedDuplicate)=\"onMenu('DUPLICATE')\"\n          (pressedSettings)=\"onMenu('SETTINGS')\"\n          (pressedDelete)=\"onMenu('DELETE')\"\n        >\n        </sem-settings>\n</div>\n\n",
                    styles: [":host(){display:block;border:1px solid #8b0000}.img-cropper{height:100%}"]
                },] },
    ];
    SemMediaSettingsContainerComponent.ctorParameters = function () { return [
        { type: SemMediaService },
        { type: Injector }
    ]; };
    return SemMediaSettingsContainerComponent;
}());
export { SemMediaSettingsContainerComponent };
if (false) {
    /** @type {?} */
    SemMediaSettingsContainerComponent.prototype.widget;
    /** @type {?} */
    SemMediaSettingsContainerComponent.prototype.userImages;
    /** @type {?} */
    SemMediaSettingsContainerComponent.prototype.editVisible;
    /** @type {?} */
    SemMediaSettingsContainerComponent.prototype.key;
    /** @type {?} */
    SemMediaSettingsContainerComponent.prototype.uploadPanelFlag;
    /** @type {?} */
    SemMediaSettingsContainerComponent.prototype.imageNameList;
    /** @type {?} */
    SemMediaSettingsContainerComponent.prototype.config;
    /** @type {?} */
    SemMediaSettingsContainerComponent.prototype.tempImages;
    /** @type {?} */
    SemMediaSettingsContainerComponent.prototype.isTestAOpened;
    /**
     * @type {?}
     * @private
     */
    SemMediaSettingsContainerComponent.prototype._mediaService;
    /**
     * @type {?}
     * @private
     */
    SemMediaSettingsContainerComponent.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLW1lZGlhLXNldHRpbmdzLWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bmcm9udHIvc2VtLW1lZGlhLyIsInNvdXJjZXMiOlsibGliL2NvbnRhaW5lcnMvc2VtLW1lZGlhLXNldHRpbmdzLWNvbnRhaW5lci9zZW0tbWVkaWEtc2V0dGluZ3MtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBd0MsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUUvRyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFMUQ7SUF1REUsNENBQW9CLGFBQThCLEVBQVUsUUFBa0I7UUFDNUUsNkNBQTZDO1FBQzdDLG1FQUFtRTtRQUNuRSxzREFBc0Q7UUFDdEQsSUFBSTtRQUpOLGlCQXFDQztRQXJDbUIsa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQXBCdkUsV0FBTSxHQUFHO1lBQ2QsYUFBYSxFQUFFLEVBQUU7WUFDakIsSUFBSSxFQUFHLDBZQUlJO1NBQ1osQ0FBQztRQUdGLGVBQVUsR0FBZ0IsRUFBRSxDQUFDO1FBQzdCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRTdCLG9CQUFlLEdBQVksSUFBSSxDQUFDO1FBQ2hDLGtCQUFhLEdBQWtCLEVBQUUsQ0FBQztRQUdsQyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQVNwQixJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxVQUFBLFNBQVM7O2dCQUN0RCxRQUFRLEdBQUcsS0FBSztZQUNwQixLQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUN4QixLQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQzs7Z0JBQzVCLEdBQUcsQ0FBQyxDQUFnQixJQUFBLGNBQUEsaUJBQUEsU0FBUyxDQUFB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LENBQUE7SUFDL0IsQ0FBQzs7Z0JBdEpGLFNBQVMsU0FBQzs7b0JBRVQsUUFBUSxFQUFFLGdDQUFnQztvQkFDMUMsUUFBUSxFQUFFLHFnQ0E0Qlg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsMEVBQTBFLENBQUM7aUJBQ3JGOzs7Z0JBbkNRLGVBQWU7Z0JBSGtDLFFBQVE7O0lBNEpsRSx5Q0FBQztDQUFBLEFBdkpELElBdUpDO1NBckhZLGtDQUFrQzs7O0lBQzdDLG9EQU9FOztJQUdGLHdEQUE2Qjs7SUFDN0IseURBQTZCOztJQUM3QixpREFBWTs7SUFDWiw2REFBZ0M7O0lBQ2hDLDJEQUFrQzs7SUFDbEMsb0RBQVk7O0lBQ1osd0RBQXVCOztJQUN2QiwyREFBc0I7Ozs7O0lBR1YsMkRBQXNDOzs7OztJQUFFLHNEQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsIElucHV0LCAgT3V0cHV0LCBJbmplY3RvciwgVmlld0NoaWxkLCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBTZW1NZWRpYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZW0tbWVkaWEuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yLFxuICBzZWxlY3RvcjogJ1tzZW0tbWVkaWEtc2V0dGluZ3MtY29udGFpbmVyXScsXG4gIHRlbXBsYXRlOiBgIDxkaXYgKm5nSWY9XCJ1cGxvYWRQYW5lbEZsYWdcIiBjbGFzcz1cImRpYWxvZy1jb250YWluZXIgYmctZGVmYXVsdCBsZWZ0XCIgc3R5bGU9XCJ3aWR0aDoxMDAlO1wiPlxuICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWNvbnRhaW5lci0tYm9keVwiPlxuICAgIDxzZW0tcGFuZWxcbiAgICAgIFtlZGl0VmlzaWJsZV09XCJlZGl0VmlzaWJsZVwiXG4gICAgICBba2V5XT1cImtleVwiXG4gICAgICBbaW1hZ2VOYW1lTGlzdF09XCJpbWFnZU5hbWVMaXN0XCJcbiAgICAgIChjcm9wcGVkKT1cImNyb3BwZWRJbWFnZSgkZXZlbnQpXCJcbiAgICAgICh1cGxvYWRlZCk9XCJ1cGxvYWRlZEltYWdlKCRldmVudClcIlxuICAgICAgKGNoYW5nZWRGb3JtKT1cIm9uQ2hhbmdlZEZvcm0oJGV2ZW50KVwiXG4gICAgICAoZWRpdEltYWdlKT1cIm9uRWRpdEltYWdlKCRldmVudClcIlxuICAgICAgKGRlbGV0ZUltYWdlKT1cIm9uRGVsZXRlSW1hZ2UoJGV2ZW50KVwiXG4gICAgICAoY2hhbmdlZEVkaXRNb2RlKT1cIm9uQ2hhbmdlZEVkaXRNb2RlKCRldmVudClcIlxuICAgICAgKHNob3dVcGxvYWRFdmVudCk9XCJlZGl0VmlzaWJsZSA9IGZhbHNlXCJcbiAgICAgIFt1c2VySW1hZ2VzXT1cInVzZXJJbWFnZXNcIlxuICAgID48L3NlbS1wYW5lbD5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgKm5nSWY9XCIhdXBsb2FkUGFuZWxGbGFnXCJcbiAgICAgY2xhc3M9XCJzZXR0aW5ncy1jb250YWluZXIgZGlhbG9nLWNvbnRhaW5lciBiZy1kZWZhdWx0IG10NFwiPlxuICAgICAgICA8c2VtLXNldHRpbmdzXG4gICAgICAgICAgKHByZXNzZWRJbWFnZXMpPVwib25NZW51KCdJTUFHRVMnKVwiXG4gICAgICAgICAgKHByZXNzZWREdXBsaWNhdGUpPVwib25NZW51KCdEVVBMSUNBVEUnKVwiXG4gICAgICAgICAgKHByZXNzZWRTZXR0aW5ncyk9XCJvbk1lbnUoJ1NFVFRJTkdTJylcIlxuICAgICAgICAgIChwcmVzc2VkRGVsZXRlKT1cIm9uTWVudSgnREVMRVRFJylcIlxuICAgICAgICA+XG4gICAgICAgIDwvc2VtLXNldHRpbmdzPlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW2A6aG9zdCgpe2Rpc3BsYXk6YmxvY2s7Ym9yZGVyOjFweCBzb2xpZCAjOGIwMDAwfS5pbWctY3JvcHBlcntoZWlnaHQ6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1NZWRpYVNldHRpbmdzQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIHdpZGdldCA9IHtcbiAgICBjb21wb25lbnROYW1lOiAnJyxcbiAgICBkYXRhOiAgYFxuICAgIExvcmVtIElwc3VtIGhhcyBiZWVuIHRoZSBpbmR1c3RyeSdzIHN0YW5kYXJkIGR1bW15IHRleHQgZXZlciBzaW5jZSB0aGUgMTUwMHMsIHdoZW4gYW4gdW5rbm93biBwcmludGVyIG9vayBhIGdhbGxleSBvZiB0eXBlXG4gICAgYW5kIHNjcmFtYmxlZCBpdCB0byBtYWtlIGEgdHlwZSBzcGVjaW1lbiBib29rLiBJdCBoYXMgc3Vydml2ZWQgbm90IG9ubHkgZml2ZSBjZSBudHVyaWVzLCBidXQgYWxzbyB0aGUgbGVhcCBpbnRvIGVsZWN0cm9uaWNcbiAgICB0eXBlc2V0dGluZywgcmVtYWluaW5nIGVzc2VudGlhbGx5IHVuY2hhbmdlZC4gSXQgd2FzIHBvcHUgbGFyaXNlZCBpbiB0aGUgMTk2MHMgd2l0aCB0aGUgcmVsZWFzZSBvZiBMZXRyYXNldCBzaGVldHNcbiAgICBjb250YWluaW5nYFxuICB9O1xuXG5cbiAgdXNlckltYWdlcz86IEFycmF5PGFueT4gPSBbXTtcbiAgZWRpdFZpc2libGU6IEJvb2xlYW4gPSBmYWxzZTtcbiAga2V5OiBOdW1iZXI7XG4gIHVwbG9hZFBhbmVsRmxhZzogQm9vbGVhbiA9IHRydWU7XG4gIGltYWdlTmFtZUxpc3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgY29uZmlnOiBhbnk7XG4gIHRlbXBJbWFnZXM6IEFycmF5PGFueT47XG4gIGlzVGVzdEFPcGVuZWQgPSBmYWxzZTtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lZGlhU2VydmljZTogU2VtTWVkaWFTZXJ2aWNlLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIC8vIHRoaXMud2lkZ2V0ID0gdGhpcy5pbmplY3Rvci5nZXQoJ3dpZGdldCcpO1xuICAgIC8vIGlmKHRoaXMud2lkZ2V0LmNvbXBvbmVudE5hbWUgPT09ICdTZW1NZWRpYUNvbnRhaW5lckNvbXBvbmVudCcpIHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdHb3QgdGhlIHd5c2l3eWcgZGF0YScsIHRoaXMud2lkZ2V0KTtcbiAgICAvLyB9XG5cbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLnN1YnNjcmliZShhbGxJbWFnZXMgPT4ge1xuICAgICAgbGV0IGVkaXRNb2RlID0gZmFsc2U7XG4gICAgICB0aGlzLmltYWdlTmFtZUxpc3QgPSBbXTtcbiAgICAgIHRoaXMudXNlckltYWdlcyA9IGFsbEltYWdlcztcbiAgICAgIGZvciAoY29uc3QgaW1hZ2Ugb2YgYWxsSW1hZ2VzKSB7XG4gICAgICAgIGVkaXRNb2RlID0gZWRpdE1vZGUgfHwgaW1hZ2UuZWRpdE1vZGU7XG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdC5wdXNoKGltYWdlLmZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmVkaXRWaXNpYmxlID0gZWRpdE1vZGU7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UuaW1hZ2VDb25maWdDaGFuZ2VzLnN1YnNjcmliZShjb25maWcgPT4ge1xuICAgICAgdGhpcy5jb25maWcgPSBfLmNsb25lRGVlcChjb25maWcpO1xuICAgIH0pO1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5pbWFnZUxvYWRDaGFuZ2VzLnN1YnNjcmliZShhbGxJbWFnZXMgPT4ge1xuICAgICAgdGhpcy50ZW1wSW1hZ2VzID0gYWxsSW1hZ2VzO1xuICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0ID0gW107XG4gICAgICB0aGlzLnVzZXJJbWFnZXMgPSBhbGxJbWFnZXM7XG4gICAgICBmb3IgKGNvbnN0IGltYWdlIG9mIGFsbEltYWdlcykge1xuICAgICAgICB0aGlzLmltYWdlTmFtZUxpc3QucHVzaChpbWFnZS5maWxlTmFtZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmtleSA9IGFsbEltYWdlcy5sZW5ndGggLSAxO1xuICAgICAgdGhpcy5lZGl0VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgaWYgKGFsbEltYWdlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRoaXMudXBsb2FkUGFuZWxGbGFnID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLnRlbXBDaGFuZ2VzLnN1YnNjcmliZShhbGxJbWFnZXMgPT4ge1xuICAgICAgdGhpcy50ZW1wSW1hZ2VzID0gYWxsSW1hZ2VzO1xuICAgIH0pO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICB9XG4gIHVwbG9hZGVkSW1hZ2UoaW1hZ2U6IEZpbGUpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UucHV0SW1hZ2UoaW1hZ2UpO1xuICB9XG4gIG9uRW5hYmxlRWRpdEltYWdlKGluZGV4KSB7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLm9uRWRpdEVuYWJsZShpbmRleCk7XG4gICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSB0cnVlO1xuICAgIHRoaXMua2V5ID0gaW5kZXg7XG4gIH1cbiAgb25FZGl0SW1hZ2UoaW5kZXgpIHtcbiAgICB0aGlzLmtleSA9IGluZGV4O1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5vbkVkaXRFbmFibGUoaW5kZXgpO1xuICB9XG4gIG9uRGVsZXRlSW1hZ2UoaW5kZXgpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2Uub25EZWxldGVJbWFnZShpbmRleCk7XG4gIH1cbiAgb25NZW51KG1vZGUpIHtcbiAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgIGNhc2UgJ0lNQUdFUyc6XG4gICAgICAgIHRoaXMudXBsb2FkUGFuZWxGbGFnID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdEVVBMSUNBVEUnOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1NFVFRJTkdTJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdERUxFVEUnOlxuICAgICAgICB0aGlzLl9tZWRpYVNlcnZpY2UuY2xlYXJJbWFnZXMoKTtcbiAgICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0ID0gW107XG4gICAgICAgIHRoaXMudXBsb2FkUGFuZWxGbGFnID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIG9uQ2hhbmdlZEZvcm0oZm9ybURhdGE6IGFueSkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5mb3JtQ2hhbmdlZCh0aGlzLmtleSwgZm9ybURhdGEpO1xuICB9XG4gIG9uQ2hhbmdlZEVkaXRNb2RlKG1vZGU6IHN0cmluZykge1xuICAgIGlmIChtb2RlID09PSAnQVBQTFknKSB7XG4gICAgICAvLyB0aGlzLmVkaXRWaXNpYmxlID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5pbWFnZU5hbWVMaXN0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLm9uRWRpdEltYWdlKHRoaXMua2V5LCBtb2RlKTtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UuY2xlYXJDb25maWcodGhpcy5rZXkpO1xuICB9XG4gIG9uQ3JvcHBlZEltYWdlKGluZGV4LCBjcm9wcGVkSW1hZ2UpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UucHV0Q3JvcHBlZEltYWdlKGluZGV4LCBjcm9wcGVkSW1hZ2UpO1xuICB9XG4gIG9wZW5UZXN0QShpc09wZW5lZDogYm9vbGVhbikge1xuICAgIHRoaXMuaXNUZXN0QU9wZW5lZCA9IGlzT3BlbmVkO1xuICB9XG5cblxuXG4gIGNyb3BwZWRJbWFnZShpdGVtKXtcbiAgICBjb25zb2xlLmxvZygnbm90IHN1cmUnLCBpdGVtKVxuICB9XG59XG4iXX0=