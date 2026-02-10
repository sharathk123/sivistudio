/**
 * Checkout Flow E2E Tests
 * 
 * End-to-end tests for the checkout process
 */

import { test, expect } from '@playwright/test'

test.describe('Checkout Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('should navigate from home to shop', async ({ page }) => {
        await page.click('text=Shop')
        await expect(page).toHaveURL(/\/shop/)
        await expect(page.locator('h1, h2')).toContainText('Shop', { timeout: 10000 })
    })

    test('should add product to cart', async ({ page }) => {
        // Navigate to shop
        await page.click('text=Shop')

        // Wait for products to load
        await page.waitForSelector('.product-card, [data-testid="product-card"]', { timeout: 10000 })

        // Click first product
        const firstProduct = page.locator('.product-card, [data-testid="product-card"]').first()
        await firstProduct.click()

        // Wait for product page
        await expect(page).toHaveURL(/\/products\//)

        // Add to cart
        const addToCartButton = page.locator('button:has-text("Add to Cart"), [data-testid="add-to-cart"]').first()
        await addToCartButton.click()

        // Verify cart opens
        await expect(page.locator('[role="dialog"], [aria-label*="cart"]')).toBeVisible({ timeout: 5000 })
    })

    test('should update cart quantity', async ({ page }) => {
        // Add product to cart first
        await page.click('text=Shop')
        await page.waitForSelector('.product-card, [data-testid="product-card"]', { timeout: 10000 })
        await page.locator('.product-card, [data-testid="product-card"]').first().click()
        await page.locator('button:has-text("Add to Cart"), [data-testid="add-to-cart"]').first().click()

        // Wait for cart to open
        await page.waitForSelector('[role="dialog"], [aria-label*="cart"]', { timeout: 5000 })

        // Find quantity controls
        const increaseButton = page.locator('button[aria-label*="Increase"], button:has(+ svg path[d*="M12 6v12"])').first()
        const quantityDisplay = page.locator('.cart-item-quantity, [data-testid="quantity"]').first()

        // Get initial quantity
        const initialQuantity = await quantityDisplay.textContent()
        expect(initialQuantity).toBe('1')

        // Increase quantity
        await increaseButton.click()

        // Verify quantity updated
        await expect(quantityDisplay).toHaveText('2')
    })

    test('should remove item from cart', async ({ page }) => {
        // Add product to cart first
        await page.click('text=Shop')
        await page.waitForSelector('.product-card, [data-testid="product-card"]', { timeout: 10000 })
        await page.locator('.product-card, [data-testid="product-card"]').first().click()
        await page.locator('button:has-text("Add to Cart"), [data-testid="add-to-cart"]').first().click()

        // Wait for cart to open
        await page.waitForSelector('[role="dialog"], [aria-label*="cart"]', { timeout: 5000 })

        // Find remove button
        const removeButton = page.locator('button:has-text("Remove"), [data-testid="remove-item"]').first()

        // Remove item
        await removeButton.click()

        // Verify cart is empty
        await expect(page.locator('text=Your cart is empty')).toBeVisible({ timeout: 5000 })
    })

    test('should close cart with escape key', async ({ page }) => {
        // Open cart
        await page.click('text=Shop')
        await page.waitForSelector('.product-card, [data-testid="product-card"]', { timeout: 10000 })
        await page.locator('.product-card, [data-testid="product-card"]').first().click()
        await page.locator('button:has-text("Add to Cart"), [data-testid="add-to-cart"]').first().click()

        // Wait for cart to open
        await page.waitForSelector('[role="dialog"], [aria-label*="cart"]', { timeout: 5000 })

        // Press escape
        await page.keyboard.press('Escape')

        // Verify cart is closed
        await expect(page.locator('[role="dialog"], [aria-label*="cart"]')).not.toBeVisible()
    })

    test('should navigate to checkout from cart', async ({ page }) => {
        // Add product to cart
        await page.click('text=Shop')
        await page.waitForSelector('.product-card, [data-testid="product-card"]', { timeout: 10000 })
        await page.locator('.product-card, [data-testid="product-card"]').first().click()
        await page.locator('button:has-text("Add to Cart"), [data-testid="add-to-cart"]').first().click()

        // Wait for cart to open
        await page.waitForSelector('[role="dialog"], [aria-label*="cart"]', { timeout: 5000 })

        // Click checkout button
        const checkoutButton = page.locator('a:has-text("Proceed to Checkout"), [data-testid="checkout-button"]')
        await checkoutButton.click()

        // Verify navigation to checkout
        await expect(page).toHaveURL(/\/checkout/)
    })
})

test.describe('Navigation', () => {
    test('should navigate between pages', async ({ page }) => {
        await page.goto('/')

        // Test navigation to collections
        await page.click('text=Collections')
        await expect(page).toHaveURL(/\/collections/)

        // Test navigation to story
        await page.click('text=Story')
        await expect(page).toHaveURL(/\/story/)

        // Test navigation to gallery
        await page.click('text=Gallery')
        await expect(page).toHaveURL(/\/gallery/)
    })

    test('should open and close mobile menu', async ({ page }) => {
        await page.goto('/')

        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 })

        // Open menu
        await page.click('button:has-text("Menu"), [aria-label*="menu"]')
        await expect(page.locator('[role="dialog"], [aria-label*="menu"], .navigation-overlay')).toBeVisible()

        // Close menu
        await page.keyboard.press('Escape')
        await expect(page.locator('[role="dialog"], [aria-label*="menu"], .navigation-overlay')).not.toBeVisible()
    })
})

test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
        await page.goto('/')

        // Check for h1
        const h1 = page.locator('h1')
        await expect(h1).toBeVisible()

        // Check that h2s follow h1
        const h2s = page.locator('h2')
        const h2Count = await h2s.count()
        expect(h2Count).toBeGreaterThan(0)
    })

    test('should have skip to main content link', async ({ page }) => {
        await page.goto('/')

        // Focus on body and press tab
        await page.body.focus()
        await page.keyboard.press('Tab')

        // Check if skip link is focused
        const skipLink = page.locator('.skip-to-main, a[href="#main-content"]')
        await expect(skipLink).toBeFocused()
    })

    test('should have proper ARIA labels on interactive elements', async ({ page }) => {
        await page.goto('/')

        // Check buttons have aria-label or visible text
        const buttons = page.locator('button')
        const buttonCount = await buttons.count()

        for (let i = 0; i < Math.min(buttonCount, 10); i++) {
            const button = buttons.nth(i)
            const ariaLabel = await button.getAttribute('aria-label')
            const text = await button.textContent()

            expect(ariaLabel || text?.trim()).toBeTruthy()
        }
    })
})

test.describe('Performance', () => {
    test('should load home page within performance budget', async ({ page }) => {
        const startTime = Date.now()
        await page.goto('/')
        const loadTime = Date.now() - startTime

        // Page should load within 3 seconds
        expect(loadTime).toBeLessThan(3000)
    })

    test('should have no console errors', async ({ page }) => {
        const errors: string[] = []

        page.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push(msg.text())
            }
        })

        await page.goto('/')

        // Wait a bit for any delayed errors
        await page.waitForTimeout(1000)

        expect(errors).toHaveLength(0)
    })
})
