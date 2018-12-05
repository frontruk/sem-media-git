/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class SemVideoService {
    /**
     * @param {?} http
     * @param {?} platformId
     */
    constructor(http, platformId) {
        this.http = http;
        this.platformId = platformId;
    }
    /**
     * @param {?} query
     * @return {?}
     */
    fetchVideos(query) {
        return this.http
            .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${query}
      &type=video&key=AIzaSyBsuhhgJzgHhC-zSHSakzDgB2H4Ke3gW54`);
    }
}
SemVideoService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
SemVideoService.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
/** @nocollapse */ SemVideoService.ngInjectableDef = i0.defineInjectable({ factory: function SemVideoService_Factory() { return new SemVideoService(i0.inject(i1.HttpClient), i0.inject(i0.PLATFORM_ID)); }, token: SemVideoService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @protected
     */
    SemVideoService.prototype.http;
    /** @type {?} */
    SemVideoService.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLXZpZGVvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9zZW0tdmlkZW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBSWxELE1BQU07Ozs7O0lBRUosWUFBb0QsSUFBZ0IsRUFBOEIsVUFBa0I7UUFBaEUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUE4QixlQUFVLEdBQVYsVUFBVSxDQUFRO0lBQUksQ0FBQzs7Ozs7SUFFbEgsV0FBVyxDQUFDLEtBQWE7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLDRFQUE0RSxLQUFLOzhEQUM5QixDQUFDLENBQUM7SUFDOUQsQ0FBQzs7O1lBWEYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7WUFIUSxVQUFVLHVCQU1ILE1BQU0sU0FBQyxVQUFVO1lBQStFLE1BQU0sdUJBQTdDLE1BQU0sU0FBQyxXQUFXOzs7Ozs7OztJQUE1RSwrQkFBdUQ7O0lBQUUscUNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBQTEFURk9STV9JRFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTZW1WaWRlb1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCBASW5qZWN0KEh0dHBDbGllbnQpIHByb3RlY3RlZCByZWFkb25seSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwdWJsaWMgcGxhdGZvcm1JZDogT2JqZWN0KSB7IH1cblxuICBwdWJsaWMgZmV0Y2hWaWRlb3MocXVlcnk6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldChgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My9zZWFyY2g/cGFydD1zbmlwcGV0Jm1heFJlc3VsdHM9NSZxPSR7cXVlcnl9XG4gICAgICAmdHlwZT12aWRlbyZrZXk9QUl6YVN5QnN1aGhnSnpnSGhDLXpTSFNha3pEZ0IySDRLZTNnVzU0YCk7XG4gIH1cbn1cbiJdfQ==