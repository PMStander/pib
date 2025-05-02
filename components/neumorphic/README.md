# Neumorphic UI Components

This directory contains reusable neumorphic UI components for the Partners in Biz project.

## What is Neumorphism?

Neumorphism is a design style characterized by a soft, extruded plastic look with subtle shadows and highlights. It creates a UI that appears to be pushed through from beneath the surface.

Key characteristics:
- Soft shadows (light and dark)
- Subtle color palette
- Rounded corners
- Minimal contrast
- Soft, tactile appearance

## Available Components

### Button

A versatile button component with multiple variants.

```vue
<NeumorphicButton 
  variant="flat" 
  color="primary" 
  size="md"
>
  Click Me
</NeumorphicButton>
```

**Props:**
- `variant`: 'flat' | 'pressed' | 'concave' | 'convex' (default: 'flat')
- `color`: 'default' | 'primary' | 'secondary' | 'danger' (default: 'default')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `disabled`: boolean (default: false)
- `className`: string (default: '')

### Card

A container component with neumorphic styling.

```vue
<NeumorphicCard 
  title="Card Title" 
  variant="flat"
>
  Card content goes here
</NeumorphicCard>
```

**Props:**
- `variant`: 'flat' | 'pressed' | 'concave' | 'convex' (default: 'flat')
- `title`: string (default: '')
- `className`: string (default: '')

### Input

A form input field with neumorphic styling.

```vue
<NeumorphicInput
  v-model="inputValue"
  label="Username"
  placeholder="Enter your username"
  hint="This will be your display name"
/>
```

**Props:**
- `modelValue`: string | number (v-model binding)
- `label`: string (default: '')
- `type`: string (default: 'text')
- `placeholder`: string (default: '')
- `id`: string (default: auto-generated)
- `disabled`: boolean (default: false)
- `error`: string (default: '')
- `hint`: string (default: '')
- `className`: string (default: '')

### Toggle

A toggle switch component with neumorphic styling.

```vue
<NeumorphicToggle
  v-model="toggleValue"
  label="Enable notifications"
/>
```

**Props:**
- `modelValue`: boolean (v-model binding)
- `label`: string (default: '')
- `disabled`: boolean (default: false)
- `className`: string (default: '')

## CSS Variables

The neumorphic components use the following CSS variables for styling:

```css
--color-neumorphic-bg: 226 230 234;      /* Light gray background */
--color-neumorphic-light: 255 255 255;   /* Light shadow */
--color-neumorphic-dark: 209 213 219;    /* Dark shadow */
--color-neumorphic-accent: 123 144 253;  /* Accent color (blue) */
--color-neumorphic-accent-secondary: 250 171 112; /* Secondary accent (orange) */
--color-neumorphic-accent-tertiary: 229 62 62;    /* Tertiary accent (red) */
--color-neumorphic-text: 55 65 81;       /* Text color */
```

These variables are defined in `assets/css/main.css` and can be customized to match your project's color scheme.

## Utility Classes

The following utility classes are available for creating neumorphic effects:

- `.nm-flat`: Creates a flat neumorphic effect with outer shadows
- `.nm-pressed`: Creates a pressed neumorphic effect with inner shadows
- `.nm-concave`: Creates a concave neumorphic effect with gradient and shadows
- `.nm-convex`: Creates a convex neumorphic effect with gradient and shadows

## Usage Example

```vue
<template>
  <div class="bg-[rgb(var(--color-neumorphic-bg))] p-8">
    <NeumorphicCard title="Login Form">
      <NeumorphicInput
        v-model="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
      />
      
      <NeumorphicInput
        v-model="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
      />
      
      <NeumorphicToggle
        v-model="rememberMe"
        label="Remember me"
        class="mt-4"
      />
      
      <NeumorphicButton
        variant="convex"
        color="primary"
        className="w-full mt-6"
        @click="login"
      >
        Log In
      </NeumorphicButton>
    </NeumorphicCard>
  </div>
</template>
```
