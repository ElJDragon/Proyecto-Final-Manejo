<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TIPOSEVENTOS extends Model
{
   
   
    //Nombre de la tabla de la base de datos
protected $table='TTIPOSEVENTOS';
    protected $fillable = [
        'CODIGO_EVENTO',
        'NOMBRE',
        'DETALLE'
    ];
protected $primaryKey ='CODIGO_EVENTO';
 public $keyType = 'string';
   public $incrementing = true; 
   public $timestamps = false;
}
