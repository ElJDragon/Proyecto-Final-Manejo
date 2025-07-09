<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CARRERA;
use App\Models\CURSOS;
use App\Models\CURSOUSUARIO;
use App\Models\PARAMETROS;
use App\Models\MISIONVISION;
use App\Models\Personas;
use App\Models\TIPOSEVENTOS;
use App\Models\User;

class CMisionVision extends Controller
{

	 //Funcion que consulta la Tabla Tipos personas y devuelve todos los registros.
    public function consultarMision(){
        $variable = 0;
        $personas = MISIONVISION::orderBy('CODIGO')->get();
        foreach($personas as $persona)
        {
            $tipos[$variable] = array(
                
                'CODIGO' => trim($persona->CODIGO),
                'MISION' => trim($persona->MISION),
                'VISION' => trim($persona->VISION)
                
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


 // Funcon para actualizar Regisro de la tabla Ttipospersonas
public function updateMision($id,Request $request){


                 //ACTUALIZAR EL USUARIO
             //recoger los datos por post
         $json =$request->input('json',null);
        $params_array = json_decode($json,true);//esto me devuelve un array
        
        
         if(!empty($params_array))
         {
//validar los datos
 $validate = \Validator::make($params_array, [
        'MISION'=>'required'//Comprobar si el usuario existe con uniqu    
    ]);     
         //QUITAR LO QUE NO QUIERO ACTUALIZAR 
         unset($params_array['CODIGO']);
         
             
             //actualizar el usuario en la bbd
             $evento_update =  MISIONVISION::where('CODIGO',$id)->update($params_array);
             
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
          'message'=>'La Mision no ha sido actualizada');
         }
         return response()->json($data,$data['code']);
     }

}