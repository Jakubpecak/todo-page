import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private isDarkMode = this.getStorage();

  constructor() {}

  getDarkMode(): boolean {
    return this.isDarkMode;
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.setStorage(this.isDarkMode);
  }

  setStorage(darkMode: boolean) {
    localStorage.setItem('dark-mode', JSON.stringify(darkMode));
  }
  
  getStorage() {
    const darkMode = localStorage.getItem('dark-mode');
    return darkMode ? JSON.parse(darkMode) : null;
  }


}
