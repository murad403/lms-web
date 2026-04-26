export interface AffiliateWalletData {
	total_earned: number;
	total_payable: number;
	total_paid: number;
	payout_progress: number;
}

export interface AffiliateDashboardStats {
	total_clicks: number;
	total_unique_clicks: number;
	total_sales: number;
	total_earned: number;
	pending_Withdraw: number;
	wallet: AffiliateWalletData;
	trends: {
		clicks: string;
		sales: string;
		earned: string;
		pending: string;
	};
}

export interface AffiliateSalesHistoryItem {
	id: number;
	order_id: string;
	course_title: string;
	customer_name: string;
	price: number;
	commission_percentage: string;
	commission_amount: string;
	status: string;
	date: string;
}

export interface AffiliateDashboardData {
	stats: AffiliateDashboardStats;
	sales_history: AffiliateSalesHistoryItem[];
}

export interface AffiliateDashboardQueryParams {
	search?: string;
}

export interface AffiliateDashboardResponse {
	success: boolean;
	status: number;
	message: string;
	data: AffiliateDashboardData;
}

