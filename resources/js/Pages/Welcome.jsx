import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="E-commerce Admin" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Navbar */}
                <nav className="bg-white shadow-sm dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                                        E-commerce Admin
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-700"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                            <span className="block">E-commerce</span>
                            <span className="block text-indigo-600 dark:text-indigo-400">Admin Dashboard</span>
                        </h1>
                        {!auth.user && (
                            <div className="mt-8 flex justify-center">
                                <div className="inline-flex rounded-md shadow">
                                    <Link
                                        href={route('login')}
                                        className="rounded-md bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
                                    >
                                        Login to Dashboard
                                    </Link>
                                </div>
                                <div className="ml-3 inline-flex">
                                    <Link
                                        href={route('register')}
                                        className="rounded-md border border-indigo-600 bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-gray-50 dark:bg-transparent dark:text-indigo-400 dark:hover:bg-gray-800"
                                    >
                                        Create Account
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>


                </main>
            </div>
        </>
    );
}