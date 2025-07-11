import { useState } from 'react';
import axios from 'axios';

export default function Welcome() { 
    const [url, setUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);

    interface ShortenLinkResponse {
        short_url: string;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setShortUrl(null);
        setCopied(false);

        try {
            const response = await axios.post<ShortenLinkResponse>(
                `${import.meta.env.VITE_API_BASE_URL}/api/links`,
                { url }
            );
            setShortUrl(response.data.short_url);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Ocorreu um erro. Verifique se a URL é válida.');
            } else {
                setError('Não foi possível conectar ao servidor. Verifique se ele está rodando.');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!shortUrl) return;
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6 sm:p-8 space-y-6 backdrop-blur-sm bg-opacity-90 transform transition-all duration-300 hover:shadow-2xl">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Encurtador de Links</h1>
                    <p className="text-gray-500 mt-2 text-sm">Cole seu link e obtenha uma versão curta em um clique.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative group">
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://seusite.com/seu-link-muito-grande"
                            className={`w-full px-4 py-3 border ${error ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                            required
                        />
                        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !url}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processando...
                            </>
                        ) : (
                            "Encurtar Link" 
                        )}
                    </button>
                </form>

                {shortUrl && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4 mt-4 animate-fade-in shadow-inner">
                        <p className="text-sm text-blue-800 font-medium">Seu link encurtado:</p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 truncate hover:underline break-all text-sm"
                            >
                                {shortUrl}
                            </a>
                            <button
                                onClick={copyToClipboard}
                                className="text-blue-600 hover:text-blue-800 transition-colors focus:outline-none"
                                title="Copiar link"
                            >
                                {copied ? "Copiado!" : "Copiar"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}