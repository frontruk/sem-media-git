/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var SemVideoService = /** @class */ (function () {
    function SemVideoService(http, platformId) {
        this.http = http;
        this.platformId = platformId;
    }
    /**
     * @param {?} query
     * @return {?}
     */
    SemVideoService.prototype.fetchVideos = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
        return this.http
            .get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + query + "\n        &type=video\n        &key=AIzaSyCVYzrBm1lzl9iZtNArxlwRym1LnUdQpPs");
        // .pipe(
        //   map(response => response )
        // );
    };
    SemVideoService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    SemVideoService.ctorParameters = function () { return [
        { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    /** @nocollapse */ SemVideoService.ngInjectableDef = i0.defineInjectable({ factory: function SemVideoService_Factory() { return new SemVideoService(i0.inject(i1.HttpClient), i0.inject(i0.PLATFORM_ID)); }, token: SemVideoService, providedIn: "root" });
    return SemVideoService;
}());
export { SemVideoService };
if (false) {
    /** @type {?} */
    SemVideoService.prototype.http;
    /** @type {?} */
    SemVideoService.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLXZpZGVvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9zZW0tdmlkZW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBRWxEO0lBS0UseUJBQW9ELElBQWdCLEVBQThCLFVBQWtCO1FBQWhFLFNBQUksR0FBSixJQUFJLENBQVk7UUFBOEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtJQUFJLENBQUM7Ozs7O0lBRXpILHFDQUFXOzs7O0lBQVgsVUFBWSxLQUFhO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBQyw4RUFBNEUsS0FBSyxnRkFFdkMsQ0FBQyxDQUFDO1FBQ2pELFNBQVM7UUFDVCwrQkFBK0I7UUFDL0IsS0FBSztJQUNULENBQUM7O2dCQWZGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OztnQkFKUSxVQUFVLHVCQU9ILE1BQU0sU0FBQyxVQUFVO2dCQUErRSxNQUFNLHVCQUE3QyxNQUFNLFNBQUMsV0FBVzs7OzBCQWIzRjtDQXdCQyxBQWhCRCxJQWdCQztTQWJZLGVBQWU7OztJQUViLCtCQUF1RDs7SUFBRSxxQ0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbmplY3QsXG4gIEluamVjdGFibGUsXG4gIFBMQVRGT1JNX0lEXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTZW1WaWRlb1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCBASW5qZWN0KEh0dHBDbGllbnQpIHByb3RlY3RlZCByZWFkb25seSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwdWJsaWMgcGxhdGZvcm1JZDogT2JqZWN0KSB7IH1cblxuICBmZXRjaFZpZGVvcyhxdWVyeTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldChgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My9zZWFyY2g/cGFydD1zbmlwcGV0Jm1heFJlc3VsdHM9NSZxPSR7cXVlcnl9XG4gICAgICAgICZ0eXBlPXZpZGVvXG4gICAgICAgICZrZXk9QUl6YVN5Q1ZZenJCbTFsemw5aVp0TkFyeGx3UnltMUxuVWRRcFBzYCk7XG4gICAgICAvLyAucGlwZShcbiAgICAgIC8vICAgbWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlIClcbiAgICAgIC8vICk7XG4gIH1cbn1cbiJdfQ==