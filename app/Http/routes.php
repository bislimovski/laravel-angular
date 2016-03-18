<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return view('master');
});

Route::post('auth', 'UserController@checkAuth');
Route::resource('users', 'UserController');
Route::resource('gallery', 'GalleryController');

Route::post('upload-file', 'GalleryController@uploadImage');



/****************Refactoring****************************************/
////TEST-route for uploading files using dropzone
//Route::post('upload-file', function(Request $request){
//   return response($request->all(), 201);
//});

////TEST-storage local test route
//Route::get('test', function(){
//   $local = Storage::disk('local');
//    //the file is created in storage/app directory
//   $local->put('test.txt', 'Sample text inside test file');
//});