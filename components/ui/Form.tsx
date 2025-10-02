"use client";

import type * as LabelPrimitive from "@radix-ui/react-label";
import type { ComponentProps, FunctionComponent } from "react";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import { Slot } from "@radix-ui/react-slot";
import { createContext, use, useId } from "react";
import { Controller, FormProvider, useFormContext, useFormState } from "react-hook-form";

import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/Utils";

const Form = FormProvider;

type FormFieldContextValue<
  FormFieldValues extends FieldValues = FieldValues,
  FieldName extends FieldPath<FormFieldValues> = FieldPath<FormFieldValues>,
> = {
  name: FieldName;
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);
const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormItem: FunctionComponent<ComponentProps<"div">> = ({ className, ...props }) => {
  const id = useId();

  return (
    <FormItemContext value={{ id }}>
      <div className={cn("grid gap-2", className)} data-slot="form-item" {...props} />
    </FormItemContext>
  );
};

const FormField = <
  FormFieldValues extends FieldValues = FieldValues,
  FieldName extends FieldPath<FormFieldValues> = FieldPath<FormFieldValues>,
>(props: ControllerProps<FormFieldValues, FieldName>) => (
  <FormFieldContext value={props}>
    <Controller {...props} />
  </FormFieldContext>
);

const useFormField = () => {
  const fieldContext = use(FormFieldContext);
  const itemContext = use(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    formDescriptionId: `${id}-form-item-description`,
    formItemId: `${id}-form-item`,
    formMessageId: `${id}-form-item-message`,
    id,
    name: fieldContext.name,
    ...fieldState,
  };
};

const FormLabel: FunctionComponent<ComponentProps<typeof LabelPrimitive.Root>> = ({ className, ...props }) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={cn("data-[error=true]:text-destructive", className)}
      data-error={!!error}
      data-slot="form-label"
      htmlFor={formItemId}
      {...props}
    />
  );
};

const FormControl: FunctionComponent<ComponentProps<typeof Slot>> = ({ ...props }) => {
  const { error, formDescriptionId, formItemId, formMessageId } = useFormField();

  return (
    <Slot
      id={formItemId}
      aria-invalid={!!error}
      data-slot="form-control"
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      {...props}
    />
  );
};

const FormDescription: FunctionComponent<ComponentProps<"p">> = ({ className, ...props }) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="form-description"
      {...props}
    />
  );
};

const FormMessage: FunctionComponent<ComponentProps<"p">> = ({ className, ...props }) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      data-slot="form-message"
      {...props}
    >
      {body}
    </p>
  );
};

export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField };
