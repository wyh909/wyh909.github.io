<?php
/**
 * Tiny - A PHP Framework For Web Artisans
 * @author Tiny <tinylofty@gmail.com>
 * @copyright Copyright(c) 2010-2014 http://www.tinyrise.com All rights reserved
 * @version 1.0
 */

/**
 * DB工厂类，实现多数据库的支持
 *
 * @author Tiny
 * @class DBFactory
 */
class DBFactory
{
	private static $dbinfo=null;
    /**
     * 得到实例
     *
     * @access public
     * @return mixed
     */
    public static function getInstance()
    {
		$dbinfo = self::getDbInfo();
        switch($dbinfo['type']){
            default:{
                if(version_compare(PHP_VERSION, '5.4.0') >= 0){
                    return DBMysqli::getInstance($dbinfo);
                }else{
                    return DBMysql::getInstance($dbinfo);
                }
            }
        }
    }
    /**
     * 取得数据库信息
     *
     * @access public
     * @return mixed
     */
	public static function getDbInfo(){
		if(self::$dbinfo==null) self::$dbinfo = Tiny::app()->db;
		return self::$dbinfo;
	}
}
