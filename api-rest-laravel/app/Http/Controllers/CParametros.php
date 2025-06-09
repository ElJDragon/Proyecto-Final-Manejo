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

class CParametros extends Controller
{
public function consultarParametros(){
        $variable = 0;
        $parametros = PARAMETROS::orderBy('CODIGO')->get();
        foreach($parametros as $parametro)
        {
            var_dump($parametros->id);
    foreach($parametros as $parametro)
    {
     $tipos[$variable] = array(
                'CODIGO' => trim($parametro->CODIGO),
                'CURSO' => trim($parametro->CURSO),
                'ESPUBLICO' => trim($parametro->ESPUBLICO),
                'ESPAGADO' => trim($parametro->ESPAGADO),
                'VALOR' => trim($parametro->VALOR),
                'HORAS' => trim($parametro->HORAS));
            $variable++;  
    }
        
        }


        if($variable > 0)
        {
            $data = array( 
                'status' => 'OK',
                'code' => 200,
                'tipos' => $tipos
            );
        }
        else
        {
            $data = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'No existen parametros'
            );
        }

        return response()->json($data, $data['code']);
    }

          


//Funcion con sql con condicion
public function parametroIndividual($id){
        $variable =0;
        //$personas= TIPOSEVENTOS::orderBy('ID')->get();
        $parametros = Parametros::where(
                     [ 
                         ['CODIGO',$id]
                     ])->get();
 foreach($paramtetros as $parametro)
                {
         $var[$variable] = array(     
            'CODIGO' => trim($parametro->CODIGO),
                'CURSO' => trim($parametro->CURSO),
                'ESPUBLICO' => trim($parametro->ESPUBLICO),
                'ESPAGADO' => trim($parametro->ESPAGADO),
                'VALOR' => trim($parametro->VALOR),
                'HORAS' => trim($parametro->HORAS)
            );
            

         $variable++;
                }
if($variable>0)
{
$data = array(
          'status'=>'OK',
          'code'=>200, 
          'tipos'=>$var);
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
public function nuevoEventoParamtro(Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);//esto me devuelve un objeto
        $params_array = json_decode($json,true);//esto em devuelve un array

        
        //limpiar los datos siempre y cuando el array no sea vacio
        if(!empty($params) ){

        //Limpiar el array de espacios
        $params_array = array_map('trim', $params_array);
        
     
        //Validar los datos
        $validate = \Validator::make($params_array, [
    'CODIGO' => 'required',
    'CURSO' => 'required',
    'HORAS' => 'required'

    ]);
    if($validate->fails()){
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'Variable Codigo, curso, horas requeridos',
          'error'=>$validate->errors()
        );
    }else
    {
             
        //Crear user
    $users = new User();
    $users->Nombre = strtoupper($params_array['Nombre']);
    $users->Email = ($params_array['Email']);
    $users->Password = $params_array['Password'];
//Guardar el evento
  $users->save();
    
  //enviar la respuesta
          $data = array(
          'status'=>'succes',
          'code'=>200, 
          'message'=>'El User se ha creado correctamente'
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
public function eliminarUsuario($id,Request $request)
    {
     //comseguir el post
     $users= User::find($id);
     
     if(!empty($users))
        {
     //borrarlo
     $users->delete();
     //devolver
     
     $data = array(
          'status'=>'success',
          'code'=>200, 
          'message'=>$users
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

 // Funcon para actualizar Regisro de la tabla Ttipospersonas
public function updatePersonas($id,Request $request){


                 //ACTUALIZAR EL USUARIO
             //recoger los datos por post
         $json =$request->input('json',null);
        $params_array = json_decode($json,true);//esto me devuelve un array
        
        
         if(!empty($params_array))
         {
//validar los datos
 $validate = \Validator::make($params_array, [
        'ID'=>'required'//Comprobar si el usuario existe con uniqu    
    ]);     
         //QUITAR LO QUE NO QUIERO ACTUALIZAR 
         unset($params_array['ID']);
         unset($params_array['IDENTIFICACION']);
             
             //actualizar el usuario en la bbd
             $evento_update =  Personas::where('ID',$id)->update($params_array);
             
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
          'message'=>'La Persona no ha sido actualizada');
         }
         return response()->json($data,$data['code']);
     }
    }
