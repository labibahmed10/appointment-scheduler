import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const Register = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (userNameRef.current && passwordRef.current) {
      const userName = userNameRef.current.value;
      const password = passwordRef.current.value;
      try {
        setError("");
        const result = await register(userName, password);

        if (result) {
          navigate("/");
          toast.success("User registered successfully");
          queryClient.invalidateQueries({ queryKey: ["users"] });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message.split(":")[1]);
      }
    }
  };

  return (
    <Card>
      <CardHeader className="py-3 sm:py-6">
        <CardTitle className="text-xl sm:text-2xl">Register</CardTitle>
      </CardHeader>
      <form action="" onSubmit={handleSubmit}>
        <CardContent className="space-y-3 py-3">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-xs sm:text-sm">
              Username
            </Label>
            <Input ref={userNameRef} id="username" type="text" placeholder="Enter your username" required className="h-8 sm:h-10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs sm:text-sm">
              Password
            </Label>
            <Input ref={passwordRef} id="password" type="password" placeholder="Enter your password" required className="h-8 sm:h-10" />
          </div>
        </CardContent>

        {error && <p className="text-red-600 text-center py-1">{error}</p>}
        <CardFooter className="py-3 sm:py-6">
          <Button className="h-8 sm:h-10 w-full" type="submit">
            Register
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Register;
