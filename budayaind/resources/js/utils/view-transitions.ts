// Simple helper for View Transitions API
export function initViewTransitionsPolyfill() {
  // Just log support status, let browser handle natively
  if (typeof document !== 'undefined') {
    if ('startViewTransition' in document) {
      console.log('View Transitions API supported natively');
    } else {
      console.log('View Transitions API not supported, using fallback');
    }
  }
}

// Feature detection helper
export function supportsViewTransitions(): boolean {
  return typeof document !== 'undefined' && 'startViewTransition' in document;
}

// Safe view transition wrapper
export function safeStartViewTransition(callback: () => void | Promise<void>): Promise<void> {
  if (supportsViewTransitions() && document.startViewTransition) {
    try {
      const transition = document.startViewTransition(callback);
      return transition.ready;
    } catch (error) {
      console.warn('View transition failed, using fallback:', error);
      return Promise.resolve(callback()).then(() => {});
    }
  } else {
    // Fallback for unsupported browsers
    return Promise.resolve(callback()).then(() => {});
  }
}
