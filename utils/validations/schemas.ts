import { z } from 'zod';

// User schemas
export const emailSchema = z.string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required');

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
// For login, we just need a non-empty password
export const loginPasswordSchema = z.string()
  .min(1, 'Password is required');

export const loginFormSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema, // Use simpler password validation for login
  rememberMe: z.boolean().optional().default(false)
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

// Types
export type LoginForm = z.infer<typeof loginFormSchema>;
export type SignupForm = z.infer<typeof signupFormSchema>;
export type BusinessProfileForm = z.infer<typeof businessProfileSchema>;
