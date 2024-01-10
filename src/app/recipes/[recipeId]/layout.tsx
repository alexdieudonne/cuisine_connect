import { Suspense } from "react";
import Link from "next/link";

import * as Icons from "@/components/ui/icons";
import Header from "@/components/Header";

export default function RecipeLayout(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden rounded-[0.5rem]">
      <Header />
      <main className="min-h-[calc(100vh-14rem)] flex-1 space-y-4 p-8 pt-6">
        {props.children}
      </main>
    </div>
  );
}
