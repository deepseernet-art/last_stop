import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

// 물질적/도구적 가치와 정신적/본래적 가치를 적절히 혼합 (15가지)
const VALUES = [
  '돈', '권력', '외모', '건강', '명예', // 물질적, 도구적
  '사랑', '가족', '우정', '행복', '자유', // 정신적, 본래적
  '지혜', '평화', '정의', '용기', '재미'  // 정신적, 본래적
];

export default function Step3SieveOfValues({ 
  selectedValues, 
  setSelectedValues, 
  onNext 
}: { 
  selectedValues: string[], 
  setSelectedValues: (v: string[]) => void, 
  onNext: () => void;
  key?: string;
}) {
  const [timeLeft, setTimeLeft] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 0.2)); // Slower decrease
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const toggleValue = (val: string) => {
    if (selectedValues.includes(val)) {
      setSelectedValues(selectedValues.filter(v => v !== val));
    } else if (selectedValues.length < 3) {
      setSelectedValues([...selectedValues, val]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center w-full max-w-4xl px-4"
    >
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-light text-slate-200">가치의 선별</h2>
        <p className="text-slate-400 break-keep">
          삶의 유한함 속에서 진정한 의미를 찾아보세요.<br className="hidden sm:block"/>
          마지막까지 가져갈 수 있는 가치는 단 <span className="text-indigo-400 font-medium">3개</span>뿐입니다.
        </p>
      </div>

      {/* Time Gauge */}
      <div className="w-full max-w-md mb-10">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>남은 시간</span>
          <span>유한함</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            style={{ width: `${timeLeft}%` }}
          />
        </div>
      </div>

      {/* Floating Orbs */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 relative min-h-[400px] sm:min-h-[500px] items-center px-4">
        {VALUES.map((val, i) => {
          const isSelected = selectedValues.includes(val);
          const isDisabled = !isSelected && selectedValues.length >= 3;
          
          const randomDelay = i * 0.1;
          const randomX = (i % 3 === 0 ? 1 : -1) * (20 + (i % 4) * 15); // 20 to 65
          const randomY = (i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 15); // 20 to 80
          const randomDurationX = 4 + (i % 3) * 2;
          const randomDurationY = 5 + (i % 4) * 1.5;

          return (
            <motion.button
              key={val}
              onClick={() => toggleValue(val)}
              disabled={isDisabled}
              animate={{
                x: isSelected ? 0 : [0, randomX, 0, -randomX, 0],
                y: isSelected ? 0 : [0, -randomY, 0, randomY, 0],
                scale: isSelected ? 1.1 : 1,
              }}
              transition={{
                x: { duration: randomDurationX, repeat: Infinity, ease: "easeInOut", delay: randomDelay },
                y: { duration: randomDurationY, repeat: Infinity, ease: "easeInOut", delay: randomDelay },
                scale: { duration: 0.2 }
              }}
              className={`
                relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-base sm:text-lg font-medium transition-all duration-300
                ${isSelected 
                  ? 'bg-indigo-600/90 text-white shadow-[0_0_20px_rgba(79,70,229,0.6)] border border-indigo-400 z-10' 
                  : isDisabled
                    ? 'bg-slate-800/30 text-slate-600 border border-slate-800/50 cursor-not-allowed'
                    : 'bg-slate-800/60 text-slate-300 border border-slate-700 hover:bg-slate-700/80 hover:border-slate-500 cursor-pointer backdrop-blur-sm'
                }
              `}
            >
              {val}
            </motion.button>
          );
        })}
      </div>

      <div className="h-24 flex items-center justify-center w-full">
        <AnimatePresence>
          {selectedValues.length === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex flex-col items-center space-y-4"
            >
              <p className="text-indigo-300 text-sm">선택이 완료되었습니다.</p>
              <button
                onClick={onNext}
                className="px-8 py-3 rounded-full bg-slate-100 text-slate-900 hover:bg-white transition-colors font-medium tracking-wide"
              >
                묘비명 작성하기
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
