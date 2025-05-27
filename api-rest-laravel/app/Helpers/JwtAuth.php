<?php
namespace App\Helpers;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\Models\User;


class JwtAuth{
    
    public $key;
    public function __construct()
    {
      $this->key='esto_es_una_clave8989';
    }

    public function sigup($email,$password, $getToken=null){
        //Buscar si existe un usuario
       $user= User::where([
           'Email' => $email,
           'Password' => $password,
       ])->first();
    //Comprobar si son coreectas
    $sigup = false;
    if(is_object($user))
    {
        $sigup = true;
    }
    //Generar el token del usuario identificado
    if($sigup)
    {
        $token = array(
        'sub' => $user->id,
        'email' => $user->Email,
        'name' => $user->Nombre,
        'iat' => time(),    
        'exp' => time()+(7*24*60*60)    
        );
        $jwt=  JWT::encode($token, $this->key,'HS256');
        $decode=  JWT::decode($jwt, $this->key,['HS256']);
        
        //Devolver decodificado el token
        if(is_null($getToken))
        {
         $data=   $jwt; 
        }
        else
        {
            $data=   $decode; 
        }
    }else
    {
           $data = array(
          'status'=>'error',
          'code'=>404, 
          'message'=>'Loggin Incorrecto'
        ); 
    }
    
    //Devolver los datos o el token
    return $data;
    }
    
    public function checkToken($jwt,$getIdentity=false)
    {
     $auth=false;
     try {
         $jwt= str_replace('"', '', $jwt);
        $decode=  JWT::decode($jwt, $this->key,['HS256']);
         
     } catch (\UnexpectedValueException $e) {
        $auth=false; 
     }
     catch (\DomainException $e) {
        $auth=false; 
     }
     if(!empty($decode) && is_object($decode) && isset($decode->sub))
     {
         $auth=true; 
     }else
     {
         $auth=false; 
     }
     
     if($getIdentity)
     {
        return $decode; 
     }
     return $auth;
    }
}
