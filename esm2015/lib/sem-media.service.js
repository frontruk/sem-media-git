/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class SemMediaService {
    /**
     * @param {?} zone
     */
    constructor(zone) {
        this.zone = zone;
        this.allImages = [];
        this.tempImage = (/** @type {?} */ ({}));
        this.imageComponentChanges = new Subject();
        this.imageLoadChanges = new Subject();
        this.imageConfigChanges = new Subject();
        this.tempChanges = new Subject();
        this.tempImage.editMode = false,
            this.tempImage.fileName = '';
        this.tempImage.controlBox = {
            allText: '',
            metaTitle: '',
            config: {
                fit: false,
                crop: false,
                zoom: 0,
                rotate: 0,
                apply: false,
            }
        };
        this.tempImage.croppedImage = '';
        this.tempImage.uploadedImage = '';
    }
    /**
     * @param {?} event
     * @param {?} fileName
     * @return {?}
     */
    onLoadEnd(event, fileName) {
        this.zone.run(() => {
            this.tempImage.fileName = fileName;
            this.tempImage.uploadedImage = event.target.result;
            // this.disableAllImageEdit();
            this.allImages.push(_.cloneDeep(this.tempImage));
            this.imageLoadChanges.next(_.cloneDeep(this.allImages));
        });
    }
    /**
     * @param {?} image
     * @return {?}
     */
    putImage(image) {
        /** @type {?} */
        const fileReader = new FileReader();
        fileReader.onloadend = (e) => this.onLoadEnd(e, image.name);
        fileReader.readAsDataURL(image);
    }
    /**
     * @param {?} key
     * @param {?} croppedImage
     * @return {?}
     */
    putCroppedImage(key, croppedImage) {
        this.allImages[key].croppedImage = croppedImage;
        this.allImages[key].editMode = false;
        this.imageComponentChanges.next(_.cloneDeep(this.allImages));
        /**
         * remove in prod version
         */
        this.tempChanges.next(this.allImages);
    }
    /**
     * @return {?}
     */
    disableAllImageEdit() {
        for (let i = 0; i < this.allImages.length; i++) {
            this.allImages[i].editMode = false;
        }
    }
    /**
     * @param {?} index
     * @param {?} formData
     * @return {?}
     */
    formChanged(index, formData) {
        this.allImages[index].controlBox.allText = formData.allText;
        this.allImages[index].controlBox.metaTitle = formData.metaTitle;
        /**
         * remove in prod version
         */
        this.tempChanges.next(this.allImages);
    }
    /**
     * @param {?} index
     * @param {?} mode
     * @return {?}
     */
    onEditImage(index, mode) {
        switch (mode) {
            case 'FIT':
                this.allImages[index].controlBox.config.fit = true;
                break;
            case 'CROP':
                this.allImages[index].controlBox.config.crop = true;
                break;
            case 'ZOOM_IN':
                this.allImages[index].controlBox.config.zoom = 0.1;
                break;
            case 'ZOOM_OUT':
                this.allImages[index].controlBox.config.zoom = -0.1;
                break;
            case 'ROTATE_LEFT':
                this.allImages[index].controlBox.config.rotate = 90;
                break;
            case 'ROTATE_RIGHT':
                this.allImages[index].controlBox.config.rotate = -90;
                break;
            case 'APPLY':
                this.allImages[index].controlBox.config.apply = true;
                // this.allImages[index].editMode = false;
                break;
        }
        this.imageConfigChanges.next(this.allImages[index].controlBox.config);
        /**
         * remove in prod version
         */
        // this.tempChanges.next(_.cloneDeep(this.allImages));
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onEditEnable(index) {
        this.allImages.forEach((image, i) => {
            if (index === i) {
                image.editMode = true;
            }
            else {
                image.editMode = false;
            }
        });
        this.imageComponentChanges.next(_.cloneDeep(this.allImages));
        /**
         * remove in prod version
         */
        this.tempChanges.next(this.allImages);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    clearConfig(index) {
        this.allImages[index].controlBox.config.fit = false;
        this.allImages[index].controlBox.config.crop = false;
        this.allImages[index].controlBox.config.rotate = 0;
        this.allImages[index].controlBox.config.zoom = 0;
        this.allImages[index].controlBox.config.apply = false;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onDeleteImage(index) {
        this.allImages.splice(index, 1);
        this.imageComponentChanges.next(this.allImages);
        /**
         * remove in prod version
         */
        this.tempChanges.next(this.allImages);
    }
    /**
     * @return {?}
     */
    clearImages() {
        this.allImages = [];
        this.imageComponentChanges.next(this.allImages);
        this.tempChanges.next(this.allImages);
    }
}
SemMediaService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
SemMediaService.ctorParameters = () => [
    { type: NgZone }
];
/** @nocollapse */ SemMediaService.ngInjectableDef = i0.defineInjectable({ factory: function SemMediaService_Factory() { return new SemMediaService(i0.inject(i0.NgZone)); }, token: SemMediaService, providedIn: "root" });
if (false) {
    /** @type {?} */
    SemMediaService.prototype.allImages;
    /** @type {?} */
    SemMediaService.prototype.tempImage;
    /** @type {?} */
    SemMediaService.prototype.imageComponentChanges;
    /** @type {?} */
    SemMediaService.prototype.imageLoadChanges;
    /** @type {?} */
    SemMediaService.prototype.imageConfigChanges;
    /** @type {?} */
    SemMediaService.prototype.tempChanges;
    /** @type {?} */
    SemMediaService.prototype.zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLW1lZGlhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9zZW0tbWVkaWEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFNL0IsTUFBTTs7OztJQVFKLFlBQW1CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBUC9CLGNBQVMsR0FBdUIsRUFBRSxDQUFDO1FBQ25DLGNBQVMsR0FBZSxtQkFBQSxFQUFFLEVBQU8sQ0FBQztRQUMzQiwwQkFBcUIsR0FBaUIsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUN6RCxxQkFBZ0IsR0FBaUIsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUNwRCx1QkFBa0IsR0FBaUIsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUN0RCxnQkFBVyxHQUFpQixJQUFJLE9BQU8sRUFBTyxDQUFDO1FBR3BELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLEtBQUs7WUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHO1lBQzFCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsU0FBUyxFQUFFLEVBQUU7WUFDYixNQUFNLEVBQUU7Z0JBQ04sR0FBRyxFQUFFLEtBQUs7Z0JBQ1YsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLEtBQUs7YUFDYjtTQUNGLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDakMs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QyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7OztJQUNELFdBQVc7UUFDVCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7O1lBaElGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBUG9CLE1BQU07Ozs7O0lBU3pCLG9DQUFtQzs7SUFDbkMsb0NBQWtDOztJQUNsQyxnREFBZ0U7O0lBQ2hFLDJDQUEyRDs7SUFDM0QsNkNBQTZEOztJQUM3RCxzQ0FBc0Q7O0lBRTFDLCtCQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW1hZ2VNb2RlbCB9IGZyb20gJy4vbW9kZWxzL2ltYWdlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU2VtTWVkaWFTZXJ2aWNlIHtcbiAgYWxsSW1hZ2VzPzogQXJyYXk8SW1hZ2VNb2RlbD4gPSBbXTtcbiAgdGVtcEltYWdlOiBJbWFnZU1vZGVsID0ge30gYXMgYW55O1xuICBwdWJsaWMgaW1hZ2VDb21wb25lbnRDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyBpbWFnZUxvYWRDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyBpbWFnZUNvbmZpZ0NoYW5nZXM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHVibGljIHRlbXBDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHpvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMudGVtcEltYWdlLmVkaXRNb2RlID0gZmFsc2UsXG4gICAgdGhpcy50ZW1wSW1hZ2UuZmlsZU5hbWUgPSAnJztcbiAgICB0aGlzLnRlbXBJbWFnZS5jb250cm9sQm94ID0ge1xuICAgICAgYWxsVGV4dDogJycsXG4gICAgICBtZXRhVGl0bGU6ICcnLFxuICAgICAgY29uZmlnOiB7XG4gICAgICAgIGZpdDogZmFsc2UsXG4gICAgICAgIGNyb3A6IGZhbHNlLFxuICAgICAgICB6b29tOiAwLFxuICAgICAgICByb3RhdGU6IDAsXG4gICAgICAgIGFwcGx5OiBmYWxzZSxcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMudGVtcEltYWdlLmNyb3BwZWRJbWFnZSA9ICcnO1xuICAgIHRoaXMudGVtcEltYWdlLnVwbG9hZGVkSW1hZ2UgPSAnJztcbiAgfVxuICBwdWJsaWMgb25Mb2FkRW5kKGV2ZW50LCBmaWxlTmFtZSkge1xuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy50ZW1wSW1hZ2UuZmlsZU5hbWUgPSBmaWxlTmFtZTtcbiAgICAgIHRoaXMudGVtcEltYWdlLnVwbG9hZGVkSW1hZ2UgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgLy8gdGhpcy5kaXNhYmxlQWxsSW1hZ2VFZGl0KCk7XG4gICAgICB0aGlzLmFsbEltYWdlcy5wdXNoKF8uY2xvbmVEZWVwKHRoaXMudGVtcEltYWdlKSk7XG4gICAgICB0aGlzLmltYWdlTG9hZENoYW5nZXMubmV4dChfLmNsb25lRGVlcCh0aGlzLmFsbEltYWdlcykpO1xuICAgIH0pO1xuICB9XG4gIHB1dEltYWdlKGltYWdlOiBGaWxlKSB7XG4gICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgZmlsZVJlYWRlci5vbmxvYWRlbmQgPSAoZSkgPT4gdGhpcy5vbkxvYWRFbmQoZSwgaW1hZ2UubmFtZSk7XG4gICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGltYWdlKTtcbiAgfVxuICBwdXRDcm9wcGVkSW1hZ2Uoa2V5OiBudW1iZXIsIGNyb3BwZWRJbWFnZTogc3RyaW5nKSB7XG4gICAgdGhpcy5hbGxJbWFnZXNba2V5XS5jcm9wcGVkSW1hZ2UgPSBjcm9wcGVkSW1hZ2U7XG4gICAgdGhpcy5hbGxJbWFnZXNba2V5XS5lZGl0TW9kZSA9IGZhbHNlO1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLm5leHQoXy5jbG9uZURlZXAodGhpcy5hbGxJbWFnZXMpKTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgfVxuICBkaXNhYmxlQWxsSW1hZ2VFZGl0KCkge1xuICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHRoaXMuYWxsSW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmFsbEltYWdlc1tpXS5lZGl0TW9kZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3JtQ2hhbmdlZChpbmRleCwgZm9ybURhdGEpIHtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5hbGxUZXh0ID0gZm9ybURhdGEuYWxsVGV4dDtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5tZXRhVGl0bGUgPSBmb3JtRGF0YS5tZXRhVGl0bGU7XG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGluIHByb2QgdmVyc2lvblxuICAgICAqL1xuICAgIHRoaXMudGVtcENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gIH1cbiAgb25FZGl0SW1hZ2UoaW5kZXgsIG1vZGUpIHtcbiAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgIGNhc2UgJ0ZJVCc6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5maXQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0NST1AnOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuY3JvcCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnWk9PTV9JTic6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy56b29tID0gMC4xO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1pPT01fT1VUJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLnpvb20gPSAtMC4xO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1JPVEFURV9MRUZUJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLnJvdGF0ZSA9IDkwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1JPVEFURV9SSUdIVCc6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5yb3RhdGUgPSAtOTA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQVBQTFknOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuYXBwbHkgPSB0cnVlO1xuICAgICAgICAvLyB0aGlzLmFsbEltYWdlc1tpbmRleF0uZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuaW1hZ2VDb25maWdDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnKTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgLy8gdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KF8uY2xvbmVEZWVwKHRoaXMuYWxsSW1hZ2VzKSk7XG4gIH1cbiAgb25FZGl0RW5hYmxlKGluZGV4KSB7XG4gICAgdGhpcy5hbGxJbWFnZXMuZm9yRWFjaCgoaW1hZ2UsIGkpID0+IHtcbiAgICAgIGlmIChpbmRleCA9PT0gaSkge1xuICAgICAgICBpbWFnZS5lZGl0TW9kZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWFnZS5lZGl0TW9kZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLm5leHQoXy5jbG9uZURlZXAodGhpcy5hbGxJbWFnZXMpKTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgfVxuICBjbGVhckNvbmZpZyhpbmRleCkge1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5maXQgPSBmYWxzZTtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuY3JvcCA9IGZhbHNlO1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5yb3RhdGUgPSAwO1xuICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy56b29tID0gMDtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuYXBwbHkgPSBmYWxzZTtcbiAgfVxuICBvbkRlbGV0ZUltYWdlKGluZGV4KSB7XG4gICAgdGhpcy5hbGxJbWFnZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLmltYWdlQ29tcG9uZW50Q2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgICAvKipcbiAgICAgKiByZW1vdmUgaW4gcHJvZCB2ZXJzaW9uXG4gICAgICovXG4gICAgdGhpcy50ZW1wQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgfVxuICBjbGVhckltYWdlcygpIHtcbiAgICB0aGlzLmFsbEltYWdlcyA9IFtdO1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXMpO1xuICAgIHRoaXMudGVtcENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gIH1cbn1cbiJdfQ==