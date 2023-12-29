"use client";
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const router = useRouter();

  async function authenticate(
    prevState: string | undefined,
    formData: FormData
  ) {
    try {
      const signInData = await signIn("credentials", {
        redirect: false,
        email: formData.get("email"),
        password: formData.get("password"),
      });
      if (signInData?.error) {
        throw new Error(signInData?.error);
      }

      router.push("/dashboard");
    } catch (error) {
      throw error;
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen w-full gap-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <form className="flex flex-col gap-5" action={dispatch}>
        <Input
          isRequired
          type="email"
          label="Email"
          defaultValue="junior@nextui.org"
          className="max-w-xs"
          name="email"
        />
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          name="password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xs"
        />

        <Button type="submit" className="max-w-xs">
          Login
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        ></div>
      </form>
    </main>
  );
}
