
import { LucideProps } from "lucide-react";

export function Trophy(props: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="trophy"
      {...props}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 12.5V22"/>
      <path d="M14 12.5V22"/>
      <path d="M8 7h8"/>
      <path d="M8 12h8a4 4 0 0 0 4-4V5H4v3a4 4 0 0 0 4 4Z"/>
    </svg>
  )
}
