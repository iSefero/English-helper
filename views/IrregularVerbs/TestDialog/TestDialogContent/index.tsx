import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mustHaveIrregularVerbs } from "../../mustHaveIrregularVerbs";
import { cn } from "@/lib/utils";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
export default function TestDialogContent() {
  const [doneVerbs, setDoneVerbs] = useState<typeof mustHaveIrregularVerbs>([]);
  const [currentVerb, setCurrentVerb] = useState<typeof mustHaveIrregularVerbs>(
    mustHaveIrregularVerbs,
  );
  const [pronunciation, setPronunciation] = useState<boolean>(false);
  const [current, setCurrent] = useState<
    (typeof mustHaveIrregularVerbs)[number] | null
  >(null);
  const [showVerbs, setShowVerbs] = useState<boolean>(false);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const getRandom = useCallback(() => {
    if (currentVerb.length === 0) return null;
    return currentVerb[Math.floor(Math.random() * currentVerb.length)];
  }, [currentVerb]);

  const handleSkip = () => {
    if (!current) {
      return;
    }
    setShowVerbs(false);
    setDoneVerbs([...doneVerbs, current]);
    setCurrentVerb(
      currentVerb.filter((verb) => verb.infinitive !== current.infinitive),
    );
  };

  const handleCheck = () => {
    setShowVerbs(true);
  };

  const handleNext = () => {
    if (!current) {
      return;
    }
    setShowVerbs(false);
    setDoneVerbs([...doneVerbs, current]);
    setCurrentVerb(
      currentVerb.filter((verb) => verb.infinitive !== current.infinitive),
    );
  };

  const handleRestart = () => {
    setCurrentVerb(mustHaveIrregularVerbs);
    setDoneVerbs([]);
    setShowVerbs(false);
  };

  useEffect(() => {
    if (pronunciation && current && showVerbs) {
      speak(current.infinitive);
      speak(current.past);
      speak(current.participle);
    }
  }, [pronunciation, current, showVerbs]);

  useEffect(() => {
    setCurrent(getRandom());
  }, [getRandom]);

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Test yourself</DialogTitle>
        <DialogDescription>
          Test your knowledge of irregular verbs.
        </DialogDescription>
      </DialogHeader>
      <Field orientation="horizontal">
        <Checkbox
          id="pronunciation"
          name="pronunciation"
          onCheckedChange={(checked) => setPronunciation(checked === true)}
          checked={pronunciation}
        />
        <Label htmlFor="pronunciation">With pronunciation</Label>
      </Field>
      {current ? (
        <div className="space-y-6">
          <p className="text-2xl font-medium [&::first-letter]:uppercase text-center">
            {current.translation}
          </p>
          <p className="flex gap-2 items-center text-xl font-medium text-center justify-center border rounded-md p-2 bg-muted flex-wrap">
            {showVerbs ? (
              <>
                <span>{current.infinitive}</span>-<span>{current.past}</span>-
                <span>{current.participle}</span>
              </>
            ) : (
              <>
                <span>••••</span>-<span>••••</span>-<span>••••</span>
              </>
            )}
          </p>
        </div>
      ) : (
        <p className="text-center text-xl font-medium">No more verbs to test</p>
      )}
      <DialogFooter className="justify-between sm:justify-between flex gap-y-5">
        <DialogClose asChild>
          <Button variant="destructive">Cancel</Button>
        </DialogClose>
        {currentVerb.length ? (
          <>
            {showVerbs ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleCheck}>Check</Button>
            )}
            <Button onClick={handleSkip} variant="outline">
              Skip
            </Button>
          </>
        ) : (
          <Button onClick={handleRestart}>Restart</Button>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
