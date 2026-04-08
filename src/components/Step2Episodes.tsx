import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const EPISODES = [
  {
    title: "평범한 오후",
    scenario: "따뜻한 햇살이 비추는 주말 오후. 가장 좋아하는 라면을 끓여 먹으며 밀린 예능을 보고 있습니다. 평화롭고 나른한 시간입니다.",
    choiceA: "친구에게 연락해 밖으로 나간다",
    choiceB: "이 평온한 혼자만의 시간을 마저 즐긴다",
    interlude: "그렇게 또 하루가 지나갔습니다. 특별할 것 없는, 늘 똑같고 평온한 날이었습니다."
  },
  {
    title: "미뤄둔 마음",
    scenario: "아침에 사소한 일로 소중한 사람과 다투었습니다. 홧김에 문을 쾅 닫고 나왔지만, 하루 종일 마음 한구석이 무겁습니다.",
    choiceA: "'미안해'라고 먼저 문자를 보낸다",
    choiceB: "'저녁에 만나서 얘기하면 되지' 하고 넘긴다",
    interlude: "마음 한구석이 찝찝했지만, 내일 사과하면 될 거라고 생각했습니다. 우리에겐 언제나 내일이 있으니까요."
  },
  {
    title: "내일의 약속",
    scenario: "내년에 꼭 가고 싶었던 여행을 위해 용돈을 모으고 있습니다. 그런데 오늘, 평소 정말 갖고 싶던 물건이 크게 할인 중입니다.",
    choiceA: "지금 당장의 즐거움을 위해 물건을 산다",
    choiceB: "내년의 특별한 여행을 위해 꾹 참고 저금한다",
    interlude: "미래를 위해 현재를 참거나, 지금 당장의 기쁨을 누리거나. 우리는 늘 무언가를 선택하며 살아갑니다."
  },
  {
    title: "작은 친절",
    scenario: "횡단보도 신호가 깜빡입니다. 뛰면 건널 수 있는데, 옆에 무거운 짐을 든 누군가가 위태롭게 서 계십니다.",
    choiceA: "다음 신호를 기다리기로 하고 짐을 돕는다",
    choiceB: "서둘러 횡단보도를 뛰어 건넌다",
    interlude: "스쳐 지나가는 수많은 인연들 속에서, 우리는 각자의 목적지를 향해 바쁘게 걸음을 옮깁니다."
  },
  {
    title: "잠들기 전",
    scenario: "여느 때와 다름없이 평범했던 하루가 끝나고 침대에 누웠습니다. 눈을 감으며 조용히 생각에 잠깁니다.",
    choiceA: "'오늘도 무사히 잘 보냈어'라며 안도한다",
    choiceB: "'내일은 더 재밌는 걸 해야지'라며 기대한다",
    interlude: ""
  }
];

export default function Step2Episodes({ onNext }: { onNext: () => void; key?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInterlude, setShowInterlude] = useState(false);

  const handleChoice = () => {
    if (currentIndex < EPISODES.length - 1) {
      setShowInterlude(true);
    } else {
      onNext();
    }
  };

  const handleNextEpisode = () => {
    setShowInterlude(false);
    setCurrentIndex(prev => prev + 1);
  };

  const currentEpisode = EPISODES[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center w-full max-w-2xl px-4 min-h-[400px]"
    >
      <AnimatePresence mode="wait">
        {showInterlude ? (
          <motion.div
            key="interlude"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1.5 }}
            className="text-center space-y-12 cursor-pointer"
            onClick={handleNextEpisode}
          >
            <p className="text-xl sm:text-2xl text-slate-300 font-light leading-relaxed break-keep">
              "{currentEpisode.interlude}"
            </p>
            <p className="text-sm text-slate-500 animate-pulse">화면을 터치하여 다음으로</p>
          </motion.div>
        ) : (
          <motion.div
            key={`episode-${currentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="text-center space-y-2 mb-12">
              <p className="text-indigo-400 font-medium tracking-widest text-sm">
                SCENE {currentIndex + 1} / {EPISODES.length}
              </p>
              <h2 className="text-2xl sm:text-3xl font-light text-slate-200">
                {currentEpisode.title}
              </h2>
            </div>

            <div className="w-full space-y-12">
              <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 shadow-lg">
                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed break-keep text-center font-light">
                  {currentEpisode.scenario}
                </p>
              </div>

              <div className="flex flex-col space-y-4">
                <button
                  onClick={handleChoice}
                  className="w-full p-5 rounded-xl bg-slate-800/60 hover:bg-indigo-900/40 border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 text-slate-200 text-left sm:text-center break-keep group"
                >
                  <span className="text-indigo-400 mr-3 opacity-50 group-hover:opacity-100 transition-opacity">A.</span>
                  {currentEpisode.choiceA}
                </button>
                <button
                  onClick={handleChoice}
                  className="w-full p-5 rounded-xl bg-slate-800/60 hover:bg-indigo-900/40 border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 text-slate-200 text-left sm:text-center break-keep group"
                >
                  <span className="text-indigo-400 mr-3 opacity-50 group-hover:opacity-100 transition-opacity">B.</span>
                  {currentEpisode.choiceB}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
