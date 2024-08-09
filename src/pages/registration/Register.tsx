import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (userNameRef.current && passwordRef.current) {
      const userName = userNameRef.current.value;
      const password = passwordRef.current.value;
      try {
        setError("");
        await register(userName, password);
        navigate("/");
      } catch (err) {
        setError("Failed to create an account");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
      </CardHeader>
      <form action="" onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input ref={userNameRef} id="username" type="text" placeholder="Enter your username" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input ref={passwordRef} id="password" type="password" placeholder="Enter your password" required />
          </div>
        </CardContent>

        {error && <p className="text-red-600">{error}</p>}
        <CardFooter>
          <Button className="w-full" type="submit">
            Register
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Register;
