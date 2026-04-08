import { motion } from 'motion/react';
import { Train } from 'lucide-react';

export default function Intro({ onNext }: { onNext: () => void; key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center text-center space-y-8 px-4"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Train className="w-16 h-16 text-indigo-400 opacity-80" />
      </motion.div>
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-slate-200 break-keep">
          마지막 정거장
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 font-light tracking-wide">
          The Last Station
        </p>
      </div>
      <p className="text-slate-500 max-w-md leading-relaxed break-keep">
        당신은 인생이라는 기차에 탑승한 승객입니다.<br className="hidden sm:block"/>
        이 기차는 단 한 번만 출발하며, 결코 되돌아갈 수 없습니다.<br className="hidden sm:block"/>
        이제, 당신만의 고유한 여정을 시작합니다.
      </p>
      <button
        onClick={onNext}
        className="mt-8 px-8 py-3 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-200 hover:bg-indigo-800/40 hover:border-indigo-400/50 transition-all duration-300 tracking-widest text-sm"
      >
        탑승하기
      </button>
    </motion.div>
  );
}
