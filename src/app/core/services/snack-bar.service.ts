import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  isTablet!: boolean;
  horizontalPosition!: MatSnackBarHorizontalPosition;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar) {
    this.isTablet = window.innerWidth > 767;
    this.horizontalPosition = this.isTablet ? 'start' : 'center';
  }

  openSnackBar(text: string, time: number, error: boolean) {
    this.snackBar.open(text, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: time,
      panelClass: error ? 'snackbar-error-background' : 'snackbar-background',
    });
  }
}
