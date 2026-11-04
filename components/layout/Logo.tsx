import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center", className)}>
      <span className="sr-only">Loyalist Exploration, home</span>
      <Image
        src="/images/logo.png"
        alt="Loyalist Exploration"
        width={256}
        height={49}
        priority
        className="h-7 sm:h-8 w-auto object-contain"
      />
    </Link>
  );
}

