import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './Gifts.css';

const GIFT_METHODS = [
    {
        title: 'Ecobank Ghana',
        rows: [
            { label: 'Branch', value: 'Dansoman' },
            { label: 'Account Name', value: 'Daniella Owusua Adjei' },
            { label: 'Account Number', value: '1441002566992', copy: true },
            { label: 'Currency', value: 'GHS' },
        ],
    },
    {
        title: 'Mobile Money',
        rows: [
            { label: 'Number', value: '0554804150', copy: true },
            { label: 'Name', value: 'Daniella Owusua Adjei' },
            { label: 'Currency', value: 'GHS' },
        ],
    },
    {
        title: 'PayPal',
        rows: [
            { label: 'Email', value: 'Daniellaadjei70@gmail.com', copy: true },
            { label: 'Currency', value: 'CAD, USD, GBP' },
        ],
    },
    {
        title: 'The Toronto-Dominion Bank',
        rows: [
            { label: 'Branch Number', value: '1036' },
            { label: 'Account Number', value: '6485818', copy: true },
            { label: 'Account Name', value: 'Daniella Owusua Adjei' },
            { label: 'Interac e-Transfer', value: 'Daniellaadjei70@gmail.com', copy: true },
            { label: 'Currency', value: 'CAD' },
        ],
    },
    {
        title: 'Abu Dhabi Commercial Bank PJSC',
        rows: [
            { label: 'Account Title', value: 'PRINCE ADUAMA' },
            { label: 'Account Number', value: '12112874910002', copy: true },
            { label: 'IBAN', value: 'AE840030012112874910002', copy: true },
            { label: 'Currency', value: 'USD' },
            { label: 'SWIFT code', value: 'ADCBAEAA', copy: true },
        ],
    },
];

const GiftValue = ({ value, copy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            // Clipboard unavailable (e.g. insecure context); value is still visible to copy manually.
        }
    };

    if (!copy) {
        return <span className="gift-value">{value}</span>;
    }

    return (
        <span className="gift-value">
            {value}
            <button
                type="button"
                className={`copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
                aria-label={copied ? 'Copied' : `Copy ${value}`}
            >
                {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
        </span>
    );
};

const Gifts = () => {
    return (
        <section className="gifts" id="gifts">
            <div className="container">
                <h2 className="section-title">Gifts</h2>
                <p className="gifts-intro">
                    Your presence is truly the greatest gift to us. If you still feel led to bless us,
                    we kindly prefer monetary gifts. You may send your gift through any of the following:
                </p>
                <div className="gifts-grid">
                    {GIFT_METHODS.map((method) => (
                        <div className="gift-card" key={method.title}>
                            <h3 className="gift-title">{method.title}</h3>
                            <dl className="gift-rows">
                                {method.rows.map((row) => (
                                    <div className="gift-row" key={row.label}>
                                        <dt className="gift-label">{row.label}</dt>
                                        <dd className="gift-detail">
                                            <GiftValue value={row.value} copy={row.copy} />
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gifts;
