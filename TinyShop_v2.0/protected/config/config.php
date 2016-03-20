<?php return array (
  'classes' => 
  array (
    0 => 'classes.*',
    1 => 'extensions.*',
    3 => 'classes.barcode.*',
    2 => 'classes.payments.*',
  ),
  'theme' => 'default',
  'urlFormat' => 'get',
  'db' => 
  array (
    'type' => 'mysql',
    'tablePre' => 'tiny_',
    'host' => '127.0.0.1:3306',
    'user' => 'root',
    'password' => '',
    'name' => 'tinyshop_data',
  ),
  'route' => 
  array (
  ),
  'extConfig' => 
  array (
    'controllerExtension' => 
    array (
      0 => 'ControllerExt',
    ),
  ),
);?>