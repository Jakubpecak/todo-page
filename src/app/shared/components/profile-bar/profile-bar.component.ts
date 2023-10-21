import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.scss']
})
export class ProfileBarComponent implements OnInit, OnDestroy {
  user: User | null = null;
  subscriptions = new Subscription();

  constructor(private profileService: ProfileService, protected auth: AuthService) {}

  ngOnInit(): void {
    this.subscriptions.add(this.profileService.getUserProfile().subscribe((user) => {
      this.user = user;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
