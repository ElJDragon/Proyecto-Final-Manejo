import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';


//definir la clases del injectable
//los sercicios nos sirve para la conexion con el backend

//@Injectable() 

@Injectable({
  providedIn: 'root'
})



export class UserService
{
	public url: string;
    public identity:any;
    public token:any;
	
	 constructor (public _http: HttpClient){
	 	this.url= global.url;
	 }

	 test(){

	 }

//metodo para enviar la informacion al backend y guardar un nuevo usuario
	 register(user: any): Observable<any>{
	 	//convierto en string para el envío
	 	let json =JSON.stringify(user); 
	 	let params ='json='+json;
	 	console.log(params);
	 	let headers =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.post(this.url+'register', params, {headers:headers});

	 }


	 	 //actualizar usuario
	 cambiopwd(token: any,user: any):Observable<any>
	 {
	let json = JSON.stringify(user);
	//enviar parametros por post o por put
	let params = "json="+json;
	console.log(params);
	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
								   .set('Authorization',token);

	//por ultimo hago la petición por put
	return this._http.put(this.url +'updatepwd', params, {headers:headers});			
	 }

//metodo para iniciar sesion
	 signup(user: any, gettoken: any): Observable<any>{
	 	if(gettoken!=null){
	 		user.gettoken='true';
	 	}
	 	let json =JSON.stringify(user); 
	    let params ='json='+json;
	    let headers =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	    return this._http.post(this.url+'login', params, {headers:headers});
	 }

	 //actualizar usuario
	 update(token: any,user: any):Observable<any>
	 {
	let json = JSON.stringify(user);
	//enviar parametros por post o por put
	let params = "json="+json;
	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
								   .set('Authorization',token);

	//por ultimo hago la petición por put
	return this._http.put(this.url +'update', params, {headers:headers});			
	 }

	 //conseguir la informacion del usuario
	 getIdentity()
	 {
	let identity =localStorage.getItem('identity');
	if(identity && identity!="undefined"){
		this.identity=JSON.parse(identity);	
	}else{this.identity=null;}
	return this.identity;
	}
	getToken()
	 {
//let token =JSON.parse(localStorage.getItem('token'));
	 	let token =localStorage.getItem('token');
	if(token && token!="undefined"){
		this.token=token;
	}else{this.token=null;}
	return this.token;
	 }

 
	 	 getrole(user: any):Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'perfilUsuario/'+user, {headers:headers});
}

getAll():Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'getAllUser', {headers:headers});
}

	 //actualizar usuario
	 updateRol(id: any,token: any,user: any):Observable<any>
	 {
	let json = JSON.stringify(user);
	//enviar parametros por post o por put
	let params = "json="+json;
	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
								   .set('Authorization',token);
	//por ultimo hago la petición por put
	return this._http.put(this.url +'updaterol/'+id, params, {headers:headers});			
	 }

	 deleteUsuario(token: any,id: any):Observable<any>
	 {

	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
								   .set('Authorization',token);
	//por ultimo hago la petición por put
	return this._http.delete(this.url +'eliminaruser/'+id, {headers:headers});			
	 }

	 	 updateUsuario(token: any,usuario: any,codigo: any):Observable<any>
	 {
	let json = JSON.stringify(usuario);
	//enviar parametros por post o por put
	let params = "json="+json;
	console.log(params);
	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
								   .set('Authorization',token);
	return this._http.put(this.url +'updateUsuario/'+codigo, params, {headers:headers});			
	 }

	 getUsuario1p(nombres: any):Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'getAllUser/'+nombres, {headers:headers});
	 }

	 getUserid(codigo: any):Observable<any>{
	 	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.get(this.url+'getUserid/'+codigo, {headers:headers});
	 }



	 	 	 recuperarContraseña(parametros: any): Observable<any>{
	 	//convierto en string para el envío
	 	let json =JSON.stringify(parametros); 
	 	let params ='json='+json;
	 	console.log(params);
	 	let headers =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	 	return this._http.post(this.url+'correorecuperacion', params, {headers:headers});

	 }
}