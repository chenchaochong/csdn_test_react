<?php


namespace App\Services;


use App\Tools\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class UriService
{

    /**
     * 獲取後臺URi列表
     * @param array $param
     * @return array
     */
    public function getList(array $param)
    {

        $size = @$param ['size'] ? @$param ['size'] : 10;
        $start = @$param ['page'] ?  @$param ['page'] : 1;
        $latestPosts = DB::table('review')
            ->select(DB::raw('count(1) as review_num'), 'uri')
            ->groupBy('uri');
        $query = DB::table('resource')
            ->when(trim(@$param['id']), function ($query, $temp) {
                return $query->where('resource.id', '=', $temp);
            })
            ->when(urldecode(trim(@$param['uri'])), function ($query, $temp) {
                return $query->where('resource.uri', '=', $temp);
            })->joinSub($latestPosts, 'latest_posts', function ($join) {
                $join->on('resource.uri', '=', 'latest_posts.uri');
            });
        $num = $query->count();
        $res = $query->select('resource.*', 'review_num')
            ->orderBy('create_time', 'desc')
            ->forPage($start,$size)
            ->get();
        return ['code' => 0, 'msg' => '成功', "data" => ['results' => $res, 'count' => $num]];
    }

    /**
     * 獲取後臺評論列表
     * @param array $param
     * @return array
     */
    public function getCommentList(array $param)
    {

        $size = @$param ['size'] ? @$param ['size'] : 10;
        $start = @$param ['page'] ?  @$param ['page'] : 1;
        $query = DB::table('review')
            ->when(trim(@$param['keyword']), function ($query, $temp) {
                return $query->where('review.content', 'like', '%' . $temp . '%');
            })->where('uri', trim(@$param['uri']));
        $num = $query->count();
        $res = $query->orderBy('rank', 'desc')
            ->orderBy('create_time', 'desc')
            ->forPage($start,$size)
            ->get();

        return ['code' => 0, 'msg' => '成功', "data" => ['results' => $res, 'count' => $num]];
    }

    /**
     * 置頂
     * @param array $param
     * @return array
     */
    public function topComment(array $param)
    {
        if (!@$param ['review_id']) {
            return ['code' => 10001, 'msg' => '参数不能为空', "data" => ''];
        }
        $id = $param ['review_id'];
        $res = DB::table('review')->where(['id' => $id])->first();
        $res = json_decode(json_encode($res), true);
        DB::table('review')->where('uri', $res['uri'])->update(['rank' => 0]);
        DB::table('review')->where(['id' => $id])->update(['rank' => 1]);
        return ['code' => 0, 'msg' => '置顶成功', 'data' => ''];
    }

    /**
     * 修改狀態
     * @param array $param
     * @return array
     */
    public function statusComment(array $param)
    {
        if (!@$param ['review_id'] && !@$param ['status']) {
            return ['code' => 10001, 'msg' => '参数不能为空', "data" => ''];
        }
        DB::table('review')->where(['id' => @$param['review_id']])->update(['status' => @$param['status']]);
        return ['code' => 0, 'msg' => '置頂成功'];
    }

    /**
     * 随机生成短码
     * @param $table
     * @return string
     */
    private function randomCode($table)
    {
        $code = Common::random(6);
        $res = DB::table($table)->where(['id' => $code])->get();
        if(count($res) > 0){
            return $this->randomCode($table);
        } else {
            return $code;
        }
    }
    /**
     * 添加評論
     * @param array $param
     * @return array
     */
    public function addComment(array $param)
    {
        if (!@$param['uri'] && !@$param['content']) {
            return ['code' => 10001, 'msg' => '参数不能为空', "data" => ''];
        }

        $data = [
            'uri' => urldecode(@$param['uri']),
            'content' => trim(@$param['content']),
            'id' => $this->randomCode('review')
        ];

        DB::beginTransaction();
        try {
            DB::table('review')->insert($data);
            $flag = DB::table('resource')->where(['uri' => urldecode(trim(@$param['uri']))])->count();
            if (!$flag) {
                $uriData = [
                    'uri' => urldecode(trim(@$param['uri'])),
                    'id' => $this->randomCode('resource')
                ];
                DB::table('resource')->insert($uriData);
            }
            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::info($exception);
            return ['code' => 10000, 'msg' => '添加失败', "data" => ''];
        }
        return ['code' => 0, 'msg' => '添加成功', "data" => ''];
    }

    /**
     * 点赞和取消点赞
     * @param array $param
     */
    public function clickLike($userId, $param)
    {
        if (!@$param['review_id'] && !@$param['type']) {
            return ['code' => 10001, 'msg' => '参数不能为空', "data" => ''];
        }
        $commentId = $param ['review_id'];
        $type = $param ['type'];
        if ($type == 1) {
            Redis::SADD($commentId, $userId);
            DB::table('review')
                ->where('id', $commentId)
                ->increment('like', 1);
        } else {
            Redis::SREM($commentId, $userId);
            DB::table('review')
                ->where('id', $commentId)
                ->decrement('like', 1);
        }
        return ['code' => 0, 'msg' => '成功', "data" => ''];
    }

    /**
     * 客户端获取评论列表
     * @param array $param
     * @return array
     */
    public function getUriCommentList($userId, $param)
    {
        if ( !@$param['uri'] && !$param ['type']) {
            return ['code' => 10001, 'msg' => '参数不能为空', "data" => ''];
        }
        $start = @$param ['page'] ?  @$param ['page'] : 1;
        $type = $param ['type'];
        $query = DB::table('review')
            ->where('uri', urldecode(trim(@$param['uri'])))
            ->where('status', 1);
        $num = $query->count();
        if ($num - ($start * 10) < -10) {
            return ['code' => 10000, 'msg' => '没有数据了', "data" => $num - ($start * 10)];
        }
        if ($type == 1) {
            $res = $query->orderBy('rank', 'desc')
                ->orderBy('like', 'desc')
                ->orderBy('create_time', 'desc')->offset(($start - 1) * 10)
                ->limit(10)
                ->get();
        } else {
            $res = $query
                ->orderBy('create_time', 'desc')->offset(($start - 1) * 10)
                ->limit(10)
                ->get();
        }
        $res = json_decode(json_encode($res), true);
        $data = [];
        foreach ($res as $item) {
            $item['is_like'] = Redis::SISMEMBER($item['id'], $userId) + 0;
            array_push($data, $item);
        }
        return ['code' => 0, 'msg' => '获取成功', "data" => ['results' => $data, 'count' => $num]];

    }
}
