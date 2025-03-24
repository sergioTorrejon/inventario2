import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Persona {
  name:string
}

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  constructor(){

  }

  public sharingObservablePrivate: BehaviorSubject<Persona> =
  new BehaviorSubject<Persona>({name:'sergio'})

  get sharingObservable() {
    return this.sharingObservablePrivate.asObservable();
  }

  set sharinObservableData(data:Persona){
    this.sharingObservablePrivate.next(data);
  }
}
