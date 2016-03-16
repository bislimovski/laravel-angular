<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGalleryImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //php artisan make:migration create_gallery_images_table --create=gallery_images
        //--create is name of the table
        Schema::create('gallery_images', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('gallery_id')->unsigned();
            $table->integer('file_id')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('gallery_images');
    }
}
