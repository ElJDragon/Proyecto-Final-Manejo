<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CURSOS extends Model
{  
 //Nombre de la tabla de la base de datos
protected $table='TCURSOS';
    protected $fillable = [
        'SECUENCIALCURSO',
        'TIPOEVENTO',
        'HORAS',
        'CALIFICACION',
        'CODIGOCARRERA',
        'IMAGEN',
        'NOMBRECURSO',
        'CATEGORIA'

    ];
protected $primaryKey ='SECUENCIALCURSO';
 public $keyType = 'string';
   public $incrementing = true; 
   public $timestamps = false;
   //fUNCION RELACION TABLAS UNO A MUCHOS
public function CURSOUSUARIO()
   {//una a muchos
       return $this->hasMany('App\Models\CURSOUSUARIO');
   }

 public function CARRERA()
   { 
       //de muchos a uno
          return $this->belongsTo('App\Models\CARRERA', 'CODIGOCARRERA');
   }

    public function PARAMETROS()
   {//una a muchos
       return $this->hasMany('App\Models\PARAMETROS');
   }
}
