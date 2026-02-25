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

export default function IrregularVerbsView() {
  const [searchValue, setSearchValue] = useState("");

  const filteredVerbs = mustHaveIrregularVerbs.filter((item) =>
    [item.infinitive, item.past, item.participle, item.translation].some((v) =>
      v.toLowerCase().includes(searchValue.toLowerCase()),
    ),
  );

  return (
    <Card>
      <CardContent className="flex flex-col gap-6">
        <Input
          placeholder="Enter search params"
          className="max-w-md h-10"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div>
          <Table className="table-fixed w-full">
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow>
                <TableHead className="w-12">#</TableHead>
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
              {filteredVerbs.map((item, index) => (
                <TableRow key={item.infinitive}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="text-lg">{item.infinitive}</TableCell>
                  <TableCell className="text-lg">{item.past}</TableCell>
                  <TableCell className="text-lg">{item.participle}</TableCell>
                  <TableCell className="text-lg">{item.translation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
