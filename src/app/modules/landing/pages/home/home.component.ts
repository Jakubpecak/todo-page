import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { BREAKPOINTS } from 'src/app/core/utils/break-points';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isTablet!: boolean;
  subscriptions = new Subscription();

  constructor(private responsive: ResponsiveService) {}

  ngOnInit(): void {
    this.subscriptions.add(this.responsive.setIsDeviceBasedOnBreakpoint(BREAKPOINTS.isTablet).subscribe((isTablet) => {
      this.isTablet = isTablet;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
