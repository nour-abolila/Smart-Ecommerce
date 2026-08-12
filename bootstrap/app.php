<?php

use App\Http\Middleware\AdminMiddleware;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'admin' => AdminMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*'),
        );
        $exceptions->render(function (Throwable $exception, Request $request) {
            if (! $request->is('api/*')) {
                return null;
            }

            return match (true) {
                $exception instanceof ValidationException => error('The given data was invalid.', 422, $exception->errors()),
                $exception instanceof AuthenticationException => error('Unauthenticated.', 401),
                $exception instanceof AuthorizationException => error($exception->getMessage() ?: 'Forbidden.', 403),
                $exception instanceof ModelNotFoundException => error('Resource not found.', 404),
                $exception instanceof HttpExceptionInterface => error(
                    $exception->getStatusCode() >= 500 ? 'Something went wrong. Please try again later.' : ($exception->getMessage() ?: 'Request failed.'),
                    $exception->getStatusCode()
                ),
                default => error('Something went wrong. Please try again later.', 500),
            };
        });
    })->create();
