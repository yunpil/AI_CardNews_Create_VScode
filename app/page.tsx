"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");

  const handleGenerate = () => {
    // 추후 구현 예정
    console.log("생성하기 클릭:", topic);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* 메인 컴포넌트 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
          {/* 제목 */}
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI 카드뉴스 생성기
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            주제를 입력하면 AI가 카드뉴스를 생성합니다
          </p>

          {/* 입력 영역 */}
          <div className="space-y-6 mb-12">
            <div>
              <label
                htmlFor="topic-input"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                주제 입력
              </label>
              <input
                id="topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="예: 건강한 아침 식사의 중요성"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 dark:text-white dark:bg-gray-700"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!topic.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              생성하기
            </button>
          </div>

          {/* 카드뉴스 출력 영역 */}
          <div
            id="card-output"
            className="min-h-[300px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 flex items-center justify-center bg-gray-50 dark:bg-gray-900"
          >
            <div className="text-center text-gray-400 dark:text-gray-500">
              <svg
                className="w-16 h-16 mx-auto mb-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-lg font-medium">생성된 카드뉴스가 여기에 표시됩니다</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
