import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url = 'https://crud-5ecef.firebaseio.com.';



  constructor(private http:HttpClient) { 
    
  }

  crearHeroe(heroe:HeroeModel){
      return this.http.post(`${this.url}/heroes.json`,heroe).pipe(
        map( (data:any) =>{
          heroe.id = data.name;
          return heroe;
        })
         
      )
  }


  actualizarHeroe(heroe:HeroeModel){
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;

   return this.http.put(`${this.url}/heroes/${heroe.id}.json`,heroeTemp);
    
  }


  getHeroeById(id:string){

    return this.http.get(`${this.url}/heroes/${id}.json`);

  }

  getHeroes(){
  
      return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(this.crearArreglo)
      );
  }

/*se crea esta parte para que los objetos se conviertan en un array de objetos */
  crearArreglo(heroeObj:object){
    const heroes:HeroeModel[] = [];
    Object.keys(heroeObj).forEach(key =>{
      const heroe:HeroeModel = heroeObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }


  deleteHeroe(id:string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

}
