export interface AffiliateWalletData {
	total_earned: number;
	pending_payment: number;
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

export interface AffiliateRecentTransactionItem {
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

export interface AffiliateWalletResponse {
	success: boolean;
	status: number;
	message: string;
	data: {
		wallet: AffiliateWalletData;
		recent_transactions: AffiliateRecentTransactionItem[];
	};
}

export interface AffiliateProfileData {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar: string;
	is_verified: boolean;
	created_at: string;
	updated_at: string;
}

export interface AffiliateProfileResponse {
	success: boolean;
	status: number;
	message: string;
	data: AffiliateProfileData;
}

export interface StripeConnectData {
	stripe_account_id: string;
	onboarding_url: string;
	charges_enabled: boolean;
	payouts_enabled: boolean;
	details_submitted: boolean;
}

export interface StripeConnectResponse {
	success: boolean;
	status: number;
	message: string;
	data: StripeConnectData;
}

export interface StripeDashboardResponse {
	success: boolean;
	status: number;
	message: string;
	data: {
		url: string;
	};
}

export interface WithdrawalRequestPayload {
	amount: number;
}

export interface WithdrawalRequestResponse {
	success: boolean;
	status: number;
	message: string;
	data: {
		withdraw_id: string;
		amount: string;
		status: string;
	};
}

export interface WithdrawalHistoryItem {
	id: number;
	withdraw_id: string;
	user_name: string;
	bank_name: string;
	bank_last4: string;
	amount: string;
	status: string;
	requested_at: string;
}

export interface WithdrawalHistoryResponse {
	success: boolean;
	status: number;
	message: string;
	total: number;
	page: number;
	page_size: number;
	total_pages: number;
	next: string | null;
	previous: string | null;
	data: {
		message: string;
		data: WithdrawalHistoryItem[];
	};
}

export interface WithdrawalHistoryQueryParams {
	page?: number;
	page_size?: number;
}

