import imgEarningApps from "@/assets/blog-earning-apps.jpg";
import imgFreelancing from "@/assets/blog-freelancing.jpg";
import imgDataSaving from "@/assets/blog-data-saving.jpg";
import imgCrypto from "@/assets/blog-crypto.jpg";
import imgStudentJobs from "@/assets/blog-student-jobs.jpg";
import imgBinanceP2p from "@/assets/blog-binance-p2p.jpg";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

export interface EarningApp {
  id: string;
  name: string;
  description: string;
  rating: number;
  earnings: string;
  icon: string;
  link: string;
  category: string;
}

export const categories = [
  { name: "Earning Apps", slug: "earning-apps", description: "Discover the best apps to earn money online in Ethiopia" },
  { name: "Online Jobs", slug: "online-jobs", description: "Find legitimate online jobs and side hustles" },
  { name: "Internet Tips", slug: "internet-tips", description: "Save data and browse smarter in Ethiopia" },
  { name: "Crypto Guides", slug: "crypto-guides", description: "Learn cryptocurrency basics for beginners" },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Best Earning Apps in Ethiopia (2026 Guide)",
    slug: "best-earning-apps-ethiopia-2026",
    excerpt: "Discover the top mobile apps that let you earn real money online from Ethiopia. Step-by-step guide for beginners.",
    content: `
## Introduction

In 2026, making money online from Ethiopia is more accessible than ever. With just a smartphone and an internet connection, you can start earning through various mobile applications.

## Top Earning Apps for Ethiopians

### 1. Swagbucks
Swagbucks is one of the most popular earning platforms worldwide. You can earn by:
- Taking surveys
- Watching videos
- Shopping online
- Playing games

**Estimated earnings:** $1-5 per day

### 2. Honeygain
Honeygain lets you earn passive income by sharing your unused internet bandwidth.

**How to get started:**
1. Download the Honeygain app
2. Create an account
3. Keep the app running in the background
4. Cash out when you reach $20

### 3. Premise
Premise pays you for completing simple tasks like taking photos of local businesses and answering survey questions.

**Why it's great for Ethiopia:**
- Tasks are location-based
- Pays in USD
- Quick payouts

## Tips for Beginners

> **Warning:** Never pay to join an earning app. Legitimate apps are always free to use.

- Start with 2-3 apps and see which works best
- Be consistent — earnings grow over time
- Use Wi-Fi to save mobile data
- Always verify payment methods before investing time

## Payment Methods

Most apps pay through:
- PayPal
- Mobile money (some apps)
- Gift cards
- Cryptocurrency

## Conclusion

Starting to earn online takes patience, but with the right apps and consistent effort, you can build a reliable side income from Ethiopia.
    `,
    category: "earning-apps",
    featuredImage: imgEarningApps,
    author: "A Plus Hustler",
    date: "2026-03-01",
    readTime: "8 min read",
    tags: ["earning apps", "ethiopia", "make money online"],
    featured: true,
  },
  {
    id: "2",
    title: "How to Start Freelancing from Ethiopia in 2026",
    slug: "start-freelancing-ethiopia-2026",
    excerpt: "Complete guide to launching your freelancing career from Ethiopia. Platforms, skills, and payment methods explained.",
    content: `
## Why Freelancing?

Freelancing offers Ethiopians the opportunity to earn in foreign currencies while working from home. The global freelancing market continues to grow.

## Best Freelancing Platforms

### 1. Upwork
The largest freelancing platform with diverse job categories.

### 2. Fiverr
Great for beginners — start selling services from $5.

### 3. Freelancer.com
Bid on projects that match your skills.

## In-Demand Skills
- Web Development
- Graphic Design
- Content Writing
- Virtual Assistance
- Data Entry
- Translation (Amharic/English)

## Getting Started
1. Choose a platform
2. Create a professional profile
3. Start with competitive pricing
4. Build your reputation with reviews
5. Gradually increase your rates

## Tips
- Focus on one skill initially
- Build a portfolio
- Respond quickly to clients
- Deliver quality work on time
    `,
    category: "online-jobs",
    featuredImage: imgFreelancing,
    author: "A Plus Hustler",
    date: "2026-02-25",
    readTime: "10 min read",
    tags: ["freelancing", "online jobs", "ethiopia"],
    featured: true,
  },
  {
    id: "3",
    title: "Save Mobile Data in Ethiopia: 15 Proven Tips",
    slug: "save-mobile-data-ethiopia",
    excerpt: "Learn how to reduce your mobile data usage and save money on internet in Ethiopia.",
    content: `
## Introduction

Internet costs in Ethiopia can add up quickly. Here are 15 proven tips to save your mobile data.

## Tips

### 1. Use Data Saver Mode
Enable data saver in your phone settings and browser.

### 2. Download Content on Wi-Fi
Download videos, music, and apps when connected to Wi-Fi.

### 3. Disable Auto-Updates
Turn off automatic app updates and set them to Wi-Fi only.

### 4. Use Lite Versions of Apps
Facebook Lite, Twitter Lite, and YouTube Go use less data.

### 5. Compress Images
Use apps that compress images before sending.

## More Tips
6. Monitor your data usage regularly
7. Close background apps
8. Use offline maps
9. Disable auto-play videos
10. Use ad blockers
11. Clear app cache regularly
12. Restrict background data
13. Use Wi-Fi whenever available
14. Choose the right data plan
15. Consider Ethio Telecom's special packages
    `,
    category: "internet-tips",
    featuredImage: imgDataSaving,
    author: "A Plus Hustler",
    date: "2026-02-20",
    readTime: "6 min read",
    tags: ["data saving", "internet", "ethiopia", "tips"],
  },
  {
    id: "4",
    title: "Cryptocurrency for Beginners: A Complete Guide",
    slug: "cryptocurrency-beginners-guide",
    excerpt: "Everything you need to know about cryptocurrency as a beginner. Bitcoin, Ethereum, and how to get started safely.",
    content: `
## What is Cryptocurrency?

Cryptocurrency is digital money that uses encryption for security. Unlike traditional currencies, it operates on decentralized networks.

## Popular Cryptocurrencies

### Bitcoin (BTC)
The first and most valuable cryptocurrency.

### Ethereum (ETH)
Known for smart contracts and decentralized applications.

### Stablecoins (USDT, USDC)
Cryptocurrencies pegged to the US dollar.

## How to Get Started

1. **Learn the basics** — understand blockchain technology
2. **Choose a wallet** — Coinbase, Trust Wallet, or MetaMask
3. **Start small** — invest only what you can afford to lose
4. **Use P2P platforms** — Binance P2P works in many African countries

## Risks and Warnings

> **Important:** Cryptocurrency is volatile. Never invest money you cannot afford to lose.

- Scams are common — verify everything
- Regulatory landscape varies by country
- Keep your private keys safe
- Use two-factor authentication

## Tips for Ethiopian Users
- Use VPN if needed for certain platforms
- Join local crypto communities for support
- Start with stablecoins to reduce risk
- Learn about P2P trading
    `,
    category: "crypto-guides",
    featuredImage: imgCrypto,
    author: "A Plus Hustler",
    date: "2026-02-15",
    readTime: "12 min read",
    tags: ["cryptocurrency", "bitcoin", "beginner guide"],
    featured: true,
  },
  {
    id: "5",
    title: "Top 10 Online Jobs for Students in Ethiopia",
    slug: "online-jobs-students-ethiopia",
    excerpt: "Discover the best online jobs perfect for Ethiopian students who want to earn while studying.",
    content: `
## Introduction

As a student in Ethiopia, you can earn money online without affecting your studies. Here are the top 10 opportunities.

## The Jobs

### 1. Online Tutoring
Teach subjects you're good at through platforms like Chegg or Tutor.com.

### 2. Content Writing
Write articles, blog posts, or social media content.

### 3. Data Entry
Simple typing jobs that require minimal skills.

### 4. Social Media Management
Help businesses manage their social media accounts.

### 5. Translation Services
Translate between Amharic and English.

### 6. Virtual Assistant
Handle administrative tasks remotely.

### 7. Graphic Design
Create logos, posters, and social media graphics.

### 8. Transcription
Convert audio to text.

### 9. Survey Taking
Earn small amounts by completing online surveys.

### 10. Video Editing
Edit videos for YouTubers and businesses.

## Tips for Student Workers
- Set a consistent schedule
- Don't let work affect your grades
- Start with one job and expand gradually
- Build a portfolio of your work
    `,
    category: "online-jobs",
    featuredImage: imgStudentJobs,
    author: "A Plus Hustler",
    date: "2026-02-10",
    readTime: "7 min read",
    tags: ["students", "online jobs", "ethiopia"],
  },
  {
    id: "6",
    title: "How to Use Binance P2P in Ethiopia",
    slug: "binance-p2p-ethiopia",
    excerpt: "Step-by-step guide to buying and selling crypto using Binance P2P in Ethiopia.",
    content: `
## What is Binance P2P?

Binance P2P (Peer-to-Peer) allows you to buy and sell cryptocurrency directly with other users using local payment methods.

## Getting Started

1. Download the Binance app
2. Create and verify your account
3. Navigate to the P2P section
4. Choose your preferred currency and payment method

## Safety Tips
- Only trade with verified users
- Use the escrow service
- Never share personal banking details outside the platform
- Start with small amounts

## Available Payment Methods
- Bank Transfer (CBE, Dashen, etc.)
- Telebirr
- Other mobile payment methods

## Conclusion
Binance P2P is one of the safest ways to trade crypto in Ethiopia when used properly.
    `,
    category: "crypto-guides",
    featuredImage: "",
    author: "A Plus Hustler",
    date: "2026-02-05",
    readTime: "9 min read",
    tags: ["binance", "p2p", "crypto", "ethiopia"],
  },
];

export const earningApps: EarningApp[] = [
  { id: "1", name: "Swagbucks", description: "Earn by taking surveys, watching videos, and shopping online.", rating: 4.2, earnings: "$1-5/day", icon: "💰", link: "#", category: "Surveys" },
  { id: "2", name: "Honeygain", description: "Passive income by sharing unused internet bandwidth.", rating: 4.0, earnings: "$0.5-2/day", icon: "🍯", link: "#", category: "Passive" },
  { id: "3", name: "Premise", description: "Complete local tasks and surveys for USD payments.", rating: 4.3, earnings: "$2-8/day", icon: "📍", link: "#", category: "Tasks" },
  { id: "4", name: "Toloka", description: "Complete AI training tasks and earn money.", rating: 3.9, earnings: "$1-4/day", icon: "🤖", link: "#", category: "Tasks" },
  { id: "5", name: "Fiverr", description: "Sell your skills and services starting from $5.", rating: 4.5, earnings: "$5-100+/day", icon: "🎨", link: "#", category: "Freelancing" },
  { id: "6", name: "Google Opinion Rewards", description: "Answer quick surveys for Google Play credits.", rating: 4.1, earnings: "$0.1-1/survey", icon: "📊", link: "#", category: "Surveys" },
];
