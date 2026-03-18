import Hero from '@/components/hero';
import { Head, Link } from '@inertiajs/react';
import { Briefcase, Code2, Folder } from 'lucide-react';

interface Props {
    categories: any[];
    experiences: any[];
    projects: any[];
}

export default function Welcome({ categories, experiences, projects }: Props) {
    return (
        <div>
            <Hero />
            <div className="h-96"></div>
        </div>
    );
}
