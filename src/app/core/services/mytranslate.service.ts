import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MytranslateService {
  private readonly _TranslateService = inject(TranslateService);
  private readonly _platformid = inject(PLATFORM_ID);
  private readonly _RendererFactory2 = inject(RendererFactory2).createRenderer(null,null);
  constructor() {
    if(isPlatformBrowser(this._platformid)    ){
  // Get language from local storage, default to 'en' if not set


  // Set default language
  this._TranslateService.setDefaultLang('en');




    // Change direction based on the language
    this.setLang();
    }



  }

  //  change dir part
  // why we wrote it outside the constructor bec we can use it and call it multiple times
  setLang(): void {
    let savedLang = localStorage.getItem('lang') || 'en';
    if(savedLang !== null){
      // Use the language from local storage (or 'en' if nothing is saved)
    this._TranslateService.use(savedLang);
  }

    if (savedLang == 'en') {
   this._RendererFactory2.setAttribute(document.documentElement,'dir','ltr')
   this._RendererFactory2.setAttribute(document.documentElement,'lang','en')
    } else if (savedLang == 'ar') {
      this._RendererFactory2.setAttribute(document.documentElement,'dir','rtl')
      this._RendererFactory2.setAttribute(document.documentElement,'lang','ar')
    }
  }

  changeLang(lang: string): void {
    if(isPlatformBrowser(this._platformid)    ){
      localStorage.setItem('lang', lang);
      // use it and by this we handled words
      this._TranslateService.use(lang);
      // by this we handled diractions


  this.setLang()
    }

  }
}
