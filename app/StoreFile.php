<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StoreFile extends Model
{
    protected $table = 'store_file';
    protected $fillable = ['file_name', 'mime_type', 'file_size', 'file_path', 'storage_type', 'status'];
}
