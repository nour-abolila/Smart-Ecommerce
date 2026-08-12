<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::preventLazyLoading(app()->environment(['local', 'testing']));

        RateLimiter::for('login', fn (Request $request) => Limit::perMinute(5)
            ->by($request->ip().'|'.mb_strtolower((string) $request->input('email'))));
        RateLimiter::for('registration', fn (Request $request) => Limit::perMinute(5)->by($request->ip()));
        RateLimiter::for('otp-verify', fn (Request $request) => Limit::perMinute(10)
            ->by($request->ip().'|'.($request->input('user_id') ?? $request->input('email'))));
        RateLimiter::for('otp-send', fn (Request $request) => Limit::perMinute(3)
            ->by($request->ip().'|'.mb_strtolower((string) $request->input('email'))));
        RateLimiter::for('google-callback', fn (Request $request) => Limit::perMinute(10)
            ->by($request->ip().'|'.$request->session()->getId()));
        RateLimiter::for('checkout', fn (Request $request) => Limit::perMinute(10)
            ->by(($request->user()?->getAuthIdentifier() ?? $request->ip()).'|'.$request->route('order')));
        RateLimiter::for('admin-write', fn (Request $request) => Limit::perMinute(30)
            ->by((string) ($request->user()?->getAuthIdentifier() ?? $request->ip())));
    }
}
