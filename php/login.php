<?php
$user = json_decode(file_get_contents('php://input'));
if($user->email == 'claudio' && $user->senha == '1') {
    print 'success';
} else {
    print 'error';
}
