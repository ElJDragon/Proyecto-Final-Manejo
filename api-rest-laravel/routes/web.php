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
Route::put('/api/updateRegistro/{id}',['\App\Http\Controllers\CursosController', 'updateRegistro']);


Route::put('/api/updateAprobado/{id}',['\App\Http\Controllers\CursosController', 'updateAprobado']);
Route::put('/api/updateReprobado/{id}',['\App\Http\Controllers\CursosController', 'updateReprobado']);

//RUTAS PARA TIPOS DOCUMENTOS
Route::get('/api/tiposdocumento',['\App\Http\Controllers\CTiposDocumentos', 'consultarDocumentos']);
Route::get('/api/tiposdocumentoAdj/{id}',['\App\Http\Controllers\CTiposDocumentos', 'tiposdocumentoAdj']);
Route::get('/api/tiposdocumentoAdjP/{id}',['\App\Http\Controllers\CTiposDocumentos', 'tiposdocumentoAdjP']);

Route::get('/api/documentosLike/{id}',['\App\Http\Controllers\CTiposDocumentos', 'documentosLike']);
Route::get('/api/documentoP/{id}',['\App\Http\Controllers\CTiposDocumentos', 'documentosP']);

Route::get('/api/documentosPP/{id}/{persona}/{curso}',['\App\Http\Controllers\CTiposDocumentos', 'documentosPP']);

Route::put('/api/updateDocumento/{id}',['\App\Http\Controllers\CTiposDocumentos', 'updateDocumentos']);

Route::delete('/api/eliminadocumentos/{id}',['\App\Http\Controllers\CTiposDocumentos', 'eliminarDocumento']);
Route::delete('/api/eliminaadjuntos/{documento}/{persona}',['\App\Http\Controllers\CTiposDocumentos', 'eliminaadjuntos']);
Route::delete('/api/eliminaevedocumentos/{evento}/{documento}',['\App\Http\Controllers\CTiposDocumentos', 'eliminarEveDoc']);

Route::post('/api/nuevoDocumento',['\App\Http\Controllers\CTiposDocumentos', 'nuevoDocumento']);
Route::post('/api/nuevoEveDocumento',['\App\Http\Controllers\CTiposDocumentos', 'nuevoEveDocumento']);
Route::post('/api/nuevoAdjunto',['\App\Http\Controllers\CTiposDocumentos', 'nuevoAdjunto']);
Route::post('/api/nuevoPago',['\App\Http\Controllers\CTiposDocumentos', 'nuevoPago']);

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



//RUTAS PARA MISION VISION
Route::get('/api/mision',['\App\Http\Controllers\CMisionVision', 'consultarMision']);
Route::put('/api/updateMision/{id}',['\App\Http\Controllers\CMisionVision', 'updateMision']);





//PERFIL DE USUARIO

Route::get('/api/provincias',['\App\Http\Controllers\ProfileController', 'getProvincias']);
Route::get('/api/cantones',['\App\Http\Controllers\ProfileController', 'getCantones']);
Route::get('/api/cantones/{codigo}',['\App\Http\Controllers\ProfileController', 'getCantonesParametro']);
Route::post('/api/insertDireccion',['\App\Http\Controllers\ProfileController', 'insertDireccion']);
Route::get('/api/direccion/{usuario}',['\App\Http\Controllers\ProfileController', 'getDireccion']);
Route::get('/api/datospersona/{usuario}',['\App\Http\Controllers\ProfileController', 'getdatospersona']);
Route::get('/api/datosregistro/{evento}/{usuario}',['\App\Http\Controllers\ProfileController', 'datosregistro']);

Route::put('/api/updatePerson/{id}',['\App\Http\Controllers\ProfileController', 'updatePerson']);



//CURSO

Route::post('/api/nuevoCurso',['\App\Http\Controllers\CursosController', 'nuevoCurso']);
Route::post('/api/nuevoParametro',['\App\Http\Controllers\CursosController', 'nuevoParametro']);
Route::post('/api/nuevoRegistro',['\App\Http\Controllers\CursosController', 'nuevoRegistro']);
Route::get('/api/cursosadmin',['\App\Http\Controllers\CursosController', 'getcursosadmin']);
Route::get('/api/disponibles/{usuario}',['\App\Http\Controllers\CursosController', 'disponibles']);

Route::get('/api/registradosa/{evento}',['\App\Http\Controllers\CursosController', 'registradosa']);
Route::get('/api/registradospp/{evento}/{parametro}',['\App\Http\Controllers\CursosController', 'registradospp']);

Route::get('/api/eventocod/{codigo}',['\App\Http\Controllers\CursosController', 'eventocod']);
Route::get('/api/disponiblesp/{usuario}',['\App\Http\Controllers\CursosController', 'disponiblesp']);

Route::get('/api/registrados/{curso}',['\App\Http\Controllers\CursosController', 'registrados']);

Route::put('/api/updatecurso/{codigo}',['\App\Http\Controllers\CursosController', 'updatecurso']);




//carga de archivos
Route::post('/api/upload/{id}', ['\App\Http\Controllers\FilesController', 'upload'])->name('file.upload');
Route::post('/api/cursos/{id}', ['\App\Http\Controllers\FilesController', 'cursos'])->name('file.cursos');
Route::post('/api/profile/{id}', ['\App\Http\Controllers\FilesController', 'profile'])->name('file.profile');
Route::post('/api/bienvenida/{id}', ['\App\Http\Controllers\FilesController', 'bienvenida'])->name('file.bienvenida');
Route::post('/api/adjuntos/{id}', ['\App\Http\Controllers\FilesController', 'adjuntos'])->name('file.adjuntos');
Route::get('/api/download/{filename}', ['\App\Http\Controllers\FilesController', 'download'])->name('file.serve');