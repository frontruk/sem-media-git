/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, Injector } from '@angular/core';
var SemVideoContainerComponent = /** @class */ (function () {
    function SemVideoContainerComponent(injector) {
        this.injector = injector;
        this.dataChange = new EventEmitter();
        this.isTestAOpened = false;
        this.paginationConfig = {
            id: 'custom',
            itemsPerPage: 2,
            currentPage: 1
        };
    }
    /**
     * @param {?} item
     * @return {?}
     */
    SemVideoContainerComponent.prototype.selectedItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.dataChange.emit(item);
        // TODO Need enable this when you test it
        // this.data = item;
    };
    /**
     * @return {?}
     */
    SemVideoContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} toggleStatus
     * @return {?}
     */
    SemVideoContainerComponent.prototype.closeOverlay = /**
     * @param {?} toggleStatus
     * @return {?}
     */
    function (toggleStatus) {
        this.isTestAOpened = toggleStatus;
    };
    /**
     * @param {?} isOpened
     * @return {?}
     */
    SemVideoContainerComponent.prototype.openTestA = /**
     * @param {?} isOpened
     * @return {?}
     */
    function (isOpened) {
        this.isTestAOpened = isOpened;
    };
    SemVideoContainerComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector,
                    selector: '[sem-video-container]',
                    template: "\n<div class=\"sem-dnd-container\">\n  <div class=\"embed-container\" *ngIf=\"data && data.hasOwnProperty('videoId')\">\n    <iframe width=\"100%\"\n    height=\"100%\"\n    frameborder=\"0\"\n    allowfullscreen\n    [src]=\"data.videoId | youtubeSafeUrl\"\n    style=\"border: solid 1px black\" >\n    </iframe>\n  </div>\n  <div class=\"sem-dnd-container--nav\">\n    <button\n      sem-btn-fab\n      corner=\"top-right\"\n      semui-theme=\"light\"\n      class=\"absolute top-0 right-0 \"\n      sem-importance=\"secondary\"\n      #chatOverlay=\"cdkOverlayOrigin\"\n      cdkOverlayOrigin\n      (click)=\"openTestA(!isTestAOpened)\"\n    >\n        <span class=\"sem-icon-profile-accent\">\n        <span class=\"path1\"></span><span class=\"path2\"></span>\n        </span>\n    </button>\n    <semui-overlay-dialog\n      [overlayOrigin]=\"chatOverlay\"\n      [isOpened]=\"isTestAOpened\"\n      (close)=\"openTestA(false)\"\n      (open)=\"openTestA(true)\"\n      [overlayWidth]=\"'auto'\"\n    >\n        <div sem-video-settings-panel\n          [config]=\"paginationConfig\"\n          (selected)=\"selectedItem($event)\"\n          (close)=\"closeOverlay($event)\">\n        </div>\n\n    </semui-overlay-dialog>\n  </div>\n</div>\n",
                    styles: [":host{background-color:#f5e5e5;display:block;border:1px solid #8b0000}"]
                },] },
    ];
    SemVideoContainerComponent.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    SemVideoContainerComponent.propDecorators = {
        data: [{ type: Input }],
        dataChange: [{ type: Output }]
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
    SemVideoContainerComponent.prototype.isTestAOpened;
    /** @type {?} */
    SemVideoContainerComponent.prototype.paginationConfig;
    /** @type {?} */
    SemVideoContainerComponent.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVcsWUFBWSxFQUFFLEtBQUssRUFBRyxNQUFNLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUtoSDtJQW9ERSxvQ0FBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUY1QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN4QyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUU3QixxQkFBZ0IsR0FBdUI7WUFDckMsRUFBRSxFQUFFLFFBQVE7WUFDWixZQUFZLEVBQUUsQ0FBQztZQUNmLFdBQVcsRUFBRSxDQUFDO1NBQ2YsQ0FBQztJQUx1QyxDQUFDOzs7OztJQU0xQyxpREFBWTs7OztJQUFaLFVBQWEsSUFBdUI7UUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IseUNBQXlDO1FBQ3pDLG9CQUFvQjtJQUN0QixDQUFDOzs7O0lBQ0QsNkNBQVE7OztJQUFSLGNBQVksQ0FBQzs7Ozs7SUFDYixpREFBWTs7OztJQUFaLFVBQWEsWUFBcUI7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFDRCw4Q0FBUzs7OztJQUFULFVBQVUsUUFBaUI7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7SUFDaEMsQ0FBQzs7Z0JBckVGLFNBQVMsU0FBQzs7b0JBRVQsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLG11Q0EwQ1g7b0JBQ0MsTUFBTSxFQUFFLENBQUMsd0VBQXdFLENBQUM7aUJBQ25GOzs7Z0JBcEQwRCxRQUFROzs7dUJBc0RoRSxLQUFLOzZCQUNMLE1BQU07O0lBc0JULGlDQUFDO0NBQUEsQUF4RUQsSUF3RUM7U0F4QlksMEJBQTBCOzs7SUFDckMsMENBQWlDOztJQUNqQyxnREFBK0M7O0lBQy9DLG1EQUE2Qjs7SUFFN0Isc0RBSUU7O0lBTFUsOENBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgLCBFdmVudEVtaXR0ZXIsIElucHV0LCAgT3V0cHV0LCBJbmplY3RvciwgVmlld0NoaWxkLCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgWW91dHViZVZpZGVvTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvdmlkZW8nO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkluc3RhbmNlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgU2VtVmlkZW9TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLXZpZGVvLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvcixcbiAgc2VsZWN0b3I6ICdbc2VtLXZpZGVvLWNvbnRhaW5lcl0nLFxuICB0ZW1wbGF0ZTogYFxuPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyXCI+XG4gIDxkaXYgY2xhc3M9XCJlbWJlZC1jb250YWluZXJcIiAqbmdJZj1cImRhdGEgJiYgZGF0YS5oYXNPd25Qcm9wZXJ0eSgndmlkZW9JZCcpXCI+XG4gICAgPGlmcmFtZSB3aWR0aD1cIjEwMCVcIlxuICAgIGhlaWdodD1cIjEwMCVcIlxuICAgIGZyYW1lYm9yZGVyPVwiMFwiXG4gICAgYWxsb3dmdWxsc2NyZWVuXG4gICAgW3NyY109XCJkYXRhLnZpZGVvSWQgfCB5b3V0dWJlU2FmZVVybFwiXG4gICAgc3R5bGU9XCJib3JkZXI6IHNvbGlkIDFweCBibGFja1wiID5cbiAgICA8L2lmcmFtZT5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzZW0tZG5kLWNvbnRhaW5lci0tbmF2XCI+XG4gICAgPGJ1dHRvblxuICAgICAgc2VtLWJ0bi1mYWJcbiAgICAgIGNvcm5lcj1cInRvcC1yaWdodFwiXG4gICAgICBzZW11aS10aGVtZT1cImxpZ2h0XCJcbiAgICAgIGNsYXNzPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCBcIlxuICAgICAgc2VtLWltcG9ydGFuY2U9XCJzZWNvbmRhcnlcIlxuICAgICAgI2NoYXRPdmVybGF5PVwiY2RrT3ZlcmxheU9yaWdpblwiXG4gICAgICBjZGtPdmVybGF5T3JpZ2luXG4gICAgICAoY2xpY2spPVwib3BlblRlc3RBKCFpc1Rlc3RBT3BlbmVkKVwiXG4gICAgPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXByb2ZpbGUtYWNjZW50XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGF0aDFcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJwYXRoMlwiPjwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICAgIDxzZW11aS1vdmVybGF5LWRpYWxvZ1xuICAgICAgW292ZXJsYXlPcmlnaW5dPVwiY2hhdE92ZXJsYXlcIlxuICAgICAgW2lzT3BlbmVkXT1cImlzVGVzdEFPcGVuZWRcIlxuICAgICAgKGNsb3NlKT1cIm9wZW5UZXN0QShmYWxzZSlcIlxuICAgICAgKG9wZW4pPVwib3BlblRlc3RBKHRydWUpXCJcbiAgICAgIFtvdmVybGF5V2lkdGhdPVwiJ2F1dG8nXCJcbiAgICA+XG4gICAgICAgIDxkaXYgc2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsXG4gICAgICAgICAgW2NvbmZpZ109XCJwYWdpbmF0aW9uQ29uZmlnXCJcbiAgICAgICAgICAoc2VsZWN0ZWQpPVwic2VsZWN0ZWRJdGVtKCRldmVudClcIlxuICAgICAgICAgIChjbG9zZSk9XCJjbG9zZU92ZXJsYXkoJGV2ZW50KVwiPlxuICAgICAgICA8L2Rpdj5cblxuICAgIDwvc2VtdWktb3ZlcmxheS1kaWFsb2c+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3R7YmFja2dyb3VuZC1jb2xvcjojZjVlNWU1O2Rpc3BsYXk6YmxvY2s7Ym9yZGVyOjFweCBzb2xpZCAjOGIwMDAwfWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbVZpZGVvQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YTogWW91dHViZVZpZGVvTW9kZWw7XG4gIEBPdXRwdXQoKSBkYXRhQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHB1YmxpYyBpc1Rlc3RBT3BlbmVkID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7fVxuICBwYWdpbmF0aW9uQ29uZmlnOiBQYWdpbmF0aW9uSW5zdGFuY2UgPSB7XG4gICAgaWQ6ICdjdXN0b20nLFxuICAgIGl0ZW1zUGVyUGFnZTogMixcbiAgICBjdXJyZW50UGFnZTogMVxuICB9O1xuICBzZWxlY3RlZEl0ZW0oaXRlbTogWW91dHViZVZpZGVvTW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGFDaGFuZ2UuZW1pdChpdGVtKTtcbiAgICAvLyBUT0RPIE5lZWQgZW5hYmxlIHRoaXMgd2hlbiB5b3UgdGVzdCBpdFxuICAgIC8vIHRoaXMuZGF0YSA9IGl0ZW07XG4gIH1cbiAgbmdPbkluaXQoKSB7fVxuICBjbG9zZU92ZXJsYXkodG9nZ2xlU3RhdHVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pc1Rlc3RBT3BlbmVkID0gdG9nZ2xlU3RhdHVzO1xuICB9XG4gIG9wZW5UZXN0QShpc09wZW5lZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaXNUZXN0QU9wZW5lZCA9IGlzT3BlbmVkO1xuICB9XG5cblxufVxuIl19