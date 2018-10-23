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
        // this.widget = this.injector.get('widget');
        // if(this.widget.componentName === 'SemVideoContainerComponent') {
        //   console.log('Got the wysiwyg data', this.widget);
        // }
    }
    /**
     * @param {?} query
     * @return {?}
     */
    SemVideoContainerComponent.prototype.search = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
        console.log('query is outputed', query);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SemVideoContainerComponent.prototype.selectedItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        console.log('item select', item);
        this.dataChange.emit(item);
        // this.widget.data = item;
    };
    /**
     * @return {?}
     */
    SemVideoContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} item
     * @return {?}
     */
    SemVideoContainerComponent.prototype.closeOverlay = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { };
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
                    selector: 'sem-video-container',
                    template: "<button style=\"position: fixed; right: 0px;top:0px;\" (click)=\"selectedItem({test: 'sadasds'})\"></button>\n<div class=\"sem-dnd-container\">\n  <div class=\"embed-container\" *ngIf=\"data.hasOwnProperty('videoId')\">\n    <iframe width=\"100%\"\n    height=\"100%\"\n    frameborder=\"0\"\n    allowfullscreen\n    [src]=\"data.videoId | youtubeSafeUrl\"\n    style=\"border: solid 1px black\" >\n    </iframe>\n  </div>\n  <div class=\"sem-dnd-container--nav\">\n    <button\n      sem-btn-fab\n      corner=\"top-right\"\n      semui-theme=\"light\"\n      class=\"absolute top-0 right-0 \"\n      sem-importance=\"secondary\"\n      #chatOverlay=\"cdkOverlayOrigin\"\n      cdkOverlayOrigin\n      (click)=\"openTestA(!isTestAOpened)\"\n    >\n        <span class=\"sem-icon-profile-accent\">\n        <span class=\"path1\"></span><span class=\"path2\"></span>\n        </span>\n    </button>\n    <semui-overlay-dialog\n      [overlayOrigin]=\"chatOverlay\"\n      [isOpened]=\"isTestAOpened\"\n      (close)=\"openTestA(false)\"\n      (open)=\"openTestA(true)\"\n      [overlayWidth]=\"'auto'\"\n    >\n        <sem-video-settings-panel\n          [config]=\"paginationConfig\"\n          (selected)=\"selectedItem($event)\"\n          (close)=\"closeOverlay($event)\">\n        </sem-video-settings-panel>\n\n    </semui-overlay-dialog>\n  </div>\n</div>\n",
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
    SemVideoContainerComponent.prototype.isOpened;
    /** @type {?} */
    SemVideoContainerComponent.prototype.isTestAOpened;
    /** @type {?} */
    SemVideoContainerComponent.prototype.paginationConfig;
    /** @type {?} */
    SemVideoContainerComponent.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVcsWUFBWSxFQUFFLEtBQUssRUFBRyxNQUFNLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUtoSDtJQWtFRSxvQ0FBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUw1QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUd4QyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQVE3QixxQkFBZ0IsR0FBdUI7WUFDckMsRUFBRSxFQUFFLFFBQVE7WUFDWixZQUFZLEVBQUUsQ0FBQztZQUNmLFdBQVcsRUFBRSxDQUFDO1NBQ2YsQ0FBQztRQVRBLDZDQUE2QztRQUM3QyxtRUFBbUU7UUFDbkUsc0RBQXNEO1FBQ3RELElBQUk7SUFDTixDQUFDOzs7OztJQU1ELDJDQUFNOzs7O0lBQU4sVUFBTyxLQUFLO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUN6QyxDQUFDOzs7OztJQUVELGlEQUFZOzs7O0lBQVosVUFBYSxJQUFJO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsMkJBQTJCO0lBQzdCLENBQUM7Ozs7SUFDRCw2Q0FBUTs7O0lBQVIsY0FBWSxDQUFDOzs7OztJQUNiLGlEQUFZOzs7O0lBQVosVUFBYSxJQUFJLElBQVMsQ0FBQzs7Ozs7SUFFM0IsOENBQVM7Ozs7SUFBVCxVQUFVLFFBQWlCO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0lBQ2hDLENBQUM7O2dCQTNGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLHcxQ0EwQ1g7b0JBQ0MsTUFBTSxFQUFFLENBQUMsd0VBQXdFLENBQUM7aUJBQ25GOzs7Z0JBbkQwRCxRQUFROzs7dUJBaUVoRSxLQUFLOzZCQUNMLE1BQU07O0lBaUNULGlDQUFDO0NBQUEsQUE5RkQsSUE4RkM7U0EvQ1ksMEJBQTBCOzs7SUFhckMsMENBQWM7O0lBQ2QsZ0RBQStDOztJQUUvQyw4Q0FBeUI7O0lBQ3pCLG1EQUE2Qjs7SUFRN0Isc0RBSUU7O0lBVlUsOENBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgLCBFdmVudEVtaXR0ZXIsIElucHV0LCAgT3V0cHV0LCBJbmplY3RvciwgVmlld0NoaWxkLCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgWW91dHViZVZpZGVvTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvdmlkZW8nO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkluc3RhbmNlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgU2VtVmlkZW9TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VtLXZpZGVvLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZW0tdmlkZW8tY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIHN0eWxlPVwicG9zaXRpb246IGZpeGVkOyByaWdodDogMHB4O3RvcDowcHg7XCIgKGNsaWNrKT1cInNlbGVjdGVkSXRlbSh7dGVzdDogJ3NhZGFzZHMnfSlcIj48L2J1dHRvbj5cbjxkaXYgY2xhc3M9XCJzZW0tZG5kLWNvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwiZW1iZWQtY29udGFpbmVyXCIgKm5nSWY9XCJkYXRhLmhhc093blByb3BlcnR5KCd2aWRlb0lkJylcIj5cbiAgICA8aWZyYW1lIHdpZHRoPVwiMTAwJVwiXG4gICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgZnJhbWVib3JkZXI9XCIwXCJcbiAgICBhbGxvd2Z1bGxzY3JlZW5cbiAgICBbc3JjXT1cImRhdGEudmlkZW9JZCB8IHlvdXR1YmVTYWZlVXJsXCJcbiAgICBzdHlsZT1cImJvcmRlcjogc29saWQgMXB4IGJsYWNrXCIgPlxuICAgIDwvaWZyYW1lPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyLS1uYXZcIj5cbiAgICA8YnV0dG9uXG4gICAgICBzZW0tYnRuLWZhYlxuICAgICAgY29ybmVyPVwidG9wLXJpZ2h0XCJcbiAgICAgIHNlbXVpLXRoZW1lPVwibGlnaHRcIlxuICAgICAgY2xhc3M9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIFwiXG4gICAgICBzZW0taW1wb3J0YW5jZT1cInNlY29uZGFyeVwiXG4gICAgICAjY2hhdE92ZXJsYXk9XCJjZGtPdmVybGF5T3JpZ2luXCJcbiAgICAgIGNka092ZXJsYXlPcmlnaW5cbiAgICAgIChjbGljayk9XCJvcGVuVGVzdEEoIWlzVGVzdEFPcGVuZWQpXCJcbiAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcHJvZmlsZS1hY2NlbnRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwYXRoMVwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cInBhdGgyXCI+PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPHNlbXVpLW92ZXJsYXktZGlhbG9nXG4gICAgICBbb3ZlcmxheU9yaWdpbl09XCJjaGF0T3ZlcmxheVwiXG4gICAgICBbaXNPcGVuZWRdPVwiaXNUZXN0QU9wZW5lZFwiXG4gICAgICAoY2xvc2UpPVwib3BlblRlc3RBKGZhbHNlKVwiXG4gICAgICAob3Blbik9XCJvcGVuVGVzdEEodHJ1ZSlcIlxuICAgICAgW292ZXJsYXlXaWR0aF09XCInYXV0bydcIlxuICAgID5cbiAgICAgICAgPHNlbS12aWRlby1zZXR0aW5ncy1wYW5lbFxuICAgICAgICAgIFtjb25maWddPVwicGFnaW5hdGlvbkNvbmZpZ1wiXG4gICAgICAgICAgKHNlbGVjdGVkKT1cInNlbGVjdGVkSXRlbSgkZXZlbnQpXCJcbiAgICAgICAgICAoY2xvc2UpPVwiY2xvc2VPdmVybGF5KCRldmVudClcIj5cbiAgICAgICAgPC9zZW0tdmlkZW8tc2V0dGluZ3MtcGFuZWw+XG5cbiAgICA8L3NlbXVpLW92ZXJsYXktZGlhbG9nPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0e2JhY2tncm91bmQtY29sb3I6I2Y1ZTVlNTtkaXNwbGF5OmJsb2NrO2JvcmRlcjoxcHggc29saWQgIzhiMDAwMH1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1WaWRlb0NvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8vIHB1YmxpYyB3aWRnZXQgPSB7XG4gIC8vICAgY29tcG9uZW50TmFtZTogJycsXG4gIC8vICAgZGF0YToge1xuICAvLyAgICAgICBjaGFubmVsSWQ6ICdVQzRybEFWZ0FLMFNHay15VGZlNDhRcHcnLFxuICAvLyAgICAgICBjaGFubmVsVGl0bGU6ICdCUklHSFQgU0lERScsXG4gIC8vICAgICAgIGRlc2NyaXB0aW9uOiAnSG93IHRvIFN0YXkgSGVhbHRoeS4gV2UgYWxsIGhhdmUgZGF5cyB3aGVuIHdlIGZlZWwgYWJzb2x1dGVseSBleGhhdXN0ZWQgb3Igc29tZXRpbWVzIGEgbGl0dGxlIGRvd24gaW4gdGhlIGR1bXBzLiBCdXQgaWYgeW91IGZpbmQgeW91cnNlbGYgY29uc3RhbnRseSBjYXRjaGluZyAuLi4nLFxuICAvLyAgICAgICB0aHVtYm5haWxVcmw6ICdodHRwczovL2kueXRpbWcuY29tL3ZpL2t5b1MxZWRZNXRNL2hxZGVmYXVsdC5qcGcnLFxuICAvLyAgICAgICB0aXRsZTogJzEwIFdhcm5pbmcgU2lnbnMgWW91IEhhdmUgVml0YW1pbiBEIERlZmljaWVuY3knLFxuICAvLyAgICAgICB2aWRlb0lkOiAna3lvUzFlZFk1dE0nXG4gIC8vICAgICB9XG4gIC8vIH07XG5cbiAgQElucHV0KCkgZGF0YTtcbiAgQE91dHB1dCgpIGRhdGFDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwdWJsaWMgaXNPcGVuZWQ6IGJvb2xlYW47XG4gIHB1YmxpYyBpc1Rlc3RBT3BlbmVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAvLyB0aGlzLndpZGdldCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCd3aWRnZXQnKTtcbiAgICAvLyBpZih0aGlzLndpZGdldC5jb21wb25lbnROYW1lID09PSAnU2VtVmlkZW9Db250YWluZXJDb21wb25lbnQnKSB7XG4gICAgLy8gICBjb25zb2xlLmxvZygnR290IHRoZSB3eXNpd3lnIGRhdGEnLCB0aGlzLndpZGdldCk7XG4gICAgLy8gfVxuICB9XG4gIHBhZ2luYXRpb25Db25maWc6IFBhZ2luYXRpb25JbnN0YW5jZSA9IHtcbiAgICBpZDogJ2N1c3RvbScsXG4gICAgaXRlbXNQZXJQYWdlOiAyLFxuICAgIGN1cnJlbnRQYWdlOiAxXG4gIH07XG4gIHNlYXJjaChxdWVyeSk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdxdWVyeSBpcyBvdXRwdXRlZCcsIHF1ZXJ5KVxuICB9XG5cbiAgc2VsZWN0ZWRJdGVtKGl0ZW0pOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnaXRlbSBzZWxlY3QnLCBpdGVtKVxuICAgIHRoaXMuZGF0YUNoYW5nZS5lbWl0KGl0ZW0pO1xuICAgIC8vIHRoaXMud2lkZ2V0LmRhdGEgPSBpdGVtO1xuICB9XG4gIG5nT25Jbml0KCkge31cbiAgY2xvc2VPdmVybGF5KGl0ZW0pOiB2b2lkIHt9XG5cbiAgb3BlblRlc3RBKGlzT3BlbmVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pc1Rlc3RBT3BlbmVkID0gaXNPcGVuZWQ7XG4gIH1cblxuXG59XG4iXX0=