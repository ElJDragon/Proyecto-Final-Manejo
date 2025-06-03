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
class CPersonas extends Controller
{
     //Funcion que consulta la Tabla Tipos personas y devuelve todos los registros.
    public function consultarPersonas(){
        $variable = 0;
        $personas = Personas::orderBy('ID')->get();
        foreach($personas as $persona)
        {
            $tipos[$variable] = array(
                'ID' => trim($persona->ID),
                'NOMBRES' => trim($persona->NOMBRES),
                'APELLIDO' => trim($persona->APELLIDO),
                'EMAIL' => trim($persona->EMAIL),
                'TELEFONO' => trim($persona->TELEFONO),
                'USUARIO' => trim($persona->USUARIO),
                'IDENTIFICACION' => trim($persona->IDENTIFICACION)
            );
            $variable++;
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
                'message' => 'No existen registros'
            );
        }

        return response()->json($data, $data['code']);
    }

          


//Funcion con sql con condicion
public function personasParametros($Id){
        $variable =0;
        //$personas= TIPOSEVENTOS::orderBy('ID')->get();
        $personas = Personas::where(
                     [ 
                         ['ID',$Id]
                     ])->get();
 foreach($personas as $evento)
                {
         $tipos[$variable] = array(     
            'ID' => trim($evento->ID),
            'NOMBRES' => trim($evento->NOMBRES),
            'APELLIDO' => trim($evento->APELLIDO),
            'EMAIL' => trim($evento->EMAIL),
            'TELEFONO' => trim($evento->TELEFONO),
            'USUARIO' => trim($evento->USUARIO),
            'IDENTIFICACION' => trim($evento->IDENTIFICACION)
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
public function nuevaPersona(Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);//esto me devuelve un objeto
        $params_array = json_decode($json,true);//esto em devuelve un array

        
        //limpiar los datos siempre y cuando el array no sea vacio
        if(!empty($params) ){

        //Limpiar el array de espacios
        $params_array = array_map('trim', $params_array);
        
     
        //Validar los datos
        $validate = \Validator::make($params_array, [
        'ID'=>'required'//Comprobar si el usuario existe con unique
        
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
             
        //Crear Tipospersonas
    $personas = new Personas();
    $personas->ID = $params_array['ID'];
    $personas->NOMBRES = strtoupper($params_array['NOMBRES']);
    $personas->APELLIDO = strtoupper($params_array['APELLIDO']);
    $personas->EMAIL = $params_array['EMAIL'];
    $personas->TELEFONO = $params_array['TELEFONO'];
    $personas->USUARIO = $params_array['USUARIO'];
    $personas->IDENTIFICACION = $params_array['IDENTIFICACION'];
    
//Guardar el evento
  $personas->save();
    
  //enviar la respuesta
          $data = array(
          'status'=>'succes',
          'code'=>200, 
          'message'=>'La Persona se ha creado correctamente'
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
public function eliminarpersonas($id,Request $request)
    {
     //comseguir el post
     $personas= Personas::find($id);
     
     if(!empty($personas))
        {
     //borrarlo
     $personas->delete();
     //devolver
     
     $data = array(
          'status'=>'success',
          'code'=>200, 
          'message'=>$personas
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
