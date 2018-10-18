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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLXZpZGVvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnJvbnRyL3NlbS1tZWRpYS8iLCJzb3VyY2VzIjpbImxpYi9zZW0tdmlkZW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBQ2xEO0lBS0UseUJBQW9ELElBQWdCLEVBQThCLFVBQWtCO1FBQWhFLFNBQUksR0FBSixJQUFJLENBQVk7UUFBOEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtJQUFJLENBQUM7Ozs7O0lBRWxILHFDQUFXOzs7O0lBQWxCLFVBQW1CLEtBQWE7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLDhFQUE0RSxLQUFLLGdGQUV2QyxDQUFDLENBQUM7SUFDckQsQ0FBQzs7Z0JBWkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7O2dCQUhRLFVBQVUsdUJBTUgsTUFBTSxTQUFDLFVBQVU7Z0JBQStFLE1BQU0sdUJBQTdDLE1BQU0sU0FBQyxXQUFXOzs7MEJBWjNGO0NBb0JDLEFBYkQsSUFhQztTQVZZLGVBQWU7OztJQUViLCtCQUF1RDs7SUFBRSxxQ0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbmplY3QsXG4gIEluamVjdGFibGUsXG4gIFBMQVRGT1JNX0lEXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNlbVZpZGVvU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIHJlYWRvbmx5IGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoUExBVEZPUk1fSUQpIHB1YmxpYyBwbGF0Zm9ybUlkOiBPYmplY3QpIHsgfVxuXG4gIHB1YmxpYyBmZXRjaFZpZGVvcyhxdWVyeTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0KGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3NlYXJjaD9wYXJ0PXNuaXBwZXQmbWF4UmVzdWx0cz01JnE9JHtxdWVyeX1cbiAgICAgICAgJnR5cGU9dmlkZW9cbiAgICAgICAgJmtleT1BSXphU3lDVll6ckJtMWx6bDlpWnROQXJ4bHdSeW0xTG5VZFFwUHNgKTtcbiAgfVxufVxuIl19