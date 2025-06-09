import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { global } from './global';



//definir la clases del injectable
//los sercicios nos sirve para la conexion con el backend

@Injectable() 
export class ProfileService
{
	public url: string;
	
	 constructor (private _http: HttpClient){
	 	this.url= global.url;
	 }


	  getProvince():Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'provincias', {headers:headers});
	 }
	 	 getCantones():Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'cantones', {headers:headers});
	 }
	 getCantonesp(codigo: any):Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'cantones/'+codigo, {headers:headers});
	 }
	 getDireccion(usuario: any):Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'direccion/'+usuario, {headers:headers});
	 }
	 getDatosPersona(usuario: any):Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'datospersona/'+usuario, {headers:headers});
	 }

}