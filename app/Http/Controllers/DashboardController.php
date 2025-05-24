<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Total counts
        $totalProducts = Product::count();
        $categoryCount = Category::count();
        $brandCount = Brand::count();
        
        // Low stock count (products with stock less than 10)
        $lowStockCount = Product::where('stock', '>', 0)
                               ->where('stock', '<', 10)
                               ->count();
        
        // Stock status statistics
        $inStock = Product::where('stock', '>=', 10)->count();
        $lowStock = Product::where('stock', '>', 0)
                          ->where('stock', '<', 10)
                          ->count();
        $outOfStock = Product::where('stock', '<=', 0)->count();
        
        // Calculate percentages
        $inStockPercentage = $totalProducts > 0 ? ($inStock / $totalProducts) * 100 : 0;
        $lowStockPercentage = $totalProducts > 0 ? ($lowStock / $totalProducts) * 100 : 0;
        $outOfStockPercentage = $totalProducts > 0 ? ($outOfStock / $totalProducts) * 100 : 0;
        
        // Categories with product counts
        $categoriesWithProducts = Category::select('categories.id', 'categories.name')
            ->addSelect(DB::raw('COUNT(products.id) as product_count'))
            ->leftJoin('products', 'categories.id', '=', 'products.category_id')
            ->groupBy('categories.id', 'categories.name')
            ->orderByDesc('product_count')
            ->limit(10)
            ->get();
            
        // Brands with product counts
        $brandsWithProducts = Brand::select('brands.id', 'brands.name')
            ->addSelect(DB::raw('COUNT(products.id) as product_count'))
            ->leftJoin('products', 'brands.id', '=', 'products.brand_id')
            ->groupBy('brands.id', 'brands.name')
            ->orderByDesc('product_count')
            ->limit(10)
            ->get();
            
        // Recent products
        $recentProducts = Product::with(['category', 'brand'])
            ->orderByDesc('created_at')
            ->limit(5)
            ->get()
            ->map(function ($product) {
                // Add image URL if image exists
                if ($product->image) {
                    $product->image_url = asset('storage/' . $product->image);
                }
                return $product;
            });
        
        // Compile all stats
        $stats = [
            'totalProducts' => $totalProducts,
            'categoryCount' => $categoryCount,
            'brandCount' => $brandCount,
            'lowStockCount' => $lowStockCount,
            'stockStatus' => [
                'inStock' => $inStock,
                'lowStock' => $lowStock,
                'outOfStock' => $outOfStock,
                'inStockPercentage' => $inStockPercentage,
                'lowStockPercentage' => $lowStockPercentage,
                'outOfStockPercentage' => $outOfStockPercentage,
            ],
            'categoriesWithProducts' => $categoriesWithProducts,
            'brandsWithProducts' => $brandsWithProducts,
            'recentProducts' => $recentProducts,
        ];
        
        return Inertia::render('Dashboard', [
            'stats' => $stats,
        ]);
    }
}