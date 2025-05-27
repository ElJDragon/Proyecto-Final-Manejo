<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CARRERA extends Model
{
//Nombre de la tabla de la base de datos
protected $table='TCARRERAS';
    protected $fillable = [
        'CODIGOCARRERA',
        'NOMBRE',
        'OBSERVACION'

    ];
protected $primaryKey ='CODIGOCARRERA';
 public $keyType = 'string';
   public $incrementing = true; 
   public $timestamps = false;

   public function CURSOS()
   {//una a muchos
       return $this->hasMany('App\Models\CURSOS');
}
}
