/**
 * Server-Side Price Validation
 * 
 * Validates cart items against database prices to prevent payment tampering.
 * This is a critical security measure to ensure users cannot manipulate prices
 * before checkout.
 */

import { getProductsByIds } from '@/lib/sanity/client';
import { Product } from '@/lib/sanity/client';

export interface CartItemForValidation {
    product: {
        _id: string;
        title: string;
        price: number | null;
        priceDisplay: string;
    };
    quantity: number;
    selectedSize?: string;
}

export interface ValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
    validatedItems: ValidatedCartItem[];
}

export interface ValidatedCartItem {
    productId: string;
    title: string;
    cartPrice: number | null;
    dbPrice: number | null | undefined;
    quantity: number;
    selectedSize?: string;
    isValid: boolean;
}

/**
 * Validates cart prices against database prices
 * 
 * @param cartItems - Array of cart items to validate
 * @returns ValidationResult with validation status and details
 */
export async function validateCartPrices(
    cartItems: CartItemForValidation[]
): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];
    const validatedItems: ValidatedCartItem[] = [];

    if (!cartItems || cartItems.length === 0) {
        return {
            valid: false,
            errors: ['Cart is empty'],
            warnings: [],
            validatedItems: [],
        };
    }

    // Extract product IDs with safety check
    const validCartItems = cartItems.filter(item => item && item.product && item.product._id);
    const productIds = validCartItems.map(item => item.product._id);

    if (validCartItems.length !== cartItems.length) {
        warnings.push('Some items in the cart were invalid and were skipped.');
    }

    // Fetch products from database
    let dbProducts: Product[];
    try {
        dbProducts = await getProductsByIds(productIds);
    } catch (error) {
        console.error('Failed to fetch products for price validation:', error);
        return {
            valid: false,
            errors: ['Unable to validate prices. Please try again later.'],
            warnings: [],
            validatedItems: [],
        };
    }

    // Validate each cart item
    for (const cartItem of validCartItems) {
        const dbProduct = dbProducts.find(p => p._id === cartItem.product._id);

        if (!dbProduct) {
            errors.push(`Product "${cartItem.product.title}" (ID: ${cartItem.product._id}) not found in database`);
            validatedItems.push({
                productId: cartItem.product._id,
                title: cartItem.product.title,
                cartPrice: cartItem.product.price,
                dbPrice: null,
                quantity: cartItem.quantity,
                selectedSize: cartItem.selectedSize,
                isValid: false,
            });
            continue;
        }

        // Check if product is available
        if (dbProduct.availability !== 'in_stock' && dbProduct.availability !== 'made_to_order') {
            warnings.push(`Product "${dbProduct.title}" is currently ${dbProduct.availability}`);
        }

        // Validate price
        const cartPrice = cartItem.product.price;
        const dbPrice = dbProduct.price;

        let isValid = true;

        // For numeric prices, check if they match
        if (cartItem.product.priceDisplay === 'numeric') {
            if (cartPrice === null || dbPrice === null) {
                errors.push(`Price mismatch for "${dbProduct.title}": cart price is null but display is numeric`);
                isValid = false;
            } else if (cartPrice !== dbPrice) {
                errors.push(
                    `Price tampering detected for "${dbProduct.title}": ` +
                    `cart price ₹${cartPrice.toLocaleString('en-IN')} != database price ₹${(dbPrice ?? 0).toLocaleString('en-IN')}`
                );
                isValid = false;
            }
        } else {
            // For "price on request" items, cart price should be null
            if (cartPrice !== null) {
                warnings.push(
                    `Product "${dbProduct.title}" is marked as "Price on Request" but has a price in cart`
                );
            }
        }

        validatedItems.push({
            productId: dbProduct._id,
            title: dbProduct.title,
            cartPrice,
            dbPrice,
            quantity: cartItem.quantity,
            selectedSize: cartItem.selectedSize,
            isValid,
        });
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
        validatedItems,
    };
}

/**
 * Calculates the total price from validated cart items
 * Only includes items with valid numeric prices
 */
export function calculateValidatedTotal(validatedItems: ValidatedCartItem[]): number {
    return validatedItems.reduce((total, item) => {
        if (item.isValid && item.dbPrice !== null && item.dbPrice !== undefined) {
            return total + (item.dbPrice * item.quantity);
        }
        return total;
    }, 0);
}

/**
 * Formats validation result for logging
 */
export function formatValidationResult(result: ValidationResult): string {
    const lines = [
        `Price Validation Result: ${result.valid ? 'PASSED' : 'FAILED'}`,
        `Items Validated: ${result.validatedItems.length}`,
        `Errors: ${result.errors.length}`,
        `Warnings: ${result.warnings.length}`,
    ];

    if (result.errors.length > 0) {
        lines.push('\nErrors:');
        result.errors.forEach(err => lines.push(`  - ${err}`));
    }

    if (result.warnings.length > 0) {
        lines.push('\nWarnings:');
        result.warnings.forEach(warn => lines.push(`  - ${warn}`));
    }

    return lines.join('\n');
}
