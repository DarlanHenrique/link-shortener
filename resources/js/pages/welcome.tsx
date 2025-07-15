import { useState } from 'react';

export default function App() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            <div
                className="relative w-full md:w-1/2 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/cta.png')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 flex items-center justify-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white text-center px-6">
                        Bem-vindo ao EncurtaLink!
                    </h1>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 md:py-0">
                <div className="max-w-lg mx-auto text-center md:text-left">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                        Encurte seus links de forma rápida e fácil
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Cole seu link e obtenha uma versão curta em um clique. É simples, rápido e gratuito!
                    </p>
                    <a
                        href={'/login'}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:-translate-y-1"
                    >
                        Entrar na Plataforma
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`ml-2 h-5 w-5 transform transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}