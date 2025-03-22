import { signal } from '@preact/signals';

// Create signals for donation form state
export const isFormOpen = signal(false);
export const selectedAmount = signal('500');
export const paymentType = signal('pay_single');

// Methods to update state
export const toggleFormOpen = () => {
    isFormOpen.value = !isFormOpen.value;
};

export const resetDonationState = () => {
    isFormOpen.value = false;
    selectedAmount.value = '500';
    paymentType.value = 'pay_single';
};
