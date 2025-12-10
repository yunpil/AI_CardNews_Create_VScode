"use client";

import { useState } from "react";
import { CardData } from "@/types";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default function Home() {
  // Content state
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0 });

  // Settings state
  const [sceneCount, setSceneCount] = useState(8);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [resolution, setResolution] = useState("2K");
  const [scriptStyle, setScriptStyle] = useState("modern");
  const [isSequential, setIsSequential] = useState(true);
  const [aiTextRender, setAiTextRender] = useState(true);
  const [useRefImage, setUseRefImage] = useState(false);

  // Selection state for downloads
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const handleGenerate = async () => {
    console.log("생성하기 클릭:", topic);
    setIsLoading(true);
    setCards([]);
    setError(null);
    setGenerationProgress({ current: 0, total: sceneCount });

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          sceneCount,
          aspectRatio,
          resolution,
          scriptStyle,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "카드 생성에 실패했습니다.");
      }

      setCards(data.cards);
      setGenerationProgress({ current: data.cards.length, total: data.cards.length });
    } catch (err) {
      console.error("카드 생성 중 오류 발생:", err);
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTopic("");
    setCards([]);
    setError(null);
    setSceneCount(8);
    setAspectRatio("1:1");
    setResolution("2K");
    setScriptStyle("modern");
    setIsSequential(true);
    setAiTextRender(true);
    setUseRefImage(false);
    setSelectedCards([]);
    setGenerationProgress({ current: 0, total: 0 });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <Header sceneCount={cards.length} />

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar
          topic={topic}
          setTopic={setTopic}
          sceneCount={sceneCount}
          setSceneCount={setSceneCount}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          resolution={resolution}
          setResolution={setResolution}
          scriptStyle={scriptStyle}
          setScriptStyle={setScriptStyle}
          isSequential={isSequential}
          setIsSequential={setIsSequential}
          aiTextRender={aiTextRender}
          setAiTextRender={setAiTextRender}
          useRefImage={useRefImage}
          setUseRefImage={setUseRefImage}
          isLoading={isLoading}
          onGenerate={handleGenerate}
          onReset={handleReset}
        />

        {/* Center Content Area */}
        <main className="flex-1 bg-[var(--bg-secondary)] overflow-auto p-6">
          {/* Error message */}
          {error && (
            <div className="mb-4 p-4 bg-red-900/30 border border-red-800 rounded-lg">
              <p className="text-red-400 flex items-center gap-2">
                <span>⚠️</span>
                {error}
              </p>
            </div>
          )}

          {/* Loading state */}
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <svg
                    className="animate-spin h-16 w-16 text-[var(--accent-purple)]"
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium text-[var(--text-primary)] mb-2">
                  AI가 장면을 생성하고 있습니다...
                </p>
                <p className="text-[var(--text-muted)]">
                  {generationProgress.current} / {generationProgress.total}
                </p>
              </div>
            </div>
          ) : cards.length > 0 ? (
            /* Generated cards grid */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--accent-purple)] transition-all duration-200 cursor-pointer group"
                >
                  {/* Card preview */}
                  <div
                    className="aspect-square flex items-center justify-center p-4 relative"
                    style={{ background: card.backgroundColor || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
                  >
                    <div className="text-center text-white">
                      <p className="text-sm font-bold mb-2">{card.title}</p>
                      <p className="text-xs opacity-80 line-clamp-3">{card.content}</p>
                    </div>
                    {/* Scene number badge */}
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 rounded text-xs text-white">
                      {index + 1}
                    </div>
                  </div>
                  {/* Card info */}
                  <div className="p-3 bg-[var(--bg-card)]">
                    <p className="text-xs text-[var(--text-muted)] truncate">
                      장면 {index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-[var(--text-muted)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium text-[var(--text-primary)] mb-2">
                  생성된 카드뉴스가 없습니다
                </p>
                <p className="text-[var(--text-muted)] text-sm">
                  좌측 패널에서 콘텐츠를 입력하고 생성 버튼을 눌러주세요
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <RightSidebar
          cards={cards}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
        />
      </div>
    </div>
  );
}
