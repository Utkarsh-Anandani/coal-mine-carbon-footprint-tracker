"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { redirect, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

const loginSchema = z.object({
  email: z.string().optional(),
  password: z.string().min(1, "Password is required"),
});

type LoginCredentials = z.infer<typeof loginSchema>;
type Errors = Partial<Record<keyof LoginCredentials, string[]>>;

export default function SignIn() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, startTransitioning] = useTransition();

  const setLoginCredential = (
    property: keyof LoginCredentials,
    value: string
  ) => {
    setLoginCredentials((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    const result = loginSchema.safeParse(loginCredentials);
    if (result.success) {
      setErrors(() => ({}));
      startTransitioning(async () => {
        let res;
        try {
          res = await signIn("credentials", {
            redirect: false,
            username: result.data.email,
            password: result.data.password,
          });
          console.log(res);
        } catch (error) {
          console.log(error);
        }
        if (res?.error === "CredentialsSignin") {
          redirect("/");
        } else {
          if (redirectUrl) {
            redirect(redirectUrl);
          }
        }
      });
    } else {
      const formattedErrors: Errors = {};
      const errorObject = result.error.format();

      (Object.keys(errorObject) as Array<keyof LoginCredentials>).forEach(
        (key) => {
          const error = errorObject[key];
          if (error && error._errors?.length > 0) {
            formattedErrors[key] = error._errors;
          }
        }
      );
      setErrors(formattedErrors);
    }
  };

  if (false) {
    // if (session) {
    return (
      <div className="mt-8 text-center">
        You are logged In as{" "}
        {/* <span className="font-bold">{session.user.name}</span> */}
      </div>
    );
  } else {
    return (
      <form action={handleSubmit}>
        <div className="mt-4">
          <Label>Email</Label>
          <Input
            name="email"
            value={loginCredentials.email}
            placeholder="Enter your email here"
            onChange={(e) => {
              setLoginCredential("email", e.target.value);
            }}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email[0]}</p>
          )}
        </div>
        <div className="mt-4">
          <Label>Password</Label>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password here"
              value={loginCredentials.password}
              onChange={(e) => {
                setLoginCredential("password", e.target.value);
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
              className="absolute right-0.5 top-0.5 size-8 rounded-full bg-background hover:bg-background"
            >
              {showPassword ? <ShowPassWordIcon /> : <HidePassWordIcon />}
            </Button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password[0]}</p>
          )}
          <div className="mt-2 flex justify-end">
            <Link
              className="text-sm text-blue-500 hover:underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <Button className="mt-8 w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-primary-foreground"></div>
          ) : (
            "Login"
          )}
        </Button>
        <div className="mt-4 text-center">
          Don&apos;t have an Account?{" "}
          <Link href="#" className="text-sm text-blue-500 hover:underline">
            Contact Us
          </Link>
        </div>
      </form>
    );
  }
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const ShowPassWordIcon = ({
  color = "currentcolor",
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps) => (
  <svg
    width={width}
    height={height}
    className={cn("shrink-0", className)}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    {...props}
  >
    {" "}
    <path d="M595.08-615.08q24.38 24.39 37.69 59.27 13.31 34.89 10.07 70.04 0 11.54-8.3 19.54-8.31 8-19.85 8-11.54 0-19.54-8t-8-19.54q3.85-26.38-4.34-50-8.19-23.61-25.19-40.61t-41-25.81q-24-8.81-50.62-4.58-11.54.39-19.92-7.73-8.39-8.11-8.77-19.65-.39-11.54 7.42-19.93 7.81-8.38 19.35-8.76 34.92-4 70.19 9.11 35.27 13.12 60.81 38.65ZM480-720q-21.31 0-41.81 2.08-20.5 2.07-40.81 6.84-12.77 2.62-23-3.65t-14.07-18.04q-3.85-12.15 2.54-23.11 6.38-10.96 18.53-13.58 24.16-5.77 48.81-8.15Q454.85-780 480-780q128.92 0 236.85 67 107.92 67 165.99 181.31 4 7.61 5.81 15.34 1.81 7.73 1.81 16.35 0 8.62-1.5 16.35-1.5 7.73-5.5 15.34-18.38 38.46-44.69 71.73t-57.93 61.12q-9.3 8.31-21.26 6.88-11.97-1.42-19.66-11.96-7.69-10.54-6.38-22.61 1.31-12.08 10.61-20.39 27.08-24.54 49.39-53.65Q815.85-466.31 832-500q-50-101-144.5-160.5T480-720Zm0 500q-126.31 0-231.54-67.5Q143.23-355 81.16-465.31q-5-7.61-7.31-16.54-2.31-8.92-2.31-18.15 0-9.23 2-17.85 2-8.61 7-16.84 22.31-40.77 50.54-77.66 28.23-36.88 64.92-66.11l-90.31-90.93q-8.3-8.92-8.19-21.19.12-12.27 8.81-20.96 8.69-8.69 21.08-8.69 12.38 0 21.07 8.69l663.08 663.08q8.31 8.31 8.81 20.57.5 12.27-8.81 21.58-8.69 8.69-21.08 8.69-12.38 0-21.07-8.69L628.62-245.85q-35.39 13.69-72.74 19.77Q518.54-220 480-220ZM238.16-636.31q-35.16 27.16-63.2 61.42Q146.92-540.62 128-500q50 101 144.5 160.5T480-280q25.77 0 50.73-3.46 24.96-3.46 49.58-10.69L529.69-346q-12.15 5.31-24.27 7.19-12.11 1.89-25.42 1.89-68.08 0-115.58-47.5T316.92-500q0-13.31 2.08-25.42 2.08-12.12 7-24.27l-87.84-86.62ZM541-531Zm-131.77 65.77Z" />
  </svg>
);

export const HidePassWordIcon = ({
  color = "currentcolor",
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps) => (
  <svg
    width={width}
    height={height}
    className={cn("shrink-0", className)}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    {...props}
  >
    {" "}
    <path d="M480.09-336.92q67.99 0 115.49-47.59t47.5-115.58q0-67.99-47.59-115.49t-115.58-47.5q-67.99 0-115.49 47.59t-47.5 115.58q0 67.99 47.59 115.49t115.58 47.5ZM480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 172q-126.31 0-231.04-67.39-104.73-67.38-167.19-177.3-5-8.62-7.31-17.37-2.3-8.75-2.3-17.96t2.3-17.94q2.31-8.73 7.31-17.35 62.46-109.92 167.19-177.3Q353.69-780 480-780q126.31 0 231.04 67.39 104.73 67.38 167.19 177.3 5 8.62 7.31 17.37 2.3 8.75 2.3 17.96t-2.3 17.94q-2.31 8.73-7.31 17.35-62.46 109.92-167.19 177.3Q606.31-220 480-220Zm0-280Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
  </svg>
);
