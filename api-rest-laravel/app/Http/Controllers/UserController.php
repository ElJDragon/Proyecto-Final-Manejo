<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
//usar el modelo de usuario
use App\Models\User;
use App\Models\Personas;
use App\Helpers\JwtAuth;
use Illuminate\Http\Response;
class UserController extends Controller
{


public function updatepwd(Request $request){
         //COMPROBAR QUE EL USUARIO ESTE IDENTIFICADO
         $token = $request->header('Authorization');
         $jwtAuth = new \JwtAuth();
         $checkToken= $jwtAuth->checkToken($token);
         //ACTUALIZAR EL USUARIO
             //recoger los datos por post
         $json =$request->input('json',null);
        $params_array = json_decode($json,true);//esto em devuelve un array
        
         if($checkToken && !empty($params_array))
         {
             
        
        //sacar el id del usuario identificado
       $user= $checkToken= $jwtAuth->checkToken($token,true);

//validar los datos
 $validate = \Validator::make($params_array, [
        'id'=>'required',
        'Password'=>'required',
        'Password1'=>'required',
        'Password2'=>'required',
    ]);     

    if($validate->fails()){
           $data = array(
          'status'=>'errorcampos',
          'code'=>404, 
          'message'=>'campos requeridos no ingresados'
        );
    }else
    {
             
            $pwd= hash('sha256',$params_array['Password']);
             $contraseñas = User::where(
                     [ 
                         ['Password',$pwd]
                     ])->get();
 if ($contraseñas->count() > 0) {
                    
                    $pwdnueva= hash('sha256',$params_array['Password1']);

                     $pwd_update = User::where('Password',$pwd)->update(['Password'=>$pwdnueva]);

             //devolver array con el resultado
             $data = array(
          'status'=>'success',
          'code'=>200, 
          'user'=>$user,
          'change'=>$params_array           );

}
else
{
        $data = array(
          'status'=>'ERRORPWD',
          'code'=>200, 
          'user'=>$user,
          'change'=>$params_array           );


}


}

         }else
         {
            $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'El usuario no esta identificado');
         }
         return response()->json($data,$data['code']);
     }
     


    //METODO DE REGISTRO DE USUARIO
    public function register(Request $request){
    

        $json = $request->input('json',null);
        $params = json_decode($json);//esto em devuelve un objeto
        $params_array = json_decode($json,true);//esto em devuelve un array
        
        //limpiar los datos siempre y cuando el array no sea vacio
        if(!empty($params) && !empty($params_array)){

        //Limpiar el array de espacios
        $params_array = array_map('trim', $params_array);
    


$validate = \Validator::make($params_array, [
    'Nombre' => 'required',
    'Email' => 'required|email|unique:Tusuarios',
    'Password' => 'required'
]);

if ($validate->fails()) {
    // Obtén los errores de validación
    $errors = $validate->errors();
    
    // Verifica si el error es por el campo Email
    if ($errors->has('Email')) {
        $data = array(
            'status' => 'erroremail',
            'code' => 409, // Usualmente 409 es para conflictos como "conflicto de recursos"
            'message' => 'email'
        );
    } elseif ($errors->has('Nombre') || $errors->has('Password')) {
        // Verifica si el error es por el campo Nombre o Password
        $data = array(
            'status' => 'errorcampos',
            'code' => 404,
            'message' => 'errorcampos'
        );
    } else {
        // Caso general, en caso de que haya otros errores
        $data = array(
            'status' => 'errorcampos',
            'code' => 400, // Código general para errores de cliente
            'message' => 'errorcampos'
        );
    }
}
else
    {

        

        //Cifrar la contraseña
        //$pwd= password_hash($params->Password, PASSWORD_BCRYPT,['cost'=>4]);        
        $pwd= hash('sha256',$params->Password);        
        //Crear el usuario
        $user=new User();
    $user->Nombre= $params_array['Nombre'];
    $user->Email= $params_array['Email'];
    $user->role= $params_array['role'];
    $user->Password= $pwd;
//Guardar el Usuario


  if ($user->save()) {
    // Se guardó correctamente
    //escoger la secuencia
$secuenciagenerada='';
             $usuarios = User::where(
                     [ 
                         ['Email',$params_array['Email']]
                     ])->get();
     foreach($usuarios as $usuario)
                {
                    $secuenciagenerada=$usuario->id;
                }
    //INSERTAR PERSONA USUARIO
    $responsable=new Personas();
    $responsable->EMAIL= $params_array['Email'];
    $responsable->USUARIO= $secuenciagenerada;
if ($responsable->save()) {

    //enviar la respuesta
          $data = array(
          'status'=>'succes',
          'code'=>200, 
          'message'=>'El usuario se ha creado correctamente'
        );
}
else
{
$user = User::find($secuenciagenerada); // Encuentra al usuario con id 1
$user->delete();

$data = array(
          'status'=>'errorcampos',
          'code'=>404, 
          'message'=>'error al guardar resonsable');
}
}
  
                     else {
          $data = array(
          'status'=>'errorcampos',
          'code'=>404, 
          'message'=>'error al guardar usuario');
                            }

    }
    

        }else
        {
           $data = array(
          'status'=>'errorcampos',
          'code'=>404, 
          'message'=>'campos requeridos no ingresados'
        );  
        }
         //devolver la respuesta en JSON por que cuando yo hago una apirest debo devolver siempre en json
        return response()->json($data,$data['code']);
    }


