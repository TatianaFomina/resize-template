import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Config, WindowParamsService } from './window-params.service';
import { IfViewPortSizeDirective } from './if-viewport-size.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [IfViewPortSizeDirective],
  exports: [IfViewPortSizeDirective],
})
export class ResizeModule {

  static forRoot(config: Config): ModuleWithProviders<ResizeModule> {
    return {
      ngModule: ResizeModule,
      providers: [
        { provide: Config, useValue: config }
      ]
    };
  }
}
