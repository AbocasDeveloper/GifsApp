import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

    constructor(
        private _gifsService: GifsService
    ) { }

    ngOnInit(): void {
    }

    get historial(){
        return this._gifsService.historial;
    }

    buscar(item:string){
        this._gifsService.buscarGifs(item);
    }

}
