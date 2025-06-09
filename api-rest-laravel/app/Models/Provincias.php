<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Provincias extends Model
{
protected $table='TPROVINCIAS';
    protected $fillable = [
        'COD_PROVINCIA',
        'NOMBRE'
    ];
protected $primaryKey ='COD_PROVINCIA';
public $keyType = 'string';
public $incrementing = true; 
public $timestamps = false;


       public function fresponsables()
   {//una a muchos
       return $this->hasMany('App\Models\Cantones');
   }


}
