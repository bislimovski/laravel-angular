<?php

namespace App\Http\Controllers;

use App\Gallery;
use App\StoreFile;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class GalleryController extends Controller
{

    public function test()
    {
        return 'Running test from test()';
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //user will see only own galleries
        return Gallery::with('user')->get();
        return Gallery::where('user_id', Auth::user()->id)->with('user')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|min:3'
        ]);

        if($validator->fails()){
            return response($validator->errors()->all(), 422);
        }

        $gallery = Gallery::create([
            'name' => $request->input('name'),
            'user_id' => 1,
        ]);

        return response($gallery, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Gallery::with('user')->where('id', $id)->first();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function uploadImage(Request $request)
    {
        $galleryId = $request->input('galleryId');

        if(! $request->hasFile('file')) {
            return response('No file sent', 400);
        }

        if(! $request->file('file')->isValid()){
            return response('File is not valid', 400);
        }

        $validator = Validator::make($request->all(),[
            'galleryId' => 'required|integer',
            'file' => 'required|mimes:jpeg,jpg,png|max:6000',
        ]);

        if($validator->fails()){
            return response('The validation is not valid', 400);
        }

        $mimeType = $request->file('file')->getClientMimeType();
        $fileSize = $request->file('file')->getClientSize();
        $fileName = 'gallery_'. $galleryId . '_' . uniqid(). '.' .$request->file('file')->getClientOriginalExtension();

        $local = Storage::disk('local');
        $file = null;
        if($local->put($fileName, file_get_contents($request->file('file')))){
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
        }

        return response($file, 201);
    }
}
