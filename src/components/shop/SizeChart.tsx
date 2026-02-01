'use client';

import { useState } from 'react';

type Unit = 'cm' | 'in';

export default function SizeChart() {
    const [unit, setUnit] = useState<Unit>('cm');

    const measurements = [
        { size: 'XS', uk: '6', bust_cm: '81-84', bust_in: '32-33', waist_cm: '61-64', waist_in: '24-25', hip_cm: '86-89', hip_in: '34-35' },
        { size: 'S', uk: '8', bust_cm: '86-89', bust_in: '34-35', waist_cm: '66-69', waist_in: '26-27', hip_cm: '91-94', hip_in: '36-37' },
        { size: 'M', uk: '10', bust_cm: '91-94', bust_in: '36-37', waist_cm: '71-74', waist_in: '28-29', hip_cm: '97-99', hip_in: '38-39' },
        { size: 'L', uk: '12', bust_cm: '97-102', bust_in: '38-40', waist_cm: '76-81', waist_in: '30-32', hip_cm: '102-107', hip_in: '40-42' },
        { size: 'XL', uk: '14', bust_cm: '107-112', bust_in: '42-44', waist_cm: '86-91', waist_in: '34-36', hip_cm: '112-117', hip_in: '44-46' },
        { size: 'XXL', uk: '16', bust_cm: '117-122', bust_in: '46-48', waist_cm: '97-102', waist_in: '38-40', hip_cm: '122-127', hip_in: '48-50' },
    ];

    return (
        <div className="w-full bg-bone border border-ivory-200 p-6 md:p-8 rounded-sm shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-2xl text-charcoal italic">Standard Size Chart</h3>
                <div className="flex bg-ivory-100 rounded-sm p-1">
                    <button
                        onClick={() => setUnit('cm')}
                        className={`px-4 py-1 text-xs uppercase tracking-widest transition-all rounded-sm ${unit === 'cm' ? 'bg-sage text-bone shadow-sm' : 'text-charcoal-400 hover:text-charcoal'}`}
                    >
                        CM
                    </button>
                    <button
                        onClick={() => setUnit('in')}
                        className={`px-4 py-1 text-xs uppercase tracking-widest transition-all rounded-sm ${unit === 'in' ? 'bg-sage text-bone shadow-sm' : 'text-charcoal-400 hover:text-charcoal'}`}
                    >
                        IN
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-ivory-300">
                            <th className="py-4 font-serif italic text-charcoal font-normal text-lg">Size</th>
                            <th className="py-4 font-mono text-xs uppercase tracking-widest text-charcoal-400">UK/AU</th>
                            <th className="py-4 font-mono text-xs uppercase tracking-widest text-charcoal-400">Bust ({unit})</th>
                            <th className="py-4 font-mono text-xs uppercase tracking-widest text-charcoal-400">Waist ({unit})</th>
                            <th className="py-4 font-mono text-xs uppercase tracking-widest text-charcoal-400">Hip ({unit})</th>
                        </tr>
                    </thead>
                    <tbody>
                        {measurements.map((row) => (
                            <tr key={row.size} className="border-b border-ivory-100 last:border-0 hover:bg-ivory-50 transition-colors">
                                <td className="py-4 font-mono text-sm text-charcoal font-medium">{row.size}</td>
                                <td className="py-4 font-mono text-sm text-charcoal-400">{row.uk}</td>
                                <td className="py-4 font-mono text-sm text-charcoal-400">{unit === 'cm' ? row.bust_cm : row.bust_in}</td>
                                <td className="py-4 font-mono text-sm text-charcoal-400">{unit === 'cm' ? row.waist_cm : row.waist_in}</td>
                                <td className="py-4 font-mono text-sm text-charcoal-400">{unit === 'cm' ? row.hip_cm : row.hip_in}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="mt-6 text-xs text-charcoal-400 leading-relaxed font-light">
                * Measurements refer to body size, not garment dimensions. For loose-fit garments like Kurtas, refer to the garment measurements in the product description if available.
            </p>
        </div>
    );
}
