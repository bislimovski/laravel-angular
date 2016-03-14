<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

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
    public function user(){
        return $this->belongsTo('App\User');
    }
}
