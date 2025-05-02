import { ref, reactive, computed } from 'vue';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

/**
 * A composable for creating forms with Zod validation
 *
 * @param schema The Zod schema for form validation
 * @param initialValues Initial values for the form
 * @returns Form utilities including values, errors, and submission handling
 */
export function useZodForm<T extends z.ZodType<any, any>>(
  schema: T,
  initialValues: z.infer<T> = {} as z.infer<T>
) {
  // Convert Zod schema to vee-validate compatible schema
  const validationSchema = toTypedSchema(schema);

  // Initialize the form with vee-validate
  const {
    values,
    errors,
    handleSubmit,
    resetForm,
    meta,
    setFieldValue,
    setErrors,
    setFieldError,
    validate,
    setValues,
    submitCount,
    isSubmitting,
    touched
  } = useForm({
    validationSchema,
    initialValues
  });

  // Create a submission handler that returns the validated data
  const onSubmit = handleSubmit((values) => {
    console.log('useZodForm - Form submitted with values:', values);
    return values as z.infer<T>;
  }, (errors) => {
    console.error('useZodForm - Form validation failed with errors:', errors);
    return undefined;
  });

  // Helper to check if a specific field has been touched and has errors
  const hasFieldError = (field: keyof z.infer<T>) => {
    return !!errors.value[field as string] && touched.value[field as string];
  };

  // Helper to get error message for a field
  const getFieldError = (field: keyof z.infer<T>) => {
    return hasFieldError(field) ? errors.value[field as string] : '';
  };

  return {
    // Form state
    values,
    errors,
    meta,
    touched,
    submitCount,
    isSubmitting,

    // Field helpers
    hasFieldError,
    getFieldError,
    setFieldValue,
    setFieldError,

    // Form actions
    validate,
    onSubmit,
    resetForm,
    setValues,
    setErrors,
  };
}
