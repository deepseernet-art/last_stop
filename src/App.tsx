import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Intro from './components/Intro';
import Step1LifeLog from './components/Step1LifeLog';
import Bridge from './components/Bridge';
import Step2Episodes from './components/Step2Episodes';
import Step2UnexpectedStop from './components/Step2UnexpectedStop';
import Step3SieveOfValues from './components/Step3SieveOfValues';
import Step4FinalTicket from './components/Step4FinalTicket';

export default function App() {
  const [step, setStep] = useState(0);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [scenarioChoices, setScenarioChoices] = useState<string[]>([]);

  const nextStep = () => setStep((s) => s + 1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden relative selection:bg-indigo-500/30">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen py-8 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 0 && <Intro key="intro" onNext={nextStep} />}
          {step === 1 && <Step1LifeLog key="step1" studentId={studentId} setStudentId={setStudentId} name={name} setName={setName} onNext={nextStep} />}
          {step === 2 && <Bridge key="bridge1" text="창밖으로 당신이 지나온 평범한 날들의 풍경이 스쳐 지나갑니다." onNext={nextStep} />}
          {step === 3 && <Step2Episodes key="episodes" onNext={(choices) => { setScenarioChoices(choices); nextStep(); }} />}
          {step === 4 && <Step2UnexpectedStop key="step2" onNext={nextStep} />}
          {step === 5 && <Bridge key="bridge2" text="당연하게 여겼던 내일은 오지 않았습니다. 이제 가방을 정리해야 할 시간입니다." onNext={nextStep} />}
          {step === 6 && <Step3SieveOfValues key="step3" selectedValues={selectedValues} setSelectedValues={setSelectedValues} onNext={nextStep} />}
          {step === 7 && <Bridge key="bridge3" text="이 남은 것들이, 당신이 어떤 사람인지 말해줄 것입니다." onNext={nextStep} />}
          {step === 8 && <Step4FinalTicket key="step4" studentId={studentId} name={name} selectedValues={selectedValues} scenarioChoices={scenarioChoices} />}
        </AnimatePresence>
      </main>
    </div>
  );
}
