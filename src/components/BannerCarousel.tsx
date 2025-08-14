import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import bannerCollaboration from '@/assets/banner-collaboration.jpg';
import bannerNetworking from '@/assets/banner-networking.jpg';
import bannerAchievement from '@/assets/banner-achievement.jpg';
import bannerApp from '@/assets/banner-app.jpg';

const bannerSlides = [
  {
    id: 1,
    image: bannerCollaboration,
    title: "Join Our Community",
    subtitle: "Connect with fellow professionals"
  },
  {
    id: 2,
    image: bannerNetworking,
    title: "Connect & Grow",
    subtitle: "Expand your network through challenges"
  },
  {
    id: 3,
    image: bannerAchievement,
    title: "Unlock Your Potential",
    subtitle: "Achieve success through gamification"
  },
  {
    id: 4,
    image: bannerApp,
    title: "Gamify Your Success",
    subtitle: "Track progress with our mobile app"
  }
];

export const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
      <div className="relative w-full h-full">
        {/* Slides */}
        <div className="flex transition-transform duration-500 ease-in-out h-full"
             style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {bannerSlides.map((slide) => (
            <div key={slide.id} className="banner-slide">
              <img src={slide.image} alt={slide.title} />
              <div className="banner-overlay">
                <h3 className="text-white text-xl font-bold mb-2">{slide.title}</h3>
                <p className="text-white/90 text-sm">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`banner-nav-dot ${index === currentSlide ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};