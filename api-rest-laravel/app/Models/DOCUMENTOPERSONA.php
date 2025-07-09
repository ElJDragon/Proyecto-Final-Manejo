<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DOCUMENTOPERSONA extends Model
{
   
   
    //Nombre de la tabla de la base de datos
protected $table='TDOCUMENTOSPERSONA';
    protected $fillable = [
        'CODIGO',
        'TIPODOCUMENTO',
        'ADJUNTO',
        'FORMATO',
        'PERSONA'
    ];
protected $primaryKey ='CODIGO';
 public $keyType = 'string';
   public $incrementing = true; 
   public $timestamps = false;
}