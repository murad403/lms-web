export function formatAmount(amount: number, currency: string) {
    return `${currency}${amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}
