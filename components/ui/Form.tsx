"use client";

import type * as LabelPrimitive from "@radix-ui/react-label";
import type { ComponentProps, FunctionComponent } from "react";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import { Slot } from "@radix-ui/react-slot";
import { createContext, use, useId } from "react";
import { Controller, FormProvider as ReactHookFormProvider, useFormContext, useFormState } from "react-hook-form";

import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/Utils";

/**
 * Type definition for form field context value.
 *
 * @template FormFieldValues - The form field values type
 * @template FieldName - The specific field name type
 */
type FormFieldContextValue<
  FormFieldValues extends FieldValues = FieldValues,
  FieldName extends FieldPath<FormFieldValues> = FieldPath<FormFieldValues>,
> = {
  name: FieldName;
};

/**
 * Type definition for form item context value.
 */
type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);
const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

/**
 * Re-export of React Hook Form's provider for consistent naming.
 */
const FormProvider = ReactHookFormProvider;

/**
 * Displays form-wide (root) error messages.
 */
const FormMessage: FunctionComponent<ComponentProps<"p">> = ({ className, ...props }) => {
  const { control } = useFormContext();
  const { errors } = useFormState({ control });

  if (!errors.root?.message)
    return null;

  return (
    <p
      className={cn("text-destructive text-sm", className)}
      data-slot="form-root-message"
      {...props}
    >
      {errors.root?.message}
    </p>
  );
};

/**
 * Field wrapper around React Hook Form's Controller.
 */
const FormField = <
  FormFieldValues extends FieldValues = FieldValues,
  FieldName extends FieldPath<FormFieldValues> = FieldPath<FormFieldValues>,
>(props: ControllerProps<FormFieldValues, FieldName>) => (
  <FormFieldContext value={props}>
    <Controller {...props} />
  </FormFieldContext>
);

/**
 * Hook exposing field state and accessibility IDs.
 *
 * @throws Error if used outside of FormField
 */
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

/**
 * Container for a single field; provides a unique ID context.
 */
const FieldItem: FunctionComponent<ComponentProps<"div">> = ({ className, ...props }) => {
  const id = useId();

  return (
    <FormItemContext value={{ id }}>
      <div className={cn("grid gap-2", className)} data-slot="form-item" {...props} />
    </FormItemContext>
  );
};

/**
 * Label tied to the field; applies error styling automatically.
 */
const FieldLabel: FunctionComponent<ComponentProps<typeof LabelPrimitive.Root>> = ({ className, ...props }) => {
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

/**
 * Control wrapper that sets aria-* based on field state.
 */
const FieldControl: FunctionComponent<ComponentProps<typeof Slot>> = ({ ...props }) => {
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

/**
 * Descriptive text tied to the field via aria-describedby.
 */
const FieldDescription: FunctionComponent<ComponentProps<"p">> = ({ className, ...props }) => {
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

/**
 * Field error message; renders only when there is content.
 */
const FieldMessage: FunctionComponent<ComponentProps<"p">> = ({ className, ...props }) => {
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

export {
  FieldControl,
  FieldDescription,
  FieldItem,
  FieldLabel,
  FieldMessage,
  FormField,
  FormMessage,
  FormProvider,
  useFormField,
};
