# Form Validation Implementation Plan

## Context
This document outlines the plan for implementing form validation in the Partners in Biz application using Zod.

## What is Zod?
Zod is a TypeScript-first schema validation library with a focus on developer experience. It allows for creating schemas that validate and parse data, providing strong type inference.

## Implementation Plan

### 1. Add Dependencies
```bash
pnpm add zod @vueuse/zod
```

### 2. Create Base Validation Utilities

Create a `composables/useZodForm.ts` utility that will:
- Integrate Zod with Vue's reactivity system
- Provide a consistent API for form validation
- Handle error messages and validation states

### 3. Define Common Validation Schemas

Create a `utils/validations/schemas.ts` file with common validation schemas:

```typescript
import { z } from 'zod';

// User schemas
export const emailSchema = z.string().email('Please enter a valid email address');
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters');

// Business schemas
export const businessNameSchema = z.string()
  .min(2, 'Business name must be at least 2 characters')
  .max(100, 'Business name must be less than 100 characters');

export const descriptionSchema = z.string()
  .min(10, 'Description must be at least 10 characters')
  .max(500, 'Description must be less than 500 characters')
  .optional();

// Form schemas
export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional()
});

export const signupFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  })
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

export const businessProfileSchema = z.object({
  name: businessNameSchema,
  industry: z.string().min(1, 'Please select an industry'),
  description: descriptionSchema,
  location: z.string().min(1, 'Please enter a location'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  employeeCount: z.number().int().positive('Employee count must be positive').optional()
});
```

### 4. Enhance Neumorphic Input Components

Update the existing `components/neumorphic/Input.vue` component to support Zod validation:

```vue
<script setup>
defineProps({
  // ... existing props
  error: {
    type: String,
    default: ''
  },
  // Add validation props
  schema: {
    type: Object,
    default: null
  },
  validateOn: {
    type: String,
    default: 'blur', // Options: 'blur', 'input', 'submit'
  }
});
</script>
```

### 5. Create Form Wrapper Component

Create a `components/neumorphic/Form.vue` component that will:
- Handle form submission
- Manage form-level validation
- Provide context for child form elements

### 6. Implement Example Forms

Create example forms using the new validation system:
- Login form
- Registration form
- Profile edit form
- Business creation form

### 7. Documentation

Create documentation for the validation system:
- How to create and use schemas
- How to integrate with form components
- Best practices for form validation
- Examples of common validation patterns

## Timeline

1. **Day 1**: Add dependencies and create base utilities
2. **Day 2**: Define common validation schemas and enhance input components
3. **Day 3**: Create form wrapper component and implement example forms
4. **Day 4**: Write documentation and test validation system

## Success Criteria

- All forms validate input according to their schemas
- Validation errors are displayed clearly to users
- Form submission is prevented when validation fails
- TypeScript integration provides strong typing for form data
- Documentation is comprehensive and easy to follow
