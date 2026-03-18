import { motion } from 'framer-motion';

export default function Hero() {
    return (
        /* H-screen memastikan tinggi tepat 100vh */
        <section className="relative flex h-screen min-h-[600px] flex-col justify-between overflow-hidden bg-primary p-6 md:p-12 lg:flex-row lg:items-center">
            {/* --- Dekorasi Teks Vertikal --- */}
            <div className="absolute top-12 left-8 hidden flex-col space-y-4 font-heading text-xl tracking-widest text-secondary opacity-20 lg:flex">
                <span className="[writing-mode:vertical-rl]">TASKTO</span>
                <span className="[writing-mode:vertical-rl]">タスクト</span>
            </div>

            {/* --- SISI KIRI: Headline --- */}
            <div className="z-10 mt-12 lg:mt-0 lg:w-1/3">
                <motion.h1
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="font-heading text-5xl leading-[0.9] tracking-tighter text-secondary md:text-7xl lg:text-8xl"
                >
                    Turn <br /> Tasks <br /> Into <br /> Adventures
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 max-w-xs border-t border-secondary/20 pt-8"
                >
                    <p className="font-body text-lg leading-relaxed text-secondary">
                        Manage your tasks, level up with your team, and make
                        every project feel like a game.
                    </p>
                </motion.div>
            </div>

            {/* --- TENGAH: Karakter & FAQ (Kunci Perubahan di Sini) --- */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-full items-end justify-center lg:relative lg:inset-auto lg:h-full lg:w-1/3">
                <div className="pointer-events-auto relative flex h-full w-full items-end justify-center">
                    {/* Karakter Menempel Dasar (Bottom-0) */}
                    <motion.img
                        src="/img/hero.png"
                        alt="Character"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        /* w-auto dan max-h-full agar karakter tidak terpotong tinggi layar */
                        className="z-10 mb-0 max-h-[75vh] w-48 object-contain md:w-72"
                    />

                    {/* Setengah Lingkaran FAQ di Dasar */}
                    <motion.div
                        whileHover={{ y: -10 }} // Animasi hover sedikit naik
                        /* translate-y-1/2 membuatnya terpotong tepat setengah lingkaran */
                        className="absolute bottom-0 z-20 flex h-40 w-40 translate-y-1/2 cursor-pointer flex-col items-center rounded-full border border-secondary bg-primary pt-6 shadow-lg md:h-52 md:w-52 md:translate-y-2/3"
                    >
                        <span className="font-body text-sm font-bold text-secondary md:text-base">
                            Scroll More
                        </span>
                        <span className="mt-5 animate-bounce text-xl text-secondary">
                            ↓
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* --- SISI KANAN: CTA & Deskripsi --- */}
            <div className="z-10 mb-20 flex flex-col items-start space-y-6 text-left lg:mt-0 lg:mb-0 lg:w-1/3 lg:items-end lg:text-right">
                <motion.p
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-xs font-body text-lg text-secondary"
                >
                    With Taskto, every task is an adventure, and you're the
                    hero.
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-xl bg-secondary px-8 py-4 font-body text-lg font-semibold text-primary transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
                >
                    Join & Play Now
                </motion.button>
            </div>

            {/* --- Logo Header --- */}
            <div className="absolute top-8 left-1/2 flex -translate-x-1/2 items-center space-x-3">
                <span className="text-xl text-secondary">✦</span>
                <span className="font-heading text-3xl tracking-tight text-secondary">
                    Taskto
                </span>
                <span className="text-xl text-secondary">✦</span>
            </div>
        </section>
    );
}
