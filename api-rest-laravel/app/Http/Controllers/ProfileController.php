<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Personas;
use App\Models\Provincias;
use App\Models\Cantones;
use App\Models\Direccion;
use App\Helpers\JwtAuth;



class ProfileController extends Controller
{


public function getProvincias(){
        $integer =0;

$provincias = Provincias::get(); 

 foreach($provincias as $provincia)
                {
         $enviarprovincias[$integer] = array(     
             'CODIGO'=>trim($provincia->COD_PROVINCIA),
              'NOMBRE'=>trim($provincia->NOMBRE)
        );
         $integer++;
                }

if($integer>0)
{
$data = array(
          'status'=>'success',
          'code'=>200, 
          'provincias'=>$enviarprovincias);
}else
{
$data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'No existen registros');
         }


         return response()->json($data,$data['code']);


                            }

public function getCantones(){
        $integer =0;

$cantones = Cantones::get(); 

 foreach($cantones as $canton)
                {
         $enviarcantones[$integer] = array(     
             'CODIGO'=>trim($canton->CODIGO),
              'NOMBRE'=>trim($canton->NOMBRE),
              'PROVINCIA'=>trim($canton->fprovincias->NOMBRE)
        );
         $integer++;
                }

if($integer>0)
{
$data = array(
          'status'=>'success',
          'code'=>200, 
          'cantones'=>$enviarcantones);
}else
{
$data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'No existen registros');
         }


         return response()->json($data,$data['code']);


                            }

public function getCantonesParametro($parametro){
        $integer =0;
        $parametro=trim($parametro);
$cantones = Cantones::where(
                     [ 
                         ['COD_PROVINCIA',$parametro]
                     ])->get(); 
 foreach($cantones as $canton)
                {
         $enviarcantones[$integer] = array(     
             'CODIGO'=>trim($canton->CODIGO),
              'NOMBRE'=>trim($canton->NOMBRE),
              'PROVINCIA'=>trim($canton->fprovincias->NOMBRE)
        );
         $integer++;
                }
if($integer>0)
{
$data = array(
          'status'=>'success',
          'code'=>200, 
          'cantones'=>$enviarcantones);
}else
{
$data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'No existen registros');
         }
         return response()->json($data,$data['code']);
                            }

public function getDireccion($id){
        $integer =0;
        $parametro=trim($id);
$direcciones = Direccion::where(
                     [ 
                         ['ID',$parametro]
                     ])->get(); 
 foreach($direcciones as $direccion)
                {
         $enviardireccion[$integer] = array(     
             'CODIGO'=>trim($direccion->CODIGO),
              'CANTON'=>trim($direccion->fdireccion->NOMBRE),
              'PROVINCIA'=>trim($direccion->fdireccion->fprovincias->NOMBRE)
        );
         $integer++;
                }
if($integer>0)
{
$data = array(
          'status'=>'success',
          'code'=>200, 
          'direccion'=>$enviardireccion);
}else
{
$data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'No existen registros');
         }
         return response()->json($data,$data['code']);
                            }



public function getdatospersona($id){
        $integer =0;
        $parametro=trim($id);
$personas = Personas::where(
                     [ 
                         ['USUARIO',$parametro]
                     ])->get(); 

 foreach($personas as $persona)
                {
         $enviarpersona[$integer] = array(     
             'IDENTIFICACION'=>trim($persona->IDENTIFICACION),
             'NOMBRES'=>trim($persona->NOMBRES),
             'APELLIDOS'=>trim($persona->APELLIDOS),
             'EMAIL'=>trim($persona->EMAIL),
             'TELEFONO'=>trim($persona->TELEFONO)             
        );
         $integer++;
                }
if($integer>0)
{
$data = array(
          'status'=>'success',
          'code'=>200, 
          'persona'=>$enviarpersona);
}else
{
$data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'No existen registros');
         }
         return response()->json($data,$data['code']);
                            }


///////////////////////////////////////////////////
///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//update PERSONA
    public function updatePerson($id,Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);//esto em devuelve un objeto
        $params_array = json_decode($json,true);//esto em devuelve un array
        
        //limpiar los datos siempre y cuando el array no sea vacio
        if(!empty($params) && !empty($params_array)){

        //Limpiar el array de espacios
        $params_array = array_map('trim', $params_array);
        
     
        //Validar los datos
        $validate = \Validator::make($params_array, [
        'ID'=>'required'
    ]);

    if($validate->fails()){
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'Campos requeridos no enviados',
          'error'=>$validate->errors()
        );
    }else
    {
    // ACTUALIZAR
//QUITAR LO QUE NO QUIERO ACTUALIZAR 
unset($params_array['ID']);
unset($params_array['EMAIL']);
unset($params_array['USUARIO']);

$limite_update =  Personas::where('USUARIO',$id)->update($params_array);

if ($limite_update > 0) {
$data = array(
          'status'=>'succes',
          'code'=>200, 
          'message'=>'Registro actualizado correctamente'
        );
} else {
    // No se actualizó ningún registro
    $data = array(
          'status'=>'succes',
          'code'=>200, 
          'message'=>'Error al actualizar registro'
        );
}
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


///////////////////////////////////////////////////
///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//CREACION DE NUEVOS RESPONSABLES
    public function insertDireccion(Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);//esto em devuelve un objeto
        $params_array = json_decode($json,true);//esto em devuelve un array
        
        //limpiar los datos siempre y cuando el array no sea vacio
        if(!empty($params) && !empty($params_array)){

        //Limpiar el array de espacios
        $params_array = array_map('trim', $params_array);
        
     
        //Validar los datos
        $validate = \Validator::make($params_array, [
        'ID'=>'required',//Comprobar si el usuario existe con 
        'CODIGO'=>'required'
    ]);

    if($validate->fails()){
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'Campos requeridos no enviados',
          'error'=>$validate->errors()
        );
    }else
    {
$yaexiste = Direccion::where(
                     [ 
                         ['ID',$params_array['ID']]
                     ])->get(); 


if ($yaexiste->isEmpty()) {
    // INSERTAR
   $insertar=new Direccion();
    $insertar->ID= strtoupper($params_array['ID']);
    $insertar->CODIGO= strtoupper($params_array['CODIGO']);
    if ($insertar->save()) {
    $data = array(
          'status'=>'succes',
          'code'=>200, 
          'message'=>'Registro creado correctamente'
        );
} else {
    $data = array(
          'status'=>'succes',
          'code'=>200, 
          'message'=>'Error al crear registro'
        );
}
} else {
    // ACTUALIZAR
$actualizar = Direccion::where('ID', $params_array['ID']);
$updated = $actualizar->update(['CODIGO' => $params_array['CODIGO']]);

if ($updated > 0) {
$data = array(
          'status'=>'succes',
          'code'=>200, 
          'message'=>'Registro actualizado correctamente'
        );
} else {
    // No se actualizó ningún registro
    $data = array(
          'status'=>'succes',
          'code'=>200, 
          'message'=>'Error al actualizar registro'
        );
}
}

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
}