public function login(Request $request){
       
        $jwtAuth= new JwtAuth();
        
        //rescibirlos datos por post
        $json =$request->input('json',null);
        $params = json_decode($json);//esto em devuelve un objeto
        $params_array = json_decode($json,true);//esto em devuelve un array
        //Validar los datos
        $validate = \Validator::make($params_array, [
        'Email'=>'required|email',
        'Password'=>'required'
    ]);


        
            if($validate->fails()){
           $signup = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'El usuario no se ha podido identificar',
          'error'=>$validate->errors()
        );
    }else
    {
        

        //Cifrar la contraseña
        $pwd= hash('sha256',$params->Password);        

        //Dvolver el tokem
       $signup = $jwtAuth->sigup($params->Email,$pwd);
       if(!empty($params->gettoken)){
           $signup = $jwtAuth->sigup($params->Email,$pwd,true);
       }
    }

        //esto devuelve el token
       // return $jwtAuth->sigup($email,$pwd);
  
        //esto devuelve el array con la informacion del usuario logeado
        //{"sub":3,"email":"edul_aldas@hotmail.com ","name":"Eduardo ","iat":1689723802,"exp":1690328602}



        return response()->json($signup,200);
    }
    



public function update(Request $request){
         //COMPROBAR QUE EL USUARIO ESTE IDENTIFICADO
         $token = $request->header('Authorization');
         $jwtAuth = new \JwtAuth();
         $checkToken= $jwtAuth->checkToken($token);
         //ACTUALIZAR EL USUARIO
             //recoger los datos por post
         $json =$request->input('json',null);
        $params_array = json_decode($json,true);//esto em devuelve un array
        
         if($checkToken && !empty($params_array))
         {
             
        
        //sacar el id del usuario identificado
       $user= $checkToken= $jwtAuth->checkToken($token,true);

//validar los datos
 $validate = \Validator::make($params_array, [
        'Nombre'=>'required|alpha',//Comprobar si el usuario existe con unique
        'Email'=>'required|email|unique:Tusuarios,'.$user->sub
    ]);     
             //quitar los datos que no quiero actualizar
             unset($params_array['id']);
             unset($params_array['role']);
             unset($params_array['Password']);
             unset($params_array['created_at']);
             unset($params_array['remenber_token']);
             
             
             //actualizar el usuario en la bbd
             $user_update =  User::where('id',$user->sub)->update($params_array);
             
             //devolver array con el resultado
             $data = array(
          'status'=>'success',
          'code'=>200, 
          'user'=>$user,
          'change'=>$params_array           );
         }else
         {
            $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'El usuario no esta identificado');
         }
         return response()->json($data,$data['code']);
     }
     
     
     public function updateRol($id,Request $request){


                 //ACTUALIZAR EL USUARIO
             //recoger los datos por post
         $json =$request->input('json',null);
        $params_array = json_decode($json,true);//esto em devuelve un array
        
        
         if(!empty($params_array))
         {
//validar los datos
 $validate = \Validator::make($params_array, [
        'id'=>'required',//Comprobar si el usuario existe con unique
        'role'=>'require'
    ]);     
         //QUITAR LO QUE NO QUIERO ACTUALIZAR 
         unset($params_array['id']);
         unset($params_array['Nombre']);
         unset($params_array['Email']);         
         unset($params_array['Password']);
         unset($params_array['image']);

             
             //actualizar el usuario en la bbd
             $limite_update =  User::where('id',$id)->update($params_array);
             
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
          'message'=>'El limite no ha sido actualizado');
         }
         return response()->json($data,$data['code']);
     }

     public function uploadimage(Request $request){
         //recoger los datos
         $image=$request->file('file0');
         //validar que si sea una imagen
         $validate = \Validator::make($request->all(),[
             'file0'=>'required|image|mimes:jpg,jpeg,png,gif'
         ]);
         
         //subir y guardar archivo en el storage
         if(!$image || $validate->fails())
             {
          $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'Error al subir imagen');   
         }else
         {
          $image_name=time().$image->getClientOriginalName();
          \Storage::disk('users')->put($image_name,\File::get($image));
          
          $data = array(
          'status'=>'success',
          'code'=>200, 
          'image'=> $image_name);
          
         }
         
       return response()->json($data,$data['code']);
     }
     
     public function getImage($filename)
     {
         $isset =\Storage::disk('users')->exists($filename);
         if($isset)
         {
         $file = \Storage::disk('users')->get($filename);
         return new  Response($file,200);
         }else
         {
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'La imagen no existe');  
         }
         return response()->json($data,$data['code']);
     }
     
     
     public function perfilUser($id)
     {
         $user =User::find($id);
         if(is_object($user))
         {

            $params_array = json_decode($user,true);
        //Limpiar el array de espacios
        $params_array = array_map('trim', $params_array);

           $data = array(
          'status'=>'success',
          'code'=>200, 
          'user'=>$params_array);  
         }
         else
         {
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'El usuario no existe');   
         }
         return response()->json($data,$data['code']);
     }

      public function AllUser()
     {


$integer =0;

         $user =User::All();
         if(is_object($user))
         {
                 foreach ($user as $data)
        {
         $usuarios[$integer] = array(
          'id'=>trim($data->id),
          'Nombre'=>trim($data->Nombre),
          'Email'=>trim($data->Email),
          'Password'=>trim($data->Password),
          'image'=>trim($data->image),
          'role'=>trim($data->role),
          'RolNuevo'=>''
        );
         $integer++;
        }

   
           $data = array(
          'status'=>'success',
          'code'=>200, 
          'user'=>$usuarios);  
         }
         else
         {
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'El usuario no existe');   
         }
         return response()->json($data,$data['code']);
     }


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//eliminar un responsable
 public function eliminaruser($id,Request $request)
    {
     //comseguir el post
     $responsables= User::find($id);
     
     if(!empty($responsables))
        {
     //borrarlo
     $responsables->delete();
     //devolver
     
     $data = array(
          'status'=>'success',
          'code'=>200, 
          'message'=>$responsables
        );
        }else
        {
            $data = array(
           'status'=>'success',
          'code'=>200, 
          'message'=>'No Existe el registro'
             );
        }
     return response()->json($data,$data['code']);
 }





          public function updateUsuario($id,Request $request){

         //ACTUALIZAR EL Usario
             //recoger los datos por post
         $json =$request->input('json',null);
        $params_array = json_decode($json,true);//esto em devuelve un array
        
        
         if(!empty($params_array))
         {
 


          unset($params_array['Password']);
         unset($params_array['Password2']);  
         unset($params_array['image']);  

         

             //actualizar el usuario en la bbd
             $limite_update =  User::where('id',$id)->update($params_array);
             
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
          'message'=>'El usuario no ha sido actualizado');
         }
         return response()->json($data,$data['code']);
     }




