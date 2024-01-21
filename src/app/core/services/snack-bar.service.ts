import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  isTablet!: boolean;
  horizontalPosition!: MatSnackBarHorizontalPosition;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar, private translate: TranslateService) {
    this.isTablet = window.innerWidth > 767;
    this.horizontalPosition = this.isTablet ? 'start' : 'center';
  }

  openSnackBar(text: string, time: number, error: boolean) {
    this.translate.get(text).subscribe((translatedText: string) => {
        this.snackBar.open(translatedText, '', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: time,
            panelClass: error ? 'snackbar-error-background' : 'snackbar-background',
        });
    });
  }
}
