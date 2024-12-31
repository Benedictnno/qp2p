import { useEffect } from 'react'
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
import { RegisterUser } from "@/States/thunks/auth";
import { AppDispatch, RootState } from "@/States/store";
import VerifyDialog from '@/utils/VerifyDialog'
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};


export function SignUp() {
  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2).max(20),
      lastName: z.string().min(2).max(20),
      email: z.string().email(),
      password: z.string().min(6).max(15),
      confirmPassword: z.string().min(6).max(15),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormData) => {
    dispatch(RegisterUser({ email: data.email, password: data.password , lastName:data.lastName,firstName:data.firstName}));
  };
  
  const { msg,error,success} = useSelector((state: RootState) => state.registerUser);

 function toast() {
   console.log('====================================');
   console.log(msg,error,success);
   console.log('====================================');
   toast({
    //  variant="outline",
          title: "Scheduled: Catch up ",
          description: msg,
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        })
      
 }

 useEffect(() => {
  toast()
 }, [error,success])
 
  return (
    <>
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription >
          Enter your details below to register for an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              required
              {...register("firstName")}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              required
              {...register("lastName")}
            />
          </div>
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
            </div>
            <Input
              id="password"
              type="password"
              required
              {...register("password")}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="confirmPassword"> Confirm Password</Label>
            </div>
            <Input
              id="confirmPassword"
              type="password"
              required
              {...register("confirmPassword")}
            />
          {errors.confirmPassword ?  <p> {errors.confirmPassword.message} </p> : ' '}
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={handleSubmit(submitData)}
          >
            Sign Up
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
   
   {success || error &&  <Toaster />}

    </>
  );
}
