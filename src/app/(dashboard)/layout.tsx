import { Suspense } from "react";
import Link from "next/link";

import * as Icons from "@/components/ui/icons";

import { Search } from "./_components/search";

export default function DashboardLayout(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden rounded-[0.5rem]">
      <nav className="border-b">
        <div className="flex h-16 items-center px-4 md:px-8">
          <Link href="/">
            <Icons.Logo />
          </Link>
          <span className="mx-2 text-lg font-bold text-muted-foreground">
            /
          </span>
          {/* <Suspense>
            <ProjectSwitcher
              projectsPromise={api.project.listByActiveWorkspace.query()}
            />
          </Suspense> */}
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            {/* <UserNav /> */}
          </div>
        </div>
      </nav>
      <main className="min-h-[calc(100vh-14rem)] flex-1 space-y-4 p-8 pt-6">
        {props.children}
      </main>
      {/* <SiteFooter /> */}
    </div>
  );
}
