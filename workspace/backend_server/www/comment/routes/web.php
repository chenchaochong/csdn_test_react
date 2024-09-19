<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return phpinfo();
});
$router->group(['prefix' => 'api'],
    function () use ($router) {
        $router->get('admin-resource', 'UriController@getList');
        $router->get('admin-review', 'UriController@getCommentList');
        $router->post('admin-review/set_top', 'UriController@topComment');
        $router->post('admin-review/set_visibility', 'UriController@statusComment');
        $router->post('review', 'UriController@addComment');
        $router->post('review/like', 'UriController@clickLike');
        $router->get('review', 'UriController@getUriCommentList');
    }
);
