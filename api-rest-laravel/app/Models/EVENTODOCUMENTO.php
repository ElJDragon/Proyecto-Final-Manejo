<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EVENTODOCUMENTO extends Model
{
   
   
    //Nombre de la tabla de la base de datos
protected $table='TEVENTOSDOCUMENTOS';
    protected $fillable = [
        'CODIGO',
        'EVENTO',
        'DOCUMENTO'
    ];
protected $primaryKey ='CODIGO';
 public $keyType = 'string';
   public $incrementing = true; 
   public $timestamps = false;
}
