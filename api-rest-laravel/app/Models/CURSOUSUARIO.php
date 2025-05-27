<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CURSOUSUARIO extends Model
{

    //Nombre de la tabla de la base de datos
protected $table='TCURSOSUSUARIO';
    protected $fillable = [
        'CODIGO',
        'USUARIO',
        'CURSO',
        'CALIFICACION',
        'ASISTENCIA',
        'FECHA'

    ];
protected $primaryKey ='CODIGO';
 public $keyType = 'string';
   public $incrementing = true; 
   public $timestamps = false;
   // Funcion muchos a uno
   public function CURSOS()
   { 
       //de muchos a uno
          return $this->belongsTo('App\Models\CURSOS', 'CURSO');
   }
}
