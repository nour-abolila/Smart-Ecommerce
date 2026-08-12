<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Services\SocialAuthService;

class SocialiteController extends Controller
{
    public function __construct(
        private SocialAuthService $socialAuthService
    ) {}

    public function callback()
    {
        $user = $this->socialAuthService->callback();

        $token = $user->createToken('API Token')->plainTextToken;

        return success('Login successful.', [
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }

    public function redirect()
    {
        return $this->socialAuthService->redirect();
    }
}
