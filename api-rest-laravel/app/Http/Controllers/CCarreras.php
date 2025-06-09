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

class CCarreras extends Controller
{
    //Funcion que consulta la Tabla Carreras y devuelve todos los registros.
    public function consultarCarreras(){
        $variable =0;
        $carreras= CARRERA::orderBy('CODIGOCARRERA')->get();
 foreach($carreras as $carrera)
                {
         $tipos[$variable] = array(     
             'CODIGOCARRERA'=>trim($carrera->CODIGOCARRERA),
              'NOMBRE'=>trim($carrera->NOMBRE),
              'OBSERVACION'=>trim($carrera->OBSERVACION)
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
public function carrerasParametros($codigo_evento){
        $variable =0;
        //$carreras= TIPOSEVENTOS::orderBy('CODIGOCARRERA')->get();
        $carreras = CARRERA::where(
                     [ 
                         ['CODIGOCARRERA',$codigo_evento]
                     ])->get();
 foreach($carreras as $carrera)
                {
         $tipos[$variable] = array(     
             'CODIGOCARRERA'=>trim($carrera->CODIGOCARRERA),
              'NOMBRE'=>trim($carrera->NOMBRE),
              'OBSERVACION'=>trim($carrera->OBSERVACION)
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
public function carrerasLike($codigo_evento){
        $variable =0;
        //$carreras= TIPOSEVENTOS::orderBy('CODIGOCARRERA')->get();
        $carreras = CARRERA::where(
                     [ 
                         ['NOMBRE','like','%'.$codigo_evento.'%']
                     ])->get();
 foreach($carreras as $carrera)
                {
         $tipos[$variable] = array(     
             'CODIGOCARRERA'=>trim($carrera->CODIGOCARRERA),
              'NOMBRE'=>trim($carrera->NOMBRE),
              'OBSERVACION'=>trim($carrera->OBSERVACION)
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
public function nuevaCarrera(Request $request){
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
          'message'=>'Carrera nombre es requerido',
          'error'=>$validate->errors()
        );
    }else
    {
             
        //Crear CARRERA
    $carreras=new CARRERA();
    $carreras->NOMBRE= strtoupper($params_array['NOMBRE']);
    $carreras->OBSERVACION= strtoupper($params_array['OBSERVACION']);
    
//Guardar la carrera
  $carreras->save();
    
  //enviar la respuesta
          $data = array(
          'status'=>'succes',
          'code'=>200, 
          'message'=>'La carrera se ha creado correctamente'
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
public function eliminarCarreras($id,Request $request)
    {
     //comseguir el post
     $carreras= CARRERA::find($id);
     
     if(!empty($carreras))
        {
     //borrarlo
     $carreras->delete();
     //devolver
     
     $data = array(
          'status'=>'success',
          'code'=>200, 
          'message'=>$carreras
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
public function updateCarreras($id,Request $request){


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
         unset($params_array['CODIGOCARRERA']);

             
             //actualizar el usuario en la bbd
             $evento_update =  CARRERA::where('CODIGOCARRERA',$id)->update($params_array);
             
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
          'message'=>'La carrera no ha sido actualizado');
         }
         return response()->json($data,$data['code']);
     }
}