<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CARRERA;
use App\Models\CURSOS;
use App\Models\CURSOUSUARIO;
use App\Models\PARAMETROS;
use App\Models\Personas;
use App\Models\TIPOSEVENTOS;
use App\Models\User;

class CTiposdeEventos extends Controller
{
    //Funcion que consulta la Tabla Tipos eventos y devuelve todos los registros.
    public function consultarEventos(){
        $variable =0;
        $eventos= TIPOSEVENTOS::orderBy('CODIGO_EVENTO')->get();
 foreach($eventos as $evento)
                {
         $tipos[$variable] = array(     
             'CODIGO_EVENTO'=>trim($evento->CODIGO_EVENTO),
              'NOMBRE'=>trim($evento->NOMBRE),
              'DETALLE'=>trim($evento->DETALLE)
              );
         $variable++;
                }

if($variable>0)
{
$data = array(
          'status'=>'OK',
          'code'=>200, 
          'tipos'=>$tipos);
}else
{
$data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'No existen registros');
         }


         return response()->json($data,$data['code']);

                            }

//Funcion con sql con condicion
public function eventosParametros($parametro){
        $variable =0;
        //$eventos= TIPOSEVENTOS::orderBy('CODIGO_EVENTO')->get();
        $eventos = TIPOSEVENTOS::where(
                     [ 
                         ['CODIGO_EVENTO',$parametro]
                     ])->get();
 foreach($eventos as $evento)
                {
         $tipos[$variable] = array(     
             'CODIGO_EVENTO'=>trim($evento->CODIGO_EVENTO),
              'NOMBRE'=>trim($evento->NOMBRE),
              'DETALLE'=>trim($evento->DETALLE)
              );

         $variable++;
                }
if($variable>0)
{
$data = array(
          'status'=>'OK',
          'code'=>200, 
          'tipos'=>$tipos);
}else
{
$data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'No existen registros');
         }


         return response()->json($data,$data['code']);

                            }
//Funcion con sql PAReA INSERTAR
public function nuevoEvento(Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);//esto em devuelve un objeto
        $params_array = json_decode($json,true);//esto em devuelve un array

        
        //limpiar los datos siempre y cuando el array no sea vacio
        if(!empty($params) ){

        //Limpiar el array de espacios
        $params_array = array_map('trim', $params_array);
        
     
        //Validar los datos
        $validate = \Validator::make($params_array, [
        'NOMBRE'=>'required'//Comprobar si el usuario existe con unique
        
    ]);
    if($validate->fails()){
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'Variable nombre es requerido',
          'error'=>$validate->errors()
        );
    }else
    {
             
        //Crear TiposEventos
    $tiposeventos=new TiposEventos();
    $tiposeventos->NOMBRE= strtoupper($params_array['NOMBRE']);
    $tiposeventos->DETALLE= strtoupper($params_array['DETALLE']);
    
//Guardar el evento
  $tiposeventos->save();
    
  //enviar la respuesta
          $data = array(
          'status'=>'succes',
          'code'=>200, 
          'message'=>'El evento se ha creado correctamente'
        );
    }
        }else
        {
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'Los datos enviados no son correctos'
        );  
        }

        return response()->json($data,$data['code']);
    }
// Funcion para eliminar registro por el nombre
public function eliminarEventos($id,Request $request)
    {
     //comseguir el post
     $tiposEventos= TIPOSEVENTOS::find($id);
     
     if(!empty($tiposEventos))
        {
     //borrarlo
     $tiposEventos->delete();
     //devolver
     
     $data = array(
          'status'=>'success',
          'code'=>200, 
          'message'=>$tiposEventos
        );
        }else
        {
            $data = array(
           'status'=>'Error',
          'code'=>404, 
          'message'=>'No Existe el registro para eliminar'
             );
        }
     return response()->json($data,$data['code']);
 }

 // Funcon para actualizar Regisro de la tabla TtiposEventos
public function updateEventos($id,Request $request){


                 //ACTUALIZAR EL USUARIO
             //recoger los datos por post
         $json =$request->input('json',null);
        $params_array = json_decode($json,true);//esto em devuelve un array
        
        
         if(!empty($params_array))
         {
//validar los datos
 $validate = \Validator::make($params_array, [
        'NOMBRE'=>'required'//Comprobar si el usuario existe con uniqu    
    ]);     
         //QUITAR LO QUE NO QUIERO ACTUALIZAR 
         unset($params_array['CODIGO_EVENTO']);

             
             //actualizar el usuario en la bbd
             $evento_update =  TIPOSEVENTOS::where('CODIGO_EVENTO',$id)->update($params_array);
             
             //devolver array con el resultado
             $data = array(
          'status'=>'success',
          'code'=>200, 
          'change'=>$params_array);
         }else
         {
            $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'El Evento no ha sido actualizado');
         }
         return response()->json($data,$data['code']);
     }
}