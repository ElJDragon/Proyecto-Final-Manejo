import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { global } from './global';



//definir la clases del injectable
//los sercicios nos sirve para la conexion con el backend

@Injectable() 
export class MonitoreoService
{
	public url: string;
	
	 constructor (private _http: HttpClient){
	 	this.url= global.url;
	 }

		 guardarDireccion(parametros: any): Observable<any>{
	 	//convierto en string para el envío
	 	let json =JSON.stringify(parametros); 
	 	let params ='json='+json;
	 	console.log(params);
	 	let headers =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.post(this.url+'insertDireccion', params, {headers:headers});

	 }

	

	 	 	 actualizaPersona(token: any,codigo: any,param: any):Observable<any>
	 {
	let json = JSON.stringify(param);
	//enviar parametros por post o por put
	let params = "json="+json;
	console.log(params);
	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
								   .set('Authorization',token);
	return this._http.put(this.url +'updatePerson/'+codigo, params, {headers:headers});			
	 }

}