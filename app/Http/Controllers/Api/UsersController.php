<?php
namespace CodeDelivery\Http\Controllers\Api;

use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Repositories\UserRepository;
use Illuminate\Http\Request;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class UsersController extends Controller{    
    private $userRepository;
    public function __construct(
        UserRepository      $userRepository
    ){
        $this->userRepository       = $userRepository;
    }

    public function authenticated(){
        $id = Authorizer::getResourceOwnerId();
        $user = $this->userRepository->find($id);        

        return $user;
    }
}
