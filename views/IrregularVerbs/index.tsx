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

export default function IrregularVerbsView() {
  const [searchValue, setSearchValue] = useState("");

  const filteredVerbs = mustHaveIrregularVerbs.filter((item) =>
    [item.infinitive, item.past, item.participle, item.translation].some((v) =>
      v.toLowerCase().includes(searchValue.toLowerCase()),
    ),
  );

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-6 w-full">
        <Input
          placeholder="Enter search params"
          className="max-w-md h-10"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Table className="w-full">
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
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
            {filteredVerbs.map((item) => (
              <TableRow key={item.infinitive}>
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
  );
}
