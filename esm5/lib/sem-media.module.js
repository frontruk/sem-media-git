/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SemMediaService } from './sem-media.service';
import { SemPanelSettingsComponent } from './containers/panel/control-panel.component';
import { SemUploadComponent } from './components/media-image-upload/media-upload.component';
import { SemCropperComponent } from './components/media-cropper/media-cropper.component';
import { SemControlsComponent } from './components/media-controls/media-controls.compnent';
import { SlidePanelComponent } from './components/slide-panel/slide-panel.component';
import { SemSettingsComponent } from './containers/settings/settings.component';
import { MediaEditComponent } from './components/media-edit/media-edit.component';
import { SemMediaContainerComponent } from './containers/sem-media-container/sem-media-container.component';
import { SemUiKitSharedModule } from './sem-ui-shared.module';
import { SemMaterialSharedModule } from './sem-material-shared.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FileDropModule } from 'ngx-file-drop';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
var SemMediaModule = /** @class */ (function () {
    function SemMediaModule() {
    }
    /**
     * @return {?}
     */
    SemMediaModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: SemMediaModule,
            providers: [SemMediaService]
        };
    };
    SemMediaModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        ImageCropperModule,
                        FileDropModule,
                        AngularCropperjsModule,
                        BrowserAnimationsModule,
                        SemMaterialSharedModule,
                        SemUiKitSharedModule
                    ],
                    declarations: [
                        SemPanelSettingsComponent,
                        SemUploadComponent,
                        SemCropperComponent,
                        SemControlsComponent,
                        SemSettingsComponent,
                        MediaEditComponent,
                        SlidePanelComponent,
                        SemMediaContainerComponent
                    ],
                    exports: [
                        SemPanelSettingsComponent,
                        SemUploadComponent,
                        SemCropperComponent,
                        SemControlsComponent,
                        SemSettingsComponent,
                        MediaEditComponent,
                        SlidePanelComponent,
                        SemMediaContainerComponent
                    ],
                    providers: [
                        SemMediaService
                    ]
                },] },
    ];
    return SemMediaModule;
}());
export { SemMediaModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtLW1lZGlhLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bmcm9udHIvc2VtLW1lZGlhLyIsInNvdXJjZXMiOlsibGliL3NlbS1tZWRpYS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCxRQUFRLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN2RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUM1RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUN6RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUMzRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNyRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM1RyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV2RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTNELE9BQU8sRUFDTCxXQUFXLEVBQ1gsbUJBQW1CLEVBQ3BCLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEI7SUFBQTtJQTJDQSxDQUFDOzs7O0lBTlEsc0JBQU87OztJQUFkO1FBQ0UsTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO1NBQzdCLENBQUE7SUFDSCxDQUFDOztnQkExQ0YsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2Qsc0JBQXNCO3dCQUN0Qix1QkFBdUI7d0JBQ3ZCLHVCQUF1Qjt3QkFDdkIsb0JBQW9CO3FCQUNyQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1oseUJBQXlCO3dCQUN6QixrQkFBa0I7d0JBQ2xCLG1CQUFtQjt3QkFDbkIsb0JBQW9CO3dCQUNwQixvQkFBb0I7d0JBQ3BCLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3dCQUNuQiwwQkFBMEI7cUJBQzNCO29CQUNELE9BQU8sRUFBRTt3QkFDUCx5QkFBeUI7d0JBQ3pCLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3dCQUNuQixvQkFBb0I7d0JBQ3BCLG9CQUFvQjt3QkFDcEIsa0JBQWtCO3dCQUNsQixtQkFBbUI7d0JBQ25CLDBCQUEwQjtxQkFDM0I7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULGVBQWU7cUJBQ2hCO2lCQUNGOztJQVFELHFCQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7U0FQWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgTmdNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgU2VtTWVkaWFTZXJ2aWNlIH0gZnJvbSAnLi9zZW0tbWVkaWEuc2VydmljZSc7XG5pbXBvcnQgeyBTZW1QYW5lbFNldHRpbmdzQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL3BhbmVsL2NvbnRyb2wtcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbVVwbG9hZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tZWRpYS1pbWFnZS11cGxvYWQvbWVkaWEtdXBsb2FkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW1Dcm9wcGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21lZGlhLWNyb3BwZXIvbWVkaWEtY3JvcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtQ29udHJvbHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWVkaWEtY29udHJvbHMvbWVkaWEtY29udHJvbHMuY29tcG5lbnQnO1xuaW1wb3J0IHsgU2xpZGVQYW5lbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zbGlkZS1wYW5lbC9zbGlkZS1wYW5lbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtU2V0dGluZ3NDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvc2V0dGluZ3Mvc2V0dGluZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IE1lZGlhRWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tZWRpYS1lZGl0L21lZGlhLWVkaXQuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL3NlbS1tZWRpYS1jb250YWluZXIvc2VtLW1lZGlhLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VtVWlLaXRTaGFyZWRNb2R1bGUgfSBmcm9tICcuL3NlbS11aS1zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IFNlbU1hdGVyaWFsU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9zZW0tbWF0ZXJpYWwtc2hhcmVkLm1vZHVsZSc7XG5cbmltcG9ydCB7IEltYWdlQ3JvcHBlck1vZHVsZSB9IGZyb20gJ25neC1pbWFnZS1jcm9wcGVyJztcbmltcG9ydCB7IEZpbGVEcm9wTW9kdWxlIH0gZnJvbSAnbmd4LWZpbGUtZHJvcCc7XG5pbXBvcnQgeyBBbmd1bGFyQ3JvcHBlcmpzTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1jcm9wcGVyanMnO1xuXG5pbXBvcnQge1xuICBGb3Jtc01vZHVsZSxcbiAgUmVhY3RpdmVGb3Jtc01vZHVsZVxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBJbWFnZUNyb3BwZXJNb2R1bGUsXG4gICAgRmlsZURyb3BNb2R1bGUsXG4gICAgQW5ndWxhckNyb3BwZXJqc01vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBTZW1NYXRlcmlhbFNoYXJlZE1vZHVsZSxcbiAgICBTZW1VaUtpdFNoYXJlZE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBTZW1QYW5lbFNldHRpbmdzQ29tcG9uZW50LFxuICAgIFNlbVVwbG9hZENvbXBvbmVudCxcbiAgICBTZW1Dcm9wcGVyQ29tcG9uZW50LFxuICAgIFNlbUNvbnRyb2xzQ29tcG9uZW50LFxuICAgIFNlbVNldHRpbmdzQ29tcG9uZW50LFxuICAgIE1lZGlhRWRpdENvbXBvbmVudCxcbiAgICBTbGlkZVBhbmVsQ29tcG9uZW50LFxuICAgIFNlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBTZW1QYW5lbFNldHRpbmdzQ29tcG9uZW50LFxuICAgIFNlbVVwbG9hZENvbXBvbmVudCxcbiAgICBTZW1Dcm9wcGVyQ29tcG9uZW50LFxuICAgIFNlbUNvbnRyb2xzQ29tcG9uZW50LFxuICAgIFNlbVNldHRpbmdzQ29tcG9uZW50LFxuICAgIE1lZGlhRWRpdENvbXBvbmVudCxcbiAgICBTbGlkZVBhbmVsQ29tcG9uZW50LFxuICAgIFNlbU1lZGlhQ29udGFpbmVyQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFNlbU1lZGlhU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbU1lZGlhTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTZW1NZWRpYU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1NlbU1lZGlhU2VydmljZV1cbiAgICB9XG4gIH1cbn1cbiJdfQ==