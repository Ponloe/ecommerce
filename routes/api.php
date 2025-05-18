<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BrandController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::get('/products', [ProductController::class, 'apiIndex']);
    Route::get('/products/{product}', [ProductController::class, 'apiShow']);
    
    Route::get('/categories', [CategoryController::class, 'apiIndex']);
    Route::get('/categories/{category}', [CategoryController::class, 'apiShow']);
   
    Route::get('/brands', [BrandController::class, 'apiIndex']);
    Route::get('/brands/{brand}', [BrandController::class, 'apiShow']);
});