import { modalController } from '../components/GlobalModal';

// Standardized modal utility functions
export const modalUtils = {
    // Show loading state
    loading(message = 'Procesando tu donativo...') {
        modalController.show(message, 'loading');
    },

    // Show success state with auto-close
    success(message, duration = 3000) {
        modalController.show(message, 'success');
        setTimeout(() => modalController.hide(), duration);
    },

    // Show error state with auto-close
    error(message, duration = 3000) {
        modalController.show(message, 'error');
        setTimeout(() => modalController.hide(), duration);
    }
};
