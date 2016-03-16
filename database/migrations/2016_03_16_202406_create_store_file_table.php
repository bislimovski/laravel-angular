<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStoreFileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('store_file', function (Blueprint $table) {
            $table->increments('id');
            $table->string('file_name');
            $table->string('mime_type');
            $table->string('file_size', 10);
            $table->string('file_path');
            $table->string('storage_type');
            $table->boolean('status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('store_file');
    }
}
