import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Summary Cards */}
                    <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard 
                            title="Total Products" 
                            value={stats.totalProducts} 
                            icon="📦" 
                            change={stats.productChange || "+5%"}
                            link={route('products.index')}
                        />
                        <StatCard 
                            title="Low Stock Items" 
                            value={stats.lowStockCount} 
                            icon="⚠️" 
                            change={stats.lowStockChange || "-2%"}
                            link={route('products.index')}
                            alert={stats.lowStockCount > 5}
                        />
                        <StatCard 
                            title="Categories" 
                            value={stats.categoryCount} 
                            icon="🏷️" 
                            link={route('categories.index')}
                        />
                        <StatCard 
                            title="Brands" 
                            value={stats.brandCount} 
                            icon="🏢" 
                            link={route('brands.index')}
                        />
                    </div>

                    {/* Main Content Area */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Products by Category */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="border-b border-gray-200 p-4">
                                <h3 className="text-lg font-medium text-gray-900">Products by Category</h3>
                            </div>
                            <div className="p-4">
                                <div className="h-80">
                                    {stats.categoriesWithProducts && stats.categoriesWithProducts.length > 0 ? (
                                        <div className="space-y-4">
                                            {stats.categoriesWithProducts.map((category) => (
                                                <div key={category.id} className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="font-medium">{category.name}</span>
                                                        <span className="text-gray-500">{category.product_count} products</span>
                                                    </div>
                                                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                                        <div 
                                                            className="h-2 rounded-full bg-indigo-600" 
                                                            style={{ 
                                                                width: `${(category.product_count / stats.totalProducts) * 100}%` 
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <p className="text-gray-500">No category data available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Stock Status */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="border-b border-gray-200 p-4">
                                <h3 className="text-lg font-medium text-gray-900">Inventory Status</h3>
                            </div>
                            <div className="p-4">
                                <div className="h-80">
                                    {stats.stockStatus ? (
                                        <div className="flex h-full flex-col items-center justify-center">
                                            <div className="relative mb-6 h-48 w-48">
                                                {/* Circular chart representation */}
                                                <svg viewBox="0 0 36 36" className="h-full w-full">
                                                    {/* Background circle */}
                                                    <path
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none"
                                                        stroke="#eee"
                                                        strokeWidth="3"
                                                    />
                                                    {/* In stock percentage */}
                                                    <path
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none"
                                                        stroke="#4f46e5"
                                                        strokeWidth="3"
                                                        strokeDasharray={`${stats.stockStatus.inStockPercentage}, 100`}
                                                    />
                                                    {/* Low stock percentage */}
                                                    <path
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none"
                                                        stroke="#eab308"
                                                        strokeWidth="3"
                                                        strokeDasharray={`${stats.stockStatus.lowStockPercentage}, 100`}
                                                        strokeDashoffset={`-${stats.stockStatus.inStockPercentage}`}
                                                    />
                                                    {/* Out of stock percentage */}
                                                    <path
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none"
                                                        stroke="#ef4444"
                                                        strokeWidth="3"
                                                        strokeDasharray={`${stats.stockStatus.outOfStockPercentage}, 100`}
                                                        strokeDashoffset={`-${stats.stockStatus.inStockPercentage + stats.stockStatus.lowStockPercentage}`}
                                                    />
                                                </svg>
                                                <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center">
                                                    <span className="text-3xl font-bold">{stats.totalProducts}</span>
                                                    <span className="text-sm text-gray-500">Total Products</span>
                                                </div>
                                            </div>
                                            <div className="grid w-full grid-cols-3 gap-4 text-center">
                                                <div>
                                                    <div className="text-lg font-bold">{stats.stockStatus.inStock}</div>
                                                    <div className="flex items-center justify-center space-x-1">
                                                        <div className="h-3 w-3 rounded-full bg-indigo-600"></div>
                                                        <span className="text-sm text-gray-500">In Stock</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-lg font-bold">{stats.stockStatus.lowStock}</div>
                                                    <div className="flex items-center justify-center space-x-1">
                                                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                                        <span className="text-sm text-gray-500">Low Stock</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-lg font-bold">{stats.stockStatus.outOfStock}</div>
                                                    <div className="flex items-center justify-center space-x-1">
                                                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                                        <span className="text-sm text-gray-500">Out of Stock</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <p className="text-gray-500">No inventory data available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Recent Products */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="border-b border-gray-200 p-4">
                                <h3 className="text-lg font-medium text-gray-900">Recent Products</h3>
                            </div>
                            <div className="p-4">
                                {stats.recentProducts && stats.recentProducts.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                        Product
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                        Price
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                        Stock
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                        Category
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {stats.recentProducts.map((product) => (
                                                    <tr key={product.id}>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <div className="flex items-center">
                                                                <div className="h-10 w-10 flex-shrink-0">
                                                                    {product.image ? (
                                                                        <img 
                                                                            className="h-10 w-10 rounded-full object-cover" 
                                                                            src={`/storage/${product.image}`}
                                                                            alt={product.name} 
                                                                        />
                                                                    ) : (
                                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                                                            <span className="text-xs text-gray-500">No img</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="ml-4">
                                                                    <Link 
                                                                        href={route('products.show', product.id)}
                                                                        className="font-medium text-gray-900 hover:text-indigo-600"
                                                                    >
                                                                        {product.name}
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            ${parseFloat(product.price).toFixed(2)}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <StockBadge stock={product.stock} />
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {product.category?.name || 'N/A'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="py-6 text-center text-gray-500">
                                        No recent products found
                                    </div>
                                )}
                                <div className="mt-4 text-right">
                                    <Link
                                        href={route('products.index')}
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                                    >
                                        View all products →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Products by Brand */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="border-b border-gray-200 p-4">
                                <h3 className="text-lg font-medium text-gray-900">Products by Brand</h3>
                            </div>
                            <div className="p-4">
                                <div className="h-80">
                                    {stats.brandsWithProducts && stats.brandsWithProducts.length > 0 ? (
                                        <div className="space-y-4">
                                            {stats.brandsWithProducts.map((brand) => (
                                                <div key={brand.id} className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="font-medium">{brand.name}</span>
                                                        <span className="text-gray-500">{brand.product_count} products</span>
                                                    </div>
                                                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                                        <div 
                                                            className="h-2 rounded-full bg-indigo-600" 
                                                            style={{ 
                                                                width: `${(brand.product_count / stats.totalProducts) * 100}%` 
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <p className="text-gray-500">No brand data available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ title, value, icon, change, link, alert = false }) {
    return (
        <Link href={link} className="block">
            <div className={`overflow-hidden rounded-lg bg-white p-6 shadow-sm transition hover:shadow-md ${alert ? 'border-l-4 border-red-500' : ''}`}>
                <div className="flex items-center">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${alert ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'}`}>
                        <span className="text-2xl">{icon}</span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">{title}</p>
                        <p className="text-2xl font-semibold text-gray-900">{value}</p>
                        {change && (
                            <p className={`text-xs ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                {change} from last month
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

function StockBadge({ stock }) {
    if (stock <= 0) {
        return (
            <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                Out of stock
            </span>
        );
    } else if (stock < 10) {
        return (
            <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                Low stock: {stock}
            </span>
        );
    } else {
        return (
            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                In stock: {stock}
            </span>
        );
    }
}