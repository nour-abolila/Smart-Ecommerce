<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (auth('api')->user()?->role !== 'admin') {
            return error('You are not authorized to perform this action.', 403);
        }

        return $next($request);
    }
}
