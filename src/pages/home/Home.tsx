import MyAppointments from "./MyAppointments";
import AllUsers from "./AllUsers";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 bg-background text-foreground p-8">
        <div className="max-w-4xl mx-auto">
          <AllUsers />
          <MyAppointments />
        </div>
      </main>
    </div>
  );
}
