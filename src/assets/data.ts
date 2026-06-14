import { colors } from "@/assets/util";
import image1 from "@/assets/images/image1.jpg"
import image2 from "@/assets/images/image2.jpg"
import image3 from "@/assets/images/image3.jpg"
export type ProjectStatus = "Complete" | "In Development" | "Post-Production";

export interface Credit {
  role: string;
  name: string;
}

export interface Project {
  slug: string;
  title: string;
  year: number;
  format: string;
  duration: string;
  status: ProjectStatus;
  logline: string;
  stills: string[];
  credits: Credit[];
  production: {
    company: string;
    country: string;
    language: string;
  };
  festivals: string[];
}

export const projects: Project[] = [
  {
    slug: "the-waiting-room",
    title: "The Waiting Room",
    year: 2023,
    format: "Short Film",
    duration: "18 min",
    status: "Complete",
    logline:
      "A hospital waiting room at 4am. Three strangers sit with what they cannot say. Time passes. Nothing is resolved.",
    stills: [image1,image2,image3,image1],
    credits: [
      { role: "Director", name: "Gerald Gyimah" },
      { role: "Writer", name: "Gerald Gyimah" },
      { role: "Producer", name: "—" },
      { role: "Cinematographer", name: "—" },
      { role: "Editor", name: "—" },
      { role: "Sound", name: "—" },
    ],
    production: {
      company: "Still Room Productions",
      country: "United Kingdom",
      language: "English",
    },
    festivals: [],
  },
  {
    slug: "nocturne",
    title: "Nocturne",
    year: 2024,
    format: "Feature Film",
    duration: "TBC",
    status: "In Development",
    logline:
      "A film about the hours between. What lingers in spaces after people have left.",
    stills: [image1,image2,image3,image1],
    credits: [
      { role: "Director", name: "Gerald Gyimah" },
      { role: "Writer", name: "Gerald Gyimah" },
    ],
    production: {
      company: "Still Room Productions",
      country: "United Kingdom",
      language: "English",
    },
    festivals: [],
  },
];

export const statusColor: Record<ProjectStatus, string> = {
  Complete: colors.accent.mid,
  "In Development": colors.text.tertiary,
  "Post-Production": colors.text.secondary,
};