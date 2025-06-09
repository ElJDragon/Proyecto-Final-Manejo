<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Gestionauditoria;
use App\Models\Gestionestrategias;
use App\Models\Gestionhallazgo;
use App\Models\Gestionrecomendaciones;
use App\Models\Responsables;

use App\Models\Periodos;

use App\Models\Estatus;

use App\Helpers\JwtAuth;    

use Illuminate\Support\Facades\Storage;

class FilesController extends Controller
{


public function upload($id, Request $request)
{
    if ($request->hasFile('file')) {
        $file = $request->file('file');

        // Obtener la extensión original del archivo
        $originalExtension = $file->getClientOriginalExtension();

        // Cambiar la extensión a JPG si no lo es ya
        $extension = $originalExtension == 'jpg' ? 'jpg' : 'jpg';
        
        // Cambiar el nombre del archivo
        $fileName = $id . $extension;

        // Guardar el archivo en la carpeta "public/inventario"
  $path = $file->storeAs('storage', $fileName, 'public');
   // $path = Storage::disk('local')->put('/public/inventario/' . $fileName, $file);



        // Generar la URL pública del archivo guardado
        $url = asset('storage/' . $fileName);

        return response()->json(['message' => 'Archivo subido correctamente', 'url' => $url]);
    } else {
        return response()->json(['message' => 'No se proporcionó ningún archivo'], 400);
    }
}

public function cursos($id, Request $request)
{
    if ($request->hasFile('file')) {
        $file = $request->file('file');

        // Obtener la extensión original del archivo
        $originalExtension = $file->getClientOriginalExtension();

        // Cambiar la extensión a JPG si no lo es ya
        $extension = $originalExtension == 'jpg' ? 'jpg' : 'jpg';
        
        // Cambiar el nombre del archivo
        $fileName = $id . $extension;

        // Guardar el archivo en la carpeta "public/inventario"
  $path = $file->storeAs('storage/cursos', $fileName, 'public');
   // $path = Storage::disk('local')->put('/public/inventario/' . $fileName, $file);



        // Generar la URL pública del archivo guardado
        $url = asset('storage' . $fileName);

        return response()->json(['message' => 'Archivo subido correctamente', 'url' => $url]);
    } else {
        return response()->json(['message' => 'No se proporcionó ningún archivo'], 400);
    }
}
public function bienvenida($id, Request $request)
{
    if ($request->hasFile('file')) {
        $file = $request->file('file');

        // Obtener la extensión original del archivo
        $originalExtension = $file->getClientOriginalExtension();

        // Cambiar el nombre del archivo manteniendo la extensión original
        $fileName = $id . $originalExtension;

        // Guardar el archivo en la carpeta "storage/adjuntos"
        $path = $file->storeAs('storage/bienvenida', $fileName, 'public');

        // Generar la URL pública del archivo guardado
        $url = asset('storage/adjuntos/' . $fileName);

        return response()->json(['message' => 'Archivo subido correctamente', 'url' => $url]);
    } else {
        return response()->json(['message' => 'No se proporcionó ningún archivo'], 400);
    }
}



public function profile($id, Request $request)
{
    if ($request->hasFile('file')) {
        $file = $request->file('file');

        // Obtener la extensión original del archivo
        $originalExtension = $file->getClientOriginalExtension();

        // Cambiar la extensión a JPG si no lo es ya
        $extension = $originalExtension == 'jpg' ? 'jpg' : 'jpg';
        
        // Cambiar el nombre del archivo
        $fileName = $id . $extension;

        // Guardar el archivo en la carpeta "public/inventario"
  $path = $file->storeAs('storage/', $fileName, 'public');
   // $path = Storage::disk('local')->put('/public/inventario/' . $fileName, $file);



        // Generar la URL pública del archivo guardado
        $url = asset('storage' . $fileName);

        return response()->json(['message' => 'Archivo subido correctamente', 'url' => $url]);
    } else {
        return response()->json(['message' => 'No se proporcionó ningún archivo'], 400);
    }
}


public function adjuntos($id, Request $request)
{
    if ($request->hasFile('file')) {
        $file = $request->file('file');

        // Obtener la extensión original del archivo
        $originalExtension = $file->getClientOriginalExtension();

        // Cambiar el nombre del archivo manteniendo la extensión original
        $fileName = $id . $originalExtension;

        // Guardar el archivo en la carpeta "storage/adjuntos"
        $path = $file->storeAs('storage/adjuntos', $fileName, 'public');

        // Generar la URL pública del archivo guardado
        $url = asset('storage/adjuntos/' . $fileName);

        return response()->json(['message' => 'Archivo subido correctamente', 'url' => $url]);
    } else {
        return response()->json(['message' => 'No se proporcionó ningún archivo'], 400);
    }
}





public function download($filename)
{
   // $file = storage_path('app/uploads/' . $filename);
$folder = storage_path('app/uploads/');
$baseFileName = $filename; // El nombre del archivo sin extensión

$matchingFiles = glob($folder . $baseFileName . '.*');

if (count($matchingFiles) > 0) {
    $filePath = $matchingFiles[0]; // Obtiene el primer archivo que coincide
    return response()->file($filePath);
} else {
    abort(404, 'Archivo no encontrado');
}
}




}
