<?php
require_once('func_ZendBootstrap.php');
$userInfo = false;

define("GET_USER_INFO","1",true);
define("GET_USER_USERCAMP","2",true);
define("GET_USER_RESULT","3",true);

if (isset($_POST['request'])){
    $request = $_POST['request'];
    $userInfo = $auth -> getIdentity();
    switch($request){
        case GET_USER_INFO:
            getUserInfo();
            break;
        case GET_USER_USERCAMP:
            getUserCampInfo();
            break;
        case GET_USER_RESULT:
            getResultList();
            break;
        default:
            break;
    }
}

function getUserInfo()
{
    global $db, $auth;
    $userData = null;
    if ($auth -> getIdentity()){
        $userInfo = $auth -> getIdentity();
        $userID = $userInfo->UserID;
        $sql = "SELECT DISTINCT `UserID`,`UserName`,`Point` FROM `user` WHERE UserID = {$userID}";
        $userData = $db->fetchRow($sql);
    }
    header('Content-Type: application/json');
    echo json_encode($userData);
}

function getUserCampInfo()
{
    global $db, $auth;
    $userCampData;
    if ($auth -> getIdentity()){
        $userInfo = $auth -> getIdentity();
        $userID = $userInfo->UserID;
        $mdlTetWheel = new Default_Model_TetWheel2019();
        $checkExist = $mdlTetWheel->checkUserJoined($userID);

        $checkExist = $checkExist ? true : false;

        $sql = "SELECT sum(`point`) as totalPoint FROM  `golden_wheel_history` WHERE UserID = {$userID} and YEAR( TIMESTAMP ) = 2019";
        $totalPoint = $db->fetchOne($sql);

        $userCampData = array(
            "numRound" => $checkExist,
            "totalPoint" => $totalPoint
        );
    }
    header('Content-Type: application/json');
    echo json_encode($userCampData);
}

function getResultList()
{
    global $auth, $db;

    $mdlTetWheel = new Default_Model_TetWheel2019History();
    $listResults = $mdlTetWheel->resultList(2019)->toArray();

    if ($auth -> getIdentity()){
        $userInfo = $auth -> getIdentity();
        $userID = $userInfo->UserID;
        for ($i = 0; $i < count($listResults); $i++){
            if($userID == $listResults[$i]['userid']){
                $listResults[$i]['current'] = true;
                break;
            }
        }
    }

    header('Content-Type: application/json');
    echo json_encode($listResults);
}