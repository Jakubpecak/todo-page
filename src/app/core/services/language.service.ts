import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private language = this.getStorage();

  constructor() {}

  getLanguage() {
    return this.language;
  }

  setStorage(language: string) {
    localStorage.setItem('language', JSON.stringify(language));
  }
  
  getStorage() {
    const language = localStorage.getItem('language');
    return language ? JSON.parse(language) : null;
  }

}
