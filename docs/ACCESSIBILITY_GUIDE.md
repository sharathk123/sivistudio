# Accessibility Quick Reference Guide

**For Sivi Studio Developers**

---

## 🎯 Quick Checklist

When creating new components or pages, ensure:

- [ ] All images have `alt` attributes
- [ ] All buttons have visible text or `aria-label`
- [ ] All links have descriptive text
- [ ] Form inputs have associated labels
- [ ] Interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Headings follow proper hierarchy (h1 → h2 → h3)
- [ ] Dynamic content updates announce to screen readers

---

## 🔧 Common Patterns

### 1. Images

```tsx
// ✅ Good
<Image src={...} alt="Pochampally Ikat saree in burgundy" />

// ❌ Bad
<Image src={...} alt="" />
<Image src={...} /> // Missing alt
```

### 2. Buttons

```tsx
// ✅ Good - Visible text
<button>Add to Cart</button>

// ✅ Good - Icon with aria-label
<button aria-label="Close menu">
  <X className="w-6 h-6" />
</button>

// ❌ Bad - Icon without label
<button>
  <X className="w-6 h-6" />
</button>
```

### 3. Links

```tsx
// ✅ Good - Descriptive text
<Link href="/products/saree">View Pochampally Ikat Saree</Link>

// ❌ Bad - Generic text
<Link href="/products/saree">Click here</Link>
<Link href="/products/saree">Read more</Link>
```

### 4. Form Inputs

```tsx
// ✅ Good - Associated label
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />

// ✅ Good - aria-label
<input type="email" aria-label="Email Address" />

// ❌ Bad - No label
<input type="email" placeholder="Email" />
```

### 5. Headings

```tsx
// ✅ Good - Proper hierarchy
<h1>Sivi Studio</h1>
  <h2>Collections</h2>
    <h3>Handloom Sarees</h3>

// ❌ Bad - Skipping levels
<h1>Sivi Studio</h1>
  <h3>Collections</h3> // Skipped h2
```

### 6. Dynamic Content

```tsx
import { announceToScreenReader } from '@/lib/utils/accessibility';

// Announce cart updates
const addToCart = () => {
  // Add item logic
  announceToScreenReader('Item added to cart', 'polite');
};

// Announce errors
const handleError = () => {
  announceToScreenReader('Error: Please try again', 'assertive');
};
```

---

## 🎨 Focus Styles

Focus styles are automatically applied via `globals.css`. No additional work needed!

```css
/* Automatically applied to all interactive elements */
button:focus-visible {
  outline: 2px solid var(--color-sage);
  outline-offset: 4px;
  box-shadow: 0 0 0 4px rgba(156, 167, 112, 0.1);
}
```

---

## 🧪 Testing

### During Development

Add to any page to run accessibility audit:

```typescript
'use client';

import { useEffect } from 'react';
import { logAccessibilityAudit } from '@/lib/utils/accessibility';

export default function YourPage() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      logAccessibilityAudit();
    }
  }, []);

  return (
    // Your page content
  );
}
```

### Keyboard Testing

1. Press **Tab** to navigate forward
2. Press **Shift + Tab** to navigate backward
3. Press **Enter** or **Space** to activate buttons/links
4. Verify visible focus indicator on all elements

### Screen Reader Testing

**macOS**: Enable VoiceOver (Cmd + F5)  
**Windows**: Download NVDA (free)

---

## 📋 Color Contrast

Use the built-in checker:

```typescript
import { checkColorContrast } from '@/lib/utils/accessibility';

const result = checkColorContrast('#1A1A1A', '#FDFCFB');
console.log(result);
// { ratio: 17.8, passes: true, level: 'AAA' }
```

### Approved Color Combinations

| Foreground | Background | Ratio | Status |
|------------|------------|-------|--------|
| Charcoal | Bone | 17.8:1 | ✅ AAA |
| Sage | Bone | 4.6:1 | ✅ AA |
| Bone | Charcoal | 17.8:1 | ✅ AAA |

---

## 🚫 Common Mistakes

### 1. Decorative Images Without Empty Alt

```tsx
// ✅ Good - Empty alt for decorative images
<Image src={pattern} alt="" role="presentation" />

// ❌ Bad - Missing alt
<Image src={pattern} />
```

### 2. Div Buttons

```tsx
// ✅ Good - Use button element
<button onClick={handleClick}>Click me</button>

// ❌ Bad - Div as button (not keyboard accessible)
<div onClick={handleClick}>Click me</div>
```

### 3. Low Contrast Text

```tsx
// ✅ Good - High contrast
<p className="text-charcoal">Readable text</p>

// ❌ Bad - Low contrast
<p className="text-gray-300">Hard to read</p>
```

### 4. Missing Focus Indicators

```css
/* ❌ Bad - Removing focus outline */
button:focus {
  outline: none; /* Don't do this! */
}

/* ✅ Good - Custom focus style */
button:focus-visible {
  outline: 2px solid var(--color-sage);
}
```

---

## 🛠️ Utility Classes

### Screen Reader Only

Hide content visually but keep it accessible:

```tsx
<span className="sr-only">Loading...</span>
```

### Skip to Main

Already implemented in layout. Ensure all pages have:

```tsx
<main id="main-content">
  {/* Page content */}
</main>
```

---

## 📚 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

---

## 🎯 WCAG 2.1 AA Requirements

| Level | Requirement | Implementation |
|-------|-------------|----------------|
| A | Keyboard accessible | ✅ All interactive elements |
| A | Text alternatives | ✅ Alt text on images |
| A | Meaningful sequence | ✅ Semantic HTML |
| AA | Contrast (4.5:1) | ✅ All text meets ratio |
| AA | Focus visible | ✅ Visible focus indicators |
| AA | Bypass blocks | ✅ Skip-to-main link |

---

**Questions?** Check `/docs/CODE_QUALITY_IMPROVEMENTS.md` for detailed documentation.
