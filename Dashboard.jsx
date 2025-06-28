import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, DollarSign, Activity, Target, Calendar, Filter, Search, Eye } from 'lucide-react';
const IPO_DATA = [
  {
    id: 1,
    name: 'Tata Technologies',
    sector: 'Engineering',
    listingDate: '2023-11-30',
    issuePrice: 500,
    currentPrice: 1250,
    marketCap: 42000,
    ratios: {
      ROE: 18.5,
      ROCE: 22.3,
      PE: 30.2,
      PB: 4.2,
      DebtToEquity: 0.15,
      CurrentRatio: 2.8,
      EPS: 41.5,
      RevenueGrowth: 25.6,
      ProfitMargin: 12.4
    },
    financials: {
      revenue: [1200, 1450, 1820, 2280, 2865],
      profit: [140, 180, 226, 283, 355],
      years: ['2019', '2020', '2021', '2022', '2023']
    },
    riskMetrics: {
      volatility: 35,
      beta: 1.2,
      sharpeRatio: 0.8
    },
    explainability: {
      investmentThesis: 'Tata Technologies demonstrates robust financial strength with a high ROE of 18.5% and ROCE of 22.3%, indicating efficient capital usage. The EPS of ₹41.5 supports its earnings quality, while a solid Profit Margin of 12.4% reflects operational efficiency. A low Debt-to-Equity ratio of 0.15 and a Current Ratio of 2.8 underline strong balance sheet health. Despite a slightly premium PE of 30.2, the valuation is justified by consistent Revenue Growth of 25.6%. This combination supports a positive investment outlook.',
      pros: [
        'Strong ROE (18.5%) and ROCE (22.3%) reflect capital efficiency',
        'EPS of ₹41.5 indicates high earnings per share',
        'Healthy Profit Margin (12.4%) shows profitability strength',
        'Low leverage risk with Debt-to-Equity at 0.15',
        'High Revenue Growth (25.6%) supports long-term growth'
      ],
      cons: [
        'Valuation slightly rich with PE at 30.2',
        'Exposure to cyclicality in engineering/auto sectors',
        'Client concentration risk with OEMs',
        'Exchange rate sensitivity for global operations',
        'Competitive intensity in the sector'
      ],
      recommendation: 'BUY',
      targetPrice: 1400,
      riskLevel: 'Medium'
    }
  },
  {
    id: 2,
    name: 'Zomato',
    sector: 'FoodTech',
    listingDate: '2021-07-23',
    issuePrice: 76,
    currentPrice: 145,
    marketCap: 12800,
    ratios: {
      ROE: -2.4,
      ROCE: -1.8,
      PE: null,
      PB: 8.5,
      DebtToEquity: 0.05,
      CurrentRatio: 3.2,
      EPS: -2.8,
      RevenueGrowth: 68.2,
      ProfitMargin: -8.5
    },
    financials: {
      revenue: [2960, 4192, 5230, 6475, 8416],
      profit: [-682, -816, -435, -971, -346],
      years: ['2019', '2020', '2021', '2022', '2023']
    },
    riskMetrics: {
      volatility: 55,
      beta: 1.8,
      sharpeRatio: -0.2
    },
    explainability: {
      investmentThesis: 'Zomato shows extraordinary revenue growth of 68.2%, but the company remains unprofitable with a negative ROE (-2.4%) and ROCE (-1.8%). The EPS is -2.8 and the Profit Margin is also in the red at -8.5%, reflecting operational inefficiency. The absence of a PE ratio due to ongoing losses and a high PB ratio of 8.5 suggest the stock is priced optimistically. Liquidity is strong with a Current Ratio of 3.2 and debt remains low. However, until profitability improves, this IPO is best held with caution.',
      pros: [
        'High Revenue Growth (68.2%) shows market expansion',
        'Strong liquidity (Current Ratio 3.2)',
        'Low leverage (Debt-to-Equity 0.05)',
        'Dominant player in food delivery with brand recognition',
        'Diversification into quick commerce and dining out'
      ],
      cons: [
        'Negative ROE (-2.4%) and ROCE (-1.8%) reflect poor capital efficiency',
        'Consistently negative EPS (-2.8)',
        'Ongoing losses with Profit Margin of -8.5%',
        'No PE due to lack of profitability',
        'High valuation risk (PB 8.5) despite negative earnings'
      ],
      recommendation: 'HOLD',
      targetPrice: 160,
      riskLevel: 'High'
    }
  },
  {
    id: 3,
    name: 'HDFC AMC',
    sector: 'Asset Management',
    listingDate: '2018-08-06',
    issuePrice: 1100,
    currentPrice: 2850,
    marketCap: 60500,
    ratios: {
      ROE: 35.2,
      ROCE: 30.8,
      PE: 24.5,
      PB: 8.6,
      DebtToEquity: 0.02,
      CurrentRatio: 4.5,
      EPS: 116.3,
      RevenueGrowth: 18.4,
      ProfitMargin: 42.6
    },
    financials: {
      revenue: [1580, 1720, 1920, 2145, 2540],
      profit: [620, 695, 785, 880, 1082],
      years: ['2019', '2020', '2021', '2022', '2023']
    },
    riskMetrics: {
      volatility: 28,
      beta: 0.9,
      sharpeRatio: 1.4
    },
    explainability: {
      investmentThesis: 'HDFC AMC displays elite financial strength with a very high ROE (35.2%) and ROCE (30.8%), indicating superb capital efficiency. A PE ratio of 24.5 is reasonable given the exceptionally high Profit Margin of 42.6% and EPS of ₹116.3. The company maintains a very strong liquidity position (Current Ratio 4.5) and extremely low financial risk (Debt-to-Equity 0.02). With consistent Revenue Growth of 18.4%, it is a compelling BUY for long-term investors.',
      pros: [
        'Industry-leading ROE (35.2%) and ROCE (30.8%)',
        'Massive Profit Margin (42.6%) reflects strong operations',
        'High EPS of ₹116.3 enhances shareholder value',
        'Low financial leverage (D/E 0.02)',
        'Strong liquidity cushion (Current Ratio 4.5)'
      ],
      cons: [
        'Valuation slightly stretched (PB 8.6)',
        'Market-linked earnings may lead to revenue volatility',
        'Fee compression risk from regulation',
        'Moderate revenue growth compared to peers',
        'Increased competition in AMC space'
      ],
      recommendation: 'BUY',
      targetPrice: 3200,
      riskLevel: 'Medium'
    }
  },
  {
    id: 4,
    name: 'Nykaa',
    sector: 'E-commerce',
    listingDate: '2021-11-10',
    issuePrice: 1125,
    currentPrice: 180,
    marketCap: 9200,
    ratios: {
      ROE: 3.2,
      ROCE: 5.8,
      PE: 95.4,
      PB: 3.1,
      DebtToEquity: 0.08,
      CurrentRatio: 1.8,
      EPS: 1.9,
      RevenueGrowth: 42.5,
      ProfitMargin: 2.1
    },
    financials: {
      revenue: [1800, 2440, 3580, 4850, 6215],
      profit: [45, 62, 85, 128, 165],
      years: ['2019', '2020', '2021', '2022', '2023']
    },
    riskMetrics: {
      volatility: 68,
      beta: 2.1,
      sharpeRatio: -0.8
    },
    explainability: {
      investmentThesis: 'While Nykaa’s Revenue Growth of 42.5% is impressive, key profitability metrics remain weak. ROE is only 3.2%, ROCE 5.8%, and Profit Margin is just 2.1%. The PE ratio of 95.4 is extremely high, making the valuation difficult to justify, especially with an EPS of just ₹1.9. Liquidity is reasonable (Current Ratio 1.8), and leverage is modest (Debt-to-Equity 0.08), but overall return potential appears constrained relative to risk.',
      pros: [
        'Strong Revenue Growth (42.5%) shows market momentum',
        'Low financial leverage (D/E 0.08)',
        'Sufficient liquidity (Current Ratio 1.8)',
        'Established brand in beauty and wellness',
        'Omnichannel presence supports distribution'
      ],
      cons: [
        'Very low ROE (3.2%) and ROCE (5.8%)',
        'Thin Profit Margin (2.1%) limits earnings power',
        'Extremely high PE (95.4) with weak EPS (₹1.9)',
        'High volatility and beta increase risk',
        'Negative Sharpe Ratio (-0.8) indicates poor risk-adjusted returns'
      ],
      recommendation: 'SELL',
      targetPrice: 150,
      riskLevel: 'Very High'
    }
  },
    {
    id: 5,
    name: 'Mamaearth',
    sector: 'Consumer Goods',
    listingDate: '2023-11-07',
    issuePrice: 324,
    currentPrice: 285,
    marketCap: 5680,
    ratios: {
      ROE: 6.8,
      ROCE: 8.2,
      PE: 55.2,
      PB: 3.8,
      DebtToEquity: 0.12,
      CurrentRatio: 2.1,
      EPS: 5.2,
      RevenueGrowth: 52.8,
      ProfitMargin: 4.2
    },
    financials: {
      revenue: [280, 420, 680, 1025, 1485],
      profit: [12, 18, 28, 45, 68],
      years: ['2019', '2020', '2021', '2022', '2023']
    },
    riskMetrics: {
      volatility: 45,
      beta: 1.6,
      sharpeRatio: 0.1
    },
    explainability: {
      investmentThesis: 'Mamaearth has shown excellent Revenue Growth of 52.8%, reflecting a rapid scale-up. However, return metrics like ROE (6.8%) and ROCE (8.2%) are modest, suggesting limited capital efficiency. The PE ratio is high at 55.2, pricing in strong future earnings growth, though current EPS is only ₹5.2 and Profit Margin stands at a modest 4.2%. Liquidity (Current Ratio 2.1) and Debt-to-Equity (0.12) are healthy, supporting operational stability. The stock deserves a HOLD as it transitions to maturity.',
      pros: [
        'Strong Revenue Growth (52.8%) in D2C personal care',
        'Healthy balance sheet (Current Ratio 2.1, D/E 0.12)',
        'Positive EPS (₹5.2) and sustainable Profit Margin (4.2%)',
        'Brand visibility in natural product category',
        'Room for margin expansion as scale grows'
      ],
      cons: [
        'ROE (6.8%) and ROCE (8.2%) reflect low capital productivity',
        'Valuation is aggressive (PE 55.2)',
        'Modest EPS relative to valuation',
        'Marketing-heavy model limits operating leverage',
        'Small-cap size poses scalability challenges'
      ],
      recommendation: 'HOLD',
      targetPrice: 300,
      riskLevel: 'High'
    }
  },
  {
    id: 6,
    name: 'Paytm',
    sector: 'FinTech',
    listingDate: '2021-11-18',
    issuePrice: 2150,
    currentPrice: 520,
    marketCap: 33800,
    ratios: {
      ROE: -15.2,
      ROCE: -12.8,
      PE: null,
      PB: 2.4,
      DebtToEquity: 0.03,
      CurrentRatio: 2.8,
      EPS: -21.6,
      RevenueGrowth: 38.4,
      ProfitMargin: -35.2
    },
    financials: {
      revenue: [3580, 4218, 4960, 6845, 8542],
      profit: [-1704, -1832, -2942, -1644, -850],
      years: ['2019', '2020', '2021', '2022', '2023']
    },
    riskMetrics: {
      volatility: 72,
      beta: 2.4,
      sharpeRatio: -1.2
    },
    explainability: {
      investmentThesis: 'Despite solid Revenue Growth of 38.4%, Paytm’s financials are fundamentally weak. The company has deeply negative ROE (-15.2%), ROCE (-12.8%), and Profit Margin (-35.2%), pointing to structural inefficiencies. Negative EPS of -21.6 and absence of a PE ratio due to ongoing losses make it highly speculative. The only positives are low Debt-to-Equity (0.03) and decent liquidity (Current Ratio 2.8). However, high volatility and poor risk-reward (Sharpe -1.2) necessitate an AVOID stance.',
      pros: [
        'Good liquidity (Current Ratio 2.8)',
        'Low leverage (Debt-to-Equity 0.03)',
        'Strong revenue base and growth (38.4%)',
        'Wide merchant and consumer ecosystem',
        'Tech backbone across verticals'
      ],
      cons: [
        'Negative ROE (-15.2%) and ROCE (-12.8%) show deep inefficiency',
        'Huge losses with Profit Margin of -35.2% and EPS of -21.6',
        'No PE ratio due to ongoing losses',
        'High volatility (72) and beta (2.4) increase downside risk',
        'Sharpe Ratio (-1.2) reflects poor risk-adjusted return'
      ],
      recommendation: 'AVOID',
      targetPrice: 450,
      riskLevel: 'Very High'
    }
  },
  {
    id: 7,
    name: 'PB Fintech',
    sector: 'InsurTech',
    listingDate: '2021-11-15',
    issuePrice: 980,
    currentPrice: 1450,
    marketCap: 65200,
    ratios: {
      ROE: 12.4,
      ROCE: 15.8,
      PE: 68.2,
      PB: 8.5,
      DebtToEquity: 0.05,
      CurrentRatio: 3.4,
      EPS: 21.3,
      RevenueGrowth: 45.6,
      ProfitMargin: 8.2
    },
    financials: {
      revenue: [1245, 1680, 2340, 3125, 4285],
      profit: [125, 142, 185, 248, 352],
      years: ['2019', '2020', '2021', '2022', '2023']
    },
    riskMetrics: {
      volatility: 42,
      beta: 1.4,
      sharpeRatio: 0.6
    },
    explainability: {
      investmentThesis: 'PB Fintech shows healthy fundamentals with ROE of 12.4% and ROCE of 15.8%, reflecting decent capital efficiency. EPS of ₹21.3 and a Profit Margin of 8.2% support its profitability. Revenue has grown at a strong 45.6%, but valuation is rich with a PE of 68.2 and PB of 8.5. Liquidity is strong (Current Ratio 3.4), and the company has minimal debt (D/E 0.05), supporting a HOLD for now.',
      pros: [
        'Good ROE (12.4%) and ROCE (15.8%)',
        'Solid Revenue Growth (45.6%) and EPS (₹21.3)',
        'Healthy Profit Margin (8.2%)',
        'Strong liquidity and low leverage (Current Ratio 3.4, D/E 0.05)',
        'Platform scalability in growing insurance market'
      ],
      cons: [
        'High valuation (PE 68.2, PB 8.5)',
        'Dependence on commission revenue',
        'Moderate volatility and beta add market risk',
        'Rising customer acquisition costs',
        'Regulatory risks in the insurance space'
      ],
      recommendation: 'HOLD',
      targetPrice: 1600,
      riskLevel: 'Medium'
    }
  },
  {
    id: 8,
    name: 'Delhivery',
    sector: 'Logistics',
    listingDate: '2022-05-24',
    issuePrice: 487,
    currentPrice: 385,
    marketCap: 26400,
    ratios: {
      ROE: 2.8,
      ROCE: 4.2,
      PE: 128.5,
      PB: 3.6,
      DebtToEquity: 0.18,
      CurrentRatio: 1.9,
      EPS: 3.0,
      RevenueGrowth: 34.2,
      ProfitMargin: 1.8
    },
    financials: {
      revenue: [3200, 4180, 5680, 7245, 9520],
      profit: [45, 62, 85, 125, 168],
      years: ['2019', '2020', '2021', '2022', '2023']
    },
    riskMetrics: {
      volatility: 48,
      beta: 1.7,
      sharpeRatio: -0.3
    },
    explainability: {
      investmentThesis: 'Delhivery’s Revenue Growth of 34.2% is strong, but profitability is weak. ROE (2.8%) and ROCE (4.2%) are low, and Profit Margin is razor-thin at 1.8%. The PE ratio of 128.5 is not justified by EPS of ₹3.0. Liquidity (Current Ratio 1.9) and moderate debt (D/E 0.18) offer balance sheet support, but valuation and margin concerns suggest holding off further exposure.',
      pros: [
        'Strong Revenue Growth (34.2%) driven by e-commerce',
        'Low debt (D/E 0.18)',
        'Reasonable liquidity (Current Ratio 1.9)',
        'National logistics footprint',
        'Technology integration for efficiency'
      ],
      cons: [
        'Very low ROE (2.8%) and ROCE (4.2%)',
        'Thin Profit Margin (1.8%) limits scalability',
        'Extremely high PE (128.5) vs EPS (₹3.0)',
        'Sharpe Ratio (-0.3) reflects poor risk-return balance',
        'High beta (1.7) implies sensitivity to market volatility'
      ],
      recommendation: 'HOLD',
      targetPrice: 420,
      riskLevel: 'Medium'
    }
  },
  {
    id: 9,
    name: 'CarTrade Tech',
    sector: 'AutoTech',
    listingDate: '2021-08-20',
    issuePrice: 1618,
    currentPrice: 680,
    marketCap: 9200,
    ratios: {
      ROE: 8.5,
      ROCE: 11.2,
      PE: 42.8,
      PB: 3.6,
      DebtToEquity: 0.08,
      CurrentRatio: 2.8,
      EPS: 15.9,
      RevenueGrowth: 28.4,
      ProfitMargin: 12.5
    },
    financials: {
      revenue: [385, 445, 520, 642, 785],
      profit: [42, 48, 58, 75, 98],
      years: ['2019', '2020', '2021', '2022', '2023']
    },
    riskMetrics: {
      volatility: 52,
      beta: 1.9,
      sharpeRatio: -0.5
    },
    explainability: {
      investmentThesis: 'CarTrade Tech offers decent profitability with ROE of 8.5%, ROCE of 11.2%, and Profit Margin of 12.5%. EPS stands at ₹15.9, supporting the valuation. While PE of 42.8 is not low, consistent Revenue Growth of 28.4% justifies optimism. The company has a strong liquidity position (Current Ratio 2.8) and low leverage (D/E 0.08), supporting its BUY recommendation.',
      pros: [
        'Good Profit Margin (12.5%) and EPS (₹15.9)',
        'Consistent ROE (8.5%) and ROCE (11.2%)',
        'Strong Revenue Growth (28.4%)',
        'Low debt (D/E 0.08) and solid liquidity (Current Ratio 2.8)',
        'Asset-light, scalable marketplace model'
      ],
      cons: [
        'Valuation slightly elevated (PE 42.8)',
        'Moderate volatility (Sharpe -0.5)',
        'Cyclicality of auto sector impacts demand',
        'High beta (1.9) increases price swings',
        'Limited international footprint'
      ],
      recommendation: 'BUY',
      targetPrice: 750,
      riskLevel: 'Medium'
    }
  },
  {
    id: 10,
    name: 'FSN E-Commerce',
    sector: 'E-commerce',
    listingDate: '2021-11-10',
    issuePrice: 1125,
    currentPrice: 180,
    marketCap: 9200,
    ratios: {
      ROE: 3.2,
      ROCE: 5.8,
      PE: 95.4,
      PB: 3.1,
      DebtToEquity: 0.08,
      CurrentRatio: 1.8,
      EPS: 1.9,
      RevenueGrowth: 42.5,
      ProfitMargin: 2.1
    },
    financials: {
      revenue: [1800, 2440, 3580, 4850, 6215],
      profit: [45, 62, 85, 128, 165],
      years: ['2019', '2020', '2021', '2022', '2023']
    },
    riskMetrics: {
      volatility: 68,
      beta: 2.1,
      sharpeRatio: -0.8
    },
    explainability: {
      investmentThesis: 'Despite 42.5% Revenue Growth, FSN E-Commerce suffers from weak profitability. ROE (3.2%) and ROCE (5.8%) are low, and Profit Margin is narrow at 2.1%. With EPS of ₹1.9 and a PE of 95.4, the stock is richly valued. Liquidity is fair (Current Ratio 1.8) and debt is controlled (D/E 0.08), but the valuation-risk ratio suggests a SELL.',
      pros: [
        'Good Revenue Growth (42.5%) and brand recognition',
        'Low leverage (D/E 0.08)',
        'Acceptable liquidity (Current Ratio 1.8)',
        'Established omnichannel infrastructure',
        'Repeat customer base and private labels'
      ],
      cons: [
        'Low ROE (3.2%) and ROCE (5.8%)',
        'Thin Profit Margin (2.1%) and low EPS (₹1.9)',
        'Excessively high PE (95.4)',
        'Negative Sharpe Ratio (-0.8)',
        'Very high volatility (68) and beta (2.1)'
      ],
      recommendation: 'SELL',
      targetPrice: 150,
      riskLevel: 'Very High'
    }
  }
]
   const IPOCard = ({ stock, index }) => {
  const [expanded, setExpanded] = useState(false);

  const getRecommendationColor = (rec) => {
    switch (rec) {
      case 'BUY': return 'text-green-600 bg-green-100';
      case 'HOLD': return 'text-yellow-600 bg-yellow-100';
      case 'SELL': return 'text-red-600 bg-red-100';
      case 'AVOID': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-orange-600';
      case 'Very High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const returns = ((stock.currentPrice - stock.issuePrice) / stock.issuePrice * 100).toFixed(1);
  const returnsColor = returns >= 0 ? 'text-green-600' : 'text-red-600';
  const ReturnsIcon = returns >= 0 ? TrendingUp : TrendingDown;

  const radarData = [
    { subject: 'ROE', value: Math.max(0, stock.ratios.ROE) },
    { subject: 'ROCE', value: Math.max(0, stock.ratios.ROCE) },
    { subject: 'Growth', value: stock.ratios.RevenueGrowth },
    { subject: 'Margin', value: stock.ratios.ProfitMargin },
    { subject: 'Liquidity', value: stock.ratios.CurrentRatio * 10 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{stock.name}</h3>
            <p className="text-sm text-gray-600">{stock.sector}</p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRecommendationColor(stock.explainability.recommendation)}`}>
              {stock.explainability.recommendation}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <DollarSign className="w-5 h-5 mx-auto mb-1 text-blue-600" />
            <p className="text-xs text-gray-600">Current Price</p>
            <p className="font-bold">₹{stock.currentPrice}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Activity className="w-5 h-5 mx-auto mb-1 text-green-600" />
            <p className="text-xs text-gray-600">Returns</p>
            <div className={`font-bold flex items-center justify-center ${returnsColor}`}>
              <ReturnsIcon className="w-4 h-4 mr-1" />
              {returns}%
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Target className="w-5 h-5 mx-auto mb-1 text-purple-600" />
            <p className="text-xs text-gray-600">Target</p>
            <p className="font-bold">₹{stock.explainability.targetPrice}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <AlertTriangle className={`w-5 h-5 mx-auto mb-1 ${getRiskColor(stock.explainability.riskLevel)}`} />
            <p className="text-xs text-gray-600">Risk</p>
            <p className={`font-bold ${getRiskColor(stock.explainability.riskLevel)}`}>
              {stock.explainability.riskLevel}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-gray-800">Key Financial Ratios</h4>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'ROE', value: Math.max(0, stock.ratios.ROE) },
                { name: 'ROCE', value: Math.max(0, stock.ratios.ROCE) },
                { name: 'Revenue Growth', value: stock.ratios.RevenueGrowth },
                { name: 'Profit Margin', value: Math.max(0, stock.ratios.ProfitMargin) }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-gray-800">Investment Thesis</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{stock.explainability.investmentThesis}</p>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Eye className="w-4 h-4 mr-2" />
          {expanded ? 'Show Less' : 'Detailed Analysis'}
        </button>

        {expanded && (
          <div className="mt-6 space-y-6 border-t pt-6">
            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Financial Performance Trend</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stock.financials.years.map((year, idx) => ({
                    year,
                    revenue: stock.financials.revenue[idx],
                    profit: stock.financials.profit[idx]
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [`₹${value}Cr`, name === 'revenue' ? 'Revenue' : 'Profit']} />
                    <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} />
                    <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Comprehensive Ratio Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-3 text-gray-700">Profitability Ratios</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">ROE:</span>
                      <span className="font-medium">{stock.ratios.ROE}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">ROCE:</span>
                      <span className="font-medium">{stock.ratios.ROCE}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Profit Margin:</span>
                      <span className="font-medium">{stock.ratios.ProfitMargin}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">EPS:</span>
                      <span className="font-medium">₹{stock.ratios.EPS}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium mb-3 text-gray-700">Valuation & Liquidity</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">P/E Ratio:</span>
                      <span className="font-medium">{stock.ratios.PE || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">P/B Ratio:</span>
                      <span className="font-medium">{stock.ratios.PB}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Ratio:</span>
                      <span className="font-medium">{stock.ratios.CurrentRatio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Debt/Equity:</span>
                      <span className="font-medium">{stock.ratios.DebtToEquity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Risk-Return Profile</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" fontSize={10} />
                      <PolarRadiusAxis fontSize={10} />
                      <Radar name="Metrics" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {IPO_DATA.map((stock, index) => (
        <IPOCard key={stock.id} stock={stock} index={index} />
      ))}
    </div>
  );
};

export default Dashboard;

