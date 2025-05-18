<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function edit(Request $request){
        $request->validate([
            'name' =>'min:3|string|max:255|required',
            'bio' =>'min:3|string|max:255|required',
        ]);

        $user = $request->user();
        
            $user->name = $request->name;    
            $user->bio = $request->bio;
            $user->save();
    


        return [
            'name' => $user->name,
            'bio' => $user->bio,
           'message' => 'Profile updated successfully.'
        ];
    }

    public function removeImage(Request $request){
        $user = $request->user();

        if($user->profile_image === 'default.png') {
            return response()->json([
               'errors' => [
                'profile_image' => [
                    'there is no image to delete'
                ]
               ]
            ], 403 );
        }

        $imagePath =  public_path('assets/images/') . $user->profile_image;
        if(file_exists($imagePath)) {
            unlink($imagePath);
            $defaultImage = 'default.png';
            $user->profile_image = $defaultImage;
            $user->save();
        }
        

        return [
            'image' => url('/assets/images/' . $user->profile_image), 
           'message' => 'Image removed successfully.'
        ];
    }


    public function setImage(Request $request){

        $request->validate([
            'image' =>'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    

            $user = $request->user();

            $imagePath =  public_path('assets/images/') . $user->profile_image;
            if(file_exists($imagePath) && $user->profile_image != 'default.png') {
                unlink($imagePath);
            }

            $image = $request->file('image');
    
            $filename = time() . '.' . $image->getClientOriginalExtension();
    
            $image->move(public_path('assets/images/'), $filename );
    
            $filename =  $filename;
    
            
            $user->profile_image = $filename;
            $user->save();
    
            $filename  = url( '/assets/images/'. $filename);
            return [
                'image' => $filename, 
               'message' => 'Image uploaded successfully.'
            ];
    }
}
