import About from '@/components/about';
import Expertise from '@/components/expertise';
import Hero from '@/components/hero';
import Projects from '@/components/projects';
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
            <About />
            <Expertise experiences={experiences} />
            <Projects projects={projects} />
        </div>
    );
}
