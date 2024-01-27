import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnDestroy {
  @Input() openAccordionIndex: number | null = null;
  @Input() user!: User;
  @Output() sendIndexNumber = new EventEmitter<number>();
  subscriptions = new Subscription();
  userId: number = 0;
  isAgree: boolean =  false;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  setOpenAccordion(index: number) {
    this.sendIndexNumber.emit(index);
  }

  deleteUser(userId: number) {
    this.userId = userId;
    if (this.isAgree) {
      this.subscriptions.add(this.userService.deleteUser(userId));
      this.isAgree = false;
    } else {
      this.openDialog();
    }
  }

  openDialog(): void {
    const title = 'dialog.delete-user';
    const description = 'dialog.delete-todo-description';
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title,
        description,
      },
      disableClose: true
    });

    this.subscriptions.add(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isAgree = true;
        this.deleteUser(this.userId);
      } else {
          this.isAgree = false;
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
