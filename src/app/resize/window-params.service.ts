import { ApplicationRef, ChangeDetectorRef, EventEmitter, Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { IfViewPortSizeDirective } from './if-viewport-size.directive';

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
export class WindowParamsService implements OnDestroy {

  public width: WidthType;

  private sub: Subscription;
  private MEDIUM;// = `(min-width: ${config.medium}px)`;
  private LARGE;// = `(min-width: ${config.large}px)`;

  private refs = {
    small: [],
    medium: [],
    large: []
  }

  constructor(private breakpointObserver: BreakpointObserver, @Optional() config?: Config) {
    this.MEDIUM = `(min-width: ${config.medium}px)`;
    this.LARGE = `(min-width: ${config.large}px)`;

    this.sub = this.getWidth().subscribe(width => {
      this.refs[width].forEach(ref => ref.render());
      Object.keys(this.refs)
        .filter(key => key !== width)
        .map(key => this.refs[key])
        .reduce((acc, val) => acc.concat(val)) // there is no flat() yet
        .forEach(ref => ref.hide());
    })
  }

  public register(directiveRef: IfViewPortSizeDirective, width: string) {
    this.refs[width].push(directiveRef);
  }

  private getWidth(): Observable<WidthType> {
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}