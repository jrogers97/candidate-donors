export function formatMoney(amount: number | null | undefined) {
    if (amount === null || amount === undefined) {
        return "";
    }
    var formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
    });
    
    return formatter.format(amount);
};


