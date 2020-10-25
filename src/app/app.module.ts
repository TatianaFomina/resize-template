import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TestComponent } from './test.component';
import { ConditionalRenderingModule } from './conditional-rendering/conditional-rendering.module';
import { WindowParamsService } from './conditional-rendering/window-params.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ConditionalRenderingModule.use({medium: 1000, large: 1400}) ],
  declarations: [ AppComponent, HelloComponent, TestComponent ],
  providers:    [ WindowParamsService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
