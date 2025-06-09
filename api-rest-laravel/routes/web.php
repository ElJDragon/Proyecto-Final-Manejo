<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\ApiAuthMiddleware;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});



//Rutas que direcionan a la tabla T Tiposeventos
Route::get('/api/getTiposEventos',['\App\Http\Controllers\CTiposdeEventos', 'consultarEventos']);
Route::get('/api/getEventosParametro/{parametro}',['\App\Http\Controllers\CTiposdeEventos', 'eventosParametros']);

Route::post('/api/nuevoEvento',['\App\Http\Controllers\CTiposdeEventos', 'nuevoEvento']);
Route::delete('/api/eliminarEvento/{parametro}',['\App\Http\Controllers\CTiposdeEventos', 'eliminarEventos']);
Route::put('/api/updateEventos/{parametro}',['\App\Http\Controllers\CTiposdeEventos', 'updateEventos']);



//RUTAS PARA USUARIOS
Route::post('/api/register',['\App\Http\Controllers\UserController', 'register']);
Route::post('/api/login',['\App\Http\Controllers\UserController', 'login']);
Route::put('/api/update',['\App\Http\Controllers\UserController', 'update']);
Route::put('/api/updaterol/{id}',['\App\Http\Controllers\UserController', 'updateRol']);
Route::get('/api/getAllUser',['\App\Http\Controllers\UserController', 'AllUser']);
Route::delete('/api/eliminaruser/{id}',['\App\Http\Controllers\UserController', 'eliminaruser']);
Route::put('/api/updateUsuario/{id}',['\App\Http\Controllers\UserController', 'updateUsuario']);
Route::get('/api/getAllUser/{nombres}',['\App\Http\Controllers\UserController', 'getAllUserFiltro']);
Route::get('/api/perfilUsuario/{id}',['\App\Http\Controllers\UserController', 'perfilUser']);
Route::put('/api/updatepwd',['\App\Http\Controllers\UserController', 'updatepwd']);
Route::get('/api/getUserid/{id}',['\App\Http\Controllers\UserController', 'getUserid']);




//RUTAS PARA TIPOS EVENTOS
Route::get('/api/tiposeventos',['\App\Http\Controllers\CTiposdeEventos', 'consultarEventos']);
Route::get('/api/eventosLike/{id}',['\App\Http\Controllers\CTiposdeEventos', 'eventosLike']);
Route::put('/api/updateEvento/{id}',['\App\Http\Controllers\CTiposdeEventos', 'updateEventos']);
Route::delete('/api/eliminaeventos/{id}',['\App\Http\Controllers\CTiposdeEventos', 'eliminarEventos']);
Route::post('/api/nuevaEvento',['\App\Http\Controllers\CTiposdeEventos', 'nuevoEvento']);



//RUTAS PARA TIPOS CARRERAS
Route::get('/api/carreras',['\App\Http\Controllers\CCarreras', 'consultarCarreras']);
Route::get('/api/carrerasLike/{id}',['\App\Http\Controllers\CCarreras', 'carrerasLike']);
Route::put('/api/updateCarrera/{id}',['\App\Http\Controllers\CCarreras', 'updateCarreras']);
Route::delete('/api/eliminaCarrera/{id}',['\App\Http\Controllers\CCarreras', 'eliminarCarreras']);
Route::post('/api/nuevaCarrera',['\App\Http\Controllers\CCarreras', 'nuevaCarrera']);


//RUTAS PARA TIPOS PERSONAS
Route::get('/api/personas',['\App\Http\Controllers\CPersonas', 'consultarPersonas']);
Route::get('/api/personasLike/{idNOMBRE}/{idAPELLIDO}',['\App\Http\Controllers\CPersonas', 'personasLike']);
Route::put('/api/updatePersona/{id}',['\App\Http\Controllers\CPersonas', 'updatePersonas']);
Route::delete('/api/eliminaPersona/{id}',['\App\Http\Controllers\CPersonas', 'eliminarpersonas']);




//PERFIL DE USUARIO

Route::get('/api/provincias',['\App\Http\Controllers\ProfileController', 'getProvincias']);
Route::get('/api/cantones',['\App\Http\Controllers\ProfileController', 'getCantones']);
Route::get('/api/cantones/{codigo}',['\App\Http\Controllers\ProfileController', 'getCantonesParametro']);
Route::post('/api/insertDireccion',['\App\Http\Controllers\ProfileController', 'insertDireccion']);
Route::get('/api/direccion/{usuario}',['\App\Http\Controllers\ProfileController', 'getDireccion']);
Route::get('/api/datospersona/{usuario}',['\App\Http\Controllers\ProfileController', 'getdatospersona']);
Route::put('/api/updatePerson/{id}',['\App\Http\Controllers\ProfileController', 'updatePerson']);