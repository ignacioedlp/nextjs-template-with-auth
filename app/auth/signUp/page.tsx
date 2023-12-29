"use client";
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const router = useRouter();

  async function authenticate(
    prevState: string | undefined,
    formData: FormData
  ) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
          username: formData.get("username"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        return router.push("/auth/signIn");
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen w-full gap-4">
      <h1 className="text-3xl font-bold">Register</h1>
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
          isRequired
          type="text"
          label="Username"
          defaultValue="junior"
          className="max-w-xs"
          name="username"
        />
        <Input
          label="Password"
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

        {errorMessage ? (
          <div className="flex h-8 items-end space-x-1">
            <p className="text-red-500">{errorMessage || ""}</p>
          </div>
        ) : (
          <div className="flex h-8 items-end space-x-1"></div>
        )}

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
