<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\UserConnection;
use DB;

class UserConnectionController extends Controller
{
    public function create(Request $request){
        try{
            DB::beginTransaction();

            $userConnection = new UserConnection;
            $userConnection->party_A = auth()->user()->id;
            $userConnection->party_B = $request->userId;
            $userConnection->save();

            DB::commit();
            return \response([
                'message' => "Request is sent",
            ],  Response::HTTP_OK);            
        }
        catch(Exception $e){
            DB::rollback();
            return \response([
                'message' => $e->getMessage(),
            ],  Response::HTTP_NOT_FOUND);
        }
    }

    public function newFriends(){
        try{
            // $newFriends = UserConnection::
        }
        catch(Exception $e){
            return \response([
                'message' => $e->getMessage(),
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function getStats($user){
        $requestsSent = UserConnection::where('party_A', $user->id)->count();
        $requestsReceived = UserConnection::where('party_B', $user->id)->count();
        $connections = UserConnection::where('party_A', $user->id)->orWhere('party_B', $user->id)
                        ->where('status', 'accepted')->count();

        $data = array(
            'requestsSent' => $requestsSent,
            'requestsReceived' => $requestsReceived,
            'connections' => $connections,
        );

        return $data;
    }

}
