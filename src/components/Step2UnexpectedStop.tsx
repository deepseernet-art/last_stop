import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Step2UnexpectedStop({ onNext }: { onNext: () => void; key?: string }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => setPhase(2), 6000);
    const t3 = setTimeout(() => setPhase(3), 10000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, backgroundColor: 'transparent' }}
      animate={{ opacity: 1, backgroundColor: '#000000' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="max-w-2xl space-y-12">
        <AnimatePresence mode="wait">
          {phase >= 1 && (
            <motion.div
              key="p1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
              className="space-y-4"
            >
              <p className="text-xl sm:text-2xl md:text-3xl text-slate-400 font-light break-keep leading-relaxed">
                당연하게 내일이 올 줄 알았습니다.<br/>
                내년의 여행을, 내일의 화해를, 다음 신호를 기약했지만...
              </p>
            </motion.div>
          )}
          {phase >= 2 && (
            <motion.div
              key="p2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
              className="space-y-4 mt-8"
            >
              <p className="text-2xl sm:text-3xl md:text-4xl text-slate-200 font-medium break-keep leading-relaxed">
                기차가 갑자기 멈춰 섰습니다.
              </p>
              <p className="text-lg sm:text-xl text-slate-500 font-light break-keep">
                이곳은 우리가 미처 준비하지 못한, 마지막 정거장입니다.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16"
          >
            <button
              onClick={onNext}
              className="px-8 py-3 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 rounded-full transition-colors text-sm tracking-widest"
            >
              열차에서 내리기
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
