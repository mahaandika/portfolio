import { motion } from 'framer-motion';

export default function Hero() {
    return (
        /* H-screen tetap 100vh */
        <section className="relative flex h-screen min-h-[600px] flex-col justify-between overflow-hidden bg-primary p-6 md:p-10 lg:flex-row lg:items-center lg:p-12">
            {/* --- Logo Header (Agung Andika) --- */}
            <div className="absolute top-6 left-1/2 z-50 flex -translate-x-1/2 items-center space-x-2 md:top-8 md:space-x-3">
                <span className="text-lg text-secondary md:text-xl">✦</span>

                {/* 'whitespace-nowrap' memastikan nama kamu tidak akan pernah 'enter' ke bawah */}
                <span className="font-heading text-xl tracking-tight whitespace-nowrap text-secondary md:text-3xl">
                    Agung Andika
                </span>

                <span className="text-lg text-secondary md:text-xl">✦</span>
            </div>

            {/* --- SISI KIRI: Headline & Paragraf --- */}
            <div className="z-10 mt-15 flex flex-col items-center text-center lg:mt-0 lg:w-1/3 lg:items-start lg:text-left">
                <motion.h1
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    /* Ukuran font responsif: 4xl di mobile, 7xl di tablet, 8xl di desktop */
                    className="font-heading text-2xl leading-[1.1] text-secondary sm:text-4xl md:text-4xl lg:text-8xl lg:leading-[0.9]"
                >
                    {/* Trik: <br /> hanya aktif di layar besar (lg ke atas) */}
                    Turn <br className="hidden lg:block" />
                    Concept <br className="hidden lg:block" />
                    Into <br className="hidden lg:block" />
                    Creation
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-3 md:mt-5 lg:max-w-sm"
                >
                    <p className="font-body text-sm leading-relaxed text-secondary md:text-lg">
                        I design and build digital experiences that look great
                        and work flawlessly. Turning ideas into engaging,
                        memorable interfaces.
                    </p>
                </motion.div>

                {/* Tombol Explore untuk Mobile/Tablet */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-5 rounded-xl bg-secondary px-6 py-3 font-body text-sm font-semibold text-primary shadow-lg lg:hidden"
                >
                    My Creative Journey
                </motion.button>
            </div>

            {/* --- TENGAH: Karakter & Scroll Circle --- */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-full items-end justify-center lg:relative lg:inset-auto lg:h-full lg:w-1/3">
                <div className="pointer-events-auto relative flex h-full w-full items-end justify-center">
                    <motion.img
                        src="/img/hero.png"
                        alt="Character"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="z-10 mb-0 max-h-[58vh] w-44 object-contain md:max-h-[60vh] md:w-64 lg:max-h-[75vh] lg:w-80"
                    />

                    {/* Setengah Lingkaran Scroll */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="absolute bottom-0 z-20 flex h-32 w-32 translate-y-4 cursor-pointer flex-col items-center rounded-full border border-secondary bg-primary pt-4 shadow-lg md:h-40 md:w-40 md:translate-y-2/3 lg:h-52 lg:w-52"
                    >
                        <span className="font-body text-xs font-bold text-secondary md:text-sm lg:text-base">
                            Scroll More
                        </span>
                        <span className="mt-2 animate-bounce text-lg text-secondary md:mt-4 lg:mt-5 lg:text-xl">
                            ↓
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* --- SISI KANAN: CTA & Deskripsi (HANYA DESKTOP) --- */}
            <div className="z-10 hidden flex-col items-end space-y-6 text-right lg:flex lg:w-1/3">
                <motion.p
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="font-body text-lg text-secondary lg:max-w-md"
                >
                    Every project is crafted with purpose, balancing design,
                    performance, and usability to help brands stand out and
                    grow.
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-xl bg-secondary px-8 py-4 font-body text-lg font-semibold text-primary transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
                >
                    Get in Touch
                </motion.button>
            </div>
        </section>
    );
}
