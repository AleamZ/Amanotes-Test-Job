# EduMarket AI - Amanotes Test Project

[English](#english) | [Tiếng Việt](#tiếng-việt)

---

## English

### 🎯 Project Overview

**EduMarket AI** is a comprehensive e-learning platform built as a test project for Amanotes. This React-based application demonstrates modern web development practices with AI-powered course recommendations, advanced filtering, and a complete e-commerce experience for online courses.

### ✨ Key Features

#### 🛍️ **E-commerce Platform**
- **Course Catalog**: Browse 20+ courses across multiple categories
- **Shopping Cart**: Add/remove courses with quantity management
- **Checkout System**: Complete purchase flow with cart summary
- **Course Details**: Detailed course information with ratings and reviews

#### 🤖 **AI-Powered Chat Assistant**
- **Intelligent Recommendations**: ChatGPT integration for personalized course suggestions
- **Natural Language Processing**: Understand user queries in Vietnamese
- **Smart Filtering**: AI analyzes user needs and suggests relevant courses
- **Real-time Interaction**: Instant responses with course links

#### 🔍 **Advanced Search & Filtering**
- **Real-time Search**: Instant course search with React Query
- **Multi-criteria Filtering**: Price, level, duration, category filters
- **Search Suggestions**: Auto-complete with course and category suggestions
- **Search History**: Persistent search history in localStorage

#### 📱 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with Ant Design
- **Dark/Light Theme**: Toggle between themes
- **Smooth Animations**: Cart bounce effects and loading states
- **Accessibility**: ARIA labels and keyboard navigation

#### 🏗️ **Technical Architecture**
- **React 19**: Latest React with modern hooks
- **TypeScript**: Full type safety throughout the application
- **Context API**: Global state management for cart, filters, and user data
- **React Query**: Server state management and caching
- **SCSS**: Modular styling with component-based architecture

### 🚀 Getting Started

#### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

#### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/amanotes-test.git
cd amanotes-test
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. **Start development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

### 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BasicUI/        # Loading, buttons, etc.
│   ├── ChatBox/        # AI chat assistant
│   ├── FilterBar/      # Search and filter components
│   ├── Header/         # Navigation and user menu
│   ├── Logo/           # Brand components
│   ├── ProductCard/    # Course display cards
│   └── SearchBox/      # Search functionality
├── context/            # React Context providers
│   ├── CartContext.tsx     # Shopping cart state
│   ├── FilterContext.tsx   # Search and filter state
│   └── PurchasedCoursesContext.tsx # User courses
├── hooks/              # Custom React hooks
│   └── useSearch.ts    # Search functionality
├── interface/          # TypeScript interfaces
├── layouts/            # Page layouts
├── pages/              # Route components
├── routers/            # Routing configuration
├── services/           # API and data services
│   ├── gptAI.ts        # OpenAI integration
│   └── mockData.ts     # Course data
└── styles/             # SCSS styling
```

### 🛠️ Technology Stack

#### Frontend
- **React 19.1.0** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 7.0.4** - Build tool and dev server
- **React Router DOM 7.6.3** - Client-side routing

#### UI Framework
- **Ant Design 5.26.4** - Component library
- **Styled Components 6.1.19** - CSS-in-JS
- **SCSS** - Advanced CSS preprocessing

#### State Management
- **React Context API** - Global state
- **React Query 5.83.0** - Server state and caching

#### AI Integration
- **OpenAI API** - ChatGPT for course recommendations
- **Custom prompt engineering** - Optimized for Vietnamese

#### Development Tools
- **ESLint 9.30.1** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting

### 🎨 Features in Detail

#### AI Chat Assistant
The ChatBox component integrates with OpenAI's ChatGPT API to provide intelligent course recommendations:

- **Smart Prompting**: Custom system prompts optimized for course recommendations
- **Vietnamese Language Support**: Full support for Vietnamese queries
- **Course Linking**: Direct links to recommended courses
- **Context Awareness**: Remembers conversation context

#### Advanced Search System
Built with React Query for optimal performance:

- **Debounced Search**: Prevents excessive API calls
- **Search Suggestions**: Auto-complete with course and category suggestions
- **Search History**: Persistent search history
- **Real-time Filtering**: Instant results as you type

#### Shopping Cart Management
Comprehensive cart functionality with React Context:

- **Add/Remove Items**: Quantity management
- **Cart Persistence**: Maintains cart state across sessions
- **Total Calculation**: Automatic price calculations
- **Checkout Flow**: Complete purchase process

### 🔧 Configuration

#### Environment Variables
```env
VITE_OPENAI_API_KEY=your_openai_api_key
```

#### API Configuration
```typescript
// src/services/gptAI.ts
export const API_CONFIG = {
    OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
    OPENAI_API_URL: 'https://api.openai.com/v1/chat/completions',
    CHATGPT_MODEL: 'gpt-3.5-turbo',
    MAX_TOKENS: 500,
    TEMPERATURE: 0.7
};
```

### 📊 Performance Optimizations

- **React Query Caching**: Intelligent caching of search results
- **Lazy Loading**: Components loaded on demand
- **Memoization**: Optimized re-renders with React.memo
- **Code Splitting**: Route-based code splitting
- **Image Optimization**: Responsive images with proper sizing

### 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npm run build
```

### 🚀 Deployment

The project is configured for easy deployment:

1. **Build the project**
```bash
npm run build
```

2. **Deploy to your preferred platform**
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### 📝 License

This project is created as a test assignment for Amanotes.

---

## Tiếng Việt

### 🎯 Tổng Quan Dự Án

**EduMarket AI** là một nền tảng học trực tuyến toàn diện được xây dựng như một bài test cho Amanotes. Ứng dụng React này thể hiện các thực hành phát triển web hiện đại với khuyến nghị khóa học được hỗ trợ bởi AI, bộ lọc nâng cao và trải nghiệm thương mại điện tử hoàn chỉnh cho các khóa học trực tuyến.

### ✨ Tính Năng Chính

#### 🛍️ **Nền Tảng Thương Mại Điện Tử**
- **Danh Mục Khóa Học**: Duyệt hơn 20 khóa học thuộc nhiều danh mục
- **Giỏ Hàng**: Thêm/xóa khóa học với quản lý số lượng
- **Hệ Thống Thanh Toán**: Quy trình mua hàng hoàn chỉnh với tổng quan giỏ hàng
- **Chi Tiết Khóa Học**: Thông tin chi tiết khóa học với đánh giá và nhận xét

#### 🤖 **Trợ Lý Chat AI**
- **Khuyến Nghị Thông Minh**: Tích hợp ChatGPT để đề xuất khóa học cá nhân hóa
- **Xử Lý Ngôn Ngữ Tự Nhiên**: Hiểu các truy vấn người dùng bằng tiếng Việt
- **Lọc Thông Minh**: AI phân tích nhu cầu người dùng và đề xuất khóa học phù hợp
- **Tương Tác Thời Gian Thực**: Phản hồi tức thì với liên kết khóa học

#### 🔍 **Tìm Kiếm và Lọc Nâng Cao**
- **Tìm Kiếm Thời Gian Thực**: Tìm kiếm khóa học tức thì với React Query
- **Lọc Đa Tiêu Chí**: Bộ lọc giá, trình độ, thời lượng, danh mục
- **Gợi Ý Tìm Kiếm**: Tự động hoàn thành với gợi ý khóa học và danh mục
- **Lịch Sử Tìm Kiếm**: Lịch sử tìm kiếm được lưu trữ trong localStorage

#### 📱 **Giao Diện Hiện Đại**
- **Thiết Kế Responsive**: Tiếp cận mobile-first với Ant Design
- **Chủ Đề Tối/Sáng**: Chuyển đổi giữa các chủ đề
- **Hiệu Ứng Mượt Mà**: Hiệu ứng giỏ hàng và trạng thái tải
- **Khả Năng Tiếp Cận**: Nhãn ARIA và điều hướng bàn phím

#### 🏗️ **Kiến Trúc Kỹ Thuật**
- **React 19**: React mới nhất với các hooks hiện đại
- **TypeScript**: Đảm bảo type safety toàn bộ ứng dụng
- **Context API**: Quản lý state toàn cục cho giỏ hàng, bộ lọc và dữ liệu người dùng
- **React Query**: Quản lý server state và caching
- **SCSS**: Styling module hóa với kiến trúc dựa trên component

### 🚀 Bắt Đầu

#### Yêu Cầu Hệ Thống
- Node.js 18+
- npm hoặc yarn
- OpenAI API key

#### Cài Đặt

1. **Clone repository**
```bash
git clone https://github.com/your-username/amanotes-test.git
cd amanotes-test
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Thiết lập môi trường**
Tạo file `.env` trong thư mục gốc:
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. **Khởi chạy server development**
```bash
npm run dev
```

5. **Build cho production**
```bash
npm run build
```

### 📁 Cấu Trúc Dự Án

```
src/
├── components/          # Các component UI có thể tái sử dụng
│   ├── BasicUI/        # Loading, buttons, etc.
│   ├── ChatBox/        # Trợ lý chat AI
│   ├── FilterBar/      # Component tìm kiếm và lọc
│   ├── Header/         # Navigation và menu người dùng
│   ├── Logo/           # Component thương hiệu
│   ├── ProductCard/    # Card hiển thị khóa học
│   └── SearchBox/      # Chức năng tìm kiếm
├── context/            # React Context providers
│   ├── CartContext.tsx     # State giỏ hàng
│   ├── FilterContext.tsx   # State tìm kiếm và lọc
│   └── PurchasedCoursesContext.tsx # Khóa học của người dùng
├── hooks/              # Custom React hooks
│   └── useSearch.ts    # Chức năng tìm kiếm
├── interface/          # TypeScript interfaces
├── layouts/            # Layout trang
├── pages/              # Component route
├── routers/            # Cấu hình routing
├── services/           # API và data services
│   ├── gptAI.ts        # Tích hợp OpenAI
│   └── mockData.ts     # Dữ liệu khóa học
└── styles/             # Styling SCSS
```

### 🛠️ Stack Công Nghệ

#### Frontend
- **React 19.1.0** - Thư viện UI
- **TypeScript 5.8.3** - Đảm bảo type safety
- **Vite 7.0.4** - Build tool và dev server
- **React Router DOM 7.6.3** - Client-side routing

#### UI Framework
- **Ant Design 5.26.4** - Thư viện component
- **Styled Components 6.1.19** - CSS-in-JS
- **SCSS** - CSS preprocessing nâng cao

#### Quản Lý State
- **React Context API** - State toàn cục
- **React Query 5.83.0** - Server state và caching

#### Tích Hợp AI
- **OpenAI API** - ChatGPT cho khuyến nghị khóa học
- **Custom prompt engineering** - Tối ưu hóa cho tiếng Việt

#### Công Cụ Phát Triển
- **ESLint 9.30.1** - Code linting
- **TypeScript ESLint** - Linting dành riêng cho TypeScript

### 🎨 Chi Tiết Tính Năng

#### Trợ Lý Chat AI
Component ChatBox tích hợp với OpenAI ChatGPT API để cung cấp khuyến nghị khóa học thông minh:

- **Prompt Thông Minh**: System prompts tùy chỉnh được tối ưu hóa cho khuyến nghị khóa học
- **Hỗ Trợ Tiếng Việt**: Hỗ trợ đầy đủ cho các truy vấn tiếng Việt
- **Liên Kết Khóa Học**: Liên kết trực tiếp đến các khóa học được đề xuất
- **Nhận Thức Ngữ Cảnh**: Ghi nhớ ngữ cảnh cuộc trò chuyện

#### Hệ Thống Tìm Kiếm Nâng Cao
Được xây dựng với React Query để tối ưu hiệu suất:

- **Tìm Kiếm Debounced**: Ngăn chặn các cuộc gọi API quá mức
- **Gợi Ý Tìm Kiếm**: Tự động hoàn thành với gợi ý khóa học và danh mục
- **Lịch Sử Tìm Kiếm**: Lịch sử tìm kiếm được lưu trữ
- **Lọc Thời Gian Thực**: Kết quả tức thì khi bạn gõ

#### Quản Lý Giỏ Hàng
Chức năng giỏ hàng toàn diện với React Context:

- **Thêm/Xóa Sản Phẩm**: Quản lý số lượng
- **Duy Trì Giỏ Hàng**: Duy trì trạng thái giỏ hàng qua các phiên
- **Tính Tổng**: Tính toán giá tự động
- **Quy Trình Thanh Toán**: Quy trình mua hàng hoàn chỉnh

### 🔧 Cấu Hình

#### Biến Môi Trường
```env
VITE_OPENAI_API_KEY=your_openai_api_key
```

#### Cấu Hình API
```typescript
// src/services/gptAI.ts
export const API_CONFIG = {
    OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
    OPENAI_API_URL: 'https://api.openai.com/v1/chat/completions',
    CHATGPT_MODEL: 'gpt-3.5-turbo',
    MAX_TOKENS: 500,
    TEMPERATURE: 0.7
};
```

### 📊 Tối Ưu Hóa Hiệu Suất

- **React Query Caching**: Caching thông minh cho kết quả tìm kiếm
- **Lazy Loading**: Components được tải theo yêu cầu
- **Memoization**: Tối ưu hóa re-render với React.memo
- **Code Splitting**: Chia code dựa trên route
- **Tối Ưu Hóa Hình Ảnh**: Hình ảnh responsive với kích thước phù hợp

### 🧪 Kiểm Thử

```bash
# Chạy linting
npm run lint

# Kiểm tra type
npm run build
```

### 🚀 Triển Khai

Dự án được cấu hình để triển khai dễ dàng:

1. **Build dự án**
```bash
npm run build
```

2. **Triển khai lên nền tảng ưa thích**
- Vercel
- Netlify
- GitHub Pages
- Bất kỳ dịch vụ hosting tĩnh nào

### 🤝 Đóng Góp

1. Fork repository
2. Tạo feature branch
3. Thực hiện thay đổi
4. Thêm test nếu cần thiết
5. Submit pull request

### 📝 Giấy Phép

Dự án này được tạo như một bài test cho Amanotes.

---

## 👨‍💻 Tác Giả

**Nguyễn Tiến Đạt** - Frontend Developer

Dự án được tạo cho bài test phỏng vấn tại **Amanotes**