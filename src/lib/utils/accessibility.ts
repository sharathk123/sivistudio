/**
 * Accessibility Utilities
 * 
 * Helper functions for improving accessibility, including screen reader
 * announcements, focus management, and color contrast checking.
 */

/**
 * Announces a message to screen readers using ARIA live regions
 *
 * @param message - The message to announce
 * @param politeness - The politeness level ('polite' or 'assertive')
 *   - 'polite': Announces when the user is idle (default)
 *   - 'assertive': Announces immediately, interrupting current speech
 */
export function announceToScreenReader(
    message: string,
    politeness: 'polite' | 'assertive' = 'polite'
): void {
    if (typeof window === 'undefined') return;

    // Remove existing live region to prevent duplicate announcements
    const existing = document.getElementById('sr-announcer');
    if (existing) {
        existing.remove();
    }

    // Create new live region element
    const announcer = document.createElement('div');
    announcer.id = 'sr-announcer';
    announcer.setAttribute('aria-live', politeness);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;

    // Add to DOM
    document.body.appendChild(announcer);

    // Remove after announcement (screen readers need time to read)
    // Increased to 3 seconds for better compatibility with various screen readers
    setTimeout(() => {
        announcer.remove();
    }, 3000);
}

/**
 * Announces a cart update to screen readers
 */
export function announceCartUpdate(
    action: 'added' | 'removed' | 'updated',
    productName: string,
    quantity?: number
): void {
    let message: string;

    switch (action) {
        case 'added':
            message = `${productName} added to cart`;
            break;
        case 'removed':
            message = `${productName} removed from cart`;
            break;
        case 'updated':
            message = `${productName} quantity updated to ${quantity}`;
            break;
        default:
            return;
    }

    announceToScreenReader(message, 'polite');
}

/**
 * Announces an error to screen readers
 */
export function announceError(message: string): void {
    announceToScreenReader(`Error: ${message}`, 'assertive');
}

/**
 * Announces a success message to screen readers
 */
export function announceSuccess(message: string): void {
    announceToScreenReader(message, 'polite');
}

/**
 * Announces a page navigation to screen readers
 */
export function announcePageNavigation(pageTitle: string): void {
    announceToScreenReader(`Navigated to ${pageTitle}`, 'polite');
}

/**
 * Checks color contrast ratio against WCAG standards
 *
 * @param foreground - The foreground color (hex)
 * @param background - The background color (hex)
 * @returns Object with ratio, pass status, and WCAG level
 */
export function checkColorContrast(
    foreground: string,
    background: string
): {
    ratio: number;
    passes: {
        aa: boolean;
        aaLarge: boolean;
        aaa: boolean;
        aaaLarge: boolean;
    };
    level: 'AAA' | 'AA' | 'Fail';
} {
    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : { r: 0, g: 0, b: 0 };
    };

    const fg = hexToRgb(foreground);
    const bg = hexToRgb(background);

    // Calculate relative luminance
    const getLuminance = (r: number, g: number, b: number) => {
        const [rs, gs, bs] = [r, g, b].map((c) => {
            c /= 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const l1 = getLuminance(fg.r, fg.g, fg.b);
    const l2 = getLuminance(bg.r, bg.g, bg.b);

    // Calculate contrast ratio
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    const ratio = (lighter + 0.05) / (darker + 0.05);

    // Check WCAG levels
    const passes = {
        aa: ratio >= 4.5,
        aaLarge: ratio >= 3,
        aaa: ratio >= 7,
        aaaLarge: ratio >= 4.5,
    };

    let level: 'AAA' | 'AA' | 'Fail' = 'Fail';
    if (passes.aaa) level = 'AAA';
    else if (passes.aa) level = 'AA';

    return { ratio, passes, level };
}

/**
 * Traps focus within an element (alternative to useFocusTrap hook)
 *
 * @param element - The element to trap focus within
 * @param restoreFocus - Whether to restore focus on cleanup
 */
export function trapFocus(
    element: HTMLElement,
    restoreFocus: boolean = true
): () => void {
    const focusableElements = element.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    const previousActiveElement = document.activeElement as HTMLElement;

    // Focus first element
    firstFocusable?.focus();

    const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
        }
    };

    element.addEventListener('keydown', handleTab);

    // Return cleanup function
    return () => {
        element.removeEventListener('keydown', handleTab);
        if (restoreFocus && previousActiveElement) {
            previousActiveElement.focus();
        }
    };
}

/**
 * Sets focus to an element with a delay (useful for animated elements)
 */
export function setFocusWithDelay(
    element: HTMLElement | null,
    delay: number = 100
): void {
    if (!element) return;

    setTimeout(() => {
        element.focus();
    }, delay);
}

/**
 * Checks if an element is visible to screen readers
 */
export function isVisibleToScreenReader(element: HTMLElement): boolean {
    const style = window.getComputedStyle(element);
    return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        !element.hasAttribute('hidden') &&
        element.getAttribute('aria-hidden') !== 'true'
    );
}

/**
 * Gets all focusable elements within a container
 */
export function getFocusableElements(
    container: HTMLElement
): HTMLElement[] {
    const focusableSelector =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) =>
            !element.hasAttribute('disabled') &&
            isVisibleToScreenReader(element)
    );
}
