import { Injectable, Optional } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export class Config {
  medium: number;
  large: number;
}

export enum WidthType {
  SMALL = 'small', MEDIUM = 'medium', LARGE = 'large'
}

@Injectable({
  providedIn: 'root',
})
export class WindowParamsService {

  public width: WidthType;

  private MEDIUM;
  private LARGE;

  constructor(
    private breakpointObserver: BreakpointObserver,
    @Optional() config?: Config) {
    this.MEDIUM = `(min-width: ${config.medium}px)`;
    this.LARGE = `(min-width: ${config.large}px)`;
  }

  public getWidth(): Observable<WidthType> {
    return this.breakpointObserver
      .observe([this.MEDIUM, this.LARGE])
      .pipe(map((state: BreakpointState) => {
        if (state.breakpoints[this.LARGE]) {
          return WidthType.LARGE;
        } else if (state.breakpoints[this.MEDIUM]) {
          return WidthType.MEDIUM;
        } else {
          return WidthType.SMALL;
        }
      }), distinctUntilChanged());
  }
}