'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import MainLayout from '@/app/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function CommunityPage() {
  const t = useTranslations();
  
  // 模拟数据
  const featuredPosts = [
    {
      id: 1,
      title: 'Winter Style Guide 2023',
      author: 'Emma Johnson',
      avatar: '/images/avatars/avatar-1.jpg',
      image: '/images/community/post-1.jpg',
      likes: 245,
      comments: 56,
      shares: 23,
      date: '2023-11-15'
    },
    {
      id: 2,
      title: 'Minimalist Wardrobe Essentials',
      author: 'Alex Chen',
      avatar: '/images/avatars/avatar-2.jpg',
      image: '/images/community/post-2.jpg',
      likes: 189,
      comments: 42,
      shares: 18,
      date: '2023-11-10'
    },
    {
      id: 3,
      title: 'Street Style Inspiration from Paris',
      author: 'Sophie Martin',
      avatar: '/images/avatars/avatar-3.jpg',
      image: '/images/community/post-3.jpg',
      likes: 312,
      comments: 78,
      shares: 45,
      date: '2023-11-05'
    }
  ];

  const trendingTopics = [
    { id: 1, name: 'Winter Fashion', posts: 1245 },
    { id: 2, name: 'Sustainable Style', posts: 987 },
    { id: 3, name: 'Minimalism', posts: 756 },
    { id: 4, name: 'Vintage Finds', posts: 632 },
    { id: 5, name: 'Accessories', posts: 521 }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'FORTARC Winter Collection Launch',
      date: '2023-12-15',
      location: 'New York',
      image: '/images/community/event-1.jpg'
    },
    {
      id: 2,
      title: 'Sustainable Fashion Workshop',
      date: '2023-12-20',
      location: 'Online',
      image: '/images/community/event-2.jpg'
    }
  ];

  const styleGallery = [
    { id: 1, image: '/images/community/style-1.jpg', likes: 156 },
    { id: 2, image: '/images/community/style-2.jpg', likes: 124 },
    { id: 3, image: '/images/community/style-3.jpg', likes: 98 },
    { id: 4, image: '/images/community/style-4.jpg', likes: 87 },
    { id: 5, image: '/images/community/style-5.jpg', likes: 76 },
    { id: 6, image: '/images/community/style-6.jpg', likes: 65 }
  ];

  const popularTags = [
    { id: 1, name: '#WinterStyle', posts: 1245 },
    { id: 2, name: '#Minimalist', posts: 987 },
    { id: 3, name: '#FORTARC', posts: 756 },
    { id: 4, name: '#Sustainable', posts: 632 },
    { id: 5, name: '#Vintage', posts: 521 },
    { id: 6, name: '#Accessories', posts: 432 }
  ];

  const activeMembers = [
    {
      id: 1,
      name: 'Emma Johnson',
      avatar: '/images/avatars/avatar-1.jpg',
      posts: 45,
      followers: 1200
    },
    {
      id: 2,
      name: 'Alex Chen',
      avatar: '/images/avatars/avatar-2.jpg',
      posts: 38,
      followers: 950
    },
    {
      id: 3,
      name: 'Sophie Martin',
      avatar: '/images/avatars/avatar-3.jpg',
      posts: 32,
      followers: 870
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <h1 className="text-4xl font-bold mb-8 text-center">{t('community.pageTitle')}</h1>
        
        {/* 英雄区域 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 mb-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">{t('community.heroTitle')}</h2>
          <p className="text-xl mb-6">{t('community.heroSubtitle')}</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            {t('community.joinButton')}
          </Button>
        </div>
        
        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧边栏 */}
          <div className="lg:col-span-1 space-y-8">
            {/* 热门话题 */}
            <Card>
              <CardHeader>
                <CardTitle>{t('community.trendingTopics')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {trendingTopics.map(topic => (
                    <li key={topic.id} className="flex justify-between items-center">
                      <span className="font-medium">{topic.name}</span>
                      <span className="text-sm text-gray-500">{topic.posts} posts</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">{t('community.viewAll')}</Button>
              </CardFooter>
            </Card>
            
            {/* 线下活动 */}
            <Card>
              <CardHeader>
                <CardTitle>{t('community.events')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upcoming">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upcoming">{t('community.upcomingEvents')}</TabsTrigger>
                    <TabsTrigger value="past">{t('community.pastEvents')}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upcoming" className="space-y-4 mt-4">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="rounded-lg overflow-hidden border">
                        <div className="h-32 bg-gray-200"></div>
                        <div className="p-4">
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-gray-500">{event.date} • {event.location}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="past">
                    <p className="text-center py-8 text-gray-500">No past events to display</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* 热门标签 */}
            <Card>
              <CardHeader>
                <CardTitle>{t('community.popularTags')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map(tag => (
                    <Badge key={tag.id} variant="secondary" className="cursor-pointer hover:bg-gray-200">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 中间内容区 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 搜索框 */}
            <div className="relative">
              <Input 
                placeholder={t('community.searchCommunity')} 
                className="pl-10"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* 精选内容 */}
            <div>
              <h3 className="text-2xl font-bold mb-4">{t('community.featuredPosts')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredPosts.slice(0, 2).map(post => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="h-48 bg-gray-200"></div>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar>
                          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{post.author}</p>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                    </CardHeader>
                    <CardFooter className="flex justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {post.comments}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">{t('community.readMore')}</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* 最新动态 */}
            <div>
              <h3 className="text-2xl font-bold mb-4">{t('community.latestPosts')}</h3>
              <div className="space-y-6">
                {featuredPosts.map(post => (
                  <Card key={post.id}>
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-40 bg-gray-200"></div>
                      <div className="md:w-2/3 p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar>
                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{post.author}</p>
                            <p className="text-xs text-gray-500">{post.date}</p>
                          </div>
                        </div>
                        <h4 className="text-lg font-semibold mb-2">{post.title}</h4>
                        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              {post.comments}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">{t('community.readMore')}</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline">{t('community.viewAll')}</Button>
              </div>
            </div>
            
            {/* 分享风格 */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">{t('community.shareYourStyle')}</h3>
                <Button>{t('community.uploadPhoto')}</Button>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>{t('community.styleGallery')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {styleGallery.map(style => (
                      <div key={style.id} className="relative group overflow-hidden rounded-lg">
                        <div className="h-40 bg-gray-200"></div>
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {style.likes}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button variant="outline">{t('community.viewAll')}</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        
        {/* 社区成员 */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">{t('community.members')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeMembers.map(member => (
              <Card key={member.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-lg">{member.name}</h4>
                      <p className="text-sm text-gray-500">{t('community.activeMember')}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span>{member.posts} {t('community.posts')}</span>
                        <span>{member.followers} {t('community.followers')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">{t('community.follow')}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}