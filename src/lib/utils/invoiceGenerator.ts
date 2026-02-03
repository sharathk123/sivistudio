import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { formatDate } from './dateUtils'

interface OrderItem {
    id: string
    sanity_product_id?: string
    quantity: number
    price: number
    selected_size?: string
}

interface ShippingAddress {
    full_name: string
    address_line1: string
    address_line2?: string
    city: string
    state: string
    zip_code: string
    phone_number: string
}

interface OrderData {
    id: string
    created_at: string
    total_amount: number
    status: string
    shipping_address: ShippingAddress | string
    order_items: OrderItem[]
    razorpay_payment_id?: string
}

export const generateInvoice = (order: OrderData) => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    // --- Header & Branding ---
    doc.setFont('times', 'italic')
    doc.setFontSize(28)
    doc.text('Sivi Studio', pageWidth / 2, 20, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text('Heritage Handlooms | Digital Atelier', pageWidth / 2, 28, { align: 'center' })

    // Divider
    doc.setDrawColor(156, 167, 112) // Sage color
    doc.setLineWidth(0.5)
    doc.line(20, 35, pageWidth - 20, 35)

    // --- Invoice Info ---
    doc.setTextColor(0)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('INVOICE', 20, 50)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`Order ID: #${order.id.slice(0, 8).toUpperCase()}`, 20, 58)
    doc.text(`Date: ${formatDate(order.created_at)}`, 20, 64)
    doc.text(`Status: ${order.status.toUpperCase()}`, 20, 70)

    // --- Shipping Details ---
    const shippingX = pageWidth - 80
    doc.setFont('helvetica', 'bold')
    doc.text('SHIPPING TO:', shippingX, 50)
    doc.setFont('helvetica', 'normal')

    if (typeof order.shipping_address === 'object') {
        const addr = order.shipping_address
        doc.text(addr.full_name, shippingX, 58)
        doc.text(addr.address_line1, shippingX, 64)
        if (addr.address_line2) doc.text(addr.address_line2, shippingX, 70)
        doc.text(`${addr.city}, ${addr.state} - ${addr.zip_code}`, shippingX, addr.address_line2 ? 76 : 70)
        doc.text(`Phone: ${addr.phone_number}`, shippingX, addr.address_line2 ? 82 : 76)
    } else {
        doc.text(order.shipping_address, shippingX, 58, { maxWidth: 60 })
    }

    // --- Items Table ---
    const tableData = order.order_items.map((item, index) => [
        index + 1,
        `Product ${item.sanity_product_id?.slice(0, 8).toUpperCase() || 'N/A'}${item.selected_size ? ` (Size: ${item.selected_size})` : ''}`,
        `INR ${item.price.toLocaleString('en-IN')}`,
        item.quantity,
        `INR ${(item.price * item.quantity).toLocaleString('en-IN')}`
    ])

        ; (doc as any).autoTable({
            startY: 95,
            head: [['#', 'Item Description', 'Unit Price', 'Qty', 'Total']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [26, 26, 26], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [249, 249, 247] },
            margin: { left: 20, right: 20 }
        })

    // --- Totals ---
    const finalY = (doc as any).lastAutoTable.finalY + 10
    doc.setFont('helvetica', 'bold')
    doc.text('Summary', 20, finalY)

    doc.setFont('helvetica', 'normal')
    doc.text('Subtotal:', pageWidth - 80, finalY)
    doc.text(`INR ${order.total_amount.toLocaleString('en-IN')}`, pageWidth - 20, finalY, { align: 'right' })

    doc.text('Shipping:', pageWidth - 80, finalY + 6)
    doc.text('FREE', pageWidth - 20, finalY + 6, { align: 'right' })

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setDrawColor(200)
    doc.line(pageWidth - 85, finalY + 12, pageWidth - 20, finalY + 12)
    doc.text('Total Amount:', pageWidth - 80, finalY + 20)
    doc.text(`INR ${order.total_amount.toLocaleString('en-IN')}`, pageWidth - 20, finalY + 20, { align: 'right' })

    // --- Footer ---
    const footerY = doc.internal.pageSize.getHeight() - 20
    doc.setFontSize(8)
    doc.setFont('helvetica', 'italic')
    doc.setTextColor(150)
    doc.text('Thank you for supporting Indian Heritage Handlooms.', pageWidth / 2, footerY, { align: 'center' })
    doc.text('This is a computer generated invoice.', pageWidth / 2, footerY + 5, { align: 'center' })

    // Save PDF
    doc.save(`Sivi_Invoice_${order.id.slice(0, 8).toUpperCase()}.pdf`)
}
