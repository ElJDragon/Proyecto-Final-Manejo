import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { global } from './global';



//definir la clases del injectable
//los sercicios nos sirve para la conexion con el backend

@Injectable() 
export class PersonaService
{
	public url: string;
	
	 constructor (private _http: HttpClient){
	 	this.url= global.url;
	 }


	 	 updatePersona(token: any,arrayevento: any,codigo: any):Observable<any>
	 {
	let json = JSON.stringify(arrayevento);
	//enviar parametros por post o por put
	let params = "json="+json;
	console.log(params);
	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
								   .set('Authorization',token);
	return this._http.put(this.url +'updatePersona/'+codigo, params, {headers:headers});			
	 }


	 	 //metodo para obtener todos los responsables
getPersona():Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'personas', {headers:headers});
	 }

	 getPersona1p(nombres: any,apellidos: any):Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'personasLike/'+nombres+'/'+apellidos, {headers:headers});
	 }

	 deletePersona(token: any,id: any):Observable<any>
	 {

	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
								   .set('Authorization',token);
	//por ultimo hago la petición por put
	return this._http.delete(this.url +'eliminaPersona/'+id, {headers:headers});			
	 }

	 	 guardarPersona(parametros: any): Observable<any>{
	 	//convierto en string para el envío
	 	let json =JSON.stringify(parametros); 
	 	let params ='json='+json;
	 	console.log(params);
	 	let headers =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.post(this.url+'nuevaPersona', params, {headers:headers});

	 }
}