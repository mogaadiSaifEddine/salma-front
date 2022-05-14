import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  chantierId: number | undefined;
  constructor() {}
}
