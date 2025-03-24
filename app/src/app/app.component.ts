import { Component } from '@angular/core';
import { ConfigService } from './services/config/config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  constructor(
    public configService:ConfigService,
  ){

    this.configService.getMenu()
    console.log('AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
/*     this.dataService.config()
    this.dataService.options() */

  }
}
