<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Gallery extends Model
{

    protected $table = 'gallery';
    protected $fillable = ['name', 'user_id'];

    public function getCreatedAtAttribute($value)
    {
        //22 hours ago
        return Carbon::createFromFormat('Y-m-d H:i:s.u', $value)->diffForHumans();
        //Mar 13, 2016
//        return Carbon::createFromFormat('Y-m-d H:i:s.u', $value)->toFormattedDateString();
    }

    //add user relationship using with(), inside gallery
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function getSingleGallery($id)
    {
        $gallery = Gallery::with('user')->where('id', $id)->first();
        //add new object element - images, same as adding element in the array :)
        $gallery->images = $this->getGalleryImageUrls($id);

        return $gallery;
    }

    public function getGalleryImageUrls($id)
    {
        $files = DB::table('gallery_images')
            ->where('gallery_id', $id)
            ->join('store_file', 'store_file.id', '=', 'gallery_images.file_id')
            ->get();

        $finalData = [];
        foreach($files as $key => $image){
            $finalData[$key] = [
                'file_id' => $image->id,
                'url' => 'img/'. $image->file_name,
                'thumbUrl' => $image->file_path
            ];
        }

        return $finalData;
    }

}
