import javaData from "@/data/java.json";
import javascriptData from "@/data/javascript.json";
import reactData from "@/data/react.json";
import springBootData from "@/data/spring-boot.json";
import linuxData from "@/data/linux.json";

export const TECH_SLUGS = {
  java: "java",
  javascript: "javascript",
  react: "react",
  "spring-boot": "spring-boot",
  linux: "linux",
};

export const TECH_DATA = {
  java: javaData,
  javascript: javascriptData,
  react: reactData,
  "spring-boot": springBootData,
  linux: linuxData,
};

export function getTechBySlug(slug) {
  return TECH_DATA[slug] ?? null;
}

export function getLevelBySlug(tech, levelSlug) {
  const data = TECH_DATA[tech];
  if (!data) return null;
  return data.levels.find((l) => l.id === levelSlug) ?? null;
}
