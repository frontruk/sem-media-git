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
var SemVideoContainerComponent = /** @class */ (function () {
    function SemVideoContainerComponent(injector) {
        this.injector = injector;
        this.dataChange = new EventEmitter();
        this.selectedItem = new EventEmitter();
        this.editMode = false;
        this.isTestAOpened = false;
    }
    /**
     * @return {?}
     */
    SemVideoContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
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
    SemVideoContainerComponent.prototype.openSettings = 
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
    function (status) {
        // this.isTestAOpened = status;
        this.dataChange.emit(this.data);
    };
    SemVideoContainerComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector,
                    selector: '[sem-video-container]',
                    template: "\n<div class=\"sem-dnd-container\" *ngIf=\"data.data !== null\">\n  <div class=\"embed-container\" *ngIf=\"data.data.hasOwnProperty('videoId')\">\n    <iframe width=\"100%\"\n    height=\"100%\"\n    frameborder=\"0\"\n    allowfullscreen\n    [src]=\"data.data.videoId | youtubeSafeUrl\"\n    style=\"border: solid 1px black\" >\n    </iframe>\n  </div>\n\n\n  <div *ngIf=\"editMode\" class=\"sem-dnd-container--nav\">\n    <button\n      sem-btn-fab\n      small\n      corner=\"top-left\"\n      semui-theme=\"light\"\n      class=\"absolute top-0 right-0 \"\n      sem-importance=\"inverted\"\n      #chatOverlay=\"cdkOverlayOrigin\"\n      cdkOverlayOrigin\n      (click)=\"openSettings(!isTestAOpened)\"\n    >\n      <span class=\"sem-icon-drop_icon\"></span>\n    </button>\n    <!--<semui-overlay-dialog-->\n      <!--[overlayOrigin]=\"chatOverlay\"-->\n      <!--[isOpened]=\"isTestAOpened\"-->\n      <!--(close)=\"setSelected(false)\"-->\n      <!--(open)=\"setSelected(true)\"-->\n      <!--[overlayWidth]=\"'auto'\"-->\n    <!--&gt;-->\n    <!--</semui-overlay-dialog>-->\n  </div>\n</div>\n",
                    styles: [":host{background-color:#f5e5e5;display:block;border:1px solid #8b0000}"]
                },] },
    ];
    SemVideoContainerComponent.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    SemVideoContainerComponent.propDecorators = {
        data: [{ type: Input }],
        dataChange: [{ type: Output }],
        selectedItem: [{ type: Output }],
        editMode: [{ type: Input }]
    };
    return SemVideoContainerComponent;
}());
export { SemVideoContainerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVcsWUFBWSxFQUFFLEtBQUssRUFBRyxNQUFNLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQzs7OztBQUtoSCxpQ0FHQzs7O0lBRkMseUJBQVc7O0lBQ1gsMkJBQStCOztBQUdqQztJQWtERSxvQ0FBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUw1QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNyQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDM0MsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVuQixrQkFBYSxHQUFHLEtBQUssQ0FBQztJQUNZLENBQUM7Ozs7SUFDMUMsNkNBQVE7OztJQUFSLGNBQVksQ0FBQztJQUViLDJDQUEyQztJQUMzQyxrQkFBa0I7SUFDbEIscUJBQXFCO0lBQ3JCLG1CQUFtQjtJQUNuQixLQUFLO0lBQ0wsZ0RBQWdEO0lBQ2hELGdDQUFnQztJQUNoQyw4Q0FBOEM7SUFDOUMseUJBQXlCO0lBQ3pCLElBQUk7SUFDSiw4Q0FBOEM7SUFDOUMsdUNBQXVDO0lBQ3ZDLElBQUk7SUFFSix1Q0FBdUM7SUFDdkMsbUNBQW1DO0lBQ25DLElBQUk7SUFDSixFQUFFO0lBQ0YsNEJBQTRCO0lBQzVCLHFDQUFxQztJQUNyQyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR0osaURBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBWixVQUFhLE1BQWU7UUFDMUIsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNqQyxDQUFDOztnQkEvRUYsU0FBUyxTQUFDOztvQkFFVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUUsbWxDQXFDWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyx3RUFBd0UsQ0FBQztpQkFDbkY7OztnQkFwRDBELFFBQVE7Ozt1QkFzRGhFLEtBQUs7NkJBQ0wsTUFBTTsrQkFDTixNQUFNOzJCQUNOLEtBQUs7O0lBa0NSLGlDQUFDO0NBQUEsQUFqRkQsSUFpRkM7U0F0Q1ksMEJBQTBCOzs7SUFDckMsMENBQTJCOztJQUMzQixnREFBK0M7O0lBQy9DLGtEQUFvRDs7SUFDcEQsOENBQTBCOztJQUUxQixtREFBNkI7Ozs7O0lBQ2pCLDhDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0ICwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgIE91dHB1dCwgSW5qZWN0b3IsIFZpZXdDaGlsZCwgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFlvdXR1YmVWaWRlb01vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3ZpZGVvJztcbi8vIGltcG9ydCB7IFBhZ2luYXRpb25JbnN0YW5jZSB9IGZyb20gJ25neC1wYWdpbmF0aW9uJztcbi8vIGltcG9ydCB7IFNlbVZpZGVvU2VydmljZSB9IGZyb20gJy4uLy4uL3NlbS12aWRlby5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBWaWRlb09iamVjdCB7XG4gIGlkOiBzdHJpbmc7XG4gIGRhdGE6IFlvdXR1YmVWaWRlb01vZGVsIHwgbnVsbDtcbn1cblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3IsXG4gIHNlbGVjdG9yOiAnW3NlbS12aWRlby1jb250YWluZXJdJyxcbiAgdGVtcGxhdGU6IGBcbjxkaXYgY2xhc3M9XCJzZW0tZG5kLWNvbnRhaW5lclwiICpuZ0lmPVwiZGF0YS5kYXRhICE9PSBudWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJlbWJlZC1jb250YWluZXJcIiAqbmdJZj1cImRhdGEuZGF0YS5oYXNPd25Qcm9wZXJ0eSgndmlkZW9JZCcpXCI+XG4gICAgPGlmcmFtZSB3aWR0aD1cIjEwMCVcIlxuICAgIGhlaWdodD1cIjEwMCVcIlxuICAgIGZyYW1lYm9yZGVyPVwiMFwiXG4gICAgYWxsb3dmdWxsc2NyZWVuXG4gICAgW3NyY109XCJkYXRhLmRhdGEudmlkZW9JZCB8IHlvdXR1YmVTYWZlVXJsXCJcbiAgICBzdHlsZT1cImJvcmRlcjogc29saWQgMXB4IGJsYWNrXCIgPlxuICAgIDwvaWZyYW1lPlxuICA8L2Rpdj5cblxuXG4gIDxkaXYgKm5nSWY9XCJlZGl0TW9kZVwiIGNsYXNzPVwic2VtLWRuZC1jb250YWluZXItLW5hdlwiPlxuICAgIDxidXR0b25cbiAgICAgIHNlbS1idG4tZmFiXG4gICAgICBzbWFsbFxuICAgICAgY29ybmVyPVwidG9wLWxlZnRcIlxuICAgICAgc2VtdWktdGhlbWU9XCJsaWdodFwiXG4gICAgICBjbGFzcz1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgXCJcbiAgICAgIHNlbS1pbXBvcnRhbmNlPVwiaW52ZXJ0ZWRcIlxuICAgICAgI2NoYXRPdmVybGF5PVwiY2RrT3ZlcmxheU9yaWdpblwiXG4gICAgICBjZGtPdmVybGF5T3JpZ2luXG4gICAgICAoY2xpY2spPVwib3BlblNldHRpbmdzKCFpc1Rlc3RBT3BlbmVkKVwiXG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzZW0taWNvbi1kcm9wX2ljb25cIj48L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPCEtLTxzZW11aS1vdmVybGF5LWRpYWxvZy0tPlxuICAgICAgPCEtLVtvdmVybGF5T3JpZ2luXT1cImNoYXRPdmVybGF5XCItLT5cbiAgICAgIDwhLS1baXNPcGVuZWRdPVwiaXNUZXN0QU9wZW5lZFwiLS0+XG4gICAgICA8IS0tKGNsb3NlKT1cInNldFNlbGVjdGVkKGZhbHNlKVwiLS0+XG4gICAgICA8IS0tKG9wZW4pPVwic2V0U2VsZWN0ZWQodHJ1ZSlcIi0tPlxuICAgICAgPCEtLVtvdmVybGF5V2lkdGhdPVwiJ2F1dG8nXCItLT5cbiAgICA8IS0tJmd0Oy0tPlxuICAgIDwhLS08L3NlbXVpLW92ZXJsYXktZGlhbG9nPi0tPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0e2JhY2tncm91bmQtY29sb3I6I2Y1ZTVlNTtkaXNwbGF5OmJsb2NrO2JvcmRlcjoxcHggc29saWQgIzhiMDAwMH1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1WaWRlb0NvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRhdGE6IFZpZGVvT2JqZWN0O1xuICBAT3V0cHV0KCkgZGF0YUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWRJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBJbnB1dCgpIGVkaXRNb2RlID0gZmFsc2U7XG5cbiAgcHVibGljIGlzVGVzdEFPcGVuZWQgPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHt9XG4gIG5nT25Jbml0KCkge31cblxuICAvLyBwYWdpbmF0aW9uQ29uZmlnOiBQYWdpbmF0aW9uSW5zdGFuY2UgPSB7XG4gIC8vICAgaWQ6ICdjdXN0b20nLFxuICAvLyAgIGl0ZW1zUGVyUGFnZTogMixcbiAgLy8gICBjdXJyZW50UGFnZTogMVxuICAvLyB9O1xuICAvLyBzZWxlY3RlZEl0ZW0oaXRlbTogWW91dHViZVZpZGVvTW9kZWwpOiB2b2lkIHtcbiAgLy8gICB0aGlzLmRhdGFDaGFuZ2UuZW1pdChpdGVtKTtcbiAgLy8gICAvLyBUT0RPIE5lZWQgZW5hYmxlIHRoaXMgd2hlbiB5b3UgdGVzdCBpdFxuICAvLyAgIC8vIHRoaXMuZGF0YSA9IGl0ZW07XG4gIC8vIH1cbiAgLy8gY2xvc2VPdmVybGF5KHRvZ2dsZVN0YXR1czogYm9vbGVhbik6IHZvaWQge1xuICAvLyAgIHRoaXMuaXNUZXN0QU9wZW5lZCA9IHRvZ2dsZVN0YXR1cztcbiAgLy8gfVxuXG4gIC8vIG9wZW5UZXN0QShpc09wZW5lZDogYm9vbGVhbik6IHZvaWQge1xuICAvLyAgIHRoaXMuaXNUZXN0QU9wZW5lZCA9IGlzT3BlbmVkO1xuICAvLyB9XG4gIC8vXG4gIC8vIHNldFNlbGVjdGVkKGlkOiBzdHJpbmcpIHtcbiAgLy8gICB0aGlzLnNlbGVjdGVkSXRlbS5lbWl0KGRhdGEuaWQpO1xuICAvLyB9XG5cblxuICBvcGVuU2V0dGluZ3Moc3RhdHVzOiBib29sZWFuKSB7XG4gICAgLy8gdGhpcy5pc1Rlc3RBT3BlbmVkID0gc3RhdHVzO1xuICAgIHRoaXMuZGF0YUNoYW5nZS5lbWl0KHRoaXMuZGF0YSlcbiAgfVxuXG59XG4iXX0=