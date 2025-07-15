import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../pages/homepage.page";
import CourseDetail from "../pages/course-detail.page";
import MainLayout from "../layouts/MainLayout";
import RoadmapPage from "../pages/roadmap.page";
import PostsPage from "../pages/posts.page";
import NotificationsPage from "../pages/notifications.page";

const MainRouter: React.FC = () => {
  return (
    <Suspense>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />

          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default MainRouter;
