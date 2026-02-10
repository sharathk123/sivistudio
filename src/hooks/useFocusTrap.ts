/**
 * useFocusTrap Hook
 * 
 * Traps keyboard focus within a container element, ensuring keyboard users
 * cannot navigate outside of modals, drawers, and other overlay components.
 * 
 * Features:
 * - Saves and restores the previously focused element
 * - Focuses the first focusable element when activated
 * - Cycles focus between first and last elements with Tab/Shift+Tab
 * - Automatically cleans up on unmount
 */

import { useEffect, useRef, RefObject } from 'react';

export interface UseFocusTrapOptions {
    /**
     * Whether the focus trap is active
     */
    isActive: boolean;

    /**
     * Whether to return focus to the previously focused element on deactivate
     * @default true
     */
    restoreFocus?: boolean;

    /**
     * Whether to focus the first element automatically when activated
     * @default true
     */
    autoFocus?: boolean;

    /**
     * CSS selector for elements that should be focusable
     * @default 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
     */
    focusableSelector?: string;
}

export function useFocusTrap(options: UseFocusTrapOptions): RefObject<HTMLElement | null> {
    const {
        isActive,
        restoreFocus = true,
        autoFocus = true,
        focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    } = options;

    const containerRef = useRef<HTMLElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);
    const firstFocusableRef = useRef<HTMLElement | null>(null);
    const lastFocusableRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isActive || !containerRef.current) return;

        const container = containerRef.current;

        // Save the currently focused element
        previousActiveElement.current = document.activeElement as HTMLElement;

        // Find all focusable elements within the container
        const focusableElements = Array.from(
            container.querySelectorAll<HTMLElement>(focusableSelector)
        ).filter(
            (element) =>
                !element.hasAttribute('disabled') &&
                !element.getAttribute('aria-hidden') &&
                getComputedStyle(element).display !== 'none' &&
                getComputedStyle(element).visibility !== 'hidden'
        );

        if (focusableElements.length === 0) {
            console.warn('useFocusTrap: No focusable elements found in container');
            return;
        }

        // Store first and last focusable elements
        firstFocusableRef.current = focusableElements[0];
        lastFocusableRef.current = focusableElements[focusableElements.length - 1];

        // Auto-focus the first element if enabled
        if (autoFocus && firstFocusableRef.current) {
            // Use setTimeout to ensure the element is rendered and ready
            setTimeout(() => {
                firstFocusableRef.current?.focus();
            }, 0);
        }

        // Handle Tab key to trap focus
        const handleTab = (event: KeyboardEvent) => {
            if (event.key !== 'Tab') return;

            const firstElement = firstFocusableRef.current;
            const lastElement = lastFocusableRef.current;

            if (!firstElement || !lastElement) return;

            // If Shift+Tab is pressed and focus is on the first element, move to last
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
            // If Tab is pressed and focus is on the last element, move to first
            else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        // Add event listener
        container.addEventListener('keydown', handleTab);

        // Cleanup function
        return () => {
            container.removeEventListener('keydown', handleTab);

            // Restore focus to the previously focused element
            if (restoreFocus && previousActiveElement.current) {
                // Check if the previous element is still in the DOM
                if (document.contains(previousActiveElement.current)) {
                    previousActiveElement.current.focus();
                }
            }
        };
    }, [isActive, restoreFocus, autoFocus, focusableSelector]);

    return containerRef;
}

/**
 * Alternative hook that returns both the ref and control functions
 */
export function useFocusTrapControl(options: UseFocusTrapOptions) {
    const containerRef = useFocusTrap(options);

    const focusFirst = () => {
        const focusableElements = containerRef.current?.querySelectorAll<HTMLElement>(
            options.focusableSelector || 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements && focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    };

    const focusLast = () => {
        const focusableElements = containerRef.current?.querySelectorAll<HTMLElement>(
            options.focusableSelector || 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements && focusableElements.length > 0) {
            focusableElements[focusableElements.length - 1].focus();
        }
    };

    return {
        containerRef,
        focusFirst,
        focusLast,
    };
}
