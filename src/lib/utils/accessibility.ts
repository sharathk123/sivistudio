/**
 * Accessibility Testing Utilities
 * 
 * This module provides utilities for testing and improving accessibility
 * Run these checks in development to ensure WCAG 2.1 AA compliance
 */

/**
 * Check if an element has sufficient color contrast
 * WCAG 2.1 AA requires:
 * - Normal text: 4.5:1 contrast ratio
 * - Large text (18pt+ or 14pt+ bold): 3:1 contrast ratio
 */
export function checkColorContrast(
    foreground: string,
    background: string,
    isLargeText: boolean = false
): {
    ratio: number;
    passes: boolean;
    level: 'AAA' | 'AA' | 'Fail';
} {
    const fgLuminance = getRelativeLuminance(foreground);
    const bgLuminance = getRelativeLuminance(background);

    const ratio =
        (Math.max(fgLuminance, bgLuminance) + 0.05) /
        (Math.min(fgLuminance, bgLuminance) + 0.05);

    const requiredRatio = isLargeText ? 3 : 4.5;
    const aaaRatio = isLargeText ? 4.5 : 7;

    let level: 'AAA' | 'AA' | 'Fail';
    if (ratio >= aaaRatio) {
        level = 'AAA';
    } else if (ratio >= requiredRatio) {
        level = 'AA';
    } else {
        level = 'Fail';
    }

    return {
        ratio: Math.round(ratio * 100) / 100,
        passes: ratio >= requiredRatio,
        level,
    };
}

/**
 * Calculate relative luminance for a color
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function getRelativeLuminance(color: string): number {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;

    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
        const normalized = val / 255;
        return normalized <= 0.03928
            ? normalized / 12.92
            : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

/**
 * Check if all interactive elements have accessible names
 */
export function checkAccessibleNames(): {
    passed: number;
    failed: number;
    issues: Array<{ element: string; issue: string }>;
} {
    const issues: Array<{ element: string; issue: string }> = [];
    let passed = 0;
    let failed = 0;

    // Check buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button, index) => {
        const hasText = button.textContent?.trim();
        const hasAriaLabel = button.getAttribute('aria-label');
        const hasAriaLabelledBy = button.getAttribute('aria-labelledby');

        if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
            failed++;
            issues.push({
                element: `Button #${index}`,
                issue: 'Missing accessible name (text, aria-label, or aria-labelledby)',
            });
        } else {
            passed++;
        }
    });

    // Check links
    const links = document.querySelectorAll('a');
    links.forEach((link, index) => {
        const hasText = link.textContent?.trim();
        const hasAriaLabel = link.getAttribute('aria-label');
        const hasAriaLabelledBy = link.getAttribute('aria-labelledby');

        if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
            failed++;
            issues.push({
                element: `Link #${index} (${link.href})`,
                issue: 'Missing accessible name',
            });
        } else {
            passed++;
        }
    });

    // Check images
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
        const hasAlt = img.getAttribute('alt') !== null;

        if (!hasAlt) {
            failed++;
            issues.push({
                element: `Image #${index} (${img.src})`,
                issue: 'Missing alt attribute',
            });
        } else {
            passed++;
        }
    });

    return { passed, failed, issues };
}

/**
 * Check keyboard navigation
 */
export function checkKeyboardNavigation(): {
    focusableElements: number;
    issues: Array<{ element: string; issue: string }>;
} {
    const issues: Array<{ element: string; issue: string }> = [];

    // Get all focusable elements
    const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
    ];

    const focusableElements = document.querySelectorAll(
        focusableSelectors.join(',')
    );

    // Check for focus indicators
    focusableElements.forEach((element, index) => {
        const styles = window.getComputedStyle(element, ':focus');
        const outline = styles.outline;
        const boxShadow = styles.boxShadow;

        if (outline === 'none' && boxShadow === 'none') {
            issues.push({
                element: `${element.tagName} #${index}`,
                issue: 'No visible focus indicator',
            });
        }
    });

    return {
        focusableElements: focusableElements.length,
        issues,
    };
}

/**
 * Run all accessibility checks
 * Use this in development to audit your pages
 */
export function runAccessibilityAudit(): {
    colorContrast: ReturnType<typeof checkColorContrast>[];
    accessibleNames: ReturnType<typeof checkAccessibleNames>;
    keyboardNavigation: ReturnType<typeof checkKeyboardNavigation>;
    summary: {
        totalIssues: number;
        criticalIssues: number;
    };
} {
    // Check color contrast for common elements
    const colorContrast = [
        checkColorContrast('#1A1A1A', '#FDFCFB', false), // Charcoal on Bone
        checkColorContrast('#9CA770', '#FDFCFB', false), // Sage on Bone
        checkColorContrast('#FDFCFB', '#1A1A1A', false), // Bone on Charcoal
    ];

    const accessibleNames = checkAccessibleNames();
    const keyboardNavigation = checkKeyboardNavigation();

    const totalIssues =
        accessibleNames.failed +
        keyboardNavigation.issues.length +
        colorContrast.filter((c) => !c.passes).length;

    const criticalIssues = accessibleNames.failed;

    return {
        colorContrast,
        accessibleNames,
        keyboardNavigation,
        summary: {
            totalIssues,
            criticalIssues,
        },
    };
}

/**
 * Log accessibility audit results to console
 * Call this in development mode to check your pages
 */
export function logAccessibilityAudit() {
    if (typeof window === 'undefined') return;

    const results = runAccessibilityAudit();

    console.group('🔍 Accessibility Audit');

    // Color Contrast
    console.group('🎨 Color Contrast');
    results.colorContrast.forEach((result, index) => {
        const status = result.passes ? '✅' : '❌';
        console.log(
            `${status} Ratio: ${result.ratio}:1 (${result.level}) - ${result.passes ? 'PASS' : 'FAIL'
            }`
        );
    });
    console.groupEnd();

    // Accessible Names
    console.group('🏷️ Accessible Names');
    console.log(`✅ Passed: ${results.accessibleNames.passed}`);
    console.log(`❌ Failed: ${results.accessibleNames.failed}`);
    if (results.accessibleNames.issues.length > 0) {
        console.table(results.accessibleNames.issues);
    }
    console.groupEnd();

    // Keyboard Navigation
    console.group('⌨️ Keyboard Navigation');
    console.log(`Total focusable elements: ${results.keyboardNavigation.focusableElements}`);
    if (results.keyboardNavigation.issues.length > 0) {
        console.warn('Issues found:');
        console.table(results.keyboardNavigation.issues);
    } else {
        console.log('✅ All focusable elements have visible focus indicators');
    }
    console.groupEnd();

    // Summary
    console.group('📊 Summary');
    console.log(`Total Issues: ${results.summary.totalIssues}`);
    console.log(`Critical Issues: ${results.summary.criticalIssues}`);
    if (results.summary.totalIssues === 0) {
        console.log('✅ No accessibility issues found!');
    } else {
        console.warn('⚠️ Please fix the issues above for WCAG 2.1 AA compliance');
    }
    console.groupEnd();

    console.groupEnd();
}

/**
 * Announce to screen readers (for dynamic content updates)
 */
export function announceToScreenReader(
    message: string,
    priority: 'polite' | 'assertive' = 'polite'
) {
    if (typeof window === 'undefined') return;

    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}
