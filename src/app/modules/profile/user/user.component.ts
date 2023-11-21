import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User | null = null;
  isDisplayEditIcon: boolean = true;
  isDisplaySaveBtn: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private auth: AuthService, private sanitizer: DomSanitizer, private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
  }

  fileChangeEvent(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.imageChangedEvent = event;
      this.isDisplaySaveBtn = true;
    } else {
      this.imageChangedEvent = null;
      this.isDisplaySaveBtn = false;
    }
  }
  
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl as any);
  }
  
  saveImage(id?: number, photo?: any): void {
    if (photo) {
      const safePhoto = (photo as any).changingThisBreaksApplicationSecurity || '';
      this.imageChangedEvent = false;
      this.isDisplayEditIcon = false;
      this.isDisplaySaveBtn = false;
      this.userService.changePhotoUser(id, safePhoto).subscribe();
    }
  }

}