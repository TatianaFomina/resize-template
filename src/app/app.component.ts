import { ChangeDetectorRef, Component } from '@angular/core';
import { WindowParamsService } from './resize/window-params.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular 5';
  constructor(private windowParamsSvc: WindowParamsService, private cd: ChangeDetectorRef) {
    this.windowParamsSvc.detectChanges.subscribe(_ => {
      this.cd.markForCheck();
      this.cd.detectChanges();
    })
  }

  list = new Array(1000).fill(1);
}
