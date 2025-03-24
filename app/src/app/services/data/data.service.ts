import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CrudService } from '../crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    conf:any=[];

    dataOptions:any=[];

    conff$ = new BehaviorSubject<any>([])

    constructor(
        public restCrud:  CrudService,
    ){
      //this.config()
      
   }
/*   ngOnDestroy(): void {
    this.conff$.unsubscribe();
  } */

  get selectDinf$():Observable<any>{
    return this.conff$.asObservable()
  }

  async setConf(model:string):Promise<any>{
    (await this.restCrud.getConfig(model)).subscribe((data:any)=>{
      this.conf=data.data;
      this.conff$.next(data.data);
      return this.conf
    })
  }

  options(){
    this.restCrud.getOptions().subscribe((data:any)=>{
      this.dataOptions=data.data
    })
  }
    
}
