import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function Bridge({ text, onNext }: { text: string, onNext: () => void; key?: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 6000); // Auto advance after 6 seconds
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="flex items-center justify-center text-center px-6 cursor-pointer absolute inset-0 z-20"
      onClick={onNext}
    >
      <p className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-slate-300 max-w-3xl break-keep">
        "{text}"
      </p>
    </motion.div>
  );
}