///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//sacar toos los Responsables de la bdd con filtros
    public function getAllUserFiltro($nombres){
        $parametronombre=strtoupper($nombres);
        
        $integer =0;
        $contador =0;
if($parametronombre!=0)
{
     $responsables = User::where(
                     [ 
                         ['Nombre','like','%'.$parametronombre.'%']
                     ])->orderBy('id')->get();
}


 foreach($responsables as $responsable)
                {
         $responsabless[$integer] = array(     
             'id'=>trim($responsable->id),
              'Nombre'=>trim($responsable->Nombre),
              'Email'=>trim($responsable->Email),
              'role'=>trim($responsable->role)
        );
         $integer++;
                }
if($integer>0)
{
$data = array(
          'status'=>'success',
          'code'=>200, 
          'user'=>$responsabless);
}else
{
$data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'No existen registros');
         }
         return response()->json($data,$data['code']);
                            }


                            ///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//sacar toos los Responsables de la bdd con filtros
    public function getUserid($codigo){
        $parametropersona=strtoupper($codigo);
        
        $integer =0;
        $contador =0;



     $usuarios = User::where(
                     [ 
                         ['id',$parametropersona]
                     ])->get();

 foreach($usuarios as $usuario)
                {
         $usuariosss[$integer] = array(     
              'role'=>trim($usuario->role)
        );
         $integer++;
     }
                
if($integer>0)
{
$data = array(
          'status'=>'success',
          'code'=>200, 
          'user'=>$usuariosss);
}else
{
$data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'No existen registros');
         }
         return response()->json($data,$data['code']);
                            }
}