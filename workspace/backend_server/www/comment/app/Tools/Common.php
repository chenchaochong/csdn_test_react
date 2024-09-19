<?php


namespace App\Tools;


use Ramsey\Uuid\Uuid;

class Common
{
    public static function getUuid()
    {
        $key = array_rand([1, 2]);

        switch ($key) {
            case 0:
                $uuid = Uuid::uuid1();
                break;
            case 1:
                $uuid = Uuid::uuid4();
                break;
        }

        return $uuid->getHex()->toString();

    }

    public static function trimData($param): array
    {
        $data = [];

        // 循环对参数每个值进行去空格处理
        foreach ($param as $key => $value) {
            if (!empty($value) && !is_array($value)) {
                if (!empty(trim($value))) {
                    $data[$key] = trim($value);
                }
            }
            if (is_array($value) && count($value) > 0) {
                $data[$key] = $value;
            }
        }

        return $data;
    }

    /**
     * 生成随机串
     * @param  int 生成长度
     * @return string 生成的字条串
     */
    public static function random($length)
    {
        $hash = '';
        $chars = '9876543210ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz1357924680';
        $max = strlen($chars) - 1;
        PHP_VERSION < '4.2.0' && mt_srand((float) microtime() * 1000000);
        for ($i = 0; $i < $length; $i++) {
            $hash .= $chars[mt_rand(0, $max)];
        }
        return $hash;
    }
}
