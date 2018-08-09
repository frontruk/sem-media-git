/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
var SemMediaService = /** @class */ (function () {
    function SemMediaService(zone) {
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
    SemMediaService.prototype.onLoadEnd = /**
     * @param {?} event
     * @param {?} fileName
     * @return {?}
     */
    function (event, fileName) {
        var _this = this;
        this.zone.run(function () {
            _this.tempImage.fileName = fileName;
            _this.tempImage.uploadedImage = event.target.result;
            // this.disableAllImageEdit();
            // this.disableAllImageEdit();
            _this.allImages.push(_.cloneDeep(_this.tempImage));
            _this.imageLoadChanges.next(_.cloneDeep(_this.allImages));
        });
    };
    /**
     * @param {?} image
     * @return {?}
     */
    SemMediaService.prototype.putImage = /**
     * @param {?} image
     * @return {?}
     */
    function (image) {
        var _this = this;
        /** @type {?} */
        var fileReader = new FileReader();
        fileReader.onloadend = function (e) { return _this.onLoadEnd(e, image.name); };
        fileReader.readAsDataURL(image);
    };
    /**
     * @param {?} key
     * @param {?} croppedImage
     * @return {?}
     */
    SemMediaService.prototype.putCroppedImage = /**
     * @param {?} key
     * @param {?} croppedImage
     * @return {?}
     */
    function (key, croppedImage) {
        this.allImages[key].croppedImage = croppedImage;
        this.allImages[key].editMode = false;
        this.imageComponentChanges.next(_.cloneDeep(this.allImages));
        /**
             * remove in prod version
             */
        this.tempChanges.next(this.allImages);
    };
    /**
     * @return {?}
     */
    SemMediaService.prototype.disableAllImageEdit = /**
     * @return {?}
     */
    function () {
        for (var i = 0; i < this.allImages.length; i++) {
            this.allImages[i].editMode = false;
        }
    };
    /**
     * @param {?} index
     * @param {?} formData
     * @return {?}
     */
    SemMediaService.prototype.formChanged = /**
     * @param {?} index
     * @param {?} formData
     * @return {?}
     */
    function (index, formData) {
        this.allImages[index].controlBox.allText = formData.allText;
        this.allImages[index].controlBox.metaTitle = formData.metaTitle;
        /**
             * remove in prod version
             */
        this.tempChanges.next(this.allImages);
    };
    /**
     * @param {?} index
     * @param {?} mode
     * @return {?}
     */
    SemMediaService.prototype.onEditImage = /**
     * @param {?} index
     * @param {?} mode
     * @return {?}
     */
    function (index, mode) {
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
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SemMediaService.prototype.onEditEnable = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.allImages.forEach(function (image, i) {
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
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SemMediaService.prototype.clearConfig = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.allImages[index].controlBox.config.fit = false;
        this.allImages[index].controlBox.config.crop = false;
        this.allImages[index].controlBox.config.rotate = 0;
        this.allImages[index].controlBox.config.zoom = 0;
        this.allImages[index].controlBox.config.apply = false;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SemMediaService.prototype.onDeleteImage = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.allImages.splice(index, 1);
        this.imageComponentChanges.next(this.allImages);
        /**
             * remove in prod version
             */
        this.tempChanges.next(this.allImages);
    };
    /**
     * @return {?}
     */
    SemMediaService.prototype.clearImages = /**
     * @return {?}
     */
    function () {
        this.allImages = [];
        this.imageComponentChanges.next(this.allImages);
        this.tempChanges.next(this.allImages);
    };
    SemMediaService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    SemMediaService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    /** @nocollapse */ SemMediaService.ngInjectableDef = i0.defineInjectable({ factory: function SemMediaService_Factory() { return new SemMediaService(i0.inject(i0.NgZone)); }, token: SemMediaService, providedIn: "root" });
    return SemMediaService;
}());
export { SemMediaService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLW1lZGlhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9zZW0tbWVkaWEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0lBYzdCLHlCQUFtQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTt5QkFQQyxFQUFFOzJDQUNWLEVBQVM7cUNBQ1ksSUFBSSxPQUFPLEVBQU87Z0NBQ3ZCLElBQUksT0FBTyxFQUFPO2tDQUNoQixJQUFJLE9BQU8sRUFBTzsyQkFDekIsSUFBSSxPQUFPLEVBQU87UUFHbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsS0FBSztZQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUc7WUFDMUIsT0FBTyxFQUFFLEVBQUU7WUFDWCxTQUFTLEVBQUUsRUFBRTtZQUNiLE1BQU0sRUFBRTtnQkFDTixHQUFHLEVBQUUsS0FBSztnQkFDVixJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsQ0FBQztnQkFDUCxNQUFNLEVBQUUsQ0FBQztnQkFDVCxLQUFLLEVBQUUsS0FBSzthQUNiO1NBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7S0FDbkM7Ozs7OztJQUNNLG1DQUFTOzs7OztjQUFDLEtBQUssRUFBRSxRQUFROztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FB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VyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDdkM7O2dCQWhJRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVBvQixNQUFNOzs7MEJBQTNCOztTQVFhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEltYWdlTW9kZWwgfSBmcm9tICcuL21vZGVscy9pbWFnZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNlbU1lZGlhU2VydmljZSB7XG4gIGFsbEltYWdlcz86IEFycmF5PEltYWdlTW9kZWw+ID0gW107XG4gIHRlbXBJbWFnZTogSW1hZ2VNb2RlbCA9IHt9IGFzIGFueTtcbiAgcHVibGljIGltYWdlQ29tcG9uZW50Q2hhbmdlczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwdWJsaWMgaW1hZ2VMb2FkQ2hhbmdlczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwdWJsaWMgaW1hZ2VDb25maWdDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyB0ZW1wQ2hhbmdlczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB6b25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLnRlbXBJbWFnZS5lZGl0TW9kZSA9IGZhbHNlLFxuICAgIHRoaXMudGVtcEltYWdlLmZpbGVOYW1lID0gJyc7XG4gICAgdGhpcy50ZW1wSW1hZ2UuY29udHJvbEJveCA9IHtcbiAgICAgIGFsbFRleHQ6ICcnLFxuICAgICAgbWV0YVRpdGxlOiAnJyxcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBmaXQ6IGZhbHNlLFxuICAgICAgICBjcm9wOiBmYWxzZSxcbiAgICAgICAgem9vbTogMCxcbiAgICAgICAgcm90YXRlOiAwLFxuICAgICAgICBhcHBseTogZmFsc2UsXG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLnRlbXBJbWFnZS5jcm9wcGVkSW1hZ2UgPSAnJztcbiAgICB0aGlzLnRlbXBJbWFnZS51cGxvYWRlZEltYWdlID0gJyc7XG4gIH1cbiAgcHVibGljIG9uTG9hZEVuZChldmVudCwgZmlsZU5hbWUpIHtcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgIHRoaXMudGVtcEltYWdlLmZpbGVOYW1lID0gZmlsZU5hbWU7XG4gICAgICB0aGlzLnRlbXBJbWFnZS51cGxvYWRlZEltYWdlID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgIC8vIHRoaXMuZGlzYWJsZUFsbEltYWdlRWRpdCgpO1xuICAgICAgdGhpcy5hbGxJbWFnZXMucHVzaChfLmNsb25lRGVlcCh0aGlzLnRlbXBJbWFnZSkpO1xuICAgICAgdGhpcy5pbWFnZUxvYWRDaGFuZ2VzLm5leHQoXy5jbG9uZURlZXAodGhpcy5hbGxJbWFnZXMpKTtcbiAgICB9KTtcbiAgfVxuICBwdXRJbWFnZShpbWFnZTogRmlsZSkge1xuICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZpbGVSZWFkZXIub25sb2FkZW5kID0gKGUpID0+IHRoaXMub25Mb2FkRW5kKGUsIGltYWdlLm5hbWUpO1xuICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChpbWFnZSk7XG4gIH1cbiAgcHV0Q3JvcHBlZEltYWdlKGtleTogbnVtYmVyLCBjcm9wcGVkSW1hZ2U6IHN0cmluZykge1xuICAgIHRoaXMuYWxsSW1hZ2VzW2tleV0uY3JvcHBlZEltYWdlID0gY3JvcHBlZEltYWdlO1xuICAgIHRoaXMuYWxsSW1hZ2VzW2tleV0uZWRpdE1vZGUgPSBmYWxzZTtcbiAgICB0aGlzLmltYWdlQ29tcG9uZW50Q2hhbmdlcy5uZXh0KF8uY2xvbmVEZWVwKHRoaXMuYWxsSW1hZ2VzKSk7XG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGluIHByb2QgdmVyc2lvblxuICAgICAqL1xuICAgIHRoaXMudGVtcENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gIH1cbiAgZGlzYWJsZUFsbEltYWdlRWRpdCgpIHtcbiAgICBmb3IgKGxldCBpID0gMCA7IGkgPCB0aGlzLmFsbEltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5hbGxJbWFnZXNbaV0uZWRpdE1vZGUgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9ybUNoYW5nZWQoaW5kZXgsIGZvcm1EYXRhKSB7XG4gICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guYWxsVGV4dCA9IGZvcm1EYXRhLmFsbFRleHQ7XG4gICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3gubWV0YVRpdGxlID0gZm9ybURhdGEubWV0YVRpdGxlO1xuICAgIC8qKlxuICAgICAqIHJlbW92ZSBpbiBwcm9kIHZlcnNpb25cbiAgICAgKi9cbiAgICB0aGlzLnRlbXBDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXMpO1xuICB9XG4gIG9uRWRpdEltYWdlKGluZGV4LCBtb2RlKSB7XG4gICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICBjYXNlICdGSVQnOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuZml0ID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdDUk9QJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLmNyb3AgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1pPT01fSU4nOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuem9vbSA9IDAuMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdaT09NX09VVCc6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy56b29tID0gLTAuMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdST1RBVEVfTEVGVCc6XG4gICAgICAgIHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZy5yb3RhdGUgPSA5MDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdST1RBVEVfUklHSFQnOlxuICAgICAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcucm90YXRlID0gLTkwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0FQUExZJzpcbiAgICAgICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLmFwcGx5ID0gdHJ1ZTtcbiAgICAgICAgLy8gdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmltYWdlQ29uZmlnQ2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzW2luZGV4XS5jb250cm9sQm94LmNvbmZpZyk7XG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGluIHByb2QgdmVyc2lvblxuICAgICAqL1xuICAgIC8vIHRoaXMudGVtcENoYW5nZXMubmV4dChfLmNsb25lRGVlcCh0aGlzLmFsbEltYWdlcykpO1xuICB9XG4gIG9uRWRpdEVuYWJsZShpbmRleCkge1xuICAgIHRoaXMuYWxsSW1hZ2VzLmZvckVhY2goKGltYWdlLCBpKSA9PiB7XG4gICAgICBpZiAoaW5kZXggPT09IGkpIHtcbiAgICAgICAgaW1hZ2UuZWRpdE1vZGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW1hZ2UuZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmltYWdlQ29tcG9uZW50Q2hhbmdlcy5uZXh0KF8uY2xvbmVEZWVwKHRoaXMuYWxsSW1hZ2VzKSk7XG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGluIHByb2QgdmVyc2lvblxuICAgICAqL1xuICAgIHRoaXMudGVtcENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gIH1cbiAgY2xlYXJDb25maWcoaW5kZXgpIHtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuZml0ID0gZmFsc2U7XG4gICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLmNyb3AgPSBmYWxzZTtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcucm90YXRlID0gMDtcbiAgICB0aGlzLmFsbEltYWdlc1tpbmRleF0uY29udHJvbEJveC5jb25maWcuem9vbSA9IDA7XG4gICAgdGhpcy5hbGxJbWFnZXNbaW5kZXhdLmNvbnRyb2xCb3guY29uZmlnLmFwcGx5ID0gZmFsc2U7XG4gIH1cbiAgb25EZWxldGVJbWFnZShpbmRleCkge1xuICAgIHRoaXMuYWxsSW1hZ2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5pbWFnZUNvbXBvbmVudENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGluIHByb2QgdmVyc2lvblxuICAgICAqL1xuICAgIHRoaXMudGVtcENoYW5nZXMubmV4dCh0aGlzLmFsbEltYWdlcyk7XG4gIH1cbiAgY2xlYXJJbWFnZXMoKSB7XG4gICAgdGhpcy5hbGxJbWFnZXMgPSBbXTtcbiAgICB0aGlzLmltYWdlQ29tcG9uZW50Q2hhbmdlcy5uZXh0KHRoaXMuYWxsSW1hZ2VzKTtcbiAgICB0aGlzLnRlbXBDaGFuZ2VzLm5leHQodGhpcy5hbGxJbWFnZXMpO1xuICB9XG59XG4iXX0=