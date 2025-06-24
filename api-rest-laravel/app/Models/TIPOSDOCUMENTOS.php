<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TIPOSDOCUMENTOS extends Model
{
   
   
    //Nombre de la tabla de la base de datos
protected $table='TTIPOSDOCUMENTOS';
    protected $fillable = [
        'CODIGO',
        'NOMBRE',
        'FORMATO'
    ];
protected $primaryKey ='CODIGO';
 public $keyType = 'string';
   public $incrementing = true; 
   public $timestamps = false;
}
