<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MISIONVISION extends Model
{
   
   
    //Nombre de la tabla de la base de datos
protected $table='TMISIONVISION';
    protected $fillable = [
        'CODIGO',
        'MISION',
        'VISION'
    ];
protected $primaryKey ='CODIGO';
 public $keyType = 'string';
   public $incrementing = true; 
   public $timestamps = false;
}
