<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{

    protected $table = 'gallery';
    protected $fillable = ['name', 'user_id'];

    public function getCreateAtAttribute($value)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $value)->diffForHumans();
    }
}
