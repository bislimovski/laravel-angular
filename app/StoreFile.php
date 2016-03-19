<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class StoreFile extends Model
{
    protected $table = 'store_file';
    protected $fillable = ['file_name', 'mime_type', 'file_size', 'file_path', 'storage_type', 'status'];

    public function uploadThumbAndMainImage(Request $request)
    {
        $file = $request->file('file');
        $galleryId = $request->input('galleryId');

        $extension = $request->file('file')->guessExtension();
        $fileName = 'gallery_'. $galleryId . '_' .uniqid() .'.'. $extension;
        $mimeType = $request->file('file')->getClientMimeType();
        $fileSize = $request->file('file')->getClientSize();

//        $image = Image::make($file);
//        $image->encode($extension);
//
//        $imageMedium = Image::make($file)->resize(300, null, function($constraint){
//            $constraint->aspectRatio();
//        });
//        $imageMedium->encode($extension);

        $imageThumb = Image::make($file)->fit(320)->crop(320, 240, 0, 0);
        $imageThumb->encode($extension);

        $local = Storage::disk('local');
        $local->put($fileName, (string)$imageThumb);

        $file = StoreFile::create([
                'file_name' => $fileName,
                'mime_type' => $mimeType,
                'file_size' => $fileSize,
                'file_path' => 'http://localhost:8000/img/'. $fileName,
                'storage_type'  => 'local'
        ]);

        DB::table('gallery_images')->insert([
                'gallery_id' => $galleryId,
                'file_id' => $file->id
            ]);

            $fileImg = StoreFile::find($file->id);
            $fileImg->status = 1;
            $fileImg->save();

        return [
            'file' => $file,
            'file_id' => $file->id,
            'url' => 'img/'. $fileName,
            'thumbUrl' => 'http://localhost:8000/img/'. $fileName,
        ];
    }
}
