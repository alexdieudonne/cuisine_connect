import dynamic from "next/dynamic";
import Link from "next/link";
import cn from "classnames";
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/app/config";



export function SiteFooter(props: { className?: string }) {
  return (
    <footer className={cn("container border-t bg-black", props.className)}>
      <div className="grid grid-cols-2 md:flex md:items-center">
        <Link
          href="/"
          className="col-start-1 row-start-1 flex items-center gap-2 md:mr-2"
        >

          <p className="text-lg font-medium md:hidden">{siteConfig.name}</p>
        </Link>
        ghg
      </div>
    </footer>
  );
}
