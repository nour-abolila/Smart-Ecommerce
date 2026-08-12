<?php

use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\Cart\CartController;
use App\Http\Controllers\Notification\NotificationController;
use App\Http\Controllers\Order\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Product\CategoryController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// User
Route::get('/user', function (Request $request) {
    return success('User retrieved successfully.', new UserResource($request->user()));
})->middleware('auth:sanctum');




// Authentication Routes
Route::prefix('auth')->controller(AuthController::class)->group(function () {

    Route::post('/register', 'register')->middleware('throttle:registration');

    Route::post('/verify-otp', 'verifyOtp')->middleware('throttle:otp-verify');

    Route::post('/login', 'login')->middleware('throttle:login');

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', 'logout');
    });

    Route::get('/google/redirect', [SocialiteController::class, 'redirect']);

    Route::get('/google/callback', [SocialiteController::class, 'callback'])->middleware('throttle:google-callback');
});

Route::prefix('auth')->controller(PasswordController::class)->group(function () {

    Route::post('/forget-password', 'forgetPassword')->middleware('throttle:otp-send');

    Route::post('/verify-password', 'verifyPassword')->middleware('throttle:otp-verify');

    Route::post('/reset-password', 'resetPassword');

    Route::post('/resend-otp', 'resendOtp')->middleware('throttle:otp-send');
});



// order payment and checkout routes with throttling
Route::middleware(['auth:api', 'throttle:checkout'])->group(function () {

    Route::post('/orders/{order}/pay', [PaymentController::class, 'pay']);

    Route::post('/orders/{order}/checkout', [PaymentController::class, 'pay']);
});



// Notification Routes
Route::middleware('auth:api')->prefix('notifications')->group(function () {

    Route::get('/', [NotificationController::class, 'index']);

    Route::get('/unread', [NotificationController::class, 'unread']);

    Route::patch('/{id}/read', [NotificationController::class, 'markAsRead']);

    Route::patch('/read-all', [NotificationController::class, 'markAllAsRead']);

    Route::delete('/{id}', [NotificationController::class, 'destroy']);
});



// Order Routes
Route::middleware('auth:api')->prefix('orders')->group(function () {

    Route::get('/', [OrderController::class, 'index']);

    Route::post('/', [OrderController::class, 'store']);

    Route::get('/{order}', [OrderController::class, 'show']);
});



// Admin Routes
Route::middleware(['auth:api', 'admin'])->prefix('admin')->name('admin.')->group(function () {

    Route::apiResource('products', AdminProductController::class)->middleware('throttle:admin-write');

    Route::apiResource('categories', AdminCategoryController::class)->middleware('throttle:admin-write');
});



// Cart Routes
Route::middleware('auth:api')->prefix('cart')->controller(CartController::class)->group(function () {

    Route::get('/', 'show');

    Route::post('/add', 'add');

    Route::delete('/remove/{productId}', 'remove');
});



// Product Routes
Route::prefix('products')->group(function () {

    Route::get('/', [ProductController::class, 'index']);

    Route::get('/{product}', [ProductController::class, 'show']);
});


// Category Routes
Route::get('/categories', [CategoryController::class, 'index']);
