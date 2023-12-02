import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  constructor(private breakpointObserver: BreakpointObserver) { }

  setIsDeviceBasedOnBreakpoint(breakPoints: string): Observable<boolean> {
    return this.breakpointObserver.observe(breakPoints).pipe(
      map((result: BreakpointState) => {
        return result.matches;
      }));
  }
}
