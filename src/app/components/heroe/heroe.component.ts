import { Component, OnInit } from '@angular/core';
import {HeroeModel} from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router'



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe:HeroeModel = new HeroeModel;
  

  
  constructor(private heroesService:HeroesService,
              private router:ActivatedRoute) { 
  }
  
  guardar( form:NgForm ){
    if (form.invalid){
      console.log('formulario no valido ');
      return;
    }
    
    Swal.fire({
      title:"espere",
      text:"guardando información",
      type:"info",
      allowOutsideClick:false
    });
    Swal.isLoading();
    let peticion:Observable<any>;
    

  if(this.heroe.id){
     peticion  = this.heroesService.actualizarHeroe(this.heroe);
  }else{
   peticion = this.heroesService.crearHeroe(this.heroe);
  }
  
  peticion.subscribe((data:any)=>{
      Swal.fire({
        title: this.heroe.nombre,
        text:"se actualizo correctamente",
        type:"success"

      });
  });
 }


  heroes:any[] = [];
 
  ngOnInit() {

    this.heroesService.getHeroes().subscribe((data:any) =>{
      this.heroes = data;

    })

      const idURL = this.router.snapshot.paramMap.get('id');
      if(idURL != 'nuevo'){
        this.heroesService.getHeroeById(idURL).subscribe((respuesta:any)=>{
            this.heroe = respuesta;
            this.heroe.id = idURL;
        });
      }
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
    }).catch(err =>{
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Algo salió mal' 
      })
    });
  }

}

