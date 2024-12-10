"use client";

import React from "react";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import { useTranslations } from "next-intl";
import Link from "@node_modules/next/link";
import Cta from "@components/homepage/Cta";

const BlogPost1 = () => {
  return (
    <>
      <Navbar />

      <div className="relative overflow-hidden bg-white dark:bg-gray-900 pt-32 pb-16">
        <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">
          <div className="relative mx-auto h-full max-w-prose text-lg" aria-hidden="true"></div>
        </div>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-lg">
            <h1>
              <span className="inline-flex w-fit items-center text-green-800 bg-green-100 px-3 py-0.5 rounded-full text-sm font-medium mb-4">
                {process.env.NEXT_PUBLIC_FIRST_WORD}
                {process.env.NEXT_PUBLIC_SECOND_WORD}
              </span>
              <span className="mb-2 block text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Create Social Proof for your business or Hype your profile!
              </span>
            </h1>
          </div>
          <div className="prose prose-lg prose-yellow mx-auto mt-8 text-gray-500 dark:text-gray-200">
            <p>
              1. Buy Followers: Invest in purchasing followers to quickly increase your social proof and credibility. A
              larger follower count can attract more organic followers and make your profile appear more influential to
              potential followers or customers.
            </p>
            <p>
              2. Buy Likes: Boost the visibility of your posts by purchasing likes. Higher engagement rates can attract
              more attention from users browsing social media platforms, leading to increased visibility and potential
              followers or customers.
            </p>
            <p>
              3. Purchase Comments: Enhance the engagement on your posts by purchasing comments. Genuine-looking
              comments can make your posts appear more popular and encourage other users to join the conversation,
              ultimately boosting your profile's visibility.
            </p>
            <p>
              4. Purchase Views: Increase the visibility of your videos by purchasing views on platforms like YouTube or
              TikTok. A higher view count can attract more organic views and engagement, boosting your content's
              popularity and reach.
            </p>
            <p>
              5. Guide Users Through the Funnel: Use your Instagram and YouTube content to guide users through the
              various stages of your funnel, from awareness to conversion. For example, create engaging videos that
              showcase your products or services, share customer testimonials, or provide valuable educational content
              related to your industry or niche.
            </p>
          </div>
        </div>
      </div>

      <Cta />
      <Footer />
    </>
  );
};

export default BlogPost1;
