import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SiJavascript, SiReact, SiSpringboot, SiLinux } from "react-icons/si";
import { DiJava } from "react-icons/di";
import javaData from "@/data/java.json";
import javascriptData from "@/data/javascript.json";
import reactData from "@/data/react.json";
import springBootData from "@/data/spring-boot.json";
import linuxData from "@/data/linux.json";

const technologies = [
  { ...javaData, slug: "java", Icon: DiJava },
  { ...javascriptData, slug: "javascript", Icon: SiJavascript },
  { ...reactData, slug: "react", Icon: SiReact },
  { ...springBootData, slug: "spring-boot", Icon: SiSpringboot },
  { ...linuxData, slug: "linux", Icon: SiLinux },
];

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (tech) => {
    setSelectedTech(tech);
    setOpen(true);
  };

  const handleLevelSelect = (level) => {
    setOpen(false);
    navigate(`/${selectedTech.slug}/${level.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-12">Quiz</h1>
      <div className="grid grid-cols-3 gap-6 place-items-center max-w-2xl">
        {technologies.map((tech) => (
          <Card
            key={tech.topic}
            className="cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all w-full max-w-52 flex flex-col items-center"
            onClick={() => handleCardClick(tech)}
          >
            <CardContent className="flex flex-col items-center justify-center gap-2 py-6 px-6">
              <tech.Icon className="size-6 text-primary" />
              <span className="font-medium">{tech.topic}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose Level</DialogTitle>
            <DialogDescription>
              Select a difficulty level for {selectedTech?.topic}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            {selectedTech?.levels.map((level) => (
              <Button
                key={level.id}
                variant="outline"
                className="justify-start"
                onClick={() => handleLevelSelect(level)}
              >
                {level.name}
                <span className="text-muted-foreground ml-2 text-sm">
                  — {level.questions.length} questions
                </span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
