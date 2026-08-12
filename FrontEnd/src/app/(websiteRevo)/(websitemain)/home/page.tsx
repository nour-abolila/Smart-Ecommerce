import React from 'react'
import HeroSection from '@/components/layouts/website/HeroSection'
import BrowseByCat from '@/components/layouts/website/BrowseByCat'
import RecoomForU from '@/components/layouts/website/RecoomForU'
import ChiccoPicks from '@/components/layouts/website/ChiccoPicks'
import TrendingGlasses from "@/components/layouts/website/TrendingGlasses"
import NewArrival from '@/components/layouts/website/NewArrival'
import NewsletterSignup from '@/components/layouts/website/ConectionCom'
const HomePage = () => {
  return (
    <div>
        <HeroSection/>
        <BrowseByCat/>
        <RecoomForU/>
        <ChiccoPicks/>
        <TrendingGlasses/>
        <NewArrival/>
        <NewsletterSignup/>
    </div>
  )
}

export default HomePage
