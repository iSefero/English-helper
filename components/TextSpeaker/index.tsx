import { cn } from "@/lib/utils";

export default function TextSpeaker({
  text,
  rate = 0.7,
  className,
}: {
  text: string;
  rate?: number;
  className?: string;
}) {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    speechSynthesis.speak(utterance);
  };

  return (
    <span
      onClick={speak}
      className={cn(
        "transition-all cursor-pointer text-[16px] text-sky-500 font-medium",
        className,
      )}
    >
      {text}
    </span>
  );
}
