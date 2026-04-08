import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import * as htmlToImage from 'html-to-image';
import { Download, Copy, Check, FileSpreadsheet, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function Step4FinalTicket({ studentId, name, selectedValues, scenarioChoices = [] }: { studentId: string, name: string, selectedValues: string[], scenarioChoices?: string[]; key?: string }) {
  const defaultEpitaph = `나는 ${selectedValues[0] || '___'}을(를) 사랑하고, ${selectedValues[1] || '___'}을(를) 추구하며, ${selectedValues[2] || '___'}을(를) 남기고 떠난 사람입니다.`;
  const [epitaph, setEpitaph] = useState(defaultEpitaph);
  const [copiedText, setCopiedText] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const tombstoneRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Save to localStorage whenever epitaph changes
  useEffect(() => {
    const saveToLocal = () => {
      const records = JSON.parse(localStorage.getItem('lastStationRecords') || '[]');
      const newRecord = {
        timestamp: new Date().toISOString(),
        studentId,
        name,
        values: selectedValues.join(', '),
        epitaph,
        scenarioChoices
      };
      // Update existing record for this student if it exists, otherwise push
      const existingIndex = records.findIndex((r: any) => r.studentId === studentId && r.name === name);
      if (existingIndex >= 0) {
        records[existingIndex] = newRecord;
      } else {
        records.push(newRecord);
      }
      localStorage.setItem('lastStationRecords', JSON.stringify(records));
    };
    
    const timeoutId = setTimeout(saveToLocal, 500); // debounce saving
    return () => clearTimeout(timeoutId);
  }, [epitaph, studentId, name, selectedValues]);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(epitaph);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownloadImage = async () => {
    if (!tombstoneRef.current) return;
    try {
      const node = tombstoneRef.current;
      const dataUrl = await htmlToImage.toPng(node, {
        backgroundColor: '#94a3b8', // slate-400
        pixelRatio: 2,
        width: node.offsetWidth,
        height: node.offsetHeight,
        style: { margin: '0', transform: 'none' }
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${studentId}_${name}_묘비명.png`;
      link.click();
    } catch (err) {
      console.error('Failed to generate image: ', err);
      showToast('이미지 다운로드에 실패했습니다.');
    }
  };

  const handleExportExcel = () => {
    const records = JSON.parse(localStorage.getItem('lastStationRecords') || '[]');
    if (records.length === 0) {
      showToast('저장된 기록이 없습니다.');
      return;
    }
    const ws = XLSX.utils.json_to_sheet(records.map((r: any) => {
      const choices = Array.isArray(r.scenarioChoices) 
        ? r.scenarioChoices 
        : (typeof r.scenarioChoices === 'string' ? r.scenarioChoices.split(' | ') : []);
        
      return {
        '일시': new Date(r.timestamp).toLocaleString(),
        '학번': r.studentId,
        '이름': r.name,
        '시나리오 1': choices[0] || '',
        '시나리오 2': choices[1] || '',
        '시나리오 3': choices[2] || '',
        '시나리오 4': choices[3] || '',
        '시나리오 5': choices[4] || '',
        '선택한 가치': r.values,
        '묘비명': r.epitaph
      };
    }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "학생 기록");
    XLSX.writeFile(wb, "마지막_정거장_전체기록.xlsx");
  };

  const confirmReset = () => {
    localStorage.removeItem('lastStationRecords');
    setShowResetModal(false);
    showToast('모든 기록이 초기화되었습니다.');
  };

  const todayDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center w-full max-w-2xl px-4 pb-20"
    >
      <div className="text-center space-y-4 mb-10">
        <h2 className="text-2xl sm:text-3xl font-light text-slate-200">마지막 메시지</h2>
        <p className="text-slate-400 break-keep">
          당신의 삶을 요약하는 묘비명을 완성해주세요.<br className="hidden sm:block"/>
          문장을 자유롭게 수정할 수 있습니다.
        </p>
      </div>

      {/* Tombstone to capture */}
      <div className="w-full flex justify-center mb-8">
        <div 
          ref={tombstoneRef}
          className="w-full max-w-sm bg-gradient-to-b from-slate-300 to-slate-500 p-8 sm:p-12 rounded-t-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-x-4 border-t-4 border-slate-400 relative overflow-hidden flex flex-col items-center min-h-[450px]"
        >
          {/* Texture overlay - using CSS gradient instead of external image to prevent CORS issues with html-to-image */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-400 via-transparent to-slate-600 mix-blend-multiply pointer-events-none"></div>

          <div className="text-center space-y-6 relative z-10 w-full">
            <div className="w-12 h-1 bg-slate-600 mx-auto rounded-full mb-8" />

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800 tracking-widest">묘비명</h3>

            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-700">{studentId}</p>
              <p className="text-xl font-bold text-slate-900">{name}</p>
            </div>

            <textarea
              value={epitaph}
              onChange={(e) => setEpitaph(e.target.value)}
              className="w-full bg-transparent text-center text-lg text-slate-800 font-medium leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-slate-600/50 rounded-lg p-2 break-keep"
              rows={5}
              spellCheck={false}
            />

            <div className="w-full pt-5 border-t border-slate-400/50 flex flex-col items-center gap-3">
              <p className="text-xs font-semibold text-slate-600 tracking-widest">{todayDate}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {selectedValues.map(val => (
                  <span key={val} className="px-3 py-1 bg-slate-700 text-slate-200 rounded-full text-xs shadow-inner">
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
        <button
          onClick={handleDownloadImage}
          className="flex-1 w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-500/20 text-base font-bold tracking-wide"
        >
          <Download className="w-5 h-5" />
          <span>이미지 다운로드</span>
        </button>
        <button
          onClick={handleCopyText}
          className="flex-1 w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700 text-base font-bold tracking-wide shadow-lg"
        >
          {copiedText ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
          <span>{copiedText ? '복사 완료' : '텍스트 복사'}</span>
        </button>
      </div>
      
      <div className="mt-12 flex flex-col items-center gap-4 border-t border-slate-800 pt-8 w-full">
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-4"
        >
          처음으로 돌아가기
        </button>
        
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-400 transition-colors"
            title="지금까지 참여한 모든 학생의 기록을 엑셀로 다운로드합니다."
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>전체 결과 엑셀 내보내기</span>
          </button>
          
          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center gap-2 text-xs text-red-900/70 hover:text-red-500 transition-colors"
            title="저장된 모든 학생의 기록을 삭제합니다."
          >
            <Trash2 className="w-4 h-4" />
            <span>전체 결과 초기화</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl z-50 text-sm whitespace-pre-wrap text-center border border-slate-700"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 p-8 rounded-2xl max-w-sm w-full shadow-2xl text-center space-y-6"
            >
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-medium text-slate-200">기록 초기화</h3>
              <p className="text-slate-400 text-sm break-keep leading-relaxed">
                정말로 모든 학생의 기록을 초기화하시겠습니까?<br/>
                이 작업은 되돌릴 수 없습니다.
              </p>
              <div className="flex gap-3 justify-center pt-4">
                <button
                  onClick={() => setShowResetModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors text-sm font-medium flex-1"
                >
                  취소
                </button>
                <button
                  onClick={confirmReset}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-colors text-sm font-medium flex-1"
                >
                  초기화
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
