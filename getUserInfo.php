<?php
// header("HTTP/1.0 404 Not Found"); // turn off this game
require_once('func_ZendBootstrap.php');
$userInfo = false;

define("GET_USER_INFO","1",true);
define("GET_USER_USERCAMP","2",true);
define("GET_USER_RESULT","3",true);
define("GET_USER_FRIENDLIST","4",true);

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
        case GET_USER_FRIENDLIST:
            getFirstListCamp();
            break;
        default:
            break;
    }
}

// var_dump($_SESSION['Zend_Auth']['storage']); die;


function getUserInfo(){
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

function getUserCampInfo(){
    global $db, $auth;
    $userCampData;
    if ($auth -> getIdentity()){
        $userInfo = $auth -> getIdentity();
        $userID = $userInfo->UserID;
        $friendWheel = new ApiCampaign_Model_CampFriendWheel();
        $numRound = $friendWheel->checkUserHasTurn($userID,1);

        $sql = "SELECT sum(`point`) as totalPoint FROM  `camp_friendwheel_history` WHERE UserID = {$userID}";
        $totalPoint = $db->fetchOne($sql);

        $userCampData = array(
            "numRound" => $numRound,
            "totalPoint" => $totalPoint
        );
    }
    header('Content-Type: application/json');
    echo json_encode($userCampData);
}

function getResultList(){
    global $auth, $db;

    // $sql = "SELECT g.userid, g.timestamp , u.UserName , sum(g.point)as total
    //             FROM ( SELECT * FROM `camp_friendwheel_history`ORDER BY id DESC) g JOIN `user` u ON g.userid = u.UserID
    //             GROUP BY userid
    //             ORDER BY total DESC,id DESC
    //             limit 20";
    // $listResults = $db->fetchAll($sql);

    $TetWheelModel = new Default_Model_GoldenWheelHistory();
    $listResults = $TetWheelModel->resultList(2019)->toArray();

    // var_dump($listResults);
    // var_dump($listResults2->toArray());
    // die;

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

function getFirstListCamp(){
    global $db, $auth;

    $listFriends;
    if ($auth -> getIdentity()){
        $userInfo = $auth -> getIdentity();
        $userID = $userInfo->UserID;
        $sql = "SELECT `UserName`,`email` FROM `camp_friendwheel` cf inner join `user` ON cf.UserID = {$userID} AND cf.FriendsID = `user`.UserID";
        $listFriends = $db->fetchAll($sql);
    }

    header('Content-Type: application/json');
    echo json_encode($listFriends);
}

// function getFriendList(){
//     global $db, $auth;

//     $sql = "SELECT u.UserID as uid,re.FriendsID as usname,u.FullName as fullname,u.Email as email from recommendtofriends as re, user as u where re.FriendsID = u.UserID and re.UserID = {$_SESSION['Zend_Auth']['storage']->UserID} order by u.UserID DESC";
//     $listFriends=$db->fetchAll($sql);

//     header('Content-Type: application/json');
//     echo json_encode($listFriends);
// }

// function getFriendInfo($friendID){
//     global $db;
// }