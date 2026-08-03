// components/PrivateData.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, ShieldCheck, Activity } from "lucide-react";

// Sample data (replace with real or props)
const demoUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Developer",
  avatar: "",
  location: "New York, USA",
  stats: {
    projects: 8,
    tasks: 43,
  },
};

export default function PrivateContent() {

  const user = demoUser;

  return (
    <div className="mx-auto w-3xl space-y-6 p-4 md:p-6">
      <Card className="bg-card/60 backdrop-blur-sm shadow-sm border-none">
        <CardHeader className="flex flex-row items-center gap-4 pb-4">
          {/* ... avatar ... */}
          <div className="space-y-1">
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-full px-2 py-0.5 text-xs"
              >
                <ShieldCheck className="h-3 w-3 mr-1" />
                {user.role}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Contact details */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{user.location}</span>
            </div>
          </div>

          {/* Simple stats */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <div className="text-2xl font-bold text-foreground">
                {user.stats.projects}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Projects</div>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <div className="text-2xl font-bold text-foreground">
                {user.stats.tasks}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Tasks Completed
              </div>
            </div>
          </div>

          {/* Optional action */}
          <Button variant="outline" className="w-full gap-2" size="sm">
            <Activity className="h-4 w-4" />
            View Activity
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
