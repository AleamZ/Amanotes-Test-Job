import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/homepage.page";
import CourseDetail from "../pages/course-detail.page";
import CheckoutPage from "../pages/checkout.page";
import MainLayout from "../layouts/MainLayout";
import RoadmapPage from "../pages/roadmap.page";
import RoadmapDetailPage from "../pages/roadmap-detail.page";
import PostsPage from "../pages/posts.page";
import NotificationsPage from "../pages/notifications.page";
import MyCoursesPage from "../pages/my-courses.page";

const MainRouter: React.FC = () => {
  return (
    <Suspense>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />

          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/roadmap/:id" element={<RoadmapDetailPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/my-courses" element={<MyCoursesPage />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default MainRouter;
