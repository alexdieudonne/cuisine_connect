"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { useZodForm } from "~/lib/zod-form";


export const CreateProjectForm = (props: {
  workspaceId: string;
  // defaults to redirecting to the project page
  onSuccess?: (project: any) => void;
}) => {
  const router = useRouter();
  const toaster = useToast();

  const form = useZodForm({ schema: {} as any });

  async function onSubmit(data: any) {

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Acme Corp" />
              </FormControl>
              <FormDescription>
                A name to identify your app in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://acme-corp.com" />
              </FormControl>
              <FormDescription>The URL of your app</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Project</Button>
      </form>
    </Form>
  );
};
