"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mustHaveIrregularVerbs } from "./mustHaveIrregularVerbs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TextSpeaker from "@/components/TextSpeaker";
import { Button } from "@/components/ui/button";
import { TestDialog } from "./TestDialog";

export default function IrregularVerbsView() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [showTest, setShowTest] = useState<boolean>(false);

  const filteredVerbs = mustHaveIrregularVerbs.filter((item) =>
    [item.infinitive, item.past, item.participle, item.translation].some((v) =>
      v.toLowerCase().includes(searchValue.toLowerCase()),
    ),
  );

  return (
    <>
      <TestDialog open={showTest} onOpenChange={setShowTest} />
      <Card className="w-full">
        <CardContent className="flex flex-col gap-6 w-full">
          <div className="flex gap-4 justify-between">
            <Input
              placeholder="Enter search params"
              className="max-w-md h-10"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button onClick={() => setShowTest(!showTest)} className="h-10">
              Test yourself
            </Button>
          </div>
          <Table className="w-full">
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow>
                <TableHead className="text-xl font-bold">#</TableHead>
                <TableHead className="w-1/4 text-xl font-bold">
                  Infinitive
                </TableHead>
                <TableHead className="w-1/4 text-xl font-bold">Past</TableHead>
                <TableHead className="w-1/4 text-xl font-bold">
                  Participle
                </TableHead>
                <TableHead className="w-1/4 text-xl font-bold">
                  Translation
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVerbs.map((item, i) => (
                <TableRow key={item.infinitive}>
                  <TableCell className="text-lg">{i + 1}</TableCell>
                  <TableCell className="text-lg">
                    {<TextSpeaker text={item.infinitive} />}
                  </TableCell>
                  <TableCell className="text-lg">
                    {<TextSpeaker text={item.past} />}
                  </TableCell>
                  <TableCell className="text-lg">
                    {<TextSpeaker text={item.participle} />}
                  </TableCell>
                  <TableCell className="text-lg">{item.translation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
