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
    SemVideoContainerComponent.prototype.isOpened;
    /** @type {?} */
    SemVideoContainerComponent.prototype.isTestAOpened;
    /** @type {?} */
    SemVideoContainerComponent.prototype.paginationConfig;
    /** @type {?} */
    SemVideoContainerComponent.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVcsWUFBWSxFQUFFLEtBQUssRUFBRyxNQUFNLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUtoSDtJQW9FRSxvQ0FBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQW5CNUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFpQnhDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBRzdCLHFCQUFnQixHQUF1QjtZQUNyQyxFQUFFLEVBQUUsUUFBUTtZQUNaLFlBQVksRUFBRSxDQUFDO1lBQ2YsV0FBVyxFQUFFLENBQUM7U0FDZixDQUFDO0lBTHVDLENBQUM7Ozs7O0lBTTFDLGlEQUFZOzs7O0lBQVosVUFBYSxJQUFJO1FBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0Isb0JBQW9CO0lBQ3RCLENBQUM7Ozs7SUFDRCw2Q0FBUTs7O0lBQVIsY0FBWSxDQUFDOzs7OztJQUNiLGlEQUFZOzs7O0lBQVosVUFBYSxZQUFxQjtRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztJQUNwQyxDQUFDOzs7OztJQUNELDhDQUFTOzs7O0lBQVQsVUFBVSxRQUFpQjtRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztJQUNoQyxDQUFDOztnQkFwRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRSxtdUNBMENYO29CQUNDLE1BQU0sRUFBRSxDQUFDLHdFQUF3RSxDQUFDO2lCQUNuRjs7O2dCQW5EMEQsUUFBUTs7O3VCQXFEaEUsS0FBSzs2QkFDTCxNQUFNOztJQXNDVCxpQ0FBQztDQUFBLEFBdkZELElBdUZDO1NBeENZLDBCQUEwQjs7O0lBQ3JDLDBDQUFjOztJQUNkLGdEQUErQzs7SUFnQi9DLDhDQUF5Qjs7SUFDekIsbURBQTZCOztJQUc3QixzREFJRTs7SUFMVSw4Q0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCAsIEV2ZW50RW1pdHRlciwgSW5wdXQsICBPdXRwdXQsIEluamVjdG9yLCBWaWV3Q2hpbGQsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBZb3V0dWJlVmlkZW9Nb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy92aWRlbyc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uSW5zdGFuY2UgfSBmcm9tICduZ3gtcGFnaW5hdGlvbic7XG5pbXBvcnQgeyBTZW1WaWRlb1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZW0tdmlkZW8uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tzZW0tdmlkZW8tY29udGFpbmVyXScsXG4gIHRlbXBsYXRlOiBgXG48ZGl2IGNsYXNzPVwic2VtLWRuZC1jb250YWluZXJcIj5cbiAgPGRpdiBjbGFzcz1cImVtYmVkLWNvbnRhaW5lclwiICpuZ0lmPVwiZGF0YSAmJiBkYXRhLmhhc093blByb3BlcnR5KCd2aWRlb0lkJylcIj5cbiAgICA8aWZyYW1lIHdpZHRoPVwiMTAwJVwiXG4gICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgZnJhbWVib3JkZXI9XCIwXCJcbiAgICBhbGxvd2Z1bGxzY3JlZW5cbiAgICBbc3JjXT1cImRhdGEudmlkZW9JZCB8IHlvdXR1YmVTYWZlVXJsXCJcbiAgICBzdHlsZT1cImJvcmRlcjogc29saWQgMXB4IGJsYWNrXCIgPlxuICAgIDwvaWZyYW1lPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyLS1uYXZcIj5cbiAgICA8YnV0dG9uXG4gICAgICBzZW0tYnRuLWZhYlxuICAgICAgY29ybmVyPVwidG9wLXJpZ2h0XCJcbiAgICAgIHNlbXVpLXRoZW1lPVwibGlnaHRcIlxuICAgICAgY2xhc3M9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIFwiXG4gICAgICBzZW0taW1wb3J0YW5jZT1cInNlY29uZGFyeVwiXG4gICAgICAjY2hhdE92ZXJsYXk9XCJjZGtPdmVybGF5T3JpZ2luXCJcbiAgICAgIGNka092ZXJsYXlPcmlnaW5cbiAgICAgIChjbGljayk9XCJvcGVuVGVzdEEoIWlzVGVzdEFPcGVuZWQpXCJcbiAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2VtLWljb24tcHJvZmlsZS1hY2NlbnRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwYXRoMVwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cInBhdGgyXCI+PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPHNlbXVpLW92ZXJsYXktZGlhbG9nXG4gICAgICBbb3ZlcmxheU9yaWdpbl09XCJjaGF0T3ZlcmxheVwiXG4gICAgICBbaXNPcGVuZWRdPVwiaXNUZXN0QU9wZW5lZFwiXG4gICAgICAoY2xvc2UpPVwib3BlblRlc3RBKGZhbHNlKVwiXG4gICAgICAob3Blbik9XCJvcGVuVGVzdEEodHJ1ZSlcIlxuICAgICAgW292ZXJsYXlXaWR0aF09XCInYXV0bydcIlxuICAgID5cbiAgICAgICAgPGRpdiBzZW0tdmlkZW8tc2V0dGluZ3MtcGFuZWxcbiAgICAgICAgICBbY29uZmlnXT1cInBhZ2luYXRpb25Db25maWdcIlxuICAgICAgICAgIChzZWxlY3RlZCk9XCJzZWxlY3RlZEl0ZW0oJGV2ZW50KVwiXG4gICAgICAgICAgKGNsb3NlKT1cImNsb3NlT3ZlcmxheSgkZXZlbnQpXCI+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9zZW11aS1vdmVybGF5LWRpYWxvZz5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdHtiYWNrZ3JvdW5kLWNvbG9yOiNmNWU1ZTU7ZGlzcGxheTpibG9jaztib3JkZXI6MXB4IHNvbGlkICM4YjAwMDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgU2VtVmlkZW9Db250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhO1xuICBAT3V0cHV0KCkgZGF0YUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8vIHB1YmxpYyB3aWRnZXQgPSB7XG4gIC8vICAgY29tcG9uZW50TmFtZTogJycsXG4gIC8vICAgZGF0YToge1xuICAvLyAgICAgICBjaGFubmVsSWQ6ICdVQzRybEFWZ0FLMFNHay15VGZlNDhRcHcnLFxuICAvLyAgICAgICBjaGFubmVsVGl0bGU6ICdCUklHSFQgU0lERScsXG4gIC8vICAgICAgIGRlc2NyaXB0aW9uOiAnSG93IHRvIFN0YXkgSGVhbHRoeS4gV2UgYWxsIGhhdmUgZGF5cyB3aGVuIHdlIGZlZWwgYWJzb2x1dGVseSBleGhhdXN0ZWQgb3Igc29tZXRpbWVzIGEgbGl0dGxlIGRvd24gaW4gdGhlIGR1bXBzLiBCdXQgaWYgeW91IGZpbmQgeW91cnNlbGYgY29uc3RhbnRseSBjYXRjaGluZyAuLi4nLFxuICAvLyAgICAgICB0aHVtYm5haWxVcmw6ICdodHRwczovL2kueXRpbWcuY29tL3ZpL2t5b1MxZWRZNXRNL2hxZGVmYXVsdC5qcGcnLFxuICAvLyAgICAgICB0aXRsZTogJzEwIFdhcm5pbmcgU2lnbnMgWW91IEhhdmUgVml0YW1pbiBEIERlZmljaWVuY3knLFxuICAvLyAgICAgICB2aWRlb0lkOiAna3lvUzFlZFk1dE0nXG4gIC8vICAgICB9XG4gIC8vIH07XG5cblxuXG4gIHB1YmxpYyBpc09wZW5lZDogYm9vbGVhbjtcbiAgcHVibGljIGlzVGVzdEFPcGVuZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge31cbiAgcGFnaW5hdGlvbkNvbmZpZzogUGFnaW5hdGlvbkluc3RhbmNlID0ge1xuICAgIGlkOiAnY3VzdG9tJyxcbiAgICBpdGVtc1BlclBhZ2U6IDIsXG4gICAgY3VycmVudFBhZ2U6IDFcbiAgfTtcbiAgc2VsZWN0ZWRJdGVtKGl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLmRhdGFDaGFuZ2UuZW1pdChpdGVtKTtcbiAgICAvLyB0aGlzLmRhdGEgPSBpdGVtO1xuICB9XG4gIG5nT25Jbml0KCkge31cbiAgY2xvc2VPdmVybGF5KHRvZ2dsZVN0YXR1czogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaXNUZXN0QU9wZW5lZCA9IHRvZ2dsZVN0YXR1cztcbiAgfVxuICBvcGVuVGVzdEEoaXNPcGVuZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmlzVGVzdEFPcGVuZWQgPSBpc09wZW5lZDtcbiAgfVxuXG5cbn1cbiJdfQ==