"use client";

import React from "react";
import { CardData } from "@/types";

interface RightSidebarProps {
    cards: CardData[];
    selectedCards: number[];
    setSelectedCards: (cards: number[]) => void;
}

export default function RightSidebar({
    cards,
    selectedCards,
    setSelectedCards,
}: RightSidebarProps) {
    const toggleCardSelection = (cardId: number) => {
        if (selectedCards.includes(cardId)) {
            setSelectedCards(selectedCards.filter((id) => id !== cardId));
        } else {
            setSelectedCards([...selectedCards, cardId]);
        }
    };

    const selectAll = () => {
        setSelectedCards(cards.map((card) => card.id));
    };

    const deselectAll = () => {
        setSelectedCards([]);
    };

    return (
        <aside className="w-52 bg-[var(--bg-sidebar)] border-l border-[var(--border-color)] flex flex-col h-full overflow-y-auto">
            <div className="p-3 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                        다운로드
                    </h3>
                    {cards.length > 0 && (
                        <div className="flex gap-1">
                            <button
                                onClick={selectAll}
                                className="text-xs text-[var(--accent-purple)] hover:underline"
                            >
                                전체
                            </button>
                            <span className="text-xs text-[var(--text-muted)]">/</span>
                            <button
                                onClick={deselectAll}
                                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                            >
                                해제
                            </button>
                        </div>
                    )}
                </div>

                {/* Content */}
                {cards.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <svg
                            className="w-12 h-12 text-[var(--text-muted)] opacity-30 mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                            />
                        </svg>
                        <p className="text-sm text-[var(--text-muted)]">
                            다운로드할 장면을
                            <br />
                            선택해주세요
                        </p>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-2">
                            {cards.map((card, index) => (
                                <div
                                    key={card.id}
                                    onClick={() => toggleCardSelection(card.id)}
                                    className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${selectedCards.includes(card.id)
                                            ? "border-[var(--accent-purple)] ring-2 ring-[var(--accent-purple)] ring-opacity-30"
                                            : "border-[var(--border-color)] hover:border-[var(--text-muted)]"
                                        }`}
                                >
                                    {/* Thumbnail placeholder */}
                                    <div
                                        className="w-full h-full flex items-center justify-center text-xs"
                                        style={{ background: card.backgroundColor || "#1e1e2e" }}
                                    >
                                        <span className="text-white font-medium">{index + 1}</span>
                                    </div>

                                    {/* Selection indicator */}
                                    {selectedCards.includes(card.id) && (
                                        <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[var(--accent-purple)] flex items-center justify-center">
                                            <svg
                                                className="w-3 h-3 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Download Button */}
                {cards.length > 0 && selectedCards.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[var(--border-color)]">
                        <button className="btn-primary w-full text-sm">
                            {selectedCards.length}장 다운로드
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
}
