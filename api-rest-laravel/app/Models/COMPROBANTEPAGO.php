<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class COMPROBANTEPAGO extends Model
{
   
   
    //Nombre de la tabla de la base de datos
protected $table='TCOMPROBANTEPAGO';
    protected $fillable = [
        'CODIGO',
        'PERSONA',
        'EVENTO',
        'ADJUNTO'
    ];
protected $primaryKey ='CODIGO';
 public $keyType = 'string';
   public $incrementing = true; 
   public $timestamps = false;
}
