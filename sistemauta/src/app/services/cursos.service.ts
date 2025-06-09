import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { global } from './global';



//definir la clases del injectable
//los sercicios nos sirve para la conexion con el backend

@Injectable() 
export class CursosService
{
	public url: string;
	
	 constructor (private _http: HttpClient){
	 	this.url= global.url;
	 }


guardarCurso(parametros: any): Observable<any>{
	 	//convierto en string para el envío
	 	let json =JSON.stringify(parametros); 
	 	let params ='json='+json;
	 	console.log(params);
	 	let headers =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.post(this.url+'nuevoCurso', params, {headers:headers});

	 }


guardarParametros(parametros: any): Observable<any>{
	 	//convierto en string para el envío
	 	let json =JSON.stringify(parametros); 
	 	let params ='json='+json;
	 	console.log(params);
	 	let headers =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.post(this.url+'nuevoParametro', params, {headers:headers});

	 }

	 guardarRegistro(parametros: any): Observable<any>{
	 	//convierto en string para el envío
	 	let json =JSON.stringify(parametros); 
	 	let params ='json='+json;
	 	console.log(params);
	 	let headers =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.post(this.url+'nuevoRegistro', params, {headers:headers});

	 }

getCursosAdmin():Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'cursosadmin', {headers:headers});
	 }
	 
getEventos(usuario: any):Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'disponibles/'+usuario, {headers:headers});
	 }

getEventosR(evento: any):Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'registrados/'+evento, {headers:headers});
	 }

getEventosP(nombre: any):Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'disponiblesp/'+nombre, {headers:headers});
	 }


	 updateCurso(token: any,parametros: any,codigo: any):Observable<any>
	 {
	let json = JSON.stringify(parametros);
	//enviar parametros por post o por put
	let params = "json="+json;
	console.log(params);
	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
								   .set('Authorization',token);
	return this._http.put(this.url +'updatecurso/'+codigo, params, {headers:headers});			
	 }
	 
	 //borrar





}