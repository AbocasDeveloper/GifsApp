import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent implements OnInit {

    //Obtenemos el campo de texto del buscador, gracias a su referencia
    @ViewChild('txtBuscar') txtBuscar !: ElementRef<HTMLInputElement>;

    constructor(
        private _gifsService: GifsService
    ) { }

    ngOnInit(): void {
    }

    buscar(){
        //Obtenemos el valor del campo de texto del buscador
        const valor = this.txtBuscar.nativeElement.value;

        if(valor.trim().length === 0) return;

        this._gifsService.buscarGifs(valor);

        //Borramos el campo de texto del buscador
        this.txtBuscar.nativeElement.value = '';
    }
}
