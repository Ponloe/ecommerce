import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Show({ auth, product }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Product Details</h2>}
        >
            <Head title={`${product.name} | Product Details`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between">
                        <Link
                            href={route('products.index')}
                            className="text-indigo-600 hover:text-indigo-900"
                        >
                            &larr; Back to Products
                        </Link>
                        <div className="flex space-x-2">
                            <Link
                                href={route('products.edit', product.id)}
                                className="inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-500 active:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Edit Product
                            </Link>
                            <Link
                                href={route('products.destroy', product.id)}
                                method="delete"
                                as="button"
                                className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                onClick={(e) => {
                                    if (!confirm('Are you sure you want to delete this product?')) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                Delete Product
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex flex-col lg:flex-row">
                                <div className="w-full lg:w-1/3 mb-6 lg:mb-0 lg:pr-8">
                                    {product.image ? (                                        <img 
                                            src={`/storage/${product.image}`}                                             alt={product.name}
                                            className="w-full rounded-lg object-cover h-auto shadow-md"
                                        />
                                    ) : (
                                        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                                            No image available
                                        </div>
                                    )}
                                </div>
                                <div className="w-full lg:w-2/3">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Product Name</p>
                                            <p className="mt-1 text-lg font-semibold text-gray-900">{product.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Price</p>
                                            <p className="mt-1 text-lg font-semibold text-gray-900">${parseFloat(product.price).toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Stock</p>
                                            <p className="mt-1 text-sm text-gray-900">{product.stock} units</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Category</p>
                                            <p className="mt-1 text-sm text-gray-900">{product.category?.name || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Brand</p>
                                            <p className="mt-1 text-sm text-gray-900">{product.brand?.name || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Created At</p>
                                            <p className="mt-1 text-sm text-gray-900">{new Date(product.created_at).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6">
                                        <p className="text-sm font-medium text-gray-500">Description</p>
                                        <div className="mt-2 prose prose-sm max-w-none text-gray-900">
                                            {product.description || 'No description provided'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}