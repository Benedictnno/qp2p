import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "@/States/thunks/auth";
import { AppDispatch, RootState } from "@/States/store";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster";

type FormData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const schema: ZodType<FormData> = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(15),
  });

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
 const { toast } = useToast()
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { success,error} = useSelector((state: RootState) => state.login);

  const submitData = (data: FormData) => {
    dispatch(LoginUser({ email: data.email, password: data.password }));
    console.log("Submitted data:", success);
    
    if (error === "Unauthorized") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    if (success) {
      navigate("/");
    }
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email")}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={handleSubmit(submitData)}
            >
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    {error === "Unauthorized" && <Toaster />}
    </Card>
  );
}
