import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Register from "./Register";
import Login from "./Login";

export default function Registration() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="grid gap-8 max-w-md w-full px-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome to Appointment Scheduler</h1>
          <p className="text-muted-foreground">Sign up or Log in to get started.</p>
        </div>
        <Tabs defaultValue="login">
          {/* tab-list */}
          <TabsList className="grid grid-cols-2 gap-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* tab-content */}
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="register">
            <Register />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
