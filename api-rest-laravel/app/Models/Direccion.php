<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Direccion extends Model
{
protected $table='TPERSONADIRECCION';
    protected $fillable = [
        'ID',
        'CODIGO'
    ];
protected $primaryKey ='ID';
public $keyType = 'string';
public $incrementing = false; 
public $timestamps = false;


          public function fdireccion()
   { 
       //de muchos a uno
          return $this->belongsTo('App\Models\Cantones', 'CODIGO');
   }
}
