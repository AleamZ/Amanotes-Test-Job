# ChatBox AI Tư Vấn Khóa Học

## Tính năng

ChatBox AI là một trợ lý thông minh được tích hợp vào ứng dụng Amanotes để tư vấn khóa học cho khách hàng. Trợ lý AI này sử dụng ChatGPT API để phân tích nhu cầu và đề xuất khóa học phù hợp.

## Cách sử dụng

### 1. Mở ChatBox
- Click vào nút chat (icon tin nhắn) ở góc dưới bên phải màn hình
- ChatBox sẽ mở ra với tin nhắn chào mừng và hướng dẫn sử dụng

### 2. Tương tác với AI
Bạn có thể hỏi AI về:

#### Theo chủ đề:
- "Tôi muốn học lập trình"
- "Có khóa học nào về Design không?"
- "Tư vấn khóa học Marketing"

#### Theo mức giá:
- "Khóa học nào dưới 500k?"
- "Có khóa học miễn phí không?"
- "Tư vấn khóa học tầm 1 triệu"

#### Theo trình độ:
- "Tôi mới bắt đầu, có khóa học nào phù hợp?"
- "Khóa học nâng cao về React"
- "Trình độ intermediate"

#### Theo nhu cầu cụ thể:
- "Tôi muốn học để làm web developer"
- "Cần khóa học tiếng Anh cho công việc"
- "Học để chuyển ngành sang IT"

### 3. Tính năng ChatBox

#### Giao diện:
- **Nút toggle**: Nút tròn màu xanh với icon tin nhắn
- **Header**: Hiển thị "Trợ lý AI tư vấn" với icon robot
- **Messages**: Khu vực hiển thị tin nhắn
- **Input**: Ô nhập tin nhắn với nút gửi

#### Tính năng:
- **Auto-scroll**: Tự động cuộn xuống tin nhắn mới nhất
- **Typing indicator**: Hiển thị "Đang soạn tin nhắn..." khi AI đang xử lý
- **Enter to send**: Nhấn Enter để gửi tin nhắn
- **Responsive**: Tự động điều chỉnh kích thước trên mobile
- **Dark mode**: Hỗ trợ chế độ tối

## Cấu hình API

### 1. API Key
ChatBox sử dụng OpenAI ChatGPT API. Để cấu hình:

1. Tạo file `.env` trong thư mục gốc
2. Thêm API key:
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Cấu hình API
File `src/config/api.ts` chứa các cấu hình:
- `OPENAI_API_URL`: URL của OpenAI API
- `CHATGPT_MODEL`: Model sử dụng (gpt-3.5-turbo)
- `MAX_TOKENS`: Số token tối đa cho response
- `TEMPERATURE`: Độ sáng tạo của AI (0.0 - 1.0)

## Dữ liệu khóa học

ChatBox sử dụng dữ liệu từ `src/services/mockData.ts` để tư vấn. Mỗi khóa học bao gồm:
- Tên khóa học
- Mô tả ngắn và đầy đủ
- Giá
- Danh mục (Programming, Design, Marketing, etc.)
- Trình độ (Beginner, Intermediate, Advanced)
- Rating và số review
- Thời lượng
- Tags

## Prompt Engineering

AI được huấn luyện với prompt system để:
1. Phân tích nhu cầu của khách hàng
2. Đề xuất 1-3 khóa học phù hợp nhất
3. Giải thích lý do đề xuất
4. Trả lời bằng tiếng Việt
5. Tư vấn cụ thể về giá, trình độ, chủ đề

## Troubleshooting

### Lỗi thường gặp:

1. **"Có lỗi xảy ra khi gửi tin nhắn"**
   - Kiểm tra API key có đúng không
   - Kiểm tra kết nối internet
   - Kiểm tra quota API

2. **ChatBox không mở**
   - Kiểm tra console để xem lỗi JavaScript
   - Đảm bảo component được import đúng

3. **AI trả lời không phù hợp**
   - Kiểm tra prompt system trong code
   - Điều chỉnh temperature trong config

## Phát triển

### Thêm tính năng mới:

1. **Course suggestion cards**: Hiển thị khóa học được đề xuất dưới dạng card
2. **Quick replies**: Nút trả lời nhanh cho các câu hỏi thường gặp
3. **Chat history**: Lưu lịch sử chat vào localStorage
4. **Voice input**: Nhập tin nhắn bằng giọng nói
5. **File upload**: Cho phép upload file để AI phân tích

### Cải thiện UX:

1. **Typing animation**: Hiệu ứng gõ chữ cho AI
2. **Message reactions**: Emoji reactions cho tin nhắn
3. **Chat export**: Xuất lịch sử chat
4. **Custom themes**: Thay đổi màu sắc chat box

## Bảo mật

- API key được lưu trong environment variables
- Không lưu trữ tin nhắn nhạy cảm
- Sử dụng HTTPS cho API calls
- Rate limiting để tránh spam

## Performance

- Lazy loading cho ChatBox component
- Debounce cho input để tránh spam API
- Caching responses để giảm API calls
- Optimized re-renders với React.memo 