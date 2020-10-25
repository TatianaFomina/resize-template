import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { WindowParamsService } from './window-params.service';

@Directive({
  selector: '[ifViewportSize]' // brackets for css attribute selector 
})
export class IfViewPortSizeDirective {
  constructor(
    private windowParams: WindowParamsService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  private hasView: boolean;

  @Input() set ifViewportSize(width: string) {
    this.windowParams.register(this, width);
  }

  public render() {
    if (!this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
  }

  public hide() {
    if (this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}