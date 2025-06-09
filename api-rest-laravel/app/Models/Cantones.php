<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cantones extends Model
{
protected $table='TCANTONES';
    protected $fillable = [
        'CODIGO',
        'NOMBRE',
        'COD_PROVINCIA'
    ];
protected $primaryKey ='CODIGO';
public $keyType = 'string';
public $incrementing = false; 
public $timestamps = false;


          public function fprovincias()
   { 
       //de muchos a uno
          return $this->belongsTo('App\Models\Provincias', 'COD_PROVINCIA');
   }

}
