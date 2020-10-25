import { ApplicationRef, ChangeDetectorRef, EventEmitter, Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
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
export class WindowParamsService implements OnDestroy {

  public width: WidthType;

  private sub: Subscription;
  private MEDIUM;// = `(min-width: ${config.medium}px)`;
  private LARGE;// = `(min-width: ${config.large}px)`;

  public detectChanges = new EventEmitter();

  constructor(private breakpointObserver: BreakpointObserver, @Optional() config?: Config) {
    const MEDIUM = `(min-width: ${config.medium}px)`;
    const LARGE = `(min-width: ${config.large}px)`;

    this.MEDIUM = `(min-width: ${config.medium}px)`;
    this.LARGE = `(min-width: ${config.large}px)`;

    // Get initial width
    if (breakpointObserver.isMatched(LARGE)) {
      this.width = WidthType.LARGE;
    } else if (breakpointObserver.isMatched(MEDIUM)) {
      this.width = WidthType.MEDIUM;
    } else {
      this.width = WidthType.SMALL;
    }
    // cd.tick();
    // cd.components.forEach(component => component.changeDetectorRef.markForCheck())
    // cd.detectChanges()
    this.detectChanges.emit()

    // Observe width changes
    this.sub = breakpointObserver.observe([MEDIUM, LARGE]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[LARGE]) {
        this.width = WidthType.LARGE;
      } else if (state.breakpoints[MEDIUM]) {
        this.width = WidthType.MEDIUM;
      } else {
        this.width = WidthType.SMALL;
      }
      // cd.tick();
      // cd.detectChanges()
      this.detectChanges.emit()
      // cd.components.forEach(component => component.changeDetectorRef.markForCheck())
    });
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}