import { formatAmount } from '@/content/events';
export function PaymentStep({
  amount,
  onSimulate,
  onBack,
}: {
  amount: number;
  onSimulate: (outcome: 'success' | 'failure') => void;
  onBack: () => void;
}) {
  return (
    <>
      <div className="demo-payment-panel">
        <span className="tiny-tag">DEMO PAYMENT</span>
        <p>Online payment integration is being finalized.</p>
        <p className="payment-amount">
          {formatAmount(amount)}
          <span>INR · Total amount</span>
        </p>
        <p>
          This is a payment simulation. Choose an outcome to test the experience. No card, UPI, or
          bank details are needed. No real charge will be made.
        </p>
      </div>
      <button className="button payment-disabled" type="button" disabled>
        Pay {formatAmount(amount)} — coming soon
      </button>
      <div className="checkout-actions payment-actions">
        <button type="button" className="button" onClick={() => onSimulate('success')}>
          Simulate Successful Payment <span aria-hidden="true">↗</span>
        </button>
        <button
          type="button"
          className="button button-outline"
          onClick={() => onSimulate('failure')}
        >
          Simulate Failed Payment
        </button>
      </div>
      <button type="button" className="checkout-back" onClick={onBack}>
        ← Back to Review
      </button>
    </>
  );
}
