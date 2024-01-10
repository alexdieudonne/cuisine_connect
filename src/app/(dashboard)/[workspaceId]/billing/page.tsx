import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DashboardShell } from "../../_components/dashboard-shell";
import { SubscriptionForm } from "./subscription-form";

export const runtime = "edge";

export default function BillingPage() {
  return (
    <DashboardShell
      title="Billing"
      description="Manage your subscription and billing details"
      className="space-y-4"
    >
      <SubscriptionCard />

      <UsageCard />
    </DashboardShell>
  );
}

async function SubscriptionCard() {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
      </CardHeader>
      <CardContent>
          <p>
            You are currently on the <strong>{"ss"}</strong> plan.
            Your subscription will renew on{" "}
            <strong>{"dd"}</strong>.
          </p>
      
      </CardContent>
      <CardFooter>
        <SubscriptionForm hasSubscription={true} />
      </CardFooter>
    </Card>
  );
}

function UsageCard() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Usage</CardTitle>
      </CardHeader>
      <CardContent>TODO</CardContent>
    </Card>
  );
}
