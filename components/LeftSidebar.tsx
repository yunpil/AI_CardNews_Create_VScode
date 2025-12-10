"use client";

import React from "react";

interface LeftSidebarProps {
    topic: string;
    setTopic: (value: string) => void;
    sceneCount: number;
    setSceneCount: (value: number) => void;
    aspectRatio: string;
    setAspectRatio: (value: string) => void;
    resolution: string;
    setResolution: (value: string) => void;
    scriptStyle: string;
    setScriptStyle: (value: string) => void;
    isSequential: boolean;
    setIsSequential: (value: boolean) => void;
    aiTextRender: boolean;
    setAiTextRender: (value: boolean) => void;
    useRefImage: boolean;
    setUseRefImage: (value: boolean) => void;
    isLoading: boolean;
    onGenerate: () => void;
    onReset: () => void;
}

export default function LeftSidebar({
    topic,
    setTopic,
    sceneCount,
    setSceneCount,
    aspectRatio,
    setAspectRatio,
    resolution,
    setResolution,
    scriptStyle,
    setScriptStyle,
    isSequential,
    setIsSequential,
    aiTextRender,
    setAiTextRender,
    useRefImage,
    setUseRefImage,
    isLoading,
    onGenerate,
    onReset,
}: LeftSidebarProps) {
    const getResolutionText = () => {
        const resolutions: Record<string, Record<string, string>> = {
            "1:1": { "2K": "1080x1080 (2K)", "4K": "2160x2160 (4K)" },
            "16:9": { "2K": "1920x1080 (2K)", "4K": "3840x2160 (4K)" },
            "9:16": { "2K": "1080x1920 (2K)", "4K": "2160x3840 (4K)" },
        };
        return resolutions[aspectRatio]?.[resolution] || "1080x1080 (2K)";
    };

    return (
        <aside className="w-52 bg-[var(--bg-sidebar)] border-r border-[var(--border-color)] flex flex-col h-full overflow-y-auto">
            <div className="p-3 flex flex-col gap-4">
                {/* Reset Button */}
                <button onClick={onReset} className="btn-outline w-full flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    전체 초기화
                </button>

                {/* Section 1: Content Input */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-[var(--text-primary)]">1. 콘텐츠 입력</h3>
                        <button className="btn-secondary text-xs py-1 px-2">✏️ 확대</button>
                    </div>
                    <textarea
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="카드뉴스로 만들 주제나 대본을 입력하세요...

예시:
AI 기술이 우리 삶을 어떻게 변화시키고 있는지에 대한 이야기입니다. 일상에서 AI를 만나는 순간들과 미래 전망에 대해 풀어봅니다."
                        className="textarea-field text-xs leading-relaxed"
                        style={{ minHeight: "140px" }}
                    />
                    <div className="text-right text-xs text-[var(--text-muted)] mt-1">
                        {topic.length}/0
                    </div>
                </div>

                {/* Section 2: Generation Settings */}
                <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">2. 생성 설정</h3>

                    {/* Scene Count */}
                    <div className="mb-3">
                        <label className="section-label text-xs">장면 수</label>
                        <input
                            type="number"
                            min={1}
                            max={20}
                            value={sceneCount}
                            onChange={(e) => setSceneCount(parseInt(e.target.value) || 8)}
                            className="input-field"
                        />
                    </div>

                    {/* Aspect Ratio & Resolution */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                            <label className="section-label text-xs">비율</label>
                            <select
                                value={aspectRatio}
                                onChange={(e) => setAspectRatio(e.target.value)}
                                className="select-field"
                            >
                                <option value="1:1">1:1 정사각형</option>
                                <option value="16:9">16:9 가로형</option>
                                <option value="9:16">9:16 세로형</option>
                            </select>
                        </div>
                        <div>
                            <label className="section-label text-xs">해상도</label>
                            <select
                                value={resolution}
                                onChange={(e) => setResolution(e.target.value)}
                                className="select-field"
                            >
                                <option value="2K">2K (기본)</option>
                                <option value="4K">4K</option>
                            </select>
                        </div>
                    </div>

                    {/* Resolution Info */}
                    <div className="text-xs text-[var(--text-muted)] mb-3">
                        출력: {getResolutionText()}
                    </div>

                    {/* Script Style */}
                    <div className="mb-3">
                        <label className="section-label text-xs">대본 스타일</label>
                        <select
                            value={scriptStyle}
                            onChange={(e) => setScriptStyle(e.target.value)}
                            className="select-field"
                        >
                            <option value="modern">모던 미니멀</option>
                            <option value="formal">포멀 비즈니스</option>
                            <option value="casual">캐주얼 친근</option>
                            <option value="creative">크리에이티브</option>
                        </select>
                    </div>

                    {/* Toggle: Generation Mode */}
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <span className="text-sm text-[var(--text-primary)]">생성 모드</span>
                            <span className="text-xs text-[var(--text-muted)] ml-2">
                                {isSequential ? "순차 (안정적)" : "병렬"}
                            </span>
                        </div>
                        <button
                            onClick={() => setIsSequential(!isSequential)}
                            className={`toggle-switch ${isSequential ? "active" : ""}`}
                        >
                            <span />
                        </button>
                    </div>

                    {/* AI Text Rendering Card */}
                    <div className="sidebar-card mb-3">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-purple-400">✓</span>
                                <span className="text-sm font-medium text-[var(--text-primary)]">AI 텍스트 렌더링</span>
                            </div>
                            <button
                                onClick={() => setAiTextRender(!aiTextRender)}
                                className={`toggle-switch ${aiTextRender ? "active" : ""}`}
                            >
                                <span />
                            </button>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                            Nano Banana Pro가 이미지 내 텍스트를 자동 생성합니다
                        </p>
                    </div>

                    {/* Reference Image Toggle */}
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <span className="text-sm text-[var(--text-primary)]">참조 이미지 (선택)</span>
                        </div>
                        <button
                            onClick={() => setUseRefImage(!useRefImage)}
                            className={`toggle-switch ${useRefImage ? "active" : ""}`}
                        >
                            <span />
                        </button>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mb-4">
                        이미지를 업로드하여 참조 스타일 (최대 1장)
                    </p>
                </div>

                {/* Generate Button */}
                <button
                    onClick={onGenerate}
                    disabled={!topic.trim() || isLoading}
                    className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            생성 중...
                        </>
                    ) : (
                        <>✏️ 장면 생성하기</>
                    )}
                </button>
            </div>
        </aside>
    );
}
