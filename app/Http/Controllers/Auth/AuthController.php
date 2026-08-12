<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\VerifyOtpRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\OtpService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct(protected OtpService $otpService) {}

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        $otp = $this->otpService->generateOtp($user);
        $this->otpService->sendOtp($user, $otp);

        return success(
            'User registered successfully. Please verify your email using the OTP sent to your email address.',
            ['user_id' => $user->id],
            201
        );
    }

    public function verifyOtp(VerifyOtpRequest $request)
    {
        $user = User::findOrFail($request->user_id);
        if (! $this->otpService->verifyOtp($user, $request->otp_code)) {
            return error('Invalid or expired OTP', 422);
        }
        $user->email_verified_at = now();
        $user->save();
        $token = Auth::login($user);

        return success('Email verified successfully.', [
            'user' => new UserResource($user),
            'access_token' => $token,
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $user = User::where('email', $credentials['email'])->first();
        if (! $user) {
            return error('Invalid credentials', 401);
        }
        if (! $user->email_verified_at) {
            return error('Email not verified. Please verify your email before logging in.', 403);
        }
        if (! $token = auth('api')->attempt($credentials)) {
            return error('Invalid credentials', 401);
        }

        return success('Login successful', [
            'user' => new UserResource($user),
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request)
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return success('Logout successful');
    }
}
