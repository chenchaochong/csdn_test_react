<?php


namespace App\Http\Controllers;


use App\Services\UriService;
use Illuminate\Http\Request;

class UriController extends Controller
{

    private static $uriServe;

    public function __construct(
        UriService $uriServe
    )
    {
        self::$uriServe = $uriServe;
    }

    public function getList(Request $request)
    {

        $param = $request->all();
//        $data = json_decode($param, true);
        $res = self::$uriServe->getList($param);
        return response()->json($res);
    }

    public function getCommentList(Request $request)
    {

        $param = $request->all();
//        $data = json_decode($param, true);
        $res = self::$uriServe->getCommentList($param);
        return response()->json($res);
    }

    public function topComment(Request $request)
    {

        $param = $request->all();
//        $data = json_decode($param, true);
        $res = self::$uriServe->topComment($param);
        return response()->json($res);
    }

    public function statusComment(Request $request)
    {

        $param = $request->all();
//        $data = json_decode($param, true);
        $res = self::$uriServe->statusComment($param);
        return response()->json($res);
    }

    public function addComment(Request $request)
    {

        $param = $request->all();
//        $data = json_decode($param, true);
        $res = self::$uriServe->addComment($param);
        return response()->json($res);
    }

    public function clickLike(Request $request)
    {
        $userId = $request->header()['user-id'][0];
        $param = $request->all();
//        $data = json_decode($param, true);
        $res = self::$uriServe->clickLike($userId,$param);
        return response()->json($res);
    }

    public function getUriCommentList(Request $request)
    {
        $userId = $request->header()['user-id'][0];
        $param = $request->all();
//        $data = json_decode($param, true);
        $res = self::$uriServe->getUriCommentList($userId,$param);
        return response()->json($res);
    }
}
