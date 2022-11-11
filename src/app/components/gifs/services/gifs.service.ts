import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
    providedIn: 'root'
})
export class GifsService {

    private _servicioURL: string = 'https://api.giphy.com/v1/gifs';
    private _apiKey: string = 'hWexBlacl5ouA80R0TGEMKw8CwerpKM3';
    private _historial: string[] = [];

    public resultados: Gif[] = [];

    constructor(
        private _http: HttpClient
    ){
        //Obtenemos el listado cuando iniciamos la app
        if(localStorage.getItem('historial')){
            this._historial = JSON.parse(localStorage.getItem('historial')!);
            //Cargamos el ultimo resultado buscado
            this.buscarGifs(this._historial[0]);
        }
    }

    //Obtenemos el listado de busqueda de GIFS
    get historial(){
        //Rompemos la referencia con [...]
        return [...this._historial];
    }

    buscarGifs( query: string){

        //Lo ponemos en minisculas
        query = query.trim().toLowerCase();

        //Si no existe la busqueda en el arreglo
        if(!this._historial.includes(query)){
            //Agregamos el ultimo que ha sido escrito al arreglo 
            this._historial.unshift(query);

            //Solo necesitamos los 10 ultimos resultados buscados
            this._historial = this._historial.splice(0,10);

            //Guardamos en el local storage el historial de busqueda
            localStorage.setItem('historial', JSON.stringify(this._historial));
        }

        const params = new HttpParams()
            .set('api_key', this._apiKey)
            .set('limit', '20')
            .set('q', query);

        //Hacemos la peticion a la API de 'https://developers.giphy.com/'
        this._http.get<SearchGifsResponse>(`${this._servicioURL}/search?`, {params})
            .subscribe(
                (response ) => {
                    console.log(response.data);
                    this.resultados = response.data;
                }
            );
        
    }
}
