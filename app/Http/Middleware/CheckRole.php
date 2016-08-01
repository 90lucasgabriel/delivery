<?php

namespace CodeDelivery\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    public function handle($request, Closure $next){
        if(!Auth::check()){
            return redirect('/auth/login');
        }
        if(Auth::user()->role != 'admin'){
            return redirect('/auth/login');
        }

        return $next($request);
    }
}