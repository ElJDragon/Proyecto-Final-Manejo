<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PARAMETROS extends Model
{ 
    //Nombre de la tabla de la base de datos
protected $table='TPARAMETROSCURSO';
    protected $fillable = [
        'CODIGO',
        'CURSO',
        'ESPUBLICO',
        'ESPAGADO',
        'VALOR',
        'HORAS',
        'CALIFICACION'

    ];
protected $primaryKey ='CODIGO';
 public $keyType = 'string';
   public $incrementing = true; 
   public $timestamps = false;

  public function CURSOS()
   { 
       //de muchos a uno
          return $this->belongsTo('App\Models\CURSOS', 'CURSO');
   }
}
