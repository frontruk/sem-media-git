/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, Injector } from '@angular/core';
import * as _ from 'lodash';
import { SemMediaService } from '../../sem-media.service';
export class SemMediaContainerComponent {
    /**
     * @param {?} _mediaService
     * @param {?} injector
     */
    constructor(_mediaService, injector) {
        // this.widget = this.injector.get('widget');
        // if(this.widget.componentName === 'SemMediaContainerComponent') {
        //   console.log('Got the wysiwyg data', this.widget);
        // }
        this._mediaService = _mediaService;
        this.injector = injector;
        this.widget = {
            componentName: '',
            data: `
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer ook a galley of type
    and scrambled it to make a type specimen book. It has survived not only five ce nturies, but also the leap into electronic
    typesetting, remaining essentially unchanged. It was popu larised in the 1960s with the release of Letraset sheets
    containing`
        };
        this.userImages = [];
        this.editVisible = false;
        this.uploadPanelFlag = true;
        this.imageNameList = [];
        this.isTestAOpened = false;
        this.dataChange = new EventEmitter();
        this._mediaService.imageComponentChanges.subscribe(allImages => {
            /** @type {?} */
            let editMode = false;
            this.imageNameList = [];
            this.userImages = allImages;
            for (const image of allImages) {
                editMode = editMode || image.editMode;
                this.imageNameList.push(image.fileName);
            }
            setTimeout(() => {
                this.editVisible = editMode;
            });
        });
        this._mediaService.imageConfigChanges.subscribe(config => {
            this.config = _.cloneDeep(config);
        });
        this._mediaService.imageLoadChanges.subscribe(allImages => {
            this.tempImages = allImages;
            this.imageNameList = [];
            this.userImages = allImages;
            for (const image of allImages) {
                this.imageNameList.push(image.fileName);
            }
            this.key = allImages.length - 1;
            this.editVisible = false;
            if (allImages.length > 1) {
                this.uploadPanelFlag = false;
            }
        });
        this._mediaService.tempChanges.subscribe(allImages => {
            this.tempImages = allImages;
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} image
     * @return {?}
     */
    uploadedImage(image) {
        this._mediaService.putImage(image);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onEnableEditImage(index) {
        this._mediaService.onEditEnable(index);
        this.uploadPanelFlag = true;
        this.key = index;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onEditImage(index) {
        this.key = index;
        this._mediaService.onEditEnable(index);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onDeleteImage(index) {
        this._mediaService.onDeleteImage(index);
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    onMenu(mode) {
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
    }
    /**
     * @param {?} formData
     * @return {?}
     */
    onChangedForm(formData) {
        this._mediaService.formChanged(this.key, formData);
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    onChangedEditMode(mode) {
        if (mode === 'APPLY') {
            // this.editVisible = false;
            if (this.imageNameList.length > 1) {
                this.uploadPanelFlag = false;
            }
        }
        this._mediaService.onEditImage(this.key, mode);
        this._mediaService.clearConfig(this.key);
    }
    /**
     * @param {?} index
     * @param {?} croppedImage
     * @return {?}
     */
    onCroppedImage(index, croppedImage) {
        this._mediaService.putCroppedImage(index, croppedImage);
    }
    /**
     * @param {?} status
     * @return {?}
     */
    openSettings(status) {
        this.isTestAOpened = status;
        this.dataChange.emit({
            data: this.data,
            status: status
        });
    }
    /**
     * @param {?} item
     * @return {?}
     */
    croppedImage(item) {
        console.log('not sure', item);
    }
}
SemMediaContainerComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector,
                selector: '[sem-media-container]',
                template: `<div class="sem-dnd-container sem-media-container">



  <div *ngIf="userImages" class="preview-container">
    <div sem-cropper
      *ngFor="let image of userImages;let key = index"
      [imageData]="image.uploadedImage"
      [croppedImage]="image.croppedImage"
      [editMode]="image.editMode"
      [config]="config"
      [key]="key"
      (enabledCropper)="onEnableEditImage(key)"
      (croppedImageEvent)="onCroppedImage(key, $event)"
    ></div>
  </div>
  <div class="sem-dnd-container--nav">
    <button
      sem-btn-fab
      small
      corner="top-left"
      semui-theme="light"
      class="absolute top-0 right-0 "
      sem-importance="inverted"
      #chatOverlay="cdkOverlayOrigin"
      cdkOverlayOrigin
      (click)="openSettings(!isTestAOpened)"
    >
      <span class="sem-icon-drop_icon"></span>
    </button>
  </div>
</div>
`,
                styles: [`:host(){background-color:#f5e5e5;display:block;border:1px solid #8b0000;height:100%}.img-cropper{height:100%}`]
            },] },
];
SemMediaContainerComponent.ctorParameters = () => [
    { type: SemMediaService },
    { type: Injector }
];
SemMediaContainerComponent.propDecorators = {
    data: [{ type: Input }],
    dataChange: [{ type: Output }]
};
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
    SemMediaContainerComponent.prototype.data;
    /** @type {?} */
    SemMediaContainerComponent.prototype.dataChange;
    /**
     * @type {?}
     * @private
     */
    SemMediaContainerComponent.prototype._mediaService;
    /**
     * @type {?}
     * @private
     */
    SemMediaContainerComponent.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLW1lZGlhLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9jb250YWluZXJzL3NlbS1tZWRpYS1jb250YWluZXIvc2VtLW1lZGlhLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsWUFBWSxFQUFFLEtBQUssRUFBRyxNQUFNLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUUvRyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUF3QzFELE1BQU07Ozs7O0lBdUJKLFlBQW9CLGFBQThCLEVBQVUsUUFBa0I7UUFDNUUsNkNBQTZDO1FBQzdDLG1FQUFtRTtRQUNuRSxzREFBc0Q7UUFDdEQsSUFBSTtRQUpjLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUF0QnZFLFdBQU0sR0FBRztZQUNkLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLElBQUksRUFBRzs7OztlQUlJO1NBQ1osQ0FBQztRQUVGLGVBQVUsR0FBZ0IsRUFBRSxDQUFDO1FBQzdCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRTdCLG9CQUFlLEdBQVksSUFBSSxDQUFDO1FBQ2hDLGtCQUFhLEdBQWtCLEVBQUUsQ0FBQztRQUdsQyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUdaLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBUzdDLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFOztnQkFDekQsUUFBUSxHQUFHLEtBQUs7WUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxT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QUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQy9CLENBQUM7OztZQS9KRixTQUFTLFNBQUM7O2dCQUVULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FnQ1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsK0dBQStHLENBQUM7YUFDMUg7OztZQXZDUSxlQUFlO1lBSGtDLFFBQVE7OzttQkE4RC9ELEtBQUs7eUJBQ0wsTUFBTTs7OztJQW5CUCw0Q0FPRTs7SUFFRixnREFBNkI7O0lBQzdCLGlEQUE2Qjs7SUFDN0IseUNBQVk7O0lBQ1oscURBQWdDOztJQUNoQyxtREFBa0M7O0lBQ2xDLDRDQUFZOztJQUNaLGdEQUF1Qjs7SUFDdkIsbURBQXNCOztJQUV0QiwwQ0FBYzs7SUFDZCxnREFBK0M7Ozs7O0lBR25DLG1EQUFzQzs7Ozs7SUFBRSw4Q0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgIE91dHB1dCwgSW5qZWN0b3IsIFZpZXdDaGlsZCwgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU2VtTWVkaWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLW1lZGlhLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvcixcbiAgc2VsZWN0b3I6ICdbc2VtLW1lZGlhLWNvbnRhaW5lcl0nLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJzZW0tZG5kLWNvbnRhaW5lciBzZW0tbWVkaWEtY29udGFpbmVyXCI+XG5cblxuXG4gIDxkaXYgKm5nSWY9XCJ1c2VySW1hZ2VzXCIgY2xhc3M9XCJwcmV2aWV3LWNvbnRhaW5lclwiPlxuICAgIDxkaXYgc2VtLWNyb3BwZXJcbiAgICAgICpuZ0Zvcj1cImxldCBpbWFnZSBvZiB1c2VySW1hZ2VzO2xldCBrZXkgPSBpbmRleFwiXG4gICAgICBbaW1hZ2VEYXRhXT1cImltYWdlLnVwbG9hZGVkSW1hZ2VcIlxuICAgICAgW2Nyb3BwZWRJbWFnZV09XCJpbWFnZS5jcm9wcGVkSW1hZ2VcIlxuICAgICAgW2VkaXRNb2RlXT1cImltYWdlLmVkaXRNb2RlXCJcbiAgICAgIFtjb25maWddPVwiY29uZmlnXCJcbiAgICAgIFtrZXldPVwia2V5XCJcbiAgICAgIChlbmFibGVkQ3JvcHBlcik9XCJvbkVuYWJsZUVkaXRJbWFnZShrZXkpXCJcbiAgICAgIChjcm9wcGVkSW1hZ2VFdmVudCk9XCJvbkNyb3BwZWRJbWFnZShrZXksICRldmVudClcIlxuICAgID48L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzZW0tZG5kLWNvbnRhaW5lci0tbmF2XCI+XG4gICAgPGJ1dHRvblxuICAgICAgc2VtLWJ0bi1mYWJcbiAgICAgIHNtYWxsXG4gICAgICBjb3JuZXI9XCJ0b3AtbGVmdFwiXG4gICAgICBzZW11aS10aGVtZT1cImxpZ2h0XCJcbiAgICAgIGNsYXNzPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCBcIlxuICAgICAgc2VtLWltcG9ydGFuY2U9XCJpbnZlcnRlZFwiXG4gICAgICAjY2hhdE92ZXJsYXk9XCJjZGtPdmVybGF5T3JpZ2luXCJcbiAgICAgIGNka092ZXJsYXlPcmlnaW5cbiAgICAgIChjbGljayk9XCJvcGVuU2V0dGluZ3MoIWlzVGVzdEFPcGVuZWQpXCJcbiAgICA+XG4gICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLWRyb3BfaWNvblwiPjwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdCgpe2JhY2tncm91bmQtY29sb3I6I2Y1ZTVlNTtkaXNwbGF5OmJsb2NrO2JvcmRlcjoxcHggc29saWQgIzhiMDAwMDtoZWlnaHQ6MTAwJX0uaW1nLWNyb3BwZXJ7aGVpZ2h0OjEwMCV9YF1cbn0pXG5leHBvcnQgY2xhc3MgU2VtTWVkaWFDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgd2lkZ2V0ID0ge1xuICAgIGNvbXBvbmVudE5hbWU6ICcnLFxuICAgIGRhdGE6ICBgXG4gICAgTG9yZW0gSXBzdW0gaGFzIGJlZW4gdGhlIGluZHVzdHJ5J3Mgc3RhbmRhcmQgZHVtbXkgdGV4dCBldmVyIHNpbmNlIHRoZSAxNTAwcywgd2hlbiBhbiB1bmtub3duIHByaW50ZXIgb29rIGEgZ2FsbGV5IG9mIHR5cGVcbiAgICBhbmQgc2NyYW1ibGVkIGl0IHRvIG1ha2UgYSB0eXBlIHNwZWNpbWVuIGJvb2suIEl0IGhhcyBzdXJ2aXZlZCBub3Qgb25seSBmaXZlIGNlIG50dXJpZXMsIGJ1dCBhbHNvIHRoZSBsZWFwIGludG8gZWxlY3Ryb25pY1xuICAgIHR5cGVzZXR0aW5nLCByZW1haW5pbmcgZXNzZW50aWFsbHkgdW5jaGFuZ2VkLiBJdCB3YXMgcG9wdSBsYXJpc2VkIGluIHRoZSAxOTYwcyB3aXRoIHRoZSByZWxlYXNlIG9mIExldHJhc2V0IHNoZWV0c1xuICAgIGNvbnRhaW5pbmdgXG4gIH07XG5cbiAgdXNlckltYWdlcz86IEFycmF5PGFueT4gPSBbXTtcbiAgZWRpdFZpc2libGU6IEJvb2xlYW4gPSBmYWxzZTtcbiAga2V5OiBOdW1iZXI7XG4gIHVwbG9hZFBhbmVsRmxhZzogQm9vbGVhbiA9IHRydWU7XG4gIGltYWdlTmFtZUxpc3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgY29uZmlnOiBhbnk7XG4gIHRlbXBJbWFnZXM6IEFycmF5PGFueT47XG4gIGlzVGVzdEFPcGVuZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKSBkYXRhO1xuICBAT3V0cHV0KCkgZGF0YUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVkaWFTZXJ2aWNlOiBTZW1NZWRpYVNlcnZpY2UsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgLy8gdGhpcy53aWRnZXQgPSB0aGlzLmluamVjdG9yLmdldCgnd2lkZ2V0Jyk7XG4gICAgLy8gaWYodGhpcy53aWRnZXQuY29tcG9uZW50TmFtZSA9PT0gJ1NlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50Jykge1xuICAgIC8vICAgY29uc29sZS5sb2coJ0dvdCB0aGUgd3lzaXd5ZyBkYXRhJywgdGhpcy53aWRnZXQpO1xuICAgIC8vIH1cblxuICAgIHRoaXMuX21lZGlhU2VydmljZS5pbWFnZUNvbXBvbmVudENoYW5nZXMuc3Vic2NyaWJlKGFsbEltYWdlcyA9PiB7XG4gICAgICBsZXQgZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdCA9IFtdO1xuICAgICAgdGhpcy51c2VySW1hZ2VzID0gYWxsSW1hZ2VzO1xuICAgICAgZm9yIChjb25zdCBpbWFnZSBvZiBhbGxJbWFnZXMpIHtcbiAgICAgICAgZWRpdE1vZGUgPSBlZGl0TW9kZSB8fCBpbWFnZS5lZGl0TW9kZTtcbiAgICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0LnB1c2goaW1hZ2UuZmlsZU5hbWUpO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZWRpdFZpc2libGUgPSBlZGl0TW9kZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5pbWFnZUNvbmZpZ0NoYW5nZXMuc3Vic2NyaWJlKGNvbmZpZyA9PiB7XG4gICAgICB0aGlzLmNvbmZpZyA9IF8uY2xvbmVEZWVwKGNvbmZpZyk7XG4gICAgfSk7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmltYWdlTG9hZENoYW5nZXMuc3Vic2NyaWJlKGFsbEltYWdlcyA9PiB7XG4gICAgICB0aGlzLnRlbXBJbWFnZXMgPSBhbGxJbWFnZXM7XG4gICAgICB0aGlzLmltYWdlTmFtZUxpc3QgPSBbXTtcbiAgICAgIHRoaXMudXNlckltYWdlcyA9IGFsbEltYWdlcztcbiAgICAgIGZvciAoY29uc3QgaW1hZ2Ugb2YgYWxsSW1hZ2VzKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdC5wdXNoKGltYWdlLmZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMua2V5ID0gYWxsSW1hZ2VzLmxlbmd0aCAtIDE7XG4gICAgICB0aGlzLmVkaXRWaXNpYmxlID0gZmFsc2U7XG4gICAgICBpZiAoYWxsSW1hZ2VzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UudGVtcENoYW5nZXMuc3Vic2NyaWJlKGFsbEltYWdlcyA9PiB7XG4gICAgICB0aGlzLnRlbXBJbWFnZXMgPSBhbGxJbWFnZXM7XG4gICAgfSk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gIH1cbiAgdXBsb2FkZWRJbWFnZShpbWFnZTogRmlsZSkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5wdXRJbWFnZShpbWFnZSk7XG4gIH1cbiAgb25FbmFibGVFZGl0SW1hZ2UoaW5kZXgpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2Uub25FZGl0RW5hYmxlKGluZGV4KTtcbiAgICB0aGlzLnVwbG9hZFBhbmVsRmxhZyA9IHRydWU7XG4gICAgdGhpcy5rZXkgPSBpbmRleDtcbiAgfVxuICBvbkVkaXRJbWFnZShpbmRleCkge1xuICAgIHRoaXMua2V5ID0gaW5kZXg7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLm9uRWRpdEVuYWJsZShpbmRleCk7XG4gIH1cbiAgb25EZWxldGVJbWFnZShpbmRleCkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5vbkRlbGV0ZUltYWdlKGluZGV4KTtcbiAgfVxuICBvbk1lbnUobW9kZSkge1xuICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgY2FzZSAnSU1BR0VTJzpcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0RVUExJQ0FURSc6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnU0VUVElOR1MnOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0RFTEVURSc6XG4gICAgICAgIHRoaXMuX21lZGlhU2VydmljZS5jbGVhckltYWdlcygpO1xuICAgICAgICB0aGlzLmltYWdlTmFtZUxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgb25DaGFuZ2VkRm9ybShmb3JtRGF0YTogYW55KSB7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmZvcm1DaGFuZ2VkKHRoaXMua2V5LCBmb3JtRGF0YSk7XG4gIH1cbiAgb25DaGFuZ2VkRWRpdE1vZGUobW9kZTogc3RyaW5nKSB7XG4gICAgaWYgKG1vZGUgPT09ICdBUFBMWScpIHtcbiAgICAgIC8vIHRoaXMuZWRpdFZpc2libGUgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmltYWdlTmFtZUxpc3QubGVuZ3RoID4gMSkge1xuICAgICAgICB0aGlzLnVwbG9hZFBhbmVsRmxhZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9tZWRpYVNlcnZpY2Uub25FZGl0SW1hZ2UodGhpcy5rZXksIG1vZGUpO1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5jbGVhckNvbmZpZyh0aGlzLmtleSk7XG4gIH1cbiAgb25Dcm9wcGVkSW1hZ2UoaW5kZXgsIGNyb3BwZWRJbWFnZSkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5wdXRDcm9wcGVkSW1hZ2UoaW5kZXgsIGNyb3BwZWRJbWFnZSk7XG4gIH1cbiAgb3BlblNldHRpbmdzKHN0YXR1czogYm9vbGVhbikge1xuICAgIHRoaXMuaXNUZXN0QU9wZW5lZCA9IHN0YXR1cztcbiAgICB0aGlzLmRhdGFDaGFuZ2UuZW1pdChcbiAgICAgIHtcbiAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgfVxuICAgIClcbiAgfVxuICBjcm9wcGVkSW1hZ2UoaXRlbSl7XG4gICAgY29uc29sZS5sb2coJ25vdCBzdXJlJywgaXRlbSlcbiAgfVxufVxuIl19