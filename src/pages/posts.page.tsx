import React, { useState } from 'react';
import { posts, postCategories } from '../services/mockData';
import '../styles/pages/pages.scss';

const PostsPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [selectedPost, setSelectedPost] = useState<null | typeof posts[0]>(null);

    // Lọc bài viết theo danh mục
    const filteredPosts = selectedCategory === 'Tất cả'
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    return (
        <div className="posts-page">
            {/* Bên trái: Danh sách bài viết */}
            <div className={selectedPost ? 'post-detail' : 'posts-list'}>
                <h1 style={{ marginBottom: 16, color: 'black' }}>Bài viết</h1>
                {!selectedPost ? (
                    <div style={{ display: 'grid', gap: 24 }}>
                        {filteredPosts.map(post => (
                            <div
                                key={post.id}
                                className="post-card"
                                onClick={() => setSelectedPost(post)}
                            >
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                />
                                <div className="post-info">
                                    <div className="post-title">{post.title}</div>
                                    <div className="post-meta">
                                        {post.category} | {post.author} | {new Date(post.date).toLocaleDateString()}
                                    </div>
                                    <div className="post-excerpt">{post.excerpt}</div>
                                </div>
                            </div>
                        ))}
                        {filteredPosts.length === 0 && (
                            <div className="no-posts">
                                Không có bài viết nào trong danh mục này.
                            </div>
                        )}
                    </div>
                ) : (
                    // Trang chi tiết bài viết
                    <div>
                        <button
                            className="back-btn"
                            onClick={() => setSelectedPost(null)}
                        >
                            ← Quay lại danh sách
                        </button>
                        <img
                            src={selectedPost.thumbnail}
                            alt={selectedPost.title}
                        />
                        <h2>{selectedPost.title}</h2>
                        <div className="post-meta">
                            {selectedPost.category} | {selectedPost.author} | {new Date(selectedPost.date).toLocaleDateString()}
                        </div>
                        <div className="post-content">{selectedPost.content}</div>
                    </div>
                )}
            </div>
            {/* Bên phải: Danh sách chủ đề */}
            <div className="categories-bar">
                <div className="categories-box">
                    <h3>Chủ đề</h3>
                    <ul>
                        {postCategories.map(cat => (
                            <li key={cat}>
                                <button
                                    className={selectedCategory === cat ? 'active' : ''}
                                    onClick={() => { setSelectedCategory(cat); setSelectedPost(null); }}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PostsPage; 