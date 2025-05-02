# Form Validation with Zod

This document provides an overview of the form validation system implemented in the Partners in Biz application using Zod and vee-validate.

## Overview

The form validation system combines:
- **Zod**: For schema definition and validation
- **vee-validate**: For form handling and integration with Vue
- **@vee-validate/zod**: For connecting Zod schemas with vee-validate

## Key Components

### 1. Schema Definitions

Schemas are defined in `utils/validations/schemas.ts` using Zod's schema builder:

```typescript
import { z } from 'zod';

export const emailSchema = z.string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required');

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional().default(false)
});
```

### 2. Form Composable

The `useZodForm` composable in `composables/useZodForm.ts` provides a bridge between Zod schemas and Vue components:

```typescript
import { useZodForm } from '~/composables/useZodForm';

const { 
  values, 
  errors, 
  isSubmitting, 
  onSubmit 
} = useZodForm(loginFormSchema, {
  email: '',
  password: '',
  rememberMe: false
});
```

### 3. Enhanced Input Components

The NeumorphicInput component has been enhanced to support validation:

```vue
<NeumorphicInput
  v-model="values.email"
  name="email"
  label="Email"
  type="email"
  placeholder="Enter your email"
  :error="errors.email"
/>
```

## Usage Examples

### Basic Form

```vue
<template>
  <form @submit.prevent="onSubmit">
    <NeumorphicInput
      v-model="values.email"
      name="email"
      label="Email"
      :error="errors.email"
    />
    
    <NeumorphicButton type="submit">
      Submit
    </NeumorphicButton>
  </form>
</template>

<script setup>
import { loginFormSchema } from '~/utils/validations/schemas';
import { useZodForm } from '~/composables/useZodForm';

const { values, errors, onSubmit } = useZodForm(loginFormSchema);

onSubmit((validData) => {
  // Handle form submission with validated data
  console.log(validData);
});
</script>
```

### Form with Custom Validation

```typescript
// Custom schema with conditional validation
const contactFormSchema = z.object({
  contactMethod: z.enum(['email', 'phone']),
  email: z.string().email().optional(),
  phone: z.string().optional()
}).refine(data => {
  if (data.contactMethod === 'email' && !data.email) {
    return false;
  }
  if (data.contactMethod === 'phone' && !data.phone) {
    return false;
  }
  return true;
}, {
  message: 'Contact information is required based on your selected method',
  path: ['contactMethod']
});
```

## Best Practices

1. **Define Reusable Schemas**: Create base schemas for common fields like email, password, etc.
2. **Provide Clear Error Messages**: Always include user-friendly error messages in your schemas
3. **Use TypeScript Integration**: Leverage Zod's TypeScript integration with `z.infer<typeof schema>`
4. **Validate Early**: Use client-side validation to provide immediate feedback
5. **Validate Again on Server**: Always re-validate on the server side for security

## Validation Options

The NeumorphicInput component supports different validation triggers:

- `validateOn="blur"`: Validates when the field loses focus (default)
- `validateOn="input"`: Validates as the user types
- `validateOn="submit"`: Only validates when the form is submitted

## Error Handling

Errors are automatically captured and displayed:

1. **Field-level errors**: Displayed below each input field
2. **Form-level errors**: Can be displayed at the form level for cross-field validations

## Type Safety

The validation system provides full type safety:

```typescript
// Get the type from the schema
type LoginForm = z.infer<typeof loginFormSchema>;

// Function with type safety
function processLoginForm(data: LoginForm) {
  // TypeScript knows the shape of the data
}
```
