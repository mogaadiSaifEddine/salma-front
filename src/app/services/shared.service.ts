import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  chantierId: number | undefined;
  projetId: number | undefined;
  constructor() {}
}
