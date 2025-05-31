"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import MythologicalCultures from "../components/MythologicalCultures";
import FeaturedArticle from "../components/FeaturedArticle";
import GamesSection from "../components/GamesSection";
import AudioStoriesSection from "../components/AudioStoriesSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-amber-50 to-amber-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      {/* Hero Section */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Featured Categories Section */}
        <Categories />

        {/* Featured Cultures Section */}
        <MythologicalCultures />

        {/* Featured Article */}
        <FeaturedArticle />

        {/* Games Section */}
        <GamesSection />



        {/* Audio Stories Section */}
        <AudioStoriesSection />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
