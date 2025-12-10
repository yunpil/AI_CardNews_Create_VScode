import { CardData } from "@/types";
import Image from "next/image";

interface CardItemProps {
  card: CardData;
}

export default function CardItem({ card }: CardItemProps) {
  return (
    <div className="relative bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex-shrink-0 w-72 snap-center transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600">
      {/* 카드 번호 뱃지 */}
      <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
        {card.id}
      </div>

      {/* 이미지 영역 */}
      <div className="relative h-48 w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700">
        {card.imageUrl ? (
          <Image
            src={card.imageUrl}
            alt={card.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-12 h-12"
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
          </div>
        )}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-snug">
          {card.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-4 leading-relaxed">
          {card.content}
        </p>
      </div>
    </div>
  );
}
