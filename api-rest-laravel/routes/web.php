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


///BATCH
//Rutas que direcionan a la tabla T Tiposeventos
Route::get('/api/getTiposEventos',['\App\Http\Controllers\CTiposdeEventos', 'consultarEventos']);
Route::get('/api/getEventosParametro/{parametro}',['\App\Http\Controllers\CTiposdeEventos', 'eventosParametros']);

Route::post('/api/nuevoEvento',['\App\Http\Controllers\CTiposdeEventos', 'nuevoEvento']);
Route::delete('/api/eliminarEvento/{parametro}',['\App\Http\Controllers\CTiposdeEventos', 'eliminarEventos']);
Route::put('/api/updateEventos/{parametro}',['\App\Http\Controllers\CTiposdeEventos', 'updateEventos']);
//Rutas que direcionan a la tabla Personas
Route::get('/api/getPersonas',['\App\Http\Controllers\CPersonas', 'consultarPersonas']);
