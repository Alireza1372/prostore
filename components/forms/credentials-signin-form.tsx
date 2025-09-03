"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SIGN_IN_DEFAULT_VALUES } from "@/lib/constants/index";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";

const CredentialsSignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button className="w-full" disabled={pending} variant="default">
        {pending ? "Signing In..." : "Sign In"}
      </Button>
    );
  };
  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={SIGN_IN_DEFAULT_VALUES.email}
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            defaultValue={SIGN_IN_DEFAULT_VALUES.password}
            required
          />
        </div>

        <div>
          <SignInButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have account?{" "}
          <Link href="/sign-up" target="_self" className="link text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
