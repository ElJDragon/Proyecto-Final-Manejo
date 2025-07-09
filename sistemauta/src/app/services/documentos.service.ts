import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { global } from './global';



//definir la clases del injectable
//los sercicios nos sirve para la conexion con el backend

@Injectable() 
export class DocumentosService
{
	public url: string;
	
	 constructor (private _http: HttpClient){
	 	this.url= global.url;
	 }


	 	 updateDocumento(token: any,arrayevento: any,codigo: any):Observable<any>
	 {
	let json = JSON.stringify(arrayevento);
	//enviar parametros por post o por put
	let params = "json="+json;
	console.log(params);
	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
								   .set('Authorization',token);
	return this._http.put(this.url +'updateDocumento/'+codigo, params, {headers:headers});			
	 }


	 	 //metodo para obtener todos los responsables
getDocumento():Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'tiposdocumento', {headers:headers});
	 }

	 getParametroPP(parametro: any,persona: any,curso: any):Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'documentosPP/'+parametro+'/'+persona+'/'+curso, {headers:headers});
	 }

	 	 getParametro(parametro: any):Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'documentoP/'+parametro, {headers:headers});
	 }

	 getDocumento1p(nombres: any):Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'documentosLike/'+nombres, {headers:headers});
	 }

	 deleteDocumento(token: any,id: any):Observable<any>
	 {

	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
								   .set('Authorization',token);
	//por ultimo hago la petición por put
	return this._http.delete(this.url +'eliminadocumentos/'+id, {headers:headers});			
	 }
	 	 deleteAdjunto(token: any,documento: any,persona: any):Observable<any>
	 {

	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
								   .set('Authorization',token);
	//por ultimo hago la petición por put
	return this._http.delete(this.url +'eliminaadjuntos/'+documento+'/'+persona, {headers:headers});			
	 }

	 	 guardarDocumento(parametros: any): Observable<any>{
	 	//convierto en string para el envío
	 	let json =JSON.stringify(parametros); 
	 	let params ='json='+json;
	 	console.log(params);
	 	let headers =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.post(this.url+'nuevoDocumento', params, {headers:headers});

	 }

	 	 guardarAdjunto(parametros: any): Observable<any>{
	 	//convierto en string para el envío
	 	let json =JSON.stringify(parametros); 
	 	let params ='json='+json;
	 	console.log(params);
	 	let headers =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.post(this.url+'nuevoAdjunto', params, {headers:headers});

	 }

	 	 	 guardarComprobante(parametros: any): Observable<any>{
	 	//convierto en string para el envío
	 	let json =JSON.stringify(parametros); 
	 	let params ='json='+json;
	 	console.log(params);
	 	let headers =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.post(this.url+'nuevoPago', params, {headers:headers});

	 }

	 	 guardarEveDocumento(parametros: any): Observable<any>{
	 	//convierto en string para el envío
	 	let json =JSON.stringify(parametros); 
	 	let params ='json='+json;
	 	console.log(params);
	 	let headers =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.post(this.url+'nuevoEveDocumento', params, {headers:headers});

	 }

	 	 deleteEveDocumento(token: any,evento: any,documento: any):Observable<any>
	 {

	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
								   .set('Authorization',token);
	//por ultimo hago la petición por put
	return this._http.delete(this.url +'eliminaevedocumentos/'+evento+'/'+documento, {headers:headers});			
	 }

	 	 //metodo para obtener todos los responsables
    getDocumentoAdj(persona: any):Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'tiposdocumentoAdj/'+persona, {headers:headers});
	 }
	 	 //metodo para obtener todos los responsables
    getDocumentoAdjP(persona: any):Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'tiposdocumentoAdjP/'+persona, {headers:headers});
	 }
}