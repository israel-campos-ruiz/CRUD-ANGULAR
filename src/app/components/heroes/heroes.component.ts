import { Component, OnInit } from '@angular/core';
import {HeroesService} from '../../services/heroes.service';
import {HeroeModel} from '../../models/heroe.model'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  filterPost = '';
  heroes:HeroeModel[] = [];
  cargando = false;

  constructor(private heroesService:HeroesService) {

   }

  ngOnInit() {
    this.cargando = true;
    this.heroesService.getHeroes().subscribe((respuesta:any)=>{
       console.log(respuesta);
       this.heroes = respuesta;
       this.cargando = false;
    });
  }

  deleteHeroe(heroe:HeroeModel, i:number){
    Swal.fire({
      title:`Desea borrar a ${heroe.nombre}`,
      type:"question",
      showCancelButton:true,
      showConfirmButton:true
 
    }).then(resp =>{
      if(resp.value){
        this.heroes.slice(i,1);
        this.heroesService.deleteHeroe(heroe.id).subscribe()
 
      }
    })
  }

  
}
