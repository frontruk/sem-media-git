/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Injector } from '@angular/core';
var SemVideoContainerComponent = /** @class */ (function () {
    function SemVideoContainerComponent(injector) {
        this.injector = injector;
        this.widget = {
            componentName: '',
            data: {
                channelId: 'UC4rlAVgAK0SGk-yTfe48Qpw',
                channelTitle: 'BRIGHT SIDE',
                description: 'How to Stay Healthy. We all have days when we feel absolutely exhausted or sometimes a little down in the dumps. But if you find yourself constantly catching ...',
                thumbnailUrl: 'https://i.ytimg.com/vi/kyoS1edY5tM/hqdefault.jpg',
                title: '10 Warning Signs You Have Vitamin D Deficiency',
                videoId: 'kyoS1edY5tM'
            }
        };
        this.isTestAOpened = false;
        this.paginationConfig = {
            id: 'custom',
            itemsPerPage: 2,
            currentPage: 1
        };
        this.widget = this.injector.get('widget');
        if (this.widget.componentName === 'SemVideoContainerComponent') {
            console.log('Got the wysiwyg data', this.widget);
        }
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
        this.widget.data = item;
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
                    template: "<div class=\"sem-dnd-container\">\n  <div class=\"embed-container\" *ngIf=\"widget.data.hasOwnProperty('videoId')\">\n    <iframe width=\"100%\"\n    height=\"100%\"\n    frameborder=\"0\"\n    allowfullscreen\n    [src]=\"widget.data.videoId | youtubeSafeUrl\"\n    style=\"border: solid 1px black\" >\n    </iframe>\n  </div>\n  <div class=\"sem-dnd-container--nav\">\n    <button\n      sem-btn-fab\n      corner=\"top-right\"\n      semui-theme=\"light\"\n      class=\"absolute top-0 right-0 \"\n      sem-importance=\"secondary\"\n      #chatOverlay=\"cdkOverlayOrigin\"\n      cdkOverlayOrigin\n      (click)=\"openTestA(!isTestAOpened)\"\n    >\n        <span class=\"sem-icon-profile-accent\">\n        <span class=\"path1\"></span><span class=\"path2\"></span>\n        </span>\n    </button>\n    <semui-overlay-dialog\n      [overlayOrigin]=\"chatOverlay\"\n      [isOpened]=\"isTestAOpened\"\n      (close)=\"openTestA(false)\"\n      (open)=\"openTestA(true)\"\n      [overlayWidth]=\"'auto'\"\n    >\n        <sem-video-settings-panel\n          [config]=\"paginationConfig\"\n          (selected)=\"selectedItem($event)\"\n          (close)=\"closeOverlay($event)\">\n        </sem-video-settings-panel>\n\n    </semui-overlay-dialog>\n  </div>\n</div>\n",
                    styles: [":host{background-color:#f5e5e5;display:block;border:1px solid #8b0000;height:100%}.embed-container{height:100vh}"]
                },] },
    ];
    SemVideoContainerComponent.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    return SemVideoContainerComponent;
}());
export { SemVideoContainerComponent };
if (false) {
    /** @type {?} */
    SemVideoContainerComponent.prototype.widget;
    /** @type {?} */
    SemVideoContainerComponent.prototype.isOpened;
    /** @type {?} */
    SemVideoContainerComponent.prototype.isTestAOpened;
    /** @type {?} */
    SemVideoContainerComponent.prototype.paginationConfig;
    /** @type {?} */
    SemVideoContainerComponent.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9jb250YWluZXJzL3NlbS12aWRlby1jb250YWluZXIvc2VtLXZpZGVvLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXlDLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFLaEg7SUErREUsb0NBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFoQi9CLFdBQU0sR0FBRztZQUNkLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLElBQUksRUFBRTtnQkFDRixTQUFTLEVBQUUsMEJBQTBCO2dCQUNyQyxZQUFZLEVBQUUsYUFBYTtnQkFDM0IsV0FBVyxFQUFFLG1LQUFtSztnQkFDaEwsWUFBWSxFQUFFLGtEQUFrRDtnQkFDaEUsS0FBSyxFQUFFLGdEQUFnRDtnQkFDdkQsT0FBTyxFQUFFLGFBQWE7YUFDdkI7U0FDSixDQUFDO1FBSUssa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFRN0IscUJBQWdCLEdBQXVCO1lBQ3JDLEVBQUUsRUFBRSxRQUFRO1lBQ1osWUFBWSxFQUFFLENBQUM7WUFDZixXQUFXLEVBQUUsQ0FBQztTQUNmLENBQUM7UUFUQSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxLQUFLLDRCQUE0QixDQUFDLENBQUMsQ0FBQztZQUM5RCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCxDQUFDO0lBQ0gsQ0FBQzs7Ozs7SUFNRCwyQ0FBTTs7OztJQUFOLFVBQU8sS0FBSztRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDekMsQ0FBQzs7Ozs7SUFFRCxpREFBWTs7OztJQUFaLFVBQWEsSUFBSTtRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDOzs7O0lBQ0QsNkNBQVE7OztJQUFSLGNBQVksQ0FBQzs7Ozs7SUFDYixpREFBWTs7OztJQUFaLFVBQWEsSUFBSSxJQUFTLENBQUM7Ozs7O0lBRTNCLDhDQUFTOzs7O0lBQVQsVUFBVSxRQUFpQjtRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztJQUNoQyxDQUFDOztnQkF2RkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRSx3dkNBeUNYO29CQUNDLE1BQU0sRUFBRSxDQUFDLGtIQUFrSCxDQUFDO2lCQUM3SDs7O2dCQWxEMEQsUUFBUTs7SUErRm5FLGlDQUFDO0NBQUEsQUExRkQsSUEwRkM7U0E1Q1ksMEJBQTBCOzs7SUFDckMsNENBVUU7O0lBR0YsOENBQXlCOztJQUN6QixtREFBNkI7O0lBUTdCLHNEQUlFOztJQVZVLDhDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0ICwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgIE91dHB1dCwgSW5qZWN0b3IsIFZpZXdDaGlsZCwgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFlvdXR1YmVWaWRlb01vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzJztcbmltcG9ydCB7IFBhZ2luYXRpb25JbnN0YW5jZSB9IGZyb20gJ25neC1wYWdpbmF0aW9uJztcbmltcG9ydCB7IFNlbVZpZGVvU2VydmljZSB9IGZyb20gJy4uLy4uL3NlbS12aWRlby5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VtLXZpZGVvLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInNlbS1kbmQtY29udGFpbmVyXCI+XG4gIDxkaXYgY2xhc3M9XCJlbWJlZC1jb250YWluZXJcIiAqbmdJZj1cIndpZGdldC5kYXRhLmhhc093blByb3BlcnR5KCd2aWRlb0lkJylcIj5cbiAgICA8aWZyYW1lIHdpZHRoPVwiMTAwJVwiXG4gICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgZnJhbWVib3JkZXI9XCIwXCJcbiAgICBhbGxvd2Z1bGxzY3JlZW5cbiAgICBbc3JjXT1cIndpZGdldC5kYXRhLnZpZGVvSWQgfCB5b3V0dWJlU2FmZVVybFwiXG4gICAgc3R5bGU9XCJib3JkZXI6IHNvbGlkIDFweCBibGFja1wiID5cbiAgICA8L2lmcmFtZT5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzZW0tZG5kLWNvbnRhaW5lci0tbmF2XCI+XG4gICAgPGJ1dHRvblxuICAgICAgc2VtLWJ0bi1mYWJcbiAgICAgIGNvcm5lcj1cInRvcC1yaWdodFwiXG4gICAgICBzZW11aS10aGVtZT1cImxpZ2h0XCJcbiAgICAgIGNsYXNzPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCBcIlxuICAgICAgc2VtLWltcG9ydGFuY2U9XCJzZWNvbmRhcnlcIlxuICAgICAgI2NoYXRPdmVybGF5PVwiY2RrT3ZlcmxheU9yaWdpblwiXG4gICAgICBjZGtPdmVybGF5T3JpZ2luXG4gICAgICAoY2xpY2spPVwib3BlblRlc3RBKCFpc1Rlc3RBT3BlbmVkKVwiXG4gICAgPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNlbS1pY29uLXByb2ZpbGUtYWNjZW50XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGF0aDFcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJwYXRoMlwiPjwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICAgIDxzZW11aS1vdmVybGF5LWRpYWxvZ1xuICAgICAgW292ZXJsYXlPcmlnaW5dPVwiY2hhdE92ZXJsYXlcIlxuICAgICAgW2lzT3BlbmVkXT1cImlzVGVzdEFPcGVuZWRcIlxuICAgICAgKGNsb3NlKT1cIm9wZW5UZXN0QShmYWxzZSlcIlxuICAgICAgKG9wZW4pPVwib3BlblRlc3RBKHRydWUpXCJcbiAgICAgIFtvdmVybGF5V2lkdGhdPVwiJ2F1dG8nXCJcbiAgICA+XG4gICAgICAgIDxzZW0tdmlkZW8tc2V0dGluZ3MtcGFuZWxcbiAgICAgICAgICBbY29uZmlnXT1cInBhZ2luYXRpb25Db25maWdcIlxuICAgICAgICAgIChzZWxlY3RlZCk9XCJzZWxlY3RlZEl0ZW0oJGV2ZW50KVwiXG4gICAgICAgICAgKGNsb3NlKT1cImNsb3NlT3ZlcmxheSgkZXZlbnQpXCI+XG4gICAgICAgIDwvc2VtLXZpZGVvLXNldHRpbmdzLXBhbmVsPlxuXG4gICAgPC9zZW11aS1vdmVybGF5LWRpYWxvZz5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdHtiYWNrZ3JvdW5kLWNvbG9yOiNmNWU1ZTU7ZGlzcGxheTpibG9jaztib3JkZXI6MXB4IHNvbGlkICM4YjAwMDA7aGVpZ2h0OjEwMCV9LmVtYmVkLWNvbnRhaW5lcntoZWlnaHQ6MTAwdmh9YF1cbn0pXG5leHBvcnQgY2xhc3MgU2VtVmlkZW9Db250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgd2lkZ2V0ID0ge1xuICAgIGNvbXBvbmVudE5hbWU6ICcnLFxuICAgIGRhdGE6IHtcbiAgICAgICAgY2hhbm5lbElkOiAnVUM0cmxBVmdBSzBTR2steVRmZTQ4UXB3JyxcbiAgICAgICAgY2hhbm5lbFRpdGxlOiAnQlJJR0hUIFNJREUnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0hvdyB0byBTdGF5IEhlYWx0aHkuIFdlIGFsbCBoYXZlIGRheXMgd2hlbiB3ZSBmZWVsIGFic29sdXRlbHkgZXhoYXVzdGVkIG9yIHNvbWV0aW1lcyBhIGxpdHRsZSBkb3duIGluIHRoZSBkdW1wcy4gQnV0IGlmIHlvdSBmaW5kIHlvdXJzZWxmIGNvbnN0YW50bHkgY2F0Y2hpbmcgLi4uJyxcbiAgICAgICAgdGh1bWJuYWlsVXJsOiAnaHR0cHM6Ly9pLnl0aW1nLmNvbS92aS9reW9TMWVkWTV0TS9ocWRlZmF1bHQuanBnJyxcbiAgICAgICAgdGl0bGU6ICcxMCBXYXJuaW5nIFNpZ25zIFlvdSBIYXZlIFZpdGFtaW4gRCBEZWZpY2llbmN5JyxcbiAgICAgICAgdmlkZW9JZDogJ2t5b1MxZWRZNXRNJ1xuICAgICAgfVxuICB9O1xuXG5cbiAgcHVibGljIGlzT3BlbmVkOiBib29sZWFuO1xuICBwdWJsaWMgaXNUZXN0QU9wZW5lZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgdGhpcy53aWRnZXQgPSB0aGlzLmluamVjdG9yLmdldCgnd2lkZ2V0Jyk7XG4gICAgaWYodGhpcy53aWRnZXQuY29tcG9uZW50TmFtZSA9PT0gJ1NlbVZpZGVvQ29udGFpbmVyQ29tcG9uZW50Jykge1xuICAgICAgY29uc29sZS5sb2coJ0dvdCB0aGUgd3lzaXd5ZyBkYXRhJywgdGhpcy53aWRnZXQpO1xuICAgIH1cbiAgfVxuICBwYWdpbmF0aW9uQ29uZmlnOiBQYWdpbmF0aW9uSW5zdGFuY2UgPSB7XG4gICAgaWQ6ICdjdXN0b20nLFxuICAgIGl0ZW1zUGVyUGFnZTogMixcbiAgICBjdXJyZW50UGFnZTogMVxuICB9O1xuICBzZWFyY2gocXVlcnkpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygncXVlcnkgaXMgb3V0cHV0ZWQnLCBxdWVyeSlcbiAgfVxuXG4gIHNlbGVjdGVkSXRlbShpdGVtKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ2l0ZW0gc2VsZWN0JywgaXRlbSlcbiAgICB0aGlzLndpZGdldC5kYXRhID0gaXRlbTtcbiAgfVxuICBuZ09uSW5pdCgpIHt9XG4gIGNsb3NlT3ZlcmxheShpdGVtKTogdm9pZCB7fVxuXG4gIG9wZW5UZXN0QShpc09wZW5lZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaXNUZXN0QU9wZW5lZCA9IGlzT3BlbmVkO1xuICB9XG5cblxufVxuIl19