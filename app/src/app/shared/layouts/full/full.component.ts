
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';


import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { MenuItems } from '../../menu/menu-model';

/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy {
  selection!:any;
  mobileQuery: MediaQueryList;
  dir = 'ltr';
  green = false;
  blue = false;
  dark = false;
  minisidebar = false;
  boxed = false;
  danger = false;
  showHide = false;
  url = '';
  sidebarOpened = false;
  status = false;
  public showSearch = false;
  public config: PerfectScrollbarConfigInterface = {};
  private _mobileQueryListener: () => void;

  clickEvent() {
    this.status = !this.status;
  }
  constructor(
    private router:Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    console.log('router header',this.router.url);

    //this.mobileQuery = media.matchMedia('(width: 0px)');  // OCULTANDO EL MENU
    this.mobileQuery = media.matchMedia('(min-width: 768px)');  // VISUALIZACION DEL MENU
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
