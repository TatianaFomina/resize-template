import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Config } from './window-params.service';
import { IfViewPortSizeDirective } from './if-viewport-size.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [IfViewPortSizeDirective],
  exports: [IfViewPortSizeDirective],
})
export class ConditionalRenderingModule {

  static use(config: Config): ModuleWithProviders<ConditionalRenderingModule> {
    return {
      ngModule: ConditionalRenderingModule,
      providers: [
        { provide: Config, useValue: config }
      ]
    };
  }
}
