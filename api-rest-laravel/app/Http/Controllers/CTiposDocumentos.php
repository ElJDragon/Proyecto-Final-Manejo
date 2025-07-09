<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CARRERA;
use App\Models\CURSOS;
use App\Models\CURSOUSUARIO;
use App\Models\PARAMETROS;
use App\Models\Personas;
use App\Models\TIPOSEVENTOS;
use App\Models\TIPOSDOCUMENTOS;
use App\Models\EVENTODOCUMENTO;
use App\Models\DOCUMENTOPERSONA;
use App\Models\COMPROBANTEPAGO;


use App\Models\User;

class CTiposDocumentos extends Controller
{
    //Funcion que consulta la Tabla Tipos eventos y devuelve todos los registros.
    public function consultarDocumentos(){
        $variable =0;
        $eventos= TIPOSDOCUMENTOS::orderBy('CODIGO')->get();
 foreach($eventos as $evento)
                {
         $tipos[$variable] = array(     
             'CODIGO'=>trim($evento->CODIGO),
              'NOMBRE'=>trim($evento->NOMBRE),
              'FORMATO'=>trim($evento->FORMATO)
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

 //Funcion que consulta la Tabla Tipos eventos y devuelve todos los registros.
    public function tiposdocumentoAdj($persona){
        $variable =0;
        $eventos = TIPOSDOCUMENTOS::where('NOMBRE', '!=', 'COMPROBANTE DE PAGO')
            ->orderBy('CODIGO')
            ->get();

 foreach($eventos as $evento)
                {

        $personas = DOCUMENTOPERSONA::where(
                     [ 
                         ['PERSONA',$persona],
                         ['TIPODOCUMENTO',$evento->CODIGO],
                     ])->get();

if ($personas->isNotEmpty()) {
    $resultado = 1;
} else {
    $resultado = 0;
}



         $tipos[$variable] = array(     
             'CODIGO'=>trim($evento->CODIGO),
              'NOMBRE'=>trim($evento->NOMBRE),
              'FORMATO'=>trim($evento->FORMATO),
              'ADJUNTO'=>$resultado
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



 //Funcion que consulta la Tabla Tipos eventos y devuelve todos los registros.
    public function tiposdocumentoAdjP($persona){
        $variable =0;
        $eventos = TIPOSDOCUMENTOS::where('NOMBRE', '!=', 'COMPROBANTE DE PAGO')
            ->orderBy('CODIGO')
            ->get();

 foreach($eventos as $evento)
                {

        $personas = DOCUMENTOPERSONA::where(
                     [ 
                         ['PERSONA',$persona],
                         ['TIPODOCUMENTO',$evento->CODIGO],
                     ])->get();

if ($personas->isNotEmpty()) {
    $resultado = 1;
} else {
    $resultado = 0;
}



         $tipos[$variable] = array(     
             'CODIGO'=>trim($evento->CODIGO),
              'NOMBRE'=>trim($evento->NOMBRE),
              'FORMATO'=>trim($evento->FORMATO),
              'ADJUNTO'=>$resultado
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
public function documentosParametros($codigo_evento){
        $variable =0;
        //$eventos= TIPOSEVENTOS::orderBy('CODIGO_EVENTO')->get();
        $eventos = TIPOSDOCUMENTOS::where(
                     [ 
                         ['CODIGO',$codigo_evento]
                     ])->get();
 foreach($eventos as $evento)
                {
         $tipos[$variable] = array(     
             'CODIGO'=>trim($evento->CODIGO),
              'NOMBRE'=>trim($evento->NOMBRE),
              'FORMATO'=>trim($evento->FORMATO)
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
public function documentosLike($codigo_evento){
        $variable =0;
        //$eventos= TIPOSEVENTOS::orderBy('CODIGO_EVENTO')->get();
        $eventos = TIPOSDOCUMENTOS::where(
                     [ 
                         ['NOMBRE','like','%'.$codigo_evento.'%']
                     ])->get();
 foreach($eventos as $evento)
                {
         $tipos[$variable] = array(     
             'CODIGO'=>trim($evento->CODIGO),
              'NOMBRE'=>trim($evento->NOMBRE),
              'FORMATO'=>trim($evento->FORMATO)
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
public function documentosPP($parametro,$persona,$curso){
        $variable =0;
        $eventos= TIPOSDOCUMENTOS::orderBy('CODIGO')->get();
        //$eventos = TIPOSDOCUMENTOS::where(
        //             [ 
        //                 ['CODIGO',$parametro]
        //             ])->get();
 $cumpletodos=1;
 foreach($eventos as $evento)
                {

  $esrequerido = EVENTODOCUMENTO::where(
                     [ 
                         ['EVENTO',$parametro],
                         ['DOCUMENTO',$evento->CODIGO]
                     ])->get();
if ($esrequerido->isNotEmpty()) {
    $resultado = 1;
} else {
    $resultado = 0;
}


  $tienepersona = DOCUMENTOPERSONA::where(
                     [ 
                         ['PERSONA',$persona],
                         ['TIPODOCUMENTO',$evento->CODIGO]
                     ])->get();

if ($tienepersona->isNotEmpty()) {
    $tiene = 1;
} else {
    $cumpletodos=0;
    $tiene = 0;
}

  $tienepago = COMPROBANTEPAGO::where(
                     [ 
                         ['PERSONA',$persona],
                         ['EVENTO',$curso]
                     ])->get();
if ($tienepago->isNotEmpty()) {
    $pagado = 1;
} else {
    $pagado = 0;
}

  $usuarios = Personas::where(
                     [ 
                         ['ID',$persona]
                     ])->get();

 foreach($usuarios as $usuario)
                {
$usuarioper=trim($usuario->USUARIO);
                }



  $registrados = CURSOUSUARIO::where(
                     [ 
                         ['USUARIO',$usuarioper],
                         ['CURSO',$curso]
                     ])->get();
  $estadoregistro='no';
  $certificado='0';
 foreach($registrados as $registrado)
                {
$estadoregistro=trim($registrado->ESTADO);
$certificado=trim($registrado->ASISTENCIA);
                }

$estadore='';
if($estadoregistro=='0')
{
$estadore='PENDIENTE';
}
if($estadoregistro=='1')
{
$estadore='REGISTRADO';
}

         $tipos[$variable] = array(     
             'CODIGO'=>trim($evento->CODIGO),
              'NOMBRE'=>trim($evento->NOMBRE),
              'FORMATO'=>trim($evento->FORMATO),
              'REQUERIDO'=>$resultado,
              'SITIENE'=>$tiene,
              'PAGADO'=>$pagado,
              'CUMPLETODOS'=>$cumpletodos,
              'REGISTRO'=>$estadoregistro,
              'ESTADO'=>$estadore,
              'CERTIFICADO'=>$certificado
              

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


public function documentosP($parametro){
        $variable =0;
        $eventos= TIPOSDOCUMENTOS::orderBy('CODIGO')->get();
        //$eventos = TIPOSDOCUMENTOS::where(
        //             [ 
        //                 ['CODIGO',$parametro]
        //             ])->get();
 foreach($eventos as $evento)
                {

  $esrequerido = EVENTODOCUMENTO::where(
                     [ 
                         ['EVENTO',$parametro],
                         ['DOCUMENTO',$evento->CODIGO]
                     ])->get();
if ($esrequerido->isNotEmpty()) {
    $resultado = 1;
} else {
    $resultado = 0;
}


         $tipos[$variable] = array(     
             'CODIGO'=>trim($evento->CODIGO),
              'NOMBRE'=>trim($evento->NOMBRE),
              'FORMATO'=>trim($evento->FORMATO),
              'REQUERIDO'=>$resultado
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
public function nuevoDocumento(Request $request){
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
    $tiposdocumentos=new TIPOSDOCUMENTOS();
    $tiposdocumentos->NOMBRE= strtoupper($params_array['NOMBRE']);
    $tiposdocumentos->FORMATO= strtoupper($params_array['FORMATO']);
    
//Guardar el evento
  $tiposdocumentos->save();
    
  //enviar la respuesta
          $data = array(
          'status'=>'succes',
          'code'=>200, 
          'message'=>'El documento se ha creado correctamente'
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



//Funcion con sql PAReA INSERTAR
public function nuevoAdjunto(Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);//esto em devuelve un objeto
        $params_array = json_decode($json,true);//esto em devuelve un array

        
        //limpiar los datos siempre y cuando el array no sea vacio
        if(!empty($params) ){

        //Limpiar el array de espacios
        $params_array = array_map('trim', $params_array);
        
     
        //Validar los datos
        $validate = \Validator::make($params_array, [
        'TIPODOCUMENTO'=>'required'//Comprobar si el usuario existe con unique
        
    ]);
    if($validate->fails()){
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'Variable TIPODOCUMENTO es requerido',
          'error'=>$validate->errors()
        );
    }else
    {
             
        //Crear TiposEventos
    $documentos=new DOCUMENTOPERSONA();
    $documentos->TIPODOCUMENTO= strtoupper($params_array['TIPODOCUMENTO']);
    $documentos->ADJUNTO= strtoupper($params_array['ADJUNTO']);
     $documentos->FORMATO= strtoupper($params_array['FORMATO']);
     $documentos->PERSONA= strtoupper($params_array['PERSONA']);
    


        if($documentos->save())
    {


 $id_ASIGNADO = $documentos->CODIGO;

$data = array(
    'status' => 'success',
    'code' => 200, 
    'message' => 'El documento se ha creado correctamente: ' . $id_ASIGNADO,
    'ASIGNADO' => $id_ASIGNADO
);

}
else
        {
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'Los datos enviados no son correctos'
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

//Funcion con sql PAReA INSERTAR
public function nuevoPago(Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);//esto em devuelve un objeto
        $params_array = json_decode($json,true);//esto em devuelve un array

        
        //limpiar los datos siempre y cuando el array no sea vacio
        if(!empty($params) ){

        //Limpiar el array de espacios
        $params_array = array_map('trim', $params_array);
        
     
        //Validar los datos
        $validate = \Validator::make($params_array, [
        'PERSONA'=>'required'//Comprobar si el usuario existe con unique
        
    ]);
    if($validate->fails()){
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'Variable PERSONA es requerido',
          'error'=>$validate->errors()
        );
    }else
    {
             
        //Crear TiposEventos
    $documentos=new COMPROBANTEPAGO();
    $documentos->PERSONA= strtoupper($params_array['PERSONA']);
    $documentos->EVENTO= strtoupper($params_array['EVENTO']);

    


        if($documentos->save())
    {


 $id_ASIGNADO = $documentos->CODIGO;

$data = array(
    'status' => 'success',
    'code' => 200, 
    'message' => 'El documento se ha creado correctamente: ' . $id_ASIGNADO,
    'ASIGNADO' => $id_ASIGNADO
);

}
else
        {
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'Los datos enviados no son correctos'
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


    //Funcion con sql PAReA INSERTAR
public function nuevoEveDocumento(Request $request){
        $json = $request->input('json',null);
        $params = json_decode($json);//esto em devuelve un objeto
        $params_array = json_decode($json,true);//esto em devuelve un array

        
        //limpiar los datos siempre y cuando el array no sea vacio
        if(!empty($params) ){

        //Limpiar el array de espacios
        $params_array = array_map('trim', $params_array);
        
     
        //Validar los datos
        $validate = \Validator::make($params_array, [
        'EVENTO'=>'required'//Comprobar si el usuario existe con unique
        
    ]);
    if($validate->fails()){
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'Variable EVENTO es requerido',
          'error'=>$validate->errors()
        );
    }else
    {
             
        //Crear TiposEventos
    $tiposdocumentos=new EVENTODOCUMENTO();
    $tiposdocumentos->EVENTO= strtoupper($params_array['EVENTO']);
    $tiposdocumentos->DOCUMENTO= strtoupper($params_array['DOCUMENTO']);
    
//Guardar el evento
  $tiposdocumentos->save();
    
  //enviar la respuesta
          $data = array(
          'status'=>'succes',
          'code'=>200, 
          'message'=>'El documento se ha creado correctamente'
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
public function eliminarDocumento($id,Request $request)
    {
     //comseguir el post
     $tiposEventos= TIPOSDOCUMENTOS::find($id);
     
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


// Funcion para eliminar registro por el nombre
public function eliminarEveDoc($evento,$documento,Request $request)
    {
     
     $registro = EVENTODOCUMENTO::where('EVENTO', $evento)
                ->where('DOCUMENTO', $documento)
                ->first();
     
     if (!empty($registro)) {
        // Borrar el registro
        $registro->delete();
     //devolver
     
     $data = array(
          'status'=>'success',
          'code'=>200, 
          'message'=>$registro
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



// Funcion para eliminar registro por el nombre
public function eliminaadjuntos($documento,$persona, Request $request)
    {
     
     $registro = DOCUMENTOPERSONA::where('PERSONA', $persona)
                ->where('TIPODOCUMENTO', $documento)
                ->first();
     
     if (!empty($registro)) {
        // Borrar el registro
        $registro->delete();
     //devolver
     
     $data = array(
          'status'=>'success',
          'code'=>200, 
          'message'=>$registro
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
public function updateDocumentos($id,Request $request){


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
         unset($params_array['CODIGO']);

             
             //actualizar el usuario en la bbd
             $evento_update =  TIPOSDOCUMENTOS::where('CODIGO',$id)->update($params_array);
             
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
          'message'=>'El Documento no ha sido actualizado');
         }
         return response()->json($data,$data['code']);
     }
}