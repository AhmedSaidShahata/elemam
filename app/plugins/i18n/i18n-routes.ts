const routes = {
  // Static pages
  'about-us/index': {
    ar: '/من-نحن',
    en: '/about-us',
  },
  'contact-us/index': {
    ar: '/تواصل-معنا',
    en: '/contact-us',
  },
  'privacy-policy/index': {
    ar: '/سياسة-الخصوصية',
    en: '/privacy-policy',
  },
  'terms-conditions/index': {
    ar: '/الشروط-والأحكام',
    en: '/terms-conditions',
  },
  'return-policy/index': {
    ar: '/سياسة-الاسترجاع',
    en: '/return-policy',
  },
  // Offers
  'offers/index': {
    ar: '/العروض',
    en: '/offers',
  },
  'offers/[id]/index': {
    ar: '/[id]/العروض',
    en: '/offers/[id]',
  },
  // Countries / Tourism destinations
  'countries/index': {
    ar: '/الوجهات-السياحية',
    en: '/tourism-destinations',
  },
  'countries/destinations/index': {
    ar: '/الوجهات/الوجهات-السياحية',
    en: '/tourism-destinations/destinations',
  },
  'countries/destinations/[id]/index': {
    ar: '/[id]/الوجهات/الوجهات-السياحية',
    en: '/tourism-destinations/destinations/[id]',
  },
  // Blogs
  'blogs/index': {
    ar: '/المدونة',
    en: '/blogs',
  },
  'blogs/[id]/index': {
    ar: '/[id]/المدونة',
    en: '/blogs/[id]',
  },
  // Info pages
  'customer-reviews/index': {
    ar: '/آراء-العملاء',
    en: '/customer-reviews',
  },
  'top-customers/index': {
    ar: '/أهم-العملاء',
    en: '/top-customers',
  },
  'team-members/index': {
    ar: '/فريق-العمل',
    en: '/team-members',
  },
  'board-members/index': {
    ar: '/مجلس-الإدارة',
    en: '/board-members',
  },
  'quotes/index': {
    ar: '/الاقتباسات',
    en: '/quotes',
  },
  // Services
  'services/index': {
    ar: '/الخدمات',
    en: '/services',
  },
  'services/booking/[id]/categories/index': {
    ar: '/[id]/الفئات/حجز/الخدمات',
    en: '/services/booking/[id]/categories',
  },
  'services/booking/[id]/models/index': {
    ar: '/[id]/نماذج/حجز/الخدمات',
    en: '/services/booking/[id]/models',
  },
  'services/booking/[id]/models/[modelId]/index': {
    ar: '/[modelId]/نماذج/[id]/حجز/الخدمات',
    en: '/services/booking/[id]/models/[modelId]',
  },
  'services/rental/[id]/index': {
    ar: '/[id]/ايجار/الخدمات',
    en: '/services/rental/[id]',
  },
  'services/form/[id]/index': {
    ar: '/[id]/استمارة/الخدمات',
    en: '/services/form/[id]',
  },
}

export default routes
