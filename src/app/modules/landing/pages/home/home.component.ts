import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { BREAKPOINTS } from 'src/app/core/utils/break-points';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isTablet!: boolean;
  isAuthenticated!: boolean;
  subscriptions = new Subscription();
  isDesktop: boolean = false;
  isLangEn: boolean = true;
  @ViewChild('leftEye') leftEye!: ElementRef;
  @ViewChild('rightEye') rightEye!: ElementRef;

  constructor(private responsive: ResponsiveService, private auth: AuthService, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.subscriptions.add(this.responsive.setIsDeviceBasedOnBreakpoint(BREAKPOINTS.isTablet).subscribe((isTablet) => {
      this.isTablet = isTablet;
    }));

    this.subscriptions.add(this.auth.state.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    }));

    this.isDesktop = window.innerWidth > 1700;

    this.subscriptions.add(this.languageService.getLanguage().subscribe((language) => {
      language === 'en' || language === null ? this.isLangEn = true : this.isLangEn = false;
    }));
  }

  @HostListener('document: mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.moveEye(this.leftEye?.nativeElement, e);
    this.moveEye(this.rightEye?.nativeElement, e);
  }

  moveEye(eye: HTMLElement, mouseEvent: MouseEvent) {
    if (eye) {
      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + eye.clientWidth / 2;
      const eyeCenterY = rect.top + eye.clientHeight / 2;
  
      const deltaX = mouseEvent.pageX - eyeCenterX;
      const deltaY = mouseEvent.pageY - eyeCenterY;
  
      const maxMove = eye.clientWidth / 4;
  
      const newX = Math.min(Math.max(deltaX, -maxMove), maxMove);
      const newY = Math.min(Math.max(deltaY, -maxMove), maxMove);
  
      const pupil = eye.firstChild as HTMLElement;
      pupil.style.transform = `translate(${newX}px, ${newY}px)`;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
