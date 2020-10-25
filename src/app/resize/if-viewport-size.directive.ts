import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { WindowParamsService } from './window-params.service';

@Directive({
  selector: '[ifViewportSize]' // brackets for css attribute selector 
})
export class IfViewPortSizeDirective implements OnDestroy {
  constructor(
    private windowParams: WindowParamsService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  private hasView: boolean;
  private sub: Subscription;

  @Input() set ifViewportSize(width: string) {
    this.sub = this.windowParams.getWidth().subscribe(windowWidth => {
      if (!this.hasView && width === windowWidth) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (this.hasView && width !== windowWidth) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}