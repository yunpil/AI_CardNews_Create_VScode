import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Gemini API 클라이언트 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: "주제를 입력해주세요." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    // Gemini 모델 초기화
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // LLM 프롬프트 작성
    const prompt = `당신은 카드뉴스 콘텐츠 전문가입니다. 
사용자가 입력한 주제에 대해 5장의 카드뉴스를 생성해주세요.

주제: "${topic}"

다음 JSON 형식으로 정확히 5개의 카드 데이터를 생성해주세요:

{
  "cards": [
    {
      "id": 1,
      "title": "카드 제목 (간결하고 임팩트 있게)",
      "content": "카드 내용 (2-3문장으로 핵심 정보 전달)",
      "imageUrl": "이미지 검색 키워드 (영문, 예: healthy breakfast food)"
    }
  ]
}

규칙:
1. 각 카드는 논리적인 순서로 구성 (도입 → 본론 → 결론)
2. 제목은 15자 이내로 간결하게
3. 내용은 정보성 있고 읽기 쉽게 2-3문장으로
4. imageUrl에는 해당 카드와 관련된 이미지 검색 키워드를 영문으로 작성
5. 반드시 유효한 JSON 형식으로만 응답

JSON만 출력하고 다른 텍스트는 포함하지 마세요.`;

    // Gemini API 호출
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // JSON 파싱
    let jsonText = text;
    
    // JSON 블록 추출 (```json ... ``` 형식 처리)
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }

    // JSON 파싱 시도
    const parsedData = JSON.parse(jsonText.trim());

    // CardData 형식으로 변환 (이미지 URL을 Unsplash로 변환)
    const cards = parsedData.cards.map((card: { id: number; title: string; content: string; imageUrl: string }) => ({
      id: card.id,
      title: card.title,
      content: card.content,
      imageUrl: `https://source.unsplash.com/400x300/?${encodeURIComponent(card.imageUrl)}`,
    }));

    return NextResponse.json({ cards });
  } catch (error) {
    console.error("API 에러:", error);
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "AI 응답을 파싱하는 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "카드뉴스 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
