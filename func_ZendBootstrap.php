<?php
require_once("../../application/batch/configs/configBatch.php");
set_include_path(implode(PATH_SEPARATOR, array(
  realpath(APPLICATION_PATH . '/../library'),
  get_include_path(),
)));
include_once 'Zend/Application.php';
$application = new Zend_Application(
  APPLICATION_ENV,
  APPLICATION_PATH . '/configs/application.ini');
$application->bootstrap();

$db = Zend_Registry::get ( 'db' );
$auth = Zend_Auth::getInstance();