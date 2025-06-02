import React, { useState, useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

export default function Edit({ auth, product, categories, brands }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        category_id: product.category_id || '',
        brand_id: product.brand_id || '',
        image: null,
        _method: 'PUT', 
    });
    
    const [preview, setPreview] = useState(product.image_url || null);

    function handleSubmit(e) {
        e.preventDefault();
        post(route('products.update', product.id), {
            forceFormData: true,
            preserveState: true,
        });
    }
    
    function handleImageChange(e) {
        const file = e.target.files[0];
        setData('image', file);
        
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Product</h2>}
        >
            <Head title="Edit Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('products.index')}
                            className="text-indigo-600 hover:text-indigo-900"
                        >
                            &larr; Back to Products
                        </Link>
                    </div>
                
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="description" value="Description" />
                                    <textarea
                                        id="description"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows="4"
                                    ></textarea>
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="price" value="Price" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        className="mt-1 block w-full"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                    />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="stock" value="Stock" />
                                    <TextInput
                                        id="stock"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                    />
                                    <InputError message={errors.stock} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="category_id" value="Category" />
                                    <select
                                        id="category_id"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.category_id} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="brand_id" value="Brand" />
                                    <select
                                        id="brand_id"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.brand_id}
                                        onChange={(e) => setData('brand_id', e.target.value)}
                                    >
                                        <option value="">Select a brand</option>
                                        {brands.map((brand) => (
                                            <option key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.brand_id} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="image" value="Image" />
                                    <div className="mt-1 flex items-center">
                                        {preview && (
                                            <div className="mr-4">
                                                <img 
                                                    src={preview} 
                                                    alt="Preview" 
                                                    className="h-24 w-24 object-cover rounded-md"
                                                />
                                            </div>
                                        )}
                                        <input
                                            id="image"
                                            type="file"
                                            className="block w-full"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Leave empty to keep the current image</p>
                                    <InputError message={errors.image} className="mt-2" />
                                    
                                    {progress && (
                                        <progress value={progress.percentage} max="100" className="mt-2">
                                            {progress.percentage}%
                                        </progress>
                                    )}
                                </div>

                                <div className="flex items-center justify-end mt-4 space-x-2">
                                    <Link
                                        href={route('products.index')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Cancel
                                    </Link>
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Update Product
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}