import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, brand }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Brand Details</h2>}
        >
            <Head title="Brand Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="mb-6">
                                <Link
                                    href={route('brands.index')}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    ← Back to Brands
                                </Link>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Brand Information</h3>
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">ID</p>
                                        <p className="mt-1 text-sm text-gray-900">{brand.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Name</p>
                                        <p className="mt-1 text-sm text-gray-900">{brand.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Description</p>
                                        <p className="mt-1 text-sm text-gray-900">{brand.description || 'No description provided'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Created At</p>
                                        <p className="mt-1 text-sm text-gray-900">{new Date(brand.created_at).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Updated At</p>
                                        <p className="mt-1 text-sm text-gray-900">{new Date(brand.updated_at).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex space-x-4">
                                <Link
                                    href={route('brands.edit', brand.id)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={route('brands.destroy', brand.id)}
                                    method="delete"
                                    as="button"
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                    onClick={(e) => {
                                        if (!confirm('Are you sure you want to delete this brand?')) {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    Delete
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}