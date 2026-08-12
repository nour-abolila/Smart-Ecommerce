<?php

use Illuminate\Http\JsonResponse;

if (! function_exists('success')) {
    function success(string $message = 'Success', mixed $data = [], int $status = 200): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
        ], $status);
    }
}

if (! function_exists('paginated')) {
    function paginated($paginator, string $message = 'Success', ?string $resourceClass = null): JsonResponse
    {
        $data = $resourceClass
            ? $resourceClass::collection(collect($paginator->items()))->resolve(request())
            : $paginator->items();

        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
                'last_page' => $paginator->lastPage(),
            ],
        ]);
    }
}

if (! function_exists('error')) {
    function error(string $message = 'Error', int $status = 400, ?array $errors = null): JsonResponse
    {
        return response()->json([
            'status' => false,
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }
}
