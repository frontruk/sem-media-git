/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        this.tempImage = /** @type {?} */ ({});
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
/** @nocollapse */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLW1lZGlhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9zZW0tbWVkaWEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFNL0IsTUFBTTs7OztJQVFKLFlBQW1CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO3lCQVBDLEVBQUU7MkNBQ1YsRUFBUztxQ0FDWSxJQUFJLE9BQU8sRUFBTztnQ0FDdkIsSUFBSSxPQUFPLEVBQU87a0NBQ2hCLElBQUksT0FBTyxFQUFPOzJCQUN6QixJQUFJLE9BQU8sRUFBTztRQUduRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLO1lBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRztZQUMxQixPQUFPLEVBQUUsRUFBRTtZQUNYLFNBQVMsRUFBRSxFQUFFO1lBQ2IsTUFBTSxFQUFFO2dCQUNOLEdBQUcsRUFBRSxLQUFLO2dCQUNWLElBQUksRUFBRSxLQUFLO2dCQUNYLElBQUksRUFBRSxDQUFDO2dCQUNQLE1BQU0sRUFBRSxDQUFDO2dCQUNULEtBQUssRUFBRSxLQUFLO2FBQ2I7U0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztLQUNuQzs7Ozs7O0lBQ00sU0FBUyxDQUFDLEtBQUssRUFBRSxRQUFRO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FB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Ozs7O1lBUG9CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEltYWdlTW9kZWwgfSBmcm9tICcuL21vZGVscy9pbWFnZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNlbU1lZGlhU2VydmljZSB7XG4gIGFsbEltYWdlcz86IEFycmF5PEltYWdlTW9kZWw+ID0gW107XG4gIHRlbXBJbWFnZTogSW1hZ2VNb2RlbCA9IHt9IGFzIGFueTtcbiAgcHVibGljIGltYWdlQ29tcG9uZW50Q2hhbmdlczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwdWJsaWMgaW1hZ2VMb2FkQ2hhbmdlczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwdWJsaWMgaW1hZ2VDb25maWdDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyB0ZW1wQ2hhbmdlczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB6b25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLnRlbXBJbWFnZS5lZGl0TW9kZSA9IGZhbHNlLFxuICAgIHRoaXMudGVtcEltYWdlLmZpbGVOYW1lID0gJyc7XG4gICAgdGhpcy50ZW1wSW1hZ2UuY29udHJvbEJveCA9IHtcbiAgICAgIGFsbFRleHQ6ICcnLFxuICAgICAgbWV0YVRpdGxlOiAnJyxcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBmaXQ6IGZhbHNlLFxuICAgICAgICBjcm9wOiBmYWxzZSxcbiAgICAgICAgem9vbTogMCxcbiAgICAgICAgcm90YXRlOiAwLFxuICAgICAgICBhcHBseTogZmFsc2UsXG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLnRlbXBJbWFnZS5jcm9wcGVkSW1hZ2UgPSAnJztcbiAgICB0aGlzLnRlbXBJbWFnZS51cGxvYWRlZEltYWdlID0gJyc7XG4gIH1cbiAgcHVibGljIG9uTG9hZEVuZChldmVudCwgZmlsZU5hbWUpIHtcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgIHRoaXMudGVtcEltYWdlLmZpbGVOYW1lID0gZmlsZU5hbWU7XG4gICAgICB0aGlzLnRlbXBJbWFnZS51cGxvYWRlZEltYWdlID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgIC8vIHRoaXMuZGlzYWJsZUFsbEltYWdlRWRpdCgpO1xuICAgICAgdGhpcy5hbGxJbWFnZXMucHVzaChfLmNsb25lRGVlcCh0aGlzLnRlbXBJbWFnZSkpO1xuICAgICAgdGhpcy5pbWFnZUxvYWRDaGFuZ2VzLm5leHQoXy5jbG9uZURlZXAodGhpcy5hbGxJbWFnZXMpKTtcbiAgICB9KTtcbiAgfVxuICBwdXRJbWFnZShpbWFnZTogRmlsZSkge1xuICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZpbGVSZWFkZXIub25sb2FkZW5kID0gKGUpID0+IHRoaXMub25Mb2FkRW5kKGUsIGltYWdlLm5hbWUpO1xuICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChpbWFnZSk7XG4gIH1cbiAgcHV0Q3JvcHBlZEltYWdlKGtleTogbnVtYmVyLCBjcm9wcGVkSW1hZ2U6IHN0cmluZykge1xuICAgIHRoaXMuYWxsSW1hZ2VzW2tleV0uY3JvcHBlZEltYWdlID0gY3JvcHBlZEltYWdlO1xuICAgIHRoaXMuYWxsSW1hZ2VzW2tleV0uZWRpdE1vZGUgPSBmYWxzZTtcbiAgICB0aGlzLmltYWdlQ29tcG9uZW50Q2hhbmdlcy5uZXh0KF8uY2xvbmVEZWVwKHRoaXMuYWxsSW1hZ2VzKSk7XG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGluIHByb2QgdmVyc2lvblxuICAgICAqL1xuICAgIHRoaXMudGVtcENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gIH1cbiAgZGlzYWJsZUFsbEltYWdlRWRpdCgpIHtcbiAgICBmb3IgKGxldCBpID0gMCA7IGkgPCB0aGlzLmFsbEltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5hbGxJbWFnZXNbaV0uZWRpdE1vZGUgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9ybUNoYW5nZWQoaW5kZXgsIGZvcm1EYXRhKSB7XG4gICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guYWxsVGV4dCA9IGZvcm1EYXRhLmFsbFRleHQ7XG4gICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3gubWV0YVRpdGxlID0gZm9ybURhdGEubWV0YVRpdGxlO1xuICAgIC8qKlxuICAgICAqIHJlbW92ZSBpbiBwcm9kIHZlcnNpb25cbiAgICAgKi9cbiAgICB0aGlzLnRlbXBDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXMpO1xuICB9XG4gIG9uRWRpdEltYWdlKGluZGV4LCBtb2RlKSB7XG4gICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICBjYXNlICdGSVQnOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuZml0ID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdDUk9QJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLmNyb3AgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1pPT01fSU4nOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuem9vbSA9IDAuMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdaT09NX09VVCc6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy56b29tID0gLTAuMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdST1RBVEVfTEVGVCc6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5yb3RhdGUgPSA5MDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdST1RBVEVfUklHSFQnOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcucm90YXRlID0gLTkwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0FQUExZJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLmFwcGx5ID0gdHJ1ZTtcbiAgICAgICAgLy8gdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmltYWdlQ29uZmlnQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZyk7XG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGluIHByb2QgdmVyc2lvblxuICAgICAqL1xuICAgIC8vIHRoaXMudGVtcENoYW5nZXMubmV4dChfLmNsb25lRGVlcCh0aGlzLmFsbEltYWdlcykpO1xuICB9XG4gIG9uRWRpdEVuYWJsZShpbmRleCkge1xuICAgIHRoaXMuYWxsSW1hZ2VzLmZvckVhY2goKGltYWdlLCBpKSA9PiB7XG4gICAgICBpZiAoaW5kZXggPT09IGkpIHtcbiAgICAgICAgaW1hZ2UuZWRpdE1vZGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW1hZ2UuZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmltYWdlQ29tcG9uZW50Q2hhbmdlcy5uZXh0KF8uY2xvbmVEZWVwKHRoaXMuYWxsSW1hZ2VzKSk7XG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGluIHByb2QgdmVyc2lvblxuICAgICAqL1xuICAgIHRoaXMudGVtcENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gIH1cbiAgY2xlYXJDb25maWcoaW5kZXgpIHtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuZml0ID0gZmFsc2U7XG4gICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLmNyb3AgPSBmYWxzZTtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcucm90YXRlID0gMDtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuem9vbSA9IDA7XG4gICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLmFwcGx5ID0gZmFsc2U7XG4gIH1cbiAgb25EZWxldGVJbWFnZShpbmRleCkge1xuICAgIHRoaXMuYWxsSW1hZ2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5pbWFnZUNvbXBvbmVudENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGluIHByb2QgdmVyc2lvblxuICAgICAqL1xuICAgIHRoaXMudGVtcENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gIH1cbiAgY2xlYXJJbWFnZXMoKSB7XG4gICAgdGhpcy5hbGxJbWFnZXMgPSBbXTtcbiAgICB0aGlzLmltYWdlQ29tcG9uZW50Q2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgICB0aGlzLnRlbXBDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXMpO1xuICB9XG59XG4iXX0=