import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    Form,
    Input,
    Select,
    Radio,
    Divider,
    Row,
    Col,
    Steps,
    message,
    Typography,
    Space,
    InputNumber
} from 'antd';
import {
    ShoppingCartOutlined,
    CreditCardOutlined,
    CheckCircleOutlined,
    ArrowLeftOutlined,
    DeleteOutlined,
    MinusOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import { usePurchasedCourses } from '../context/PurchasedCoursesContext';
// Removed unused import mockProducts

const { Title, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;

// Removed unused interface CheckoutFormData

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const { addPurchasedCourse } = usePurchasedCourses();
    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // Check if user came from direct course enrollment
    // Removed unused variable directCourseId

    useEffect(() => {
        console.log('CheckoutPage mounted');
        console.log('Cart items:', cartItems);
        console.log('Current step:', currentStep);
    }, [cartItems, currentStep]);

    const steps = [
        {
            title: 'Giỏ hàng',
            icon: <ShoppingCartOutlined />,
        },
        {
            title: 'Thông tin thanh toán',
            icon: <CreditCardOutlined />,
        },
        {
            title: 'Hoàn thành',
            icon: <CheckCircleOutlined />,
        },
    ];

    const handleRemoveItem = (itemId: string) => {
        removeFromCart(itemId);
        message.success('Đã xóa sản phẩm khỏi giỏ hàng');
    };

    const handleQuantityChange = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
            message.success('Đã xóa sản phẩm khỏi giỏ hàng');
        } else {
            updateQuantity(itemId, quantity);
        }
    };

    const handleNext = () => {
        if (currentStep === 0) {
            if (cartItems.length === 0) {
                message.error('Giỏ hàng trống!');
                return;
            }
            setCurrentStep(1);
        } else if (currentStep === 1) {
            form.validateFields().then(() => {
                setCurrentStep(2);
                handlePayment();
            });
        }
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const handlePayment = async () => {
        setLoading(true);
        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Add all cart items to purchased courses
            cartItems.forEach(item => {
                const product = {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    shortDescription: '',
                    fullDescription: '',
                    category: '',
                    rating: 0,
                    reviews: 0,
                    instructor: '',
                    duration: '',
                    level: 'Beginner' as const,
                    isLiked: false,
                    tags: []
                };
                addPurchasedCourse(product);
            });

            message.success('Thanh toán thành công!');
            clearCart();

            // Navigate to success page or home
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            console.error('Payment error:', error);
            message.error('Thanh toán thất bại. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const subtotal = getCartTotal();
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    const renderCartStep = () => (
        <div style={{ padding: '24px 0' }}>
            <Title level={3}>Giỏ hàng của bạn</Title>

            {cartItems.length === 0 ? (
                <Card style={{ textAlign: 'center', padding: '48px 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <ShoppingCartOutlined style={{ fontSize: 48, color: '#ccc' }} />
                        <Text type="secondary">Giỏ hàng trống</Text>
                        <Button type="primary" onClick={() => navigate('/')}>
                            Tiếp tục mua sắm
                        </Button>
                    </div>
                </Card>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <Card key={item.id} style={{ marginBottom: '16px' }}>
                            <Row gutter={16} align="middle">
                                <Col xs={24} sm={4}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: '100%',
                                            height: '80px',
                                            objectFit: 'cover',
                                            borderRadius: '6px'
                                        }}
                                    />
                                </Col>
                                <Col xs={24} sm={8}>
                                    <div>
                                        <Title level={5} style={{ margin: '0 0 8px 0' }}>{item.name}</Title>
                                        <Text type="secondary">Giá: {formatPrice(item.price)}</Text>
                                    </div>
                                </Col>
                                <Col xs={12} sm={4}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Button
                                            size="small"
                                            icon={<MinusOutlined />}
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        />
                                        <InputNumber
                                            min={1}
                                            value={item.quantity}
                                            onChange={(value) => handleQuantityChange(item.id, value || 1)}
                                            style={{ width: '60px' }}
                                        />
                                        <Button
                                            size="small"
                                            icon={<PlusOutlined />}
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} sm={4}>
                                    <div style={{ textAlign: 'right' }}>
                                        <Text strong>{formatPrice(item.price * item.quantity)}</Text>
                                    </div>
                                </Col>
                                <Col xs={6} sm={4}>
                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        Xóa
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );

    const renderPaymentStep = () => (
        <div style={{ padding: '24px 0' }}>
            <Title level={3}>Thông tin thanh toán</Title>

            <Row gutter={[32, 32]}>
                <Col xs={24} lg={16}>
                    <Card title="Thông tin cá nhân" style={{ marginBottom: '24px' }}>
                        <Form form={form} layout="vertical">
                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="fullName"
                                        label="Họ và tên"
                                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                                    >
                                        <Input placeholder="Nhập họ và tên" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập email!' },
                                            { type: 'email', message: 'Email không hợp lệ!' }
                                        ]}
                                    >
                                        <Input placeholder="Nhập email" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="phone"
                                        label="Số điện thoại"
                                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                    >
                                        <Input placeholder="Nhập số điện thoại" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="city"
                                        label="Thành phố"
                                        rules={[{ required: true, message: 'Vui lòng chọn thành phố!' }]}
                                    >
                                        <Select placeholder="Chọn thành phố">
                                            <Option value="hanoi">Hà Nội</Option>
                                            <Option value="hcm">TP. Hồ Chí Minh</Option>
                                            <Option value="danang">Đà Nẵng</Option>
                                            <Option value="cantho">Cần Thơ</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                name="address"
                                label="Địa chỉ"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                            >
                                <Input.TextArea rows={3} placeholder="Nhập địa chỉ chi tiết" />
                            </Form.Item>
                        </Form>
                    </Card>

                    <Card title="Phương thức thanh toán">
                        <Form.Item name="paymentMethod" initialValue="credit">
                            <Radio.Group>
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <Radio value="credit">
                                        <Space>
                                            <CreditCardOutlined />
                                            Thẻ tín dụng/ghi nợ
                                        </Space>
                                    </Radio>
                                    <Radio value="bank">Chuyển khoản ngân hàng</Radio>
                                    <Radio value="momo">Ví MoMo</Radio>
                                    <Radio value="zalopay">Ví ZaloPay</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item noStyle shouldUpdate>
                            {({ getFieldValue }) => {
                                const paymentMethod = getFieldValue('paymentMethod');
                                return paymentMethod === 'credit' ? (
                                    <div style={{
                                        marginTop: '16px',
                                        padding: '16px',
                                        background: '#fafbfc',
                                        borderRadius: '6px',
                                        border: '1px solid #e8e8e8'
                                    }}>
                                        <Row gutter={16}>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="cardNumber"
                                                    label="Số thẻ"
                                                    rules={[{ required: true, message: 'Vui lòng nhập số thẻ!' }]}
                                                >
                                                    <Input placeholder="1234 5678 9012 3456" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="cardName"
                                                    label="Tên chủ thẻ"
                                                    rules={[{ required: true, message: 'Vui lòng nhập tên chủ thẻ!' }]}
                                                >
                                                    <Input placeholder="NGUYEN VAN A" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={12} sm={6}>
                                                <Form.Item
                                                    name="expiryDate"
                                                    label="Ngày hết hạn"
                                                    rules={[{ required: true, message: 'MM/YY!' }]}
                                                >
                                                    <Input placeholder="MM/YY" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={12} sm={6}>
                                                <Form.Item
                                                    name="cvv"
                                                    label="CVV"
                                                    rules={[{ required: true, message: 'CVV!' }]}
                                                >
                                                    <Input placeholder="123" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                ) : null;
                            }}
                        </Form.Item>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card title="Tóm tắt đơn hàng" style={{ position: 'sticky', top: '24px' }}>
                        <div>
                            <div style={{ marginBottom: '16px' }}>
                                <Text strong>Danh sách khóa học:</Text>
                                {cartItems.map((item) => (
                                    <div key={item.id} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: '8px',
                                        padding: '8px 0',
                                        borderBottom: '1px solid #f0f0f0'
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <Text style={{ fontSize: '12px' }}>{item.name}</Text>
                                            <br />
                                            <Text type="secondary" style={{ fontSize: '11px' }}>
                                                Số lượng: {item.quantity}
                                            </Text>
                                        </div>
                                        <Text style={{ fontSize: '12px', marginLeft: '8px' }}>
                                            {formatPrice(item.price * item.quantity)}
                                        </Text>
                                    </div>
                                ))}
                            </div>

                            <Divider />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '14px' }}>
                                <Text>Tạm tính:</Text>
                                <Text>{formatPrice(subtotal)}</Text>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '14px' }}>
                                <Text>Thuế (10%):</Text>
                                <Text>{formatPrice(tax)}</Text>
                            </div>
                            <Divider />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '16px' }}>
                                <Text strong>Tổng cộng:</Text>
                                <Text strong style={{ color: '#1890ff' }}>{formatPrice(total)}</Text>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    const renderSuccessStep = () => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
            <div style={{ textAlign: 'center', maxWidth: '500px' }}>
                <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a', marginBottom: 24 }} />
                <Title level={2}>Thanh toán thành công!</Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
                    Cảm ơn bạn đã mua khóa học. Chúng tôi sẽ gửi email xác nhận trong thời gian sớm nhất.
                </Text>
                <div style={{ marginTop: 32 }}>
                    <Button type="primary" size="large" onClick={() => navigate('/')}>
                        Về trang chủ
                    </Button>
                </div>
            </div>
        </div>
    );

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return renderCartStep();
            case 1:
                return renderPaymentStep();
            case 2:
                return renderSuccessStep();
            default:
                return <div>Step not found</div>;
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f5f7fa', padding: '24px' }}>
            <div style={{ marginBottom: '32px' }}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate(-1)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: 500,
                        color: '#1890ff',
                        border: 'none',
                        background: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px'
                    }}
                >
                    Quay lại
                </Button>
            </div>

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden'
            }}>
                <div style={{
                    padding: '32px 32px 0',
                    background: '#fafbfc',
                    borderBottom: '1px solid #f0f0f0'
                }}>
                    <Steps current={currentStep}>
                        {steps.map((step, index) => (
                            <Step key={index} title={step.title} icon={step.icon} />
                        ))}
                    </Steps>
                </div>

                <div style={{ padding: '32px', minHeight: '500px' }}>
                    {renderStepContent()}
                </div>

                {currentStep < 2 && (
                    <div style={{
                        padding: '24px 32px',
                        background: '#fafbfc',
                        borderTop: '1px solid #f0f0f0',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <Space>
                            {currentStep > 0 && (
                                <Button onClick={handlePrev}>
                                    Quay lại
                                </Button>
                            )}
                            <Button
                                type="primary"
                                onClick={handleNext}
                                loading={loading}
                                disabled={cartItems.length === 0}
                            >
                                {currentStep === 1 ? 'Thanh toán' : 'Tiếp tục'}
                            </Button>
                        </Space>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage; 