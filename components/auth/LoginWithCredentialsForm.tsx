"use client";

import type { LoginFormSchema } from "@/validators/Auth";
import type { FormEvent } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";

import { loginWithCredentials } from "@/actions/auth/Login";
import { Button } from "@/components/ui/Button";
import { FieldControl, FieldItem, FieldLabel, FieldMessage, FormField, FormMessage, FormProvider } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { loginSchema } from "@/validators/Auth";

/**
 * Field configuration for the login form.
 */
const fields = [
  {
    label: "Email or Username",
    name: "username",
    placeholder: "Enter your email here",
    startIcon: Mail,
    type: "text",
  },
  {
    label: "Password",
    name: "password",
    placeholder: "Enter your password here",
    startIcon: Lock,
    type: "password",
  },
] as const;

/**
 * Login form using React Hook Form + Zod validation.
 */
const LoginWithCredentialsForm = () => {
  const form = useForm<LoginFormSchema>({
    defaultValues: {
      password: "",
      username: "",
    },
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  /**
   * Submit handler that validates and attempts authentication.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    void form.handleSubmit(async (credentials) => {
      const error = await loginWithCredentials(credentials);

      if (error) {
        form.setError("root", { message: error.message, type: error.status.toString() });
      }
    })();
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-4 w-[500px]" onSubmit={handleSubmit}>
        {
          fields.map(({ label, name, placeholder, startIcon, type }) => (
            <Fragment key={name}>
              <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FieldItem>
                    <FieldLabel>{label}</FieldLabel>
                    <FieldControl>
                      <Input placeholder={placeholder} startIcon={startIcon} type={type} {...field} />
                    </FieldControl>
                    <FieldMessage />
                  </FieldItem>
                )}
              />
            </Fragment>
          ))
        }
        <Button className="w-full" type="submit" variant="primary">Login</Button>
        <FormMessage />
      </form>
    </FormProvider>
  );
};

export { LoginWithCredentialsForm };
