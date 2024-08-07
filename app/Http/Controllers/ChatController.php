<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Events\MessageEvent;
use App\Models\UserConnection;
use DB;

class ChatController extends Controller
{
    public function makeRequest(Request $request){
        try{
            DB::beginTrasaction();
            $userConnection = new UserConnection;
            $userConnection->party_A = auth()->user()->id;
            $userConnection->party_B = $request->userId;
            $userConnection->saved;

            DB::commit();
            return \response([
                'status' => Response::OK,
                'message' => 'Request sent',
            ]);
        }
        catch(Exception $e){
            return \response([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => $e->getMessage(),
            ]);
        }
    }
    
    public function message(Request $request){
        try{
            MessageEvent::dispatch($request->message);
            return \response([
                'status' => Response::HTTP_OK,
                'message' => 'Message sent',
            ]);
        }
        catch(Exception $e){
            return \response([
                'status' => Response::HTTP_NOT_FOUND,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
