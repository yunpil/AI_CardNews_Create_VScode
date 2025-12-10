"use client";

import { useState } from "react";
import { CardData } from "@/types";
import CardItem from "@/components/CardItem";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    // 입력된 주제를 콘솔에 기록
    console.log("생성하기 클릭:", topic);

    // 로딩 상태 시작
    setIsLoading(true);
    setCards([]);
    setError(null);

    try {
      // Gemini API 호출
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "카드 생성에 실패했습니다.");
      }

      // 생성된 카드 데이터로 상태 업데이트
      setCards(data.cards);
    } catch (err) {
      console.error("카드 생성 중 오류 발생:", err);
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      // 로딩 상태 종료
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* 헤더 영역 */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AI 카드뉴스 생성기
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            주제를 입력하면 AI가 멋진 카드뉴스를 생성합니다
          </p>
        </header>

        {/* 메인 컴포넌트 */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
          {/* 입력 영역 */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <label
                htmlFor="topic-input"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                📝 주제 입력
              </label>
              <input
                id="topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && topic.trim() && !isLoading) {
                    handleGenerate();
                  }
                }}
                placeholder="예: 건강한 아침 식사의 중요성, 효과적인 시간 관리 방법"
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-gray-900 dark:text-white dark:bg-gray-700/50 placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={handleGenerate}
                disabled={!topic.trim() || isLoading}
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none transition-all duration-200 flex items-center justify-center gap-2 min-w-[140px]"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    생성 중...
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    생성하기
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-600 dark:text-red-400 flex items-center gap-2">
                <span>⚠️</span>
                {error}
              </p>
            </div>
          )}

          {/* 카드뉴스 출력 영역 */}
          <div
            id="card-output"
            className="min-h-[350px] border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-6 bg-gray-50/50 dark:bg-gray-900/50 overflow-x-auto"
          >
            {isLoading ? (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center">
                  <div className="relative">
                    <svg
                      className="animate-spin h-16 w-16 text-blue-600 mx-auto mb-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                    🤖 AI가 카드뉴스를 생성하고 있습니다
                  </p>
                  <p className="text-gray-500 dark:text-gray-500">
                    잠시만 기다려주세요...
                  </p>
                </div>
              </div>
            ) : cards.length > 0 ? (
              <div className="flex gap-6 pb-4 snap-x snap-mandatory">
                {cards.map((card) => (
                  <CardItem key={card.id} card={card} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-400 dark:text-gray-500">
                  <div className="text-6xl mb-4">🎨</div>
                  <p className="text-xl font-medium mb-2">생성된 카드뉴스가 여기에 표시됩니다</p>
                  <p className="text-sm">주제를 입력하고 생성하기 버튼을 클릭해보세요</p>
                </div>
              </div>
            )}
          </div>

          {/* 카드 개수 표시 */}
          {cards.length > 0 && (
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              총 {cards.length}장의 카드뉴스가 생성되었습니다 • 좌우로 스크롤하여 확인하세요
            </div>
          )}
        </div>

        {/* 푸터 */}
        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Powered by Google Gemini AI</p>
        </footer>
      </div>
    </main>
  );
}
