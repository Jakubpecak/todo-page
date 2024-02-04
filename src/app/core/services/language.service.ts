import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private language = new BehaviorSubject<string>(this.getStorage());

  constructor() {}

  getLanguage() {
    return this.language.asObservable();
  }

  setStorage(language: string) {
    localStorage.setItem('language', JSON.stringify(language));
    this.language.next(language);
  }
  
  getStorage() {
    const language = localStorage.getItem('language');
    return language ? JSON.parse(language) : null;
  }

}
