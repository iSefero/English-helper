"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { phrasesCards } from "../phrasesList";

export default function PhraseCard({
  phrasesCard,
}: {
  phrasesCard: (typeof phrasesCards)[0];
}) {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };
  return (
    <Card key={phrasesCard.number} className="w-full gap-8">
      <CardHeader>
        <CardTitle>
          <p className="text-xl font-bold text-center">{phrasesCard.number}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 w-full text-md">
        {phrasesCard.phrases.map((phrase) => (
          <div key={phrase.term} className="flex gap-2 items-center">
            <span
              onClick={() => speak(phrase.term)}
              className={
                "w-1/2 text-right transition-all hover:underline cursor-pointer text-[16px]"
              }
            >
              {phrase.term}
            </span>
            —
            <span className={"w-1/2 transition-all text-[16px]"}>
              {phrase.translation}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
