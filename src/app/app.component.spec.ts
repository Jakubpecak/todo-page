import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LanguageService } from './core/services/language.service';
import { DarkModeService } from './core/services/dark-mode.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from './shared/shared.module';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let languageService: LanguageService;
  let translateService: TranslateService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, SharedModule, TranslateModule.forRoot()],
      declarations: [AppComponent],
      providers: [LanguageService, TranslateService]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService);
    translateService = TestBed.inject(TranslateService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set default language to "en" if languageService returns "en"', () => {
    const language = 'en';
    spyOn(languageService, 'getLanguage').and.returnValue(of(language));
    const useSpy = spyOn(translateService, 'use');
  
    component.setDefaultLanguage();
  
    expect(component.language).toBe(language);
    expect(useSpy).toHaveBeenCalledWith(language);
  });

  it('should set default language to "en" if languageService returns "pl"', () => {
    const language = 'pl';
    spyOn(languageService, 'getLanguage').and.returnValue(of(language));
    const useSpy = spyOn(translateService, 'use');
  
    component.setDefaultLanguage();
  
    expect(component.language).toBe(language);
    expect(useSpy).toHaveBeenCalledWith(language);
  });

});
