import { ArrowLeft, Download, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  type?: "primary" | "secondary";
  backHref?: string;
  SecondaryButton?: React.ReactNode;
  title?: string;
  className?: string;
}

export default function Header({
  type = "secondary",
  backHref,
  SecondaryButton,
  title,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "sticky top-0 flex h-20 flex-col justify-center border-b border-b-gray-300 px-5 backdrop-blur-lg",
        className,
      )}
    >
      {type === "primary" && (
        <div className="flex gap-2">
          <Sparkles />
          <h1 className="font-semibold">DP Backgrounds</h1>
        </div>
      )}
      {type === "secondary" && (
        <div className="flex items-center justify-between gap-4">
          <Button
            className="bg-white text-app-black"
            size={"icon"}
            onClick={() => backHref && redirect(backHref)}
          >
            <ArrowLeft />
          </Button>
          <h1 className="flex-1 text-center font-bricolage text-lg font-semibold capitalize">
            {title}
          </h1>

          {SecondaryButton}
        </div>
      )}
    </div>
  );
}
