import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import LinkShortener from './linkShortener';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Link Shortener',
        href: '/link-shortener',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Link Shortener" />
            <LinkShortener />
        </AppLayout>
    );
}
