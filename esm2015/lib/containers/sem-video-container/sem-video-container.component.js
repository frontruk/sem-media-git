/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, Injector } from '@angular/core';
/**
 * @record
 */
export function VideoObject() { }
if (false) {
    /** @type {?} */
    VideoObject.prototype.id;
    /** @type {?} */
    VideoObject.prototype.data;
}
export class SemVideoContainerComponent {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
        this.dataChange = new EventEmitter();
        this.selectedItem = new EventEmitter();
        this.editMode = false;
        this.isTestAOpened = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    // paginationConfig: PaginationInstance = {
    //   id: 'custom',
    //   itemsPerPage: 2,
    //   currentPage: 1
    // };
    // selectedItem(item: YoutubeVideoModel): void {
    //   this.dataChange.emit(item);
    //   // TODO Need enable this when you test it
    //   // this.data = item;
    // }
    // closeOverlay(toggleStatus: boolean): void {
    //   this.isTestAOpened = toggleStatus;
    // }
    // openTestA(isOpened: boolean): void {
    //   this.isTestAOpened = isOpened;
    // }
    //
    // setSelected(id: string) {
    //   this.selectedItem.emit(data.id);
    // }
    /**
     * @param {?} status
     * @return {?}
     */
    openSettings(status) {
        // this.isTestAOpened = status;
        this.dataChange.emit(this.data);
    }
}
SemVideoContainerComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector,
                selector: '[sem-video-container]',
                template: `
<div class="sem-dnd-container" *ngIf="data.data !== null">
  <div class="embed-container" *ngIf="data.data.hasOwnProperty('videoId')">
    <iframe width="100%"
    height="100%"
    frameborder="0"
    allowfullscreen
    [src]="data.data.videoId | youtubeSafeUrl"
    style="border: solid 1px black" >
    </iframe>
  </div>


  <div *ngIf="editMode" class="sem-dnd-container--nav">
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
    <!--<semui-overlay-dialog-->
      <!--[overlayOrigin]="chatOverlay"-->
      <!--[isOpened]="isTestAOpened"-->
      <!--(close)="setSelected(false)"-->
      <!--(open)="setSelected(true)"-->
      <!--[overlayWidth]="'auto'"-->
    <!--&gt;-->
    <!--</semui-overlay-dialog>-->
  </div>
</div>
`,
                styles: [`:host{background-color:#f5e5e5;display:block;border:1px solid #8b0000}`]
            },] },
];
SemVideoContainerComponent.ctorParameters = () => [
    { type: Injector }
];
SemVideoContainerComponent.propDecorators = {
    data: [{ type: Input }],
    dataChange: [{ type: Output }],
    selectedItem: [{ type: Output }],
    editMode: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    SemVideoContainerComponent.prototype.data;
    /** @type {?} */
    SemVideoContainerComponent.prototype.dataChange;
    /** @type {?} */
    SemVideoContainerComponent.prototype.selectedItem;
    /** @type {?} */
    SemVideoContainerComponent.prototype.editMode;
    /** @type {?} */
    SemVideoContainerComponent.prototype.isTestAOpened;
    /**
     * @type {?}
     * @private
     */
    SemVideoContainerComponent.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVcsWUFBWSxFQUFFLEtBQUssRUFBRyxNQUFNLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQzs7OztBQUtoSCxpQ0FHQzs7O0lBRkMseUJBQVc7O0lBQ1gsMkJBQStCOztBQThDakMsTUFBTTs7OztJQU9KLFlBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFMNUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDckMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzNDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFbkIsa0JBQWEsR0FBRyxLQUFLLENBQUM7SUFDWSxDQUFDOzs7O0lBQzFDLFFBQVEsS0FBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBeUJiLFlBQVksQ0FBQyxNQUFlO1FBQzFCLCtCQUErQjtRQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDakMsQ0FBQzs7O1lBL0VGLFNBQVMsU0FBQzs7Z0JBRVQsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBcUNYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLHdFQUF3RSxDQUFDO2FBQ25GOzs7WUFwRDBELFFBQVE7OzttQkFzRGhFLEtBQUs7eUJBQ0wsTUFBTTsyQkFDTixNQUFNO3VCQUNOLEtBQUs7Ozs7SUFITiwwQ0FBMkI7O0lBQzNCLGdEQUErQzs7SUFDL0Msa0RBQW9EOztJQUNwRCw4Q0FBMEI7O0lBRTFCLG1EQUE2Qjs7Ozs7SUFDakIsOENBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgLCBFdmVudEVtaXR0ZXIsIElucHV0LCAgT3V0cHV0LCBJbmplY3RvciwgVmlld0NoaWxkLCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgWW91dHViZVZpZGVvTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvdmlkZW8nO1xuLy8gaW1wb3J0IHsgUGFnaW5hdGlvbkluc3RhbmNlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuLy8gaW1wb3J0IHsgU2VtVmlkZW9TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLXZpZGVvLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZpZGVvT2JqZWN0IHtcbiAgaWQ6IHN0cmluZztcbiAgZGF0YTogWW91dHViZVZpZGVvTW9kZWwgfCBudWxsO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvcixcbiAgc2VsZWN0b3I6ICdbc2VtLXZpZGVvLWNvbnRhaW5lcl0nLFxuICB0ZW1wbGF0ZTogYFxuPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyXCIgKm5nSWY9XCJkYXRhLmRhdGEgIT09IG51bGxcIj5cbiAgPGRpdiBjbGFzcz1cImVtYmVkLWNvbnRhaW5lclwiICpuZ0lmPVwiZGF0YS5kYXRhLmhhc093blByb3BlcnR5KCd2aWRlb0lkJylcIj5cbiAgICA8aWZyYW1lIHdpZHRoPVwiMTAwJVwiXG4gICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgZnJhbWVib3JkZXI9XCIwXCJcbiAgICBhbGxvd2Z1bGxzY3JlZW5cbiAgICBbc3JjXT1cImRhdGEuZGF0YS52aWRlb0lkIHwgeW91dHViZVNhZmVVcmxcIlxuICAgIHN0eWxlPVwiYm9yZGVyOiBzb2xpZCAxcHggYmxhY2tcIiA+XG4gICAgPC9pZnJhbWU+XG4gIDwvZGl2PlxuXG5cbiAgPGRpdiAqbmdJZj1cImVkaXRNb2RlXCIgY2xhc3M9XCJzZW0tZG5kLWNvbnRhaW5lci0tbmF2XCI+XG4gICAgPGJ1dHRvblxuICAgICAgc2VtLWJ0bi1mYWJcbiAgICAgIHNtYWxsXG4gICAgICBjb3JuZXI9XCJ0b3AtbGVmdFwiXG4gICAgICBzZW11aS10aGVtZT1cImxpZ2h0XCJcbiAgICAgIGNsYXNzPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCBcIlxuICAgICAgc2VtLWltcG9ydGFuY2U9XCJpbnZlcnRlZFwiXG4gICAgICAjY2hhdE92ZXJsYXk9XCJjZGtPdmVybGF5T3JpZ2luXCJcbiAgICAgIGNka092ZXJsYXlPcmlnaW5cbiAgICAgIChjbGljayk9XCJvcGVuU2V0dGluZ3MoIWlzVGVzdEFPcGVuZWQpXCJcbiAgICA+XG4gICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLWRyb3BfaWNvblwiPjwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8IS0tPHNlbXVpLW92ZXJsYXktZGlhbG9nLS0+XG4gICAgICA8IS0tW292ZXJsYXlPcmlnaW5dPVwiY2hhdE92ZXJsYXlcIi0tPlxuICAgICAgPCEtLVtpc09wZW5lZF09XCJpc1Rlc3RBT3BlbmVkXCItLT5cbiAgICAgIDwhLS0oY2xvc2UpPVwic2V0U2VsZWN0ZWQoZmFsc2UpXCItLT5cbiAgICAgIDwhLS0ob3Blbik9XCJzZXRTZWxlY3RlZCh0cnVlKVwiLS0+XG4gICAgICA8IS0tW292ZXJsYXlXaWR0aF09XCInYXV0bydcIi0tPlxuICAgIDwhLS0mZ3Q7LS0+XG4gICAgPCEtLTwvc2VtdWktb3ZlcmxheS1kaWFsb2c+LS0+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3R7YmFja2dyb3VuZC1jb2xvcjojZjVlNWU1O2Rpc3BsYXk6YmxvY2s7Ym9yZGVyOjFweCBzb2xpZCAjOGIwMDAwfWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbVZpZGVvQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YTogVmlkZW9PYmplY3Q7XG4gIEBPdXRwdXQoKSBkYXRhQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQElucHV0KCkgZWRpdE1vZGUgPSBmYWxzZTtcblxuICBwdWJsaWMgaXNUZXN0QU9wZW5lZCA9IGZhbHNlO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge31cbiAgbmdPbkluaXQoKSB7fVxuXG4gIC8vIHBhZ2luYXRpb25Db25maWc6IFBhZ2luYXRpb25JbnN0YW5jZSA9IHtcbiAgLy8gICBpZDogJ2N1c3RvbScsXG4gIC8vICAgaXRlbXNQZXJQYWdlOiAyLFxuICAvLyAgIGN1cnJlbnRQYWdlOiAxXG4gIC8vIH07XG4gIC8vIHNlbGVjdGVkSXRlbShpdGVtOiBZb3V0dWJlVmlkZW9Nb2RlbCk6IHZvaWQge1xuICAvLyAgIHRoaXMuZGF0YUNoYW5nZS5lbWl0KGl0ZW0pO1xuICAvLyAgIC8vIFRPRE8gTmVlZCBlbmFibGUgdGhpcyB3aGVuIHlvdSB0ZXN0IGl0XG4gIC8vICAgLy8gdGhpcy5kYXRhID0gaXRlbTtcbiAgLy8gfVxuICAvLyBjbG9zZU92ZXJsYXkodG9nZ2xlU3RhdHVzOiBib29sZWFuKTogdm9pZCB7XG4gIC8vICAgdGhpcy5pc1Rlc3RBT3BlbmVkID0gdG9nZ2xlU3RhdHVzO1xuICAvLyB9XG5cbiAgLy8gb3BlblRlc3RBKGlzT3BlbmVkOiBib29sZWFuKTogdm9pZCB7XG4gIC8vICAgdGhpcy5pc1Rlc3RBT3BlbmVkID0gaXNPcGVuZWQ7XG4gIC8vIH1cbiAgLy9cbiAgLy8gc2V0U2VsZWN0ZWQoaWQ6IHN0cmluZykge1xuICAvLyAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQoZGF0YS5pZCk7XG4gIC8vIH1cblxuXG4gIG9wZW5TZXR0aW5ncyhzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICAvLyB0aGlzLmlzVGVzdEFPcGVuZWQgPSBzdGF0dXM7XG4gICAgdGhpcy5kYXRhQ2hhbmdlLmVtaXQodGhpcy5kYXRhKVxuICB9XG5cbn1cbiJdfQ==