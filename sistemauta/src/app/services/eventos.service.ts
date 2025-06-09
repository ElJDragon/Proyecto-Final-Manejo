import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { global } from './global';



//definir la clases del injectable
//los sercicios nos sirve para la conexion con el backend

@Injectable() 
export class EventosService
{
	public url: string;
	
	 constructor (private _http: HttpClient){
	 	this.url= global.url;
	 }


	 	 updateEvento(token: any,arrayevento: any,codigo: any):Observable<any>
	 {
	let json = JSON.stringify(arrayevento);
	//enviar parametros por post o por put
	let params = "json="+json;
	console.log(params);
	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
								   .set('Authorization',token);
	return this._http.put(this.url +'updateEvento/'+codigo, params, {headers:headers});			
	 }


	 	 //metodo para obtener todos los responsables
getEvento():Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'tiposeventos', {headers:headers});
	 }

	 getEvento1p(nombres: any):Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'eventosLike/'+nombres, {headers:headers});
	 }

	 deleteEvento(token: any,id: any):Observable<any>
	 {

	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
								   .set('Authorization',token);
	//por ultimo hago la petición por put
	return this._http.delete(this.url +'eliminaeventos/'+id, {headers:headers});			
	 }

	 	 guardarEvento(parametros: any): Observable<any>{
	 	//convierto en string para el envío
	 	let json =JSON.stringify(parametros); 
	 	let params ='json='+json;
	 	console.log(params);
	 	let headers =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.post(this.url+'nuevaEvento', params, {headers:headers});

	 }
}