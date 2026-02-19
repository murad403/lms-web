import { ArrowDownCircle, CreditCard, DollarSign, Wallet } from 'lucide-react'


const EarningStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-50 flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="text-xl font-bold text-title">$34343</p>
          <p className="text-sm text-description">Total Revenue</p>
        </div>
      </div>
      <div className="bg-white p-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-green-50 flex items-center justify-center">
          <Wallet className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p className="text-xl font-bold text-title">$34343</p>
          <p className="text-sm text-description">Current Balance</p>
        </div>
      </div>
      <div className="bg-white p-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-orange-50 flex items-center justify-center">
          <ArrowDownCircle className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <p className="text-xl font-bold text-title">$34343</p>
          <p className="text-sm text-description">Total Withdrawals</p>
        </div>
      </div>
      <div className="bg-white p-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-purple-50 flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <p className="text-xl font-bold text-title">$45343</p>
          <p className="text-sm text-description">Today Revenue</p>
        </div>
      </div>
    </div>
  )
}

export default EarningStats;
