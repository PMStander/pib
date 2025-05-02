<template>
    <div class="min-h-screen bg-[rgb(var(--color-neumorphic-bg))] p-8">
        <h1 class="text-3xl font-bold text-center mb-8 text-[rgb(var(--color-neumorphic-text))]">
            Partners in Biz - Neumorphic UI
        </h1>

        <!-- Buttons Section -->
        <NeumorphicCard title="Buttons" className="mb-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <NeumorphicButton variant="flat" color="default">Flat Button</NeumorphicButton>
                <NeumorphicButton variant="pressed" color="primary">Pressed Button</NeumorphicButton>
                <NeumorphicButton variant="concave" color="secondary">Concave Button</NeumorphicButton>
                <NeumorphicButton variant="convex" color="danger">Convex Button</NeumorphicButton>
            </div>
        </NeumorphicCard>

        <!-- Cards Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <NeumorphicCard title="Flat Card" variant="flat">
                <p class="text-[rgb(var(--color-neumorphic-text))]">
                    This is a flat neumorphic card. It uses a light shadow on top and a dark shadow below.
                </p>
            </NeumorphicCard>

            <NeumorphicCard title="Pressed Card" variant="pressed">
                <p class="text-[rgb(var(--color-neumorphic-text))]">
                    This is a pressed neumorphic card. It uses an inset shadow effect to create a pressed appearance.
                </p>
            </NeumorphicCard>
        </div>

        <!-- Form Elements Section -->
        <NeumorphicCard title="Form Elements" variant="flat" className="mb-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <NeumorphicInput
                        v-model="name"
                        label="Name"
                        placeholder="Enter your name"
                        hint="This is a neumorphic input field"
                    />

                    <NeumorphicInput
                        v-model="email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        :error="emailError"
                    />
                </div>

                <div class="flex flex-col justify-center space-y-4">
                    <NeumorphicToggle v-model="notifications" label="Enable notifications" />
                    <NeumorphicToggle v-model="darkMode" label="Dark mode" disabled />

                    <div class="mt-4">
                        <NeumorphicButton
                            variant="convex"
                            color="primary"
                            className="w-full"
                            @click="submitForm"
                        >
                            Submit Form
                        </NeumorphicButton>
                    </div>
                </div>
            </div>
        </NeumorphicCard>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Form state
const name = ref('');
const email = ref('');
const notifications = ref(true);
const darkMode = ref(false);

// Validation
const emailError = computed(() => {
    if (!email.value) return '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.value) ? '' : 'Please enter a valid email address';
});

// Form submission
const submitForm = () => {
    if (emailError.value) {
        alert('Please fix the errors in the form');
        return;
    }

    alert(`Form submitted with name: ${name.value}, email: ${email.value}`);
};
</script>