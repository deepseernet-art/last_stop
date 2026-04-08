import { motion, AnimatePresence } from 'motion/react';

export default function Step1LifeLog({ 
  studentId, setStudentId, name, setName, onNext 
}: { 
  studentId: string, setStudentId: (id: string) => void, 
  name: string, setName: (n: string) => void, 
  onNext: () => void; key?: string 
}) {
  const isValid = studentId.trim().length > 0 && name.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center w-full max-w-md px-4"
    >
      <div className="text-center space-y-6 mb-10">
        <h2 className="text-2xl sm:text-3xl font-light text-slate-200">삶의 기록</h2>
        <p className="text-slate-400 leading-relaxed break-keep">
          이 기차의 탑승객은 오직 당신뿐입니다.<br className="hidden sm:block"/>
          우주에서 유일하고 고유한 당신의 기록을 남겨주세요.
        </p>
      </div>

      <div className="w-full space-y-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="학번 (예: 20101)"
            className="w-1/3 bg-slate-900/50 border-b-2 border-slate-700 px-4 py-3 text-center text-lg text-slate-200 focus:outline-none focus:border-indigo-400 transition-colors placeholder:text-slate-600"
            maxLength={10}
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            className="w-2/3 bg-slate-900/50 border-b-2 border-slate-700 px-4 py-3 text-center text-lg text-slate-200 focus:outline-none focus:border-indigo-400 transition-colors placeholder:text-slate-600"
            maxLength={10}
          />
        </div>

        <AnimatePresence>
          {isValid && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-slate-100 p-6 rounded-lg shadow-xl relative overflow-hidden mt-4 w-full text-slate-900 border-2 border-slate-300">
                <div className="absolute top-0 left-0 w-full h-3 bg-indigo-700" />
                <div className="flex justify-between items-center border-b-2 border-dashed border-slate-400 pb-4 mb-4 mt-2">
                  <h3 className="text-xl font-bold tracking-widest text-slate-800">승차권</h3>
                  <span className="text-xs font-bold bg-slate-200 px-2 py-1 rounded text-slate-600">단 한 번의 여정</span>
                </div>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <p className="text-xs text-slate-500 font-medium">출발</p>
                      <p className="text-xl font-bold text-slate-800">탄생</p>
                    </div>
                    <div className="text-center flex flex-col items-center justify-center px-4">
                      <p className="text-[10px] sm:text-xs text-indigo-700 font-bold mb-1">일회성 · 유일성 · 고유성</p>
                      <div className="w-full min-w-[80px] h-[2px] bg-indigo-200 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-700 rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 font-medium">도착</p>
                      <p className="text-xl font-bold text-slate-800">마지막 정거장</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border border-slate-200 shadow-sm">
                    <p className="text-xs text-slate-500 mb-1 font-medium">탑승객 (고유한 존재)</p>
                    <p className="text-lg font-bold text-slate-800">{studentId} {name}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center pb-4">
                <button
                  onClick={onNext}
                  className="px-8 py-3 rounded-full bg-slate-100 text-slate-900 hover:bg-white transition-colors font-medium tracking-wide"
                >
                  기록 남기고 출발하기
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
