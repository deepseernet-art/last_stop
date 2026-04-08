import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const EPISODES = [
  {
    title: "평범한 오후",
    scenario: "따뜻한 햇살이 비추는 주말 오후. 가장 좋아하는 라면을 끓여 먹으며 밀린 예능을 보고 있습니다. 평화롭고 나른한 시간입니다. 문득 창밖을 보니 날씨가 너무 좋습니다.",
    choiceA: "친구에게 연락해 밖으로 나간다",
    choiceB: "이 평온한 혼자만의 시간을 마저 즐긴다",
    interludeA: "친구와 웃고 떠드는 사이, 오후의 햇살은 어느새 붉은 노을로 변했습니다. 함께 나누는 시간의 온기가 마음에 남았습니다.",
    interludeB: "방 안을 채우는 고요함 속에서 온전한 휴식을 취했습니다. 누구의 방해도 없는 이 고독이 때로는 가장 큰 위로가 됩니다."
  },
  {
    title: "엇갈린 마음",
    scenario: "저녁 무렵, 사소한 오해로 소중한 사람과 다투었습니다. 홧김에 날선 말을 내뱉고 돌아섰지만, 집으로 걸어오는 내내 마음 한구석이 무겁습니다.",
    choiceA: "먼저 전화를 걸어 '미안해'라고 사과한다",
    choiceB: "'내일 만나서 얘기하면 풀리겠지' 하고 넘긴다",
    interludeA: "수화기 너머로 들려오는 떨리는 목소리에, 엉켜있던 마음이 스르르 풀렸습니다. 용기 내어 건넨 한마디가 소중한 관계를 지켜냈습니다.",
    interludeB: "마음이 찝찝했지만, 우리에겐 언제나 내일이 있을 거라 믿었습니다. 굳이 오늘 감정을 소모할 필요는 없으니까요."
  },
  {
    title: "내일의 약속",
    scenario: "밤이 깊어갑니다. 내년에 꼭 가고 싶었던 여행을 위해 용돈을 모으고 있던 참입니다. 그런데 오늘, 평소 정말 갖고 싶던 물건이 한정 수량으로 크게 할인 중이라는 알림이 울립니다.",
    choiceA: "지금 당장의 확실한 즐거움을 위해 물건을 산다",
    choiceB: "내년의 특별한 여행을 위해 꾹 참고 저금한다",
    interludeA: "택배를 기다리는 설렘이 오늘 밤을 기분 좋게 만듭니다. 불확실한 미래보다는 지금 당장 손에 쥘 수 있는 행복이 더 선명하게 다가옵니다.",
    interludeB: "통장 잔고가 늘어난 것을 보며 뿌듯함을 느낍니다. 당장의 유혹을 이겨낸 인내가 훗날 더 큰 보상으로 돌아올 거라 굳게 믿습니다."
  },
  {
    title: "스쳐가는 인연",
    scenario: "다음 날 아침, 늦잠을 자서 서둘러 집을 나섰습니다. 횡단보도 신호가 깜빡이는데, 옆에 무거운 짐을 든 누군가가 짐을 떨어뜨려 당황하고 계십니다.",
    choiceA: "지각하더라도 다음 신호를 기다리기로 하고 짐 줍는 것을 돕는다",
    choiceB: "서둘러 횡단보도를 뛰어 건넌다",
    interludeA: "\"고맙습니다\"라는 따뜻한 인사 한마디에 조급했던 마음이 가라앉았습니다. 조금 늦더라도 누군가에게 내민 손길이 하루의 시작을 다르게 만들었습니다.",
    interludeB: "숨을 헐떡이며 간신히 길을 건넜습니다. 뒤돌아볼 여유조차 없는 바쁜 일상 속에서, 우리는 각자의 목적지를 향해 묵묵히 걸음을 옮깁니다."
  },
  {
    title: "잠들기 전",
    scenario: "여느 때와 다름없이 평범하고도 치열했던 하루가 끝나고 다시 침대에 누웠습니다. 천장을 바라보며 조용히 생각에 잠깁니다.",
    choiceA: "'오늘 하루도 무사히 잘 보냈어'라며 스스로를 다독인다",
    choiceB: "'내일은 더 의미 있는 하루를 만들어야지'라며 다짐한다",
    interludeA: "눈을 감으며 오늘 하루의 평온함에 감사했습니다. 특별한 일은 없었지만, 그것만으로도 충분히 좋은 날이었습니다.",
    interludeB: "내일에 대한 기대감을 품고 눈을 감았습니다. 다가올 시간들은 분명 오늘보다 더 반짝일 것이라 믿어 의심치 않았습니다."
  }
];

export default function Step2Episodes({ onNext }: { onNext: (choices: string[]) => void; key?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInterlude, setShowInterlude] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);
  const [lastChoice, setLastChoice] = useState<'A' | 'B' | null>(null);

  const handleChoice = (choiceText: 'A' | 'B') => {
    const newChoices = [...choices, choiceText];
    setChoices(newChoices);
    setLastChoice(choiceText);
    setShowInterlude(true);
  };

  const handleNextEpisode = () => {
    if (currentIndex < EPISODES.length - 1) {
      setShowInterlude(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      onNext(choices);
    }
  };

  const currentEpisode = EPISODES[currentIndex];
  const interludeText = lastChoice === 'A' ? currentEpisode.interludeA : currentEpisode.interludeB;

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
              "{interludeText}"
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
                  onClick={() => handleChoice('A')}
                  className="w-full p-5 rounded-xl bg-slate-800/60 hover:bg-indigo-900/40 border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 text-slate-200 text-left sm:text-center break-keep group"
                >
                  <span className="text-indigo-400 mr-3 opacity-50 group-hover:opacity-100 transition-opacity">A.</span>
                  {currentEpisode.choiceA}
                </button>
                <button
                  onClick={() => handleChoice('B')}
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
