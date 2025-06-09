<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use DateTime;

use App\Models\CURSOS;
use App\Models\Personas;
use App\Models\PARAMETROS;
use App\Models\CURSOUSUARIO;



use App\Helpers\JwtAuth;

class CursosController extends Controller
{
   ///////////////////////////////////////////////////
///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//CREACION DE NUEVOS RESPONSABLES
    public function nuevoCurso(Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);//esto em devuelve un objeto
        $params_array = json_decode($json,true);//esto em devuelve un array
        
        //limpiar los datos siempre y cuando el array no sea vacio
        if(!empty($params) && !empty($params_array)){

        //Limpiar el array de espacios
        $params_array = array_map('trim', $params_array);
        
 
        //Validar los datos
        $validate = \Validator::make($params_array, [
        'NOMBRECURSO'=>'required'//Comprobar si el usuario existe con unique

    ]);
    if($validate->fails()){
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'El curso no se ha creado',
          'error'=>$validate->errors()
        );
    }else
    {
             
        //Crear el Responsable
    $curso=new CURSOS();
    $curso->TIPOEVENTO= strtoupper($params_array['TIPOEVENTO']);
    $curso->CODIGOCARRERA= strtoupper($params_array['CODIGOCARRERA']);
    $curso->NOMBRECURSO= strtoupper($params_array['NOMBRECURSO']);
    $curso->ESTAACTIVO= strtoupper($params_array['ESTAACTIVO']);
    
    if($curso->save())
    {

        $id_generado = $curso->SECUENCIALCURSO; // `id` asume que es el nombre del campo ID


$update = CURSOS::where([
                         ['SECUENCIALCURSO',$id_generado],
])->update(['IMAGEN' => $id_generado]);




$data = array(
    'status' => 'success',
    'code' => 200, 
    'message' => 'El curso se ha creado correctamente con el ID: ' . $id_generado,
    'id' => $id_generado
);
    }
    else
    {
$data = array(
          'status'=>'error',
          'code'=>200, 
          'message'=>'Error al crear el curso'
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





public function nuevoParametro(Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);//esto em devuelve un objeto
        $params_array = json_decode($json,true);//esto em devuelve un array
        
        //limpiar los datos siempre y cuando el array no sea vacio
        if(!empty($params) && !empty($params_array)){

        //Limpiar el array de espacios
        $params_array = array_map('trim', $params_array);
        
 
        //Validar los datos
        $validate = \Validator::make($params_array, [
        'CURSO'=>'required'//Comprobar si el usuario existe con unique

    ]);
    if($validate->fails()){
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'Los parametros no se ha creado',
          'error'=>$validate->errors()
        );
    }else
    {
             
        //Crear el Responsable
    $parametro=new PARAMETROS();
    $parametro->CURSO= strtoupper($params_array['CURSO']);
    $parametro->ESPUBLICO= strtoupper($params_array['ESPUBLICO']);
    $parametro->ESPAGADO= strtoupper($params_array['ESPAGADO']);
    $parametro->VALOR= strtoupper($params_array['VALOR']);
    $parametro->HORAS= strtoupper($params_array['HORAS']);
    $parametro->CALIFICACION= strtoupper($params_array['CALIFICACION']);
    
    if($parametro->save())
    {


$data = array(
    'status' => 'success',
    'code' => 200, 
    'message' => 'Los parametros se ha creado correctamente'
);
    }
    else
    {
$data = array(
          'status'=>'error',
          'code'=>200, 
          'message'=>'Error al crear el curso'
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





public function getcursosadmin(){
        $integer =0;
$cursos = CURSOS::all();

$total = $cursos->count();


 foreach($cursos as $curso)
                {
        $enviarcursos[$integer] = array(     
    'SECUENCIALCURSO' => trim($curso->SECUENCIALCURSO),
    'TIPOEVENTO' => trim($curso->TIPOEVENTO),
    'ESTAACTIVO' => $curso->ESTAACTIVO == 1 ? 'ACTIVO' : 'INACTIVO',
'CODIGOCARRERA'=>trim($curso->CODIGOCARRERA),
'IMAGEN'=>trim($curso->IMAGEN),
'NOMBRECURSO'=>trim($curso->NOMBRECURSO),

//'DEPARTAMENTO'=>trim($curso->fdepartamentos->NOMBRE),
'TOTAL'=>$total

);

         $integer++;
                }
if($integer>0)
{
$data = array(
          'status'=>'success',
          'code'=>200, 
          'cursos'=>$enviarcursos,
          'id'=>1);
}else
{
$data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'No existen registros',
          'id'=>0
      );
         }
         return response()->json($data,$data['code']);
                            }



public function updatecurso($id,Request $request){

         //ACTUALIZAR EL Responsable
             //recoger los datos por post
         $json =$request->input('json',null);
        $params_array = json_decode($json,true);//esto em devuelve un array
        
        
         if(!empty($params_array))
         {
             unset($params_array['TIPOEVENTO']);
             unset($params_array['CODIGOCARRERA']);
             unset($params_array['IMAGEN']);
             unset($params_array['NOMBRECURSO']);
             //actualizar el usuario en la bbd
             $limite_update =  CURSOS::where('SECUENCIALCURSO',$id)->update($params_array);
             
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
          'message'=>'El evento no ha sido actualizado');
         }
         return response()->json($data,$data['code']);
     }



public function disponibles($usuario){
        $integer =0;
$cursos = CURSOS::where('ESTAACTIVO', '1')->get();



$total = $cursos->count();


 foreach($cursos as $curso)
                {

$parametros = PARAMETROS::where('CURSO', $curso->SECUENCIALCURSO)->get();

 foreach($parametros as $parametro)
                {


$estaregistrado = CURSOUSUARIO::where('CURSO', $curso->SECUENCIALCURSO)
                               ->where('USUARIO', $usuario)
                               ->get();
$registrado=0;
 foreach($estaregistrado as $estaregistrad)
                {
$registrado=1;
                }



        $enviarcursos[$integer] = array(     
    'SECUENCIALCURSO' => trim($curso->SECUENCIALCURSO),
    'TIPOEVENTO' => trim($curso->TIPOEVENTO),
    'NOMBREEVENTO' => trim($curso->EVENTO->NOMBRE),
    'ESTAACTIVO' => $curso->ESTAACTIVO == 1 ? 'ACTIVO' : 'INACTIVO',
'CODIGOCARRERA'=>trim($curso->CODIGOCARRERA),
'NOMBRECARRERA'=>trim($curso->CARRERA->NOMBRE),
'IMAGEN'=>trim($curso->IMAGEN),
'NOMBRECURSO'=>trim($curso->NOMBRECURSO),
'TOTAL'=>$total,
'ESPUBLICO' => $parametro->ESPUBLICO == 1 ? 'PUBLICO' : 'PRIVADO',
'ESPAGADO' => $parametro->ESPAGADO == 1 ? 'PAGADO' : 'GRATIS',
'HORAS'=>trim($parametro->HORAS),
'VALOR'=>trim($parametro->VALOR),
'REGISTRADO'=>trim($registrado)
);

         $integer++;
     }
                }
if($integer>0)
{
$data = array(
          'status'=>'success',
          'code'=>200, 
          'cursos'=>$enviarcursos,
          'id'=>1);
}else
{
$data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'No existen registros',
          'id'=>0
      );
         }
         return response()->json($data,$data['code']);
                            }


public function disponiblesp($nombre){
        $integer =0;
$cursos = CURSOS::where('ESTAACTIVO', '1')
                ->where('NOMBRECURSO', 'like', '%' . $nombre . '%')
                ->get();




$total = $cursos->count();


 foreach($cursos as $curso)
                {

$parametros = PARAMETROS::where('CURSO', $curso->SECUENCIALCURSO)->get();

 foreach($parametros as $parametro)
                {





        $enviarcursos[$integer] = array(     
    'SECUENCIALCURSO' => trim($curso->SECUENCIALCURSO),
    'TIPOEVENTO' => trim($curso->TIPOEVENTO),
    'NOMBREEVENTO' => trim($curso->EVENTO->NOMBRE),
    'ESTAACTIVO' => $curso->ESTAACTIVO == 1 ? 'ACTIVO' : 'INACTIVO',
'CODIGOCARRERA'=>trim($curso->CODIGOCARRERA),
'NOMBRECARRERA'=>trim($curso->CARRERA->NOMBRE),
'IMAGEN'=>trim($curso->IMAGEN),
'NOMBRECURSO'=>trim($curso->NOMBRECURSO),
'TOTAL'=>$total,
'ESPUBLICO' => $parametro->ESPUBLICO == 1 ? 'PUBLICO' : 'PRIVADO',
'ESPAGADO' => $parametro->ESPAGADO == 1 ? 'PAGADO' : 'GRATIS',
'HORAS'=>trim($parametro->HORAS),
'VALOR'=>trim($parametro->VALOR)
);

         $integer++;
     }
                }
if($integer>0)
{
$data = array(
          'status'=>'success',
          'code'=>200, 
          'cursos'=>$enviarcursos,
          'id'=>1);
}else
{
$data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'No existen registros',
          'id'=>0
      );
         }
         return response()->json($data,$data['code']);
                            }



public function registrados($curso){
        $integer =0;
$usuarios = CURSOUSUARIO::where('CURSO', $curso)->get();

 foreach($usuarios as $usuario)
                {

$cursos = CURSOS::where('SECUENCIALCURSO', $usuario->CURSO)->get();

 foreach($cursos as $curso)
                {



$personas = Personas::where('USUARIO', $usuario->USUARIO)->get();
$identificacion='';
$apellidos='';
$nombres='';
 foreach($personas as $persona)
                {

$identificacion=trim($persona->IDENTIFICACION);
$apellidos=trim($persona->APELLIDOS);
$nombres=trim($persona->NOMBRES);

                }

        $enviarcursos[$integer] = array(     
    'SECUENCIALCURSO' => trim($curso->SECUENCIALCURSO),
'NOMBRECURSO'=>trim($curso->NOMBRECURSO),
'USUARIO'=>trim($usuario->USUARIO),
'IDENTIFICACION'=>$identificacion,
'NOMBRES' => trim($apellidos . ' ' . $nombres),
'FECHA'=>trim($usuario->FECHA)
);

         $integer++;
     }
                }
if($integer>0)
{
$data = array(
          'status'=>'success',
          'code'=>200, 
          'cursos'=>$enviarcursos,
          'id'=>1);
}else
{
$data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'No existen registros',
          'id'=>0
      );
         }
         return response()->json($data,$data['code']);
                            }


public function nuevoRegistro(Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);//esto em devuelve un objeto
        $params_array = json_decode($json,true);//esto em devuelve un array
        
        //limpiar los datos siempre y cuando el array no sea vacio
        if(!empty($params) && !empty($params_array)){

        //Limpiar el array de espacios
        $params_array = array_map('trim', $params_array);
        
 
        //Validar los datos
        $validate = \Validator::make($params_array, [
        'USUARIO'=>'required'//Comprobar si el usuario existe con unique

    ]);
    if($validate->fails()){
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'Los parametros no se ha creado',
          'error'=>$validate->errors()
        );
    }else
    {
             
        //Crear el Responsable
    $parametro=new CURSOUSUARIO();
    $parametro->USUARIO= strtoupper($params_array['USUARIO']);
    $parametro->CURSO= strtoupper($params_array['CURSO']);
    $parametro->CALIFICACION = (int) $params_array['CALIFICACION'];
    $parametro->ASISTENCIA= strtoupper($params_array['ASISTENCIA']);
    $parametro->FECHA= strtoupper($params_array['FECHA']);
    
    
    if($parametro->save())
    {


$data = array(
    'status' => 'success',
    'code' => 200, 
    'message' => 'El registro se ha creado correctamente'
);
    }
    else
    {
$data = array(
          'status'=>'error',
          'code'=>200, 
          'message'=>'Error al crear el registro'
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
///BORRAR









}