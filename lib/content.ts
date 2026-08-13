import {
  Mic,
  FileText,
  Clock,
  MessageSquare,
  Terminal,
  Share2,
  UploadCloud,
  Wand2,
  Download,
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Live transcription",
    description:
      "Watch your words appear in real time as EchoNote processes your file. No waiting, no refresh.",
  },
  {
    icon: FileText,
    title: "Blog post generation",
    description:
      "Turn any transcript into a structured, publish-ready blog post with one click.",
  },
  {
    icon: Clock,
    title: "Timestamp sync",
    description:
      "Every line of your transcript is linked to the exact moment in the audio. Click to jump.",
  },
  {
    icon: MessageSquare,
    title: "Speaker detection",
    description:
      "EchoNote automatically identifies and labels different speakers in interviews and meetings.",
  },
  {
    icon: Terminal,
    title: "Smart summary",
    description:
      "Get a concise summary of any recording — key points, action items, and highlights extracted automatically.",
  },
  {
    icon: Share2,
    title: "Multi-format export",
    description:
      "Export to .docx, .txt, .srt, or copy directly to Notion, Google Docs, or your CMS.",
  },
];

const HowItWorksSteps = [
  {
    icon: UploadCloud,
    step: "01",
    title: "Upload your file",
    description:
      "Drop any video or audio file — MP4, MP3, WAV, MOV. Up to 5 hours long. We handle the rest.",
    detail: "Supports 20+ formats",
  },
  {
    icon: Wand2,
    step: "02",
    title: "EchoNote transcribes",
    description:
      "Our AI processes your file in real time. Watch words appear as they're transcribed, live on screen.",
    detail: "99.2% accuracy rate",
  },
  {
    icon: Download,
    step: "03",
    title: "Export or publish",
    description:
      "Download the transcript, generate a blog post, or export directly to your favourite tool.",
    detail: "10+ export formats",
  },
];

export { features, HowItWorksSteps };
