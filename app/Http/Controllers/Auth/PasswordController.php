<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Password\ForgetPasswordRequest;
use App\Http\Requests\Password\ResetPasswordRequest;
use App\Http\Requests\Password\VerifyPasswordRequest;
use App\Models\User;
use App\Services\OtpService;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    public function __construct(protected OtpService $otpService) {}

    private function getUserByEmail(string $email): User
    {
        return User::firstWhere('email', $email);
    }

    public function forgetPassword(ForgetPasswordRequest $request)
    {
        $data = $request->validated();

        $user = $this->getUserByEmail($data['email']);

        $otp = $this->otpService->generateOtp($user);

        $this->otpService->sendOtp($user, $otp);

        return success('OTP sent to your email', ['user_id' => $user->id]);
    }

    public function verifyPassword(VerifyPasswordRequest $request)
    {
        $data = $request->validated();

        $user = $this->getUserByEmail($data['email']);

        if (! $this->otpService->verifyOtp($user, $request->input('otp_code'))) {
            return error('Invalid or expired OTP', 422, null);
        }

        return success('OTP verified successfully. You can now reset your password.');
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $data = $request->validated();

        $user = $this->getUserByEmail($data['email']);

        $user->update([
            'password' => Hash::make($data['password']),
        ]);

        return success('Password has been reset successfully.');
    }

    public function resendOtp(ForgetPasswordRequest $request)
    {
        $data = $request->validated();

        $user = $this->getUserByEmail($data['email']);

        $otp = $this->otpService->generateOtp($user);
        if (! $otp) {
            return error(
                'Please wait 2 minutes before requesting another OTP',
                429,
                null
            );
        }

        $this->otpService->sendOtp($user, $otp);

        return success('OTP resent to your email', ['user_id' => $user->id]);
    }
}
