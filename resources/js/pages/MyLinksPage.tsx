import React, { ReactNode } from 'react';
import { Head } from '@inertiajs/react';

// Vamos continuar usando o AppLayoutTemplate diretamente para não mexer no app-layout.tsx
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';

// --- Tipagens Definidas Localmente Dentro Deste Arquivo ---

// 1. Definimos a interface para o objeto 'User' aqui mesmo.
interface User {
    id: number;
    name: string;
    email: string;
}

// 2. Definimos a interface para um 'Link'.
interface Link {
    id: number;
    original_url: string;
    short_code: string;
    visits: number;
}

// 3. Esta é a mudança principal: criamos a interface de props da página
//    declarando 'auth' e 'links' diretamente, sem usar 'PageProps'.
interface MyLinksPageProps {
    auth: {
        user: User;
    };
    links: Link[];
}

// O componente agora usa nossa interface local MyLinksPageProps
export default function MyLinksPage({ auth, links }: MyLinksPageProps) {

    const fullShortUrl = (short_code: string): string => {
        return `${window.location.origin}/${short_code}`;
    };

    return (
        <AppLayoutTemplate
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Meus Links (CRUD)</h2>}
        >
            <Head title="Meus Links" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium text-gray-900">
                                Seus Links Encurtados
                            </h3>
                            {links.length > 0 ? (
                                <div className="mt-4 overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL Original</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link Curto</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliques</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {links.map((link) => (
                                                <tr key={link.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">{link.original_url}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                                                        <a href={fullShortUrl(link.short_code)} target="_blank" rel="noopener noreferrer">
                                                            {fullShortUrl(link.short_code)}
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{link.visits}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">Editar</a>
                                                        <a href="#" className="text-red-600 hover:text-red-900 ml-4">Deletar</a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="mt-4">Você ainda não possui links encurtados.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayoutTemplate>
    );
}