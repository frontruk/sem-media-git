/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Injector } from '@angular/core';
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
     * @param {?} isOpened
     * @return {?}
     */
    openTestA(isOpened) {
        this.isTestAOpened = isOpened;
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
                selector: 'sem-media-container',
                template: `<div class="sem-dnd-container sem-media-container">
  <div class="sem-dnd-container--nav">
    <button
      sem-btn-fab
      corner="top-right"
      semui-theme="light"
      class="absolute top-0 right-0 "
      sem-importance="secondary"
      #chatOverlay="cdkOverlayOrigin"
      cdkOverlayOrigin
      (click)="openTestA(!isTestAOpened)"
    >
        <span class="sem-icon-profile-accent">
        <span class="path1"></span><span class="path2"></span>
        </span>
    </button>
    <semui-overlay-dialog
      [overlayOrigin]="chatOverlay"
      [isOpened]="isTestAOpened"
      (close)="openTestA(false)"
      (open)="openTestA(true)"
      [overlayWidth]="'auto'"
    >

      <div *ngIf="uploadPanelFlag" class="temp-container dialog-container left">
        <div class="dialog-container--body">
          <sem-panel
            [editVisible]="editVisible"
            [key]="key"
            [imageNameList]="imageNameList"
            (cropped)="croppedImage($event)"
            (uploaded)="uploadedImage($event)"
            (changedForm)="onChangedForm($event)"
            (editImage)="onEditImage($event)"
            (deleteImage)="onDeleteImage($event)"
            (changedEditMode)="onChangedEditMode($event)"
            (showUploadEvent)="editVisible = false"
            [userImages]="userImages"
          ></sem-panel>
        </div>
      </div>
      <div *ngIf="!uploadPanelFlag"
           class="settings-container dialog-container mt4">
        <sem-settings
          (pressedImages)="onMenu('IMAGES')"
          (pressedDuplicate)="onMenu('DUPLICATE')"
          (pressedSettings)="onMenu('SETTINGS')"
          (pressedDelete)="onMenu('DELETE')"
        >
        </sem-settings>
      </div>

    </semui-overlay-dialog>
  </div>
</div>


<div class="flex flex-column">

  <!-- <pre>{{tempImages | json}}</pre> -->
</div>
<div *ngIf="userImages" class="preview-container">
  <sem-cropper
    *ngFor="let image of userImages;let key = index"
    [imageData]="image.uploadedImage"
    [croppedImage]="image.croppedImage"
    [editMode]="image.editMode"
    [config]="config"
    [key]="key"
    (enabledCropper)="onEnableEditImage(key)"
    (croppedImageEvent)="onCroppedImage(key, $event)"
  ></sem-cropper>
</div>
`,
                styles: [`:host(){background-color:#f5e5e5;display:block;border:1px solid #8b0000;height:100%}`]
            },] },
];
SemMediaContainerComponent.ctorParameters = () => [
    { type: SemMediaService },
    { type: Injector }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLW1lZGlhLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9jb250YWluZXJzL3NlbS1tZWRpYS1jb250YWluZXIvc2VtLW1lZGlhLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXdDLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFFL0csT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBZ0YxRCxNQUFNOzs7OztJQW9CSixZQUFvQixhQUE4QixFQUFVLFFBQWtCO1FBQzVFLDZDQUE2QztRQUM3QyxtRUFBbUU7UUFDbkUsc0RBQXNEO1FBQ3RELElBQUk7UUFKYyxrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBbkJ2RSxXQUFNLEdBQUc7WUFDZCxhQUFhLEVBQUUsRUFBRTtZQUNqQixJQUFJLEVBQUc7Ozs7ZUFJSTtTQUNaLENBQUM7UUFHRixlQUFVLEdBQWdCLEVBQUUsQ0FBQztRQUM3QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixvQkFBZSxHQUFZLElBQUksQ0FBQztRQUNoQyxrQkFBYSxHQUFrQixFQUFFLENBQUM7UUFHbEMsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFRcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7O2dCQUN6RCxRQUFRLEdBQUcsS0FBSztZQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM1QixHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFD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Ozs7Ozs7Ozs7OztDQXlFWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxzRkFBc0YsQ0FBQzthQUNqRzs7O1lBL0VRLGVBQWU7WUFIa0MsUUFBUTs7OztJQW9GaEUsNENBT0U7O0lBR0YsZ0RBQTZCOztJQUM3QixpREFBNkI7O0lBQzdCLHlDQUFZOztJQUNaLHFEQUFnQzs7SUFDaEMsbURBQWtDOztJQUNsQyw0Q0FBWTs7SUFDWixnREFBdUI7O0lBQ3ZCLG1EQUFzQjs7SUFFVixtREFBc0M7O0lBQUUsOENBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsICBPdXRwdXQsIEluamVjdG9yLCBWaWV3Q2hpbGQsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFNlbU1lZGlhU2VydmljZSB9IGZyb20gJy4uLy4uL3NlbS1tZWRpYS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VtLW1lZGlhLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyIHNlbS1tZWRpYS1jb250YWluZXJcIj5cbiAgPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyLS1uYXZcIj5cbiAgICA8YnV0dG9uXG4gICAgICBzZW0tYnRuLWZhYlxuICAgICAgY29ybmVyPVwidG9wLXJpZ2h0XCJcbiAgICAgIHNlbXVpLXRoZW1lPVwibGlnaHRcIlxuICAgICAgY2xhc3M9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIFwiXG4gICAgICBzZW0taW1wb3J0YW5jZT1cInNlY29uZGFyeVwiXG4gICAgICAjY2hhdE92ZXJsYXk9XCJjZGtPdmVybGF5T3JpZ2luXCJcbiAgICAgIGNka092ZXJsYXlPcmlnaW5cbiAgICAgIChjbGljayk9XCJvcGVuVGVzdEEoIWlzVGVzdEFPcGVuZWQpXCJcbiAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcHJvZmlsZS1hY2NlbnRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwYXRoMVwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cInBhdGgyXCI+PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPHNlbXVpLW92ZXJsYXktZGlhbG9nXG4gICAgICBbb3ZlcmxheU9yaWdpbl09XCJjaGF0T3ZlcmxheVwiXG4gICAgICBbaXNPcGVuZWRdPVwiaXNUZXN0QU9wZW5lZFwiXG4gICAgICAoY2xvc2UpPVwib3BlblRlc3RBKGZhbHNlKVwiXG4gICAgICAob3Blbik9XCJvcGVuVGVzdEEodHJ1ZSlcIlxuICAgICAgW292ZXJsYXlXaWR0aF09XCInYXV0bydcIlxuICAgID5cblxuICAgICAgPGRpdiAqbmdJZj1cInVwbG9hZFBhbmVsRmxhZ1wiIGNsYXNzPVwidGVtcC1jb250YWluZXIgZGlhbG9nLWNvbnRhaW5lciBsZWZ0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyLS1ib2R5XCI+XG4gICAgICAgICAgPHNlbS1wYW5lbFxuICAgICAgICAgICAgW2VkaXRWaXNpYmxlXT1cImVkaXRWaXNpYmxlXCJcbiAgICAgICAgICAgIFtrZXldPVwia2V5XCJcbiAgICAgICAgICAgIFtpbWFnZU5hbWVMaXN0XT1cImltYWdlTmFtZUxpc3RcIlxuICAgICAgICAgICAgKGNyb3BwZWQpPVwiY3JvcHBlZEltYWdlKCRldmVudClcIlxuICAgICAgICAgICAgKHVwbG9hZGVkKT1cInVwbG9hZGVkSW1hZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAoY2hhbmdlZEZvcm0pPVwib25DaGFuZ2VkRm9ybSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChlZGl0SW1hZ2UpPVwib25FZGl0SW1hZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAoZGVsZXRlSW1hZ2UpPVwib25EZWxldGVJbWFnZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChjaGFuZ2VkRWRpdE1vZGUpPVwib25DaGFuZ2VkRWRpdE1vZGUoJGV2ZW50KVwiXG4gICAgICAgICAgICAoc2hvd1VwbG9hZEV2ZW50KT1cImVkaXRWaXNpYmxlID0gZmFsc2VcIlxuICAgICAgICAgICAgW3VzZXJJbWFnZXNdPVwidXNlckltYWdlc1wiXG4gICAgICAgICAgPjwvc2VtLXBhbmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdJZj1cIiF1cGxvYWRQYW5lbEZsYWdcIlxuICAgICAgICAgICBjbGFzcz1cInNldHRpbmdzLWNvbnRhaW5lciBkaWFsb2ctY29udGFpbmVyIG10NFwiPlxuICAgICAgICA8c2VtLXNldHRpbmdzXG4gICAgICAgICAgKHByZXNzZWRJbWFnZXMpPVwib25NZW51KCdJTUFHRVMnKVwiXG4gICAgICAgICAgKHByZXNzZWREdXBsaWNhdGUpPVwib25NZW51KCdEVVBMSUNBVEUnKVwiXG4gICAgICAgICAgKHByZXNzZWRTZXR0aW5ncyk9XCJvbk1lbnUoJ1NFVFRJTkdTJylcIlxuICAgICAgICAgIChwcmVzc2VkRGVsZXRlKT1cIm9uTWVudSgnREVMRVRFJylcIlxuICAgICAgICA+XG4gICAgICAgIDwvc2VtLXNldHRpbmdzPlxuICAgICAgPC9kaXY+XG5cbiAgICA8L3NlbXVpLW92ZXJsYXktZGlhbG9nPlxuICA8L2Rpdj5cbjwvZGl2PlxuXG5cbjxkaXYgY2xhc3M9XCJmbGV4IGZsZXgtY29sdW1uXCI+XG5cbiAgPCEtLSA8cHJlPnt7dGVtcEltYWdlcyB8IGpzb259fTwvcHJlPiAtLT5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cInVzZXJJbWFnZXNcIiBjbGFzcz1cInByZXZpZXctY29udGFpbmVyXCI+XG4gIDxzZW0tY3JvcHBlclxuICAgICpuZ0Zvcj1cImxldCBpbWFnZSBvZiB1c2VySW1hZ2VzO2xldCBrZXkgPSBpbmRleFwiXG4gICAgW2ltYWdlRGF0YV09XCJpbWFnZS51cGxvYWRlZEltYWdlXCJcbiAgICBbY3JvcHBlZEltYWdlXT1cImltYWdlLmNyb3BwZWRJbWFnZVwiXG4gICAgW2VkaXRNb2RlXT1cImltYWdlLmVkaXRNb2RlXCJcbiAgICBbY29uZmlnXT1cImNvbmZpZ1wiXG4gICAgW2tleV09XCJrZXlcIlxuICAgIChlbmFibGVkQ3JvcHBlcik9XCJvbkVuYWJsZUVkaXRJbWFnZShrZXkpXCJcbiAgICAoY3JvcHBlZEltYWdlRXZlbnQpPVwib25Dcm9wcGVkSW1hZ2Uoa2V5LCAkZXZlbnQpXCJcbiAgPjwvc2VtLWNyb3BwZXI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdCgpe2JhY2tncm91bmQtY29sb3I6I2Y1ZTVlNTtkaXNwbGF5OmJsb2NrO2JvcmRlcjoxcHggc29saWQgIzhiMDAwMDtoZWlnaHQ6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1NZWRpYUNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyB3aWRnZXQgPSB7XG4gICAgY29tcG9uZW50TmFtZTogJycsXG4gICAgZGF0YTogIGBcbiAgICBMb3JlbSBJcHN1bSBoYXMgYmVlbiB0aGUgaW5kdXN0cnkncyBzdGFuZGFyZCBkdW1teSB0ZXh0IGV2ZXIgc2luY2UgdGhlIDE1MDBzLCB3aGVuIGFuIHVua25vd24gcHJpbnRlciBvb2sgYSBnYWxsZXkgb2YgdHlwZVxuICAgIGFuZCBzY3JhbWJsZWQgaXQgdG8gbWFrZSBhIHR5cGUgc3BlY2ltZW4gYm9vay4gSXQgaGFzIHN1cnZpdmVkIG5vdCBvbmx5IGZpdmUgY2UgbnR1cmllcywgYnV0IGFsc28gdGhlIGxlYXAgaW50byBlbGVjdHJvbmljXG4gICAgdHlwZXNldHRpbmcsIHJlbWFpbmluZyBlc3NlbnRpYWxseSB1bmNoYW5nZWQuIEl0IHdhcyBwb3B1IGxhcmlzZWQgaW4gdGhlIDE5NjBzIHdpdGggdGhlIHJlbGVhc2Ugb2YgTGV0cmFzZXQgc2hlZXRzXG4gICAgY29udGFpbmluZ2BcbiAgfTtcblxuXG4gIHVzZXJJbWFnZXM/OiBBcnJheTxhbnk+ID0gW107XG4gIGVkaXRWaXNpYmxlOiBCb29sZWFuID0gZmFsc2U7XG4gIGtleTogTnVtYmVyO1xuICB1cGxvYWRQYW5lbEZsYWc6IEJvb2xlYW4gPSB0cnVlO1xuICBpbWFnZU5hbWVMaXN0OiBBcnJheTxzdHJpbmc+ID0gW107XG4gIGNvbmZpZzogYW55O1xuICB0ZW1wSW1hZ2VzOiBBcnJheTxhbnk+O1xuICBpc1Rlc3RBT3BlbmVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVkaWFTZXJ2aWNlOiBTZW1NZWRpYVNlcnZpY2UsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgLy8gdGhpcy53aWRnZXQgPSB0aGlzLmluamVjdG9yLmdldCgnd2lkZ2V0Jyk7XG4gICAgLy8gaWYodGhpcy53aWRnZXQuY29tcG9uZW50TmFtZSA9PT0gJ1NlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50Jykge1xuICAgIC8vICAgY29uc29sZS5sb2coJ0dvdCB0aGUgd3lzaXd5ZyBkYXRhJywgdGhpcy53aWRnZXQpO1xuICAgIC8vIH1cblxuICAgIHRoaXMuX21lZGlhU2VydmljZS5pbWFnZUNvbXBvbmVudENoYW5nZXMuc3Vic2NyaWJlKGFsbEltYWdlcyA9PiB7XG4gICAgICBsZXQgZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdCA9IFtdO1xuICAgICAgdGhpcy51c2VySW1hZ2VzID0gYWxsSW1hZ2VzO1xuICAgICAgZm9yIChjb25zdCBpbWFnZSBvZiBhbGxJbWFnZXMpIHtcbiAgICAgICAgZWRpdE1vZGUgPSBlZGl0TW9kZSB8fCBpbWFnZS5lZGl0TW9kZTtcbiAgICAgICAgdGhpcy5pbWFnZU5hbWVMaXN0LnB1c2goaW1hZ2UuZmlsZU5hbWUpO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZWRpdFZpc2libGUgPSBlZGl0TW9kZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5pbWFnZUNvbmZpZ0NoYW5nZXMuc3Vic2NyaWJlKGNvbmZpZyA9PiB7XG4gICAgICB0aGlzLmNvbmZpZyA9IF8uY2xvbmVEZWVwKGNvbmZpZyk7XG4gICAgfSk7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmltYWdlTG9hZENoYW5nZXMuc3Vic2NyaWJlKGFsbEltYWdlcyA9PiB7XG4gICAgICB0aGlzLnRlbXBJbWFnZXMgPSBhbGxJbWFnZXM7XG4gICAgICB0aGlzLmltYWdlTmFtZUxpc3QgPSBbXTtcbiAgICAgIHRoaXMudXNlckltYWdlcyA9IGFsbEltYWdlcztcbiAgICAgIGZvciAoY29uc3QgaW1hZ2Ugb2YgYWxsSW1hZ2VzKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lTGlzdC5wdXNoKGltYWdlLmZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMua2V5ID0gYWxsSW1hZ2VzLmxlbmd0aCAtIDE7XG4gICAgICB0aGlzLmVkaXRWaXNpYmxlID0gZmFsc2U7XG4gICAgICBpZiAoYWxsSW1hZ2VzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2UudGVtcENoYW5nZXMuc3Vic2NyaWJlKGFsbEltYWdlcyA9PiB7XG4gICAgICB0aGlzLnRlbXBJbWFnZXMgPSBhbGxJbWFnZXM7XG4gICAgfSk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gIH1cbiAgdXBsb2FkZWRJbWFnZShpbWFnZTogRmlsZSkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5wdXRJbWFnZShpbWFnZSk7XG4gIH1cbiAgb25FbmFibGVFZGl0SW1hZ2UoaW5kZXgpIHtcbiAgICB0aGlzLl9tZWRpYVNlcnZpY2Uub25FZGl0RW5hYmxlKGluZGV4KTtcbiAgICB0aGlzLnVwbG9hZFBhbmVsRmxhZyA9IHRydWU7XG4gICAgdGhpcy5rZXkgPSBpbmRleDtcbiAgfVxuICBvbkVkaXRJbWFnZShpbmRleCkge1xuICAgIHRoaXMua2V5ID0gaW5kZXg7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLm9uRWRpdEVuYWJsZShpbmRleCk7XG4gIH1cbiAgb25EZWxldGVJbWFnZShpbmRleCkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5vbkRlbGV0ZUltYWdlKGluZGV4KTtcbiAgfVxuICBvbk1lbnUobW9kZSkge1xuICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgY2FzZSAnSU1BR0VTJzpcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0RVUExJQ0FURSc6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnU0VUVElOR1MnOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0RFTEVURSc6XG4gICAgICAgIHRoaXMuX21lZGlhU2VydmljZS5jbGVhckltYWdlcygpO1xuICAgICAgICB0aGlzLmltYWdlTmFtZUxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbEZsYWcgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgb25DaGFuZ2VkRm9ybShmb3JtRGF0YTogYW55KSB7XG4gICAgdGhpcy5fbWVkaWFTZXJ2aWNlLmZvcm1DaGFuZ2VkKHRoaXMua2V5LCBmb3JtRGF0YSk7XG4gIH1cbiAgb25DaGFuZ2VkRWRpdE1vZGUobW9kZTogc3RyaW5nKSB7XG4gICAgaWYgKG1vZGUgPT09ICdBUFBMWScpIHtcbiAgICAgIC8vIHRoaXMuZWRpdFZpc2libGUgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmltYWdlTmFtZUxpc3QubGVuZ3RoID4gMSkge1xuICAgICAgICB0aGlzLnVwbG9hZFBhbmVsRmxhZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9tZWRpYVNlcnZpY2Uub25FZGl0SW1hZ2UodGhpcy5rZXksIG1vZGUpO1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5jbGVhckNvbmZpZyh0aGlzLmtleSk7XG4gIH1cbiAgb25Dcm9wcGVkSW1hZ2UoaW5kZXgsIGNyb3BwZWRJbWFnZSkge1xuICAgIHRoaXMuX21lZGlhU2VydmljZS5wdXRDcm9wcGVkSW1hZ2UoaW5kZXgsIGNyb3BwZWRJbWFnZSk7XG4gIH1cbiAgb3BlblRlc3RBKGlzT3BlbmVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5pc1Rlc3RBT3BlbmVkID0gaXNPcGVuZWQ7XG4gIH1cbiAgY3JvcHBlZEltYWdlKGl0ZW0pe1xuICAgIGNvbnNvbGUubG9nKCdub3Qgc3VyZScsIGl0ZW0pXG4gIH1cbn1cbiJdfQ==