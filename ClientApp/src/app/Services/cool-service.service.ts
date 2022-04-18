import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoolServiceService {

  constructor() { 
    this.blowUp();
  }

  blowUp = () =>  {
    return true;
  }
}
