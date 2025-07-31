import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Avatar, Spin, message } from 'antd';
import {
    MessageOutlined,
    SendOutlined,
    CloseOutlined,
    RobotOutlined,
    UserOutlined,
    LinkOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../../services/mockData';
import type { ChatMessage } from '../../interface/ChatBot.interface';
import { API_CONFIG } from '../../services/gptAI';
import type { Product } from '../../interface/Product.interface';
// import './ChatBox.scss';



const ChatBox: React.FC = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            content: 'Xin chào! Tôi là trợ lý AI của Amanotes. Tôi có thể giúp bạn tìm khóa học phù hợp. Bạn có thể hỏi tôi về:\n\n• Khóa học theo chủ đề (Programming, Design, Marketing...)\n• Khóa học theo mức giá\n• Khóa học theo trình độ (Beginner, Intermediate, Advanced)\n• Hoặc mô tả nhu cầu học tập của bạn',
            sender: 'ai',
            timestamp: new Date(),
            type: 'text'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<any>(null);



    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    // Removed unused function generateCourseSuggestion

    const generateCourseLinks = (courses: Product[]) => {
        if (courses.length === 0) return null;

        return {
            id: Date.now().toString(),
            content: 'Dưới đây là các khóa học phù hợp với yêu cầu của bạn:',
            sender: 'ai' as const,
            timestamp: new Date(),
            type: 'course-links' as const,
            courseLinks: courses
        };
    };

    const handleCourseClick = (courseId: string) => {
        navigate(`/courses/${courseId}`);
        setIsOpen(false); // Đóng chat khi chuyển trang
    };

    const callChatGPT = async (userMessage: string) => {
        try {
            const systemPrompt = `Bạn là trợ lý AI tư vấn khóa học cho Amanotes. Dựa trên danh sách khóa học sau, hãy tư vấn cho khách hàng:

${mockProducts.map(course => `
- ${course.name} (ID: ${course.id}, ${course.category}, ${course.level}, ${formatPrice(course.price)})
  Mô tả: ${course.shortDescription}
`).join('\n')}

Hướng dẫn:
1. Phân tích nhu cầu của khách hàng
2. Đề xuất 1-3 khóa học phù hợp nhất
3. Giải thích lý do đề xuất
4. Trả lời bằng tiếng Việt
5. Nếu khách hàng hỏi về giá, trình độ, chủ đề - hãy tư vấn cụ thể
6. Cuối tin nhắn, hãy thêm dòng "COURSE_IDS:" theo sau là danh sách ID của các khóa học được đề xuất, phân cách bằng dấu phẩy (ví dụ: COURSE_IDS: 1,3,5)

Chỉ trả lời nội dung tư vấn, không cần format đặc biệt.`;

            const response = await fetch(API_CONFIG.OPENAI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: API_CONFIG.CHATGPT_MODEL,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userMessage }
                    ],
                    max_tokens: API_CONFIG.MAX_TOKENS,
                    temperature: API_CONFIG.TEMPERATURE
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            const responseContent = data.choices[0].message.content;

            // Tách nội dung và course IDs
            const courseIdsMatch = responseContent.match(/COURSE_IDS:\s*([\d,]+)/);
            const courseIds = courseIdsMatch
                ? courseIdsMatch[1].split(',').map((id: string) => id.trim())
                : [];

            // Loại bỏ phần COURSE_IDS khỏi nội dung
            const cleanContent = responseContent.replace(/\nCOURSE_IDS:.*$/, '');

            return {
                content: cleanContent,
                courseIds: courseIds as string[]
            };
        } catch (error) {
            console.error('ChatGPT API Error:', error);
            return {
                content: 'Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.',
                courseIds: [] as string[]
            };
        }
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            content: inputValue.trim(),
            sender: 'user',
            timestamp: new Date(),
            type: 'text'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const aiResponse = await callChatGPT(inputValue.trim());

            const aiMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                content: aiResponse.content,
                sender: 'ai',
                timestamp: new Date(),
                type: 'text'
            };

            setMessages(prev => [...prev, aiMessage]);

            // Nếu có course IDs, tạo thêm message với course links
            if (aiResponse.courseIds && aiResponse.courseIds.length > 0) {
                const suggestedCourses = mockProducts.filter(course =>
                    aiResponse.courseIds.includes(course.id)
                );

                if (suggestedCourses.length > 0) {
                    const courseLinksMessage = generateCourseLinks(suggestedCourses);
                    if (courseLinksMessage) {
                        setMessages(prev => [...prev, courseLinksMessage]);
                    }
                }
            }
        } catch (error) {
            message.error('Có lỗi xảy ra khi gửi tin nhắn');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="chat-box-container">
            {/* Chat Toggle Button */}
            <Button
                type="primary"
                shape="circle"
                size="large"
                icon={<MessageOutlined />}
                onClick={toggleChat}
                className="chat-toggle-btn"
            />

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="chat-title">
                            <RobotOutlined className="ai-icon" />
                            <span>Trợ lý AI tư vấn</span>
                        </div>
                        <Button
                            type="text"
                            icon={<CloseOutlined />}
                            onClick={toggleChat}
                            className="close-btn"
                        />
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
                            >
                                <div className="message-avatar">
                                    {msg.sender === 'user' ? (
                                        <Avatar icon={<UserOutlined />} size="small" />
                                    ) : (
                                        <Avatar icon={<RobotOutlined />} size="small" className="ai-avatar" />
                                    )}
                                </div>
                                <div className="message-content">
                                    <div className="message-text">
                                        {msg.content.split('\n').map((line, index) => (
                                            <div key={index}>{line}</div>
                                        ))}
                                    </div>
                                    {msg.type === 'course-suggestion' && msg.courseData && (
                                        <div className="course-suggestion">
                                            <div className="course-card">
                                                <img
                                                    src={msg.courseData.image}
                                                    alt={msg.courseData.name}
                                                    className="course-image"
                                                />
                                                <div className="course-info">
                                                    <h4>{msg.courseData.name}</h4>
                                                    <p>{msg.courseData.shortDescription}</p>
                                                    <div className="course-meta">
                                                        <span className="price">{formatPrice(msg.courseData.price)}</span>
                                                        <span className="rating">⭐ {msg.courseData.rating}</span>
                                                        <span className="level">{msg.courseData.level}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {msg.type === 'course-links' && msg.courseLinks && (
                                        <div className="course-links">
                                            {msg.courseLinks.map((course) => (
                                                <div
                                                    key={course.id}
                                                    className="course-link-item"
                                                    onClick={() => handleCourseClick(course.id)}
                                                >
                                                    <div className="course-link-content">
                                                        <img
                                                            src={course.image}
                                                            alt={course.name}
                                                            className="course-link-image"
                                                        />
                                                        <div className="course-link-info">
                                                            <h4>{course.name}</h4>
                                                            <p>{course.shortDescription}</p>
                                                            <div className="course-link-meta">
                                                                <span className="price">{formatPrice(course.price)}</span>
                                                                <span className="rating">⭐ {course.rating}</span>
                                                                <span className="level">{course.level}</span>
                                                            </div>
                                                        </div>
                                                        <LinkOutlined className="link-icon" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="message-time">
                                        {msg.timestamp.toLocaleTimeString('vi-VN', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message ai-message">
                                <div className="message-avatar">
                                    <Avatar icon={<RobotOutlined />} size="small" className="ai-avatar" />
                                </div>
                                <div className="message-content">
                                    <div className="typing-indicator">
                                        <Spin size="small" />
                                        <span>Đang soạn tin nhắn...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input">
                        <Input.TextArea
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Nhập tin nhắn của bạn..."
                            autoSize={{ minRows: 1, maxRows: 3 }}
                            disabled={isLoading}
                        />
                        <Button
                            type="primary"
                            icon={<SendOutlined />}
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isLoading}
                            className="send-btn"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBox; 