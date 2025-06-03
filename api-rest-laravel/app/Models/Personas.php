<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personas extends Model
{
    //Nombre de la tabla de la base de datos
protected $table='TPERSONAS';
    protected $fillable = [
        'ID',
        'NOMBRES',
        'APELLIDOS',
        'EMAIL',
        'TELEFONO',
        'USUARIO',
        'IDENTIFICACION'
    ];
protected $primaryKey ='ID';
 public $keyType = 'string';
   public $incrementing = true; 
   public $timestamps = false;


}
