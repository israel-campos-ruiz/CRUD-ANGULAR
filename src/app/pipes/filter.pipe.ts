import { Pipe, PipeTransform } from '@angular/core';
import { empty } from 'rxjs';
import { HeroeModel } from '../models/heroe.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
 
if(arg.lenght < 6){
  return false;
}

if(arg === empty){

  
    return value;
  
  }else{
    const resultadoBusqueda:HeroeModel[] = [];
    for(let heroe of value){
      if(heroe.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
       resultadoBusqueda.push(heroe);
      }
    }
    return resultadoBusqueda;
  }



}

}
