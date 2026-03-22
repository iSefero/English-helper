"use client";
import PhraseCard from "./PhraseCard";
import { phrasesCards } from "./phrasesList";

export default function PhrasesView() {
  const sortedPhrases = phrasesCards.sort((a, b) => {
    return a.number - b.number;
  });

  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
      {sortedPhrases.map((phrase) => (
        <PhraseCard phrasesCard={phrase} key={phrase.number} />
      ))}
    </div>
  );
}
