/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        &type=video
        &key=AIzaSyCVYzrBm1lzl9iZtNArxlwRym1LnUdQpPs`);
        // .pipe(
        //   map(response => response )
        // );
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
    /** @type {?} */
    SemVideoService.prototype.http;
    /** @type {?} */
    SemVideoService.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLXZpZGVvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9zZW0tdmlkZW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBS2xELE1BQU07Ozs7O0lBRUosWUFBb0QsSUFBZ0IsRUFBOEIsVUFBa0I7UUFBaEUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUE4QixlQUFVLEdBQVYsVUFBVSxDQUFRO0lBQUksQ0FBQzs7Ozs7SUFFekgsV0FBVyxDQUFDLEtBQWE7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLDRFQUE0RSxLQUFLOztxREFFdkMsQ0FBQyxDQUFDO1FBQ2pELFNBQVM7UUFDVCwrQkFBK0I7UUFDL0IsS0FBSztJQUNULENBQUM7OztZQWZGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBSlEsVUFBVSx1QkFPSCxNQUFNLFNBQUMsVUFBVTtZQUErRSxNQUFNLHVCQUE3QyxNQUFNLFNBQUMsV0FBVzs7Ozs7SUFBNUUsK0JBQXVEOztJQUFFLHFDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgUExBVEZPUk1fSURcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL2ludGVybmFsL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNlbVZpZGVvU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIHJlYWRvbmx5IGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoUExBVEZPUk1fSUQpIHB1YmxpYyBwbGF0Zm9ybUlkOiBPYmplY3QpIHsgfVxuXG4gIGZldGNoVmlkZW9zKHF1ZXJ5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0KGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3NlYXJjaD9wYXJ0PXNuaXBwZXQmbWF4UmVzdWx0cz01JnE9JHtxdWVyeX1cbiAgICAgICAgJnR5cGU9dmlkZW9cbiAgICAgICAgJmtleT1BSXphU3lDVll6ckJtMWx6bDlpWnROQXJ4bHdSeW0xTG5VZFFwUHNgKTtcbiAgICAgIC8vIC5waXBlKFxuICAgICAgLy8gICBtYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UgKVxuICAgICAgLy8gKTtcbiAgfVxufVxuIl19