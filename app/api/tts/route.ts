import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") || "সৌদি প্রবাসী ওয়ান-স্টপ হাবে আপনাকে স্বাগতম।";

  const openaiKey = process.env.OPENAI_API_KEY;

  if (openaiKey && !openaiKey.includes("sk-...")) {
    try {
      const response = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "tts-1",
          input: text.slice(0, 400),
          voice: "alloy",
          response_format: "mp3",
        }),
      });

      if (response.ok) {
        const audioBuffer = await response.arrayBuffer();
        return new NextResponse(audioBuffer, {
          headers: {
            "Content-Type": "audio/mpeg",
            "Cache-Control": "public, max-age=86400",
          },
        });
      }
    } catch (err) {
      console.error("[TTS UPSTREAM ERROR]", err);
    }
  }

  // Fallback metadata endpoint for Web Speech API
  return NextResponse.json({
    useWebSpeech: true,
    text: text,
    lang: "bn-BD",
    fallbackVoice: "Bangla",
    message: "OpenAI TTS key not set; client will speak via native Web Speech synthesis.",
  });
}
