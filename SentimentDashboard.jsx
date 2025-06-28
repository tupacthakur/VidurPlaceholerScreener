
import React from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Globe2, Newspaper } from 'lucide-react';

const dummyData = {
  sentimentScore: 7.8,
  socialBuzz: 8.2,
  newsImpact: 6.5,
  latestTweets: [
    "Strong investor sentiment building around IPOs like Tata Tech and CarTrade.",
    "Zomato shows wild swings—traders cautious.",
    "Nykaa's recent dip raises valuation concerns."
  ],
  breakingNews: [
    "Paytm stock slumps after RBI warning on payment compliance.",
    "Mamaearth beats revenue expectations in Q4 earnings report.",
    "PB Fintech explores Southeast Asia expansion amid rising insurance demand."
  ]
};

const SentimentDashboard = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <Globe2 className="w-5 h-5 text-blue-600" />
          <span>Sentiment & News Overview</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <ThumbsUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Sentiment Score</p>
            <p className="text-2xl font-bold text-green-600">{dummyData.sentimentScore}/10</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <MessageCircle className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Social Media Buzz</p>
            <p className="text-2xl font-bold text-purple-600">{dummyData.socialBuzz}/10</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <Newspaper className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">News Impact Score</p>
            <p className="text-2xl font-bold text-yellow-600">{dummyData.newsImpact}/10</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Trending Tweets</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {dummyData.latestTweets.map((tweet, i) => (
                <li key={i} className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">{tweet}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Breaking News</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {dummyData.breakingNews.map((news, i) => (
                <li key={i} className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">{news}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentDashboard;
