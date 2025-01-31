import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export default function InfoButtonWithTooltip({text}:{text:string}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Info className="w-3 h-3"></Info>
        </TooltipTrigger>
        <TooltipContent className="">
          <p className="text-black p-1 rounded-lg border bg-white ">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
