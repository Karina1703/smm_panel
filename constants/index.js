import { useTranslations } from "next-intl";
import * as fa from "@fortawesome/free-solid-svg-icons";
import {
  ArchiveBoxIcon,
  BanknotesIcon,
  BookmarkSquareIcon,
  BuildingLibraryIcon,
  CalendarIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  HomeIcon,
  LifebuoyIcon,
  ListBulletIcon,
  PlayIcon,
  PresentationChartLineIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import {
  advcash,
  alfa,
  bch,
  btc,
  busd,
  dai,
  dash,
  doge,
  eth,
  ltc,
  mastercard,
  matic,
  mir,
  payeer,
  perfectmoney,
  qiwi,
  sber,
  sbp,
  tinkoff,
  ton,
  trx,
  usdc,
  usdt,
  visa,
  vtb,
  xmr,
  xrp,
  yoomoney,
  webmoney,
  smmstats,
} from "@components/ui/PaymentIcons";
import { faBitcoinSign, faCreditCard, faWallet } from "@fortawesome/free-solid-svg-icons";
import {
  UsersIcon,
  ShieldCheckIcon,
  BoltIcon,
  GiftIcon,
  LockClosedIcon,
  PhoneIcon,
} from "@node_modules/@heroicons/react/20/solid";
import AnimatedStickerFlagRussia from "@public/assets/lottie/flag-russia.json";
import AnimatedStickerFlagUsa from "@public/assets/lottie/flag-usa.json";
import AnimatedStickerFlagUkraine from "@public/assets/lottie/flag-ukraine.json";
import AnimatedStickerFlagSpain from "@public/assets/lottie/flag-spain.json";
import AnimatedStickerFlagGermany from "@public/assets/lottie/flag-germany.json";
import AnimatedStickerFlagFrance from "@public/assets/lottie/flag-france.json";
import AnimatedStickerFlagIndia from "@public/assets/lottie/flag-india.json";
import AnimatedStickerFlagChina from "@public/assets/lottie/flag-china.json";
import AnimatedStickerFlagJapan from "@public/assets/lottie/flag-japan.json";
import AnimatedStickerFlagKorea from "@public/assets/lottie/flag-korea.json";

export const useConstants = () => {
  const pathname = usePathname();
  const t = useTranslations("Constants");

  // Order

  const categories = [
    {
      id: 1,
      name: "Instagram",
      image: "/assets/icons/instagram.webp",
      subCategories: {
        followers: {
          name: t("type.followers"),
          tag: "Подписчики",
          icon: fa.faUser,
        },
        likes: {
          name: t("type.likes"),
          tag: "Лайки",
          icon: fa.faHeart,
        },
        views: {
          name: t("type.views"),
          tag: "Просмотры",
          icon: fa.faEye,
        },
        comments: {
          name: t("type.comments"),
          tag: "Комментарии",
          icon: fa.faComment,
        },
        statistics: {
          name: t("type.statistics"),
          tag: "Статистика",
          icon: fa.faChartLine,
        },
        live: {
          name: t("type.live"),
          tag: "Прямой эфир",
          icon: fa.faVideo,
        },
        stories: {
          name: t("type.stories"),
          tag: "Истории",
          icon: fa.faMobile,
        },
      },
    },
    {
      id: 2,
      name: "TikTok",
      image: "/assets/icons/tiktok.webp",
      subCategories: {
        followers: {
          name: t("type.followers"),
          tag: "Подписчики",
          icon: fa.faUser,
        },
        likes: {
          name: t("type.likes"),
          tag: "Лайки",
          icon: fa.faHeart,
        },
        views: {
          name: t("type.views"),
          tag: "Просмотры",
          icon: fa.faEye,
        },
        comments: {
          name: t("type.comments"),
          tag: "Комментарии",
          icon: fa.faComment,
        },
        live: {
          name: t("type.live"),
          tag: "Прямой эфир",
          icon: fa.faVideo,
        },
        statistics: {
          name: t("type.statistics"),
          tag: "Статистика",
          icon: fa.faChartLine,
        },
      },
    },
    {
      id: 3,
      name: "Telegram",
      image: "/assets/icons/telegram.webp",
      subCategories: {
        members: {
          name: t("type.members"),
          tag: "Участники",
          icon: fa.faUser,
        },
        views: {
          name: t("type.views"),
          tag: "Просмотры",
          icon: fa.faEye,
        },
        comments: {
          name: t("type.comments"),
          tag: "Комментарии",
          icon: fa.faComment,
        },
        reactions: {
          name: t("type.reactions"),
          tag: "Реакции",
          icon: fa.faFireFlameCurved,
        },
        autoservices: {
          name: t("type.auto-services"),
          tag: "Авто-услуги",
          icon: fa.faRobot,
        },
      },
    },
    {
      id: 4,
      name: "YouTube",
      image: "/assets/icons/youtube.webp",
      subCategories: {
        subscribers: {
          name: t("type.subscribers"),
          tag: "Подписчики",
          icon: fa.faUser,
        },
        ytlikes: {
          name: t("type.yt-likes"),
          tag: "Лайки",
          icon: fa.faThumbsUp,
        },
        comments: {
          name: t("type.comments"),
          tag: "Комментарии",
          icon: fa.faComment,
        },
        views: {
          name: t("type.views"),
          tag: "Просмотры",
          icon: fa.faEye,
        },
        ravviews: {
          name: t("type.rav-views"),
          tag: "Уникальные просмотры",
          icon: fa.faEye,
        },
        adsviews: {
          name: t("type.ads-views"),
          tag: "Просмотры с рекламы",
          icon: fa.faRectangleAd,
        },
        shorts: {
          name: t("type.shorts"),
          tag: "Shorts",
          icon: fa.faMobile,
        },
        livestream: {
          name: t("type.live-stream"),
          tag: "Трансляция",
          icon: fa.faPodcast,
        },
        shares: {
          name: t("type.shares"),
          tag: "Поделиться",
          icon: fa.faShare,
        },
        watchtime: {
          name: t("type.watchtime"),
          tag: "Часы просмотров",
          icon: fa.faClock,
        },
      },
    },
    {
      id: 5,
      name: "Facebook",
      image: "/assets/icons/facebook.webp",
      subCategories: {
        followers: {
          name: t("type.followers"),
          tag: "Подписчики",
          icon: fa.faUser,
        },
        pagelikes: {
          name: t("type.page-likes"),
          tag: "Лайки на страницу",
          icon: fa.faHeart,
        },
        postlikes: {
          name: t("type.post-likes"),
          tag: "Лайки на пост",
          icon: fa.faUser,
        },
        comments: {
          name: t("type.comments"),
          tag: "Комментарии",
          icon: fa.faComment,
        },
        views: {
          name: t("type.views"),
          tag: "Просмотры",
          icon: fa.faEye,
        },
        groupmembers: {
          name: t("type.group-members"),
          tag: "Участники в группу",
          icon: fa.faUsers,
        },
        activity: {
          name: t("type.activity"),
          tag: "Активность",
          icon: fa.faCalendarDays,
        },
        live: {
          name: t("type.live"),
          tag: "Прямой эфир",
          icon: fa.faPodcast,
        },
      },
    },
    {
      id: 6,
      name: "Twitter",
      publicName: "X (formerly Twitter)",
      image: "/assets/icons/xcom.webp",
      subCategories: {
        twitterfollowers: {
          name: t("type.twitter-followers"),
          tag: "Читатели",
          icon: fa.faUser,
        },
        likes: {
          name: t("type.likes"),
          tag: "Лайки",
          icon: fa.faHeart,
        },
        twitterretweets: {
          name: t("type.twitter-retweets"),
          tag: "Ретвиты",
          icon: fa.faRetweet,
        },
        comments: {
          name: t("type.comments"),
          tag: "Комментарии",
          icon: fa.faComment,
        },
        statistics: {
          name: t("type.statistics"),
          tag: "Статистика",
          icon: fa.faChartLine,
        },
        bookmarks: {
          name: "Bookmarks",
          tag: "Bookmarks",
          icon: fa.faStar,
        },
        twitterspace: {
          name: t("type.twitter-space"),
          tag: "Space",
          icon: fa.faPodcast,
        },
      },
    },
    {
      id: 12,
      name: "Threads",
      image: "/assets/icons/threads.webp",
      subCategories: {
        followers: {
          name: t("type.followers"),
          tag: "Подписчики",
          icon: fa.faUser,
        },
        likes: {
          name: t("type.likes"),
          tag: "Лайки",
          icon: fa.faHeart,
        },
        shares: {
          name: t("type.shares"),
          tag: "Поделиться",
          icon: fa.faRetweet,
        },
      },
    },
    {
      id: 7,
      name: "Discord",
      image: "/assets/icons/discord.webp",
      subCategories: {
        servermembers: {
          name: t("type.server-members"),
          tag: "Участники на сервер",
          icon: fa.faUser,
        },
        friendrequests: {
          name: t("type.friend-requests"),
          tag: "Заявки в друзья",
          icon: fa.faUserPlus,
        },
      },
    },
    {
      id: 8,
      name: "VK",
      image: "/assets/icons/vk.webp",
      subCategories: {
        followers: {
          name: t("type.followers"),
          tag: "Подписчики",
          icon: fa.faUser,
        },
        likes: {
          name: t("type.likes"),
          tag: "Лайки",
          icon: fa.faHeart,
        },
        views: {
          name: t("type.views"),
          tag: "Просмотры",
          icon: fa.faEye,
        },
      },
    },
    {
      id: 9,
      name: "Spotify",
      image: "/assets/icons/spotify.webp",
      subCategories: {
        followers: {
          name: t("type.followers"),
          tag: "Подписчики",
          icon: fa.faUser,
        },
        plays: {
          name: t("type.plays"),
          tag: "Прослушивания",
          icon: fa.faVolumeUp,
        },
        monthlylisteners: {
          name: t("type.monthly-listeners"),
          tag: "Слушатели за месяц",
          icon: fa.faHeadphones,
        },
        saves: {
          name: t("type.saves"),
          tag: "Сохранения",
          icon: fa.faShareFromSquare,
        },
      },
    },
    {
      id: 10,
      name: "SoundCloud",
      image: "/assets/icons/soundcloud.webp",
      subCategories: {
        plays: {
          name: t("type.plays"),
          tag: "Plays",
          icon: fa.faVolumeUp,
        },
        followers: {
          name: t("type.followers"),
          tag: "Followers",
          icon: fa.faUser,
        },
        reposts: {
          name: t("type.reposts"),
          tag: "Reposts",
          icon: fa.faShare,
        },
        likes: {
          name: t("type.likes"),
          tag: "Likes",
          icon: fa.faHeart,
        },
        comments: {
          name: t("type.comments"),
          tag: "Comments",
          icon: fa.faComment,
        },
      },
    },
    {
      id: 14,
      name: "Apple Music",
      image: "/assets/icons/applemusic.webp",
      subCategories: {
        all: {
          name: t("type.all"),
          tag: "All",
          icon: fa.faBoxes,
        },
      },
    },
    {
      id: 15,
      name: "App Store",
      image: "/assets/icons/appstore.webp",
      subCategories: {
        installs: {
          name: t("type.installs"),
          tag: "Installs",
          icon: fa.faDownload,
        },
        ratingAndReviews: {
          name: t("type.ratingandreviews"),
          tag: "Rating and Reviews",
          icon: fa.faStar,
        },
      },
    },
    {
      id: 16,
      name: "Play Store",
      image: "/assets/icons/playstore.webp",
      subCategories: {
        installs: {
          name: t("type.installs"),
          tag: "Installs",
          icon: fa.faDownload,
        },
      },
    },
    {
      id: 17,
      name: "Pinterest",
      image: "/assets/icons/pinterest.webp",
      subCategories: {
        followers: {
          name: t("type.followers"),
          tag: "Followers",
          icon: fa.faUser,
        },
        repins: {
          name: t("type.repins"),
          tag: "Repins",
          icon: fa.faShare,
        },
      },
    },
    {
      id: 18,
      name: "Snapchat",
      image: "/assets/icons/snapchat.webp",
      subCategories: {
        followers: {
          name: t("type.followers"),
          tag: "Followers",
          icon: fa.faUser,
        },
        views: {
          name: t("type.views"),
          tag: "Views",
          icon: fa.faEye,
        },
        spotlightExplore: {
          name: t("type.spotlightExplore"),
          tag: "Spotlight Explore",
          icon: fa.faMagnifyingGlass,
        },
      },
    },
    {
      id: 19,
      name: "Twitch",
      image: "/assets/icons/twitch.webp",
      subCategories: {
        followers: {
          name: t("type.followers"),
          tag: "Followers",
          icon: fa.faUser,
        },
        views: {
          name: t("type.views"),
          tag: "Views",
          icon: fa.faEye,
        },
        liveViews: {
          name: t("type.liveViews"),
          tag: "Live Views",
          icon: fa.faVideo,
        },
      },
    },
    // {
    //   id: 20,
    //   name: "Kick",
    //   image: "/assets/icons/kick.webp",
    //   subCategories: {
    //     followers: {
    //       name: t("type.followers"),
    //       tag: "Followers",
    //       icon: fa.faUser,
    //     },
    //   },
    // },
    // {
    //   id: 21,
    //   name: "Guest Post Service",
    //   image: "/assets/icons/guestpostservice.webp",
    //   subCategories: {
    //     articles: {
    //       name: t("type.articles"),
    //       tag: "Articles",
    //       icon: fa.faNewspaper,
    //     },
    //   },
    // },
    // {
    //   id: 22,
    //   name: "Backlinks",
    //   image: "/assets/icons/backlinks.webp",
    //   subCategories: {
    //     seo: {
    //       name: t("type.SEO"),
    //       tag: "SEO",
    //       icon: fa.faCompass,
    //     },
    //   },
    // },
    {
      id: 23,
      name: "Crypto Services",
      image: "/assets/icons/cryptoservices.webp",
      subCategories: {
        OpenSea: {
          name: "OpenSea",
          tag: "OpenSea",
          icon: fa.faBitcoinSign,
        },
        NFTSniper: {
          name: "NFTSniper",
          tag: "NFTSniper",
          icon: fa.faBitcoinSign,
        },
        Rarible: {
          name: "Rarible",
          tag: "Rarible",
          icon: fa.faBitcoinSign,
        },
        CoinMarketCap: {
          name: "CoinMarketCap",
          tag: "CoinMarketCap",
          icon: fa.faBitcoinSign,
        },
        CoinGecko: {
          name: "CoinGecko",
          tag: "CoinGecko",
          icon: fa.faBitcoinSign,
        },
        CoinSniper: {
          name: "CoinSniper",
          tag: "CoinSniper",
          icon: fa.faBitcoinSign,
        },
        CoinHunt: {
          name: "CoinHunt",
          tag: "CoinHunt",
          icon: fa.faBitcoinSign,
        },
        CoinVote: {
          name: "CoinVote",
          tag: "CoinVote",
          icon: fa.faBitcoinSign,
        },
        Watcher: {
          name: "Watcher",
          tag: "Watcher",
          icon: fa.faBitcoinSign,
        },
        GemFinder: {
          name: "GemFinder",
          tag: "GemFinder",
          icon: fa.faBitcoinSign,
        },
        Coinhunters: {
          name: "Coinhunters",
          tag: "Coinhunters",
          icon: fa.faBitcoinSign,
        },
        CoinMooner: {
          name: "CoinMooner",
          tag: "CoinMooner",
          icon: fa.faBitcoinSign,
        },
        FreshCoins: {
          name: "FreshCoins",
          tag: "FreshCoins",
          icon: fa.faBitcoinSign,
        },
        CoinsGods: {
          name: "CoinsGods",
          tag: "CoinsGods",
          icon: fa.faBitcoinSign,
        },
        BlockFolio: {
          name: "BlockFolio",
          tag: "BlockFolio",
          icon: fa.faBitcoinSign,
        },
        CoinAlpha: {
          name: "CoinAlpha",
          tag: "CoinAlpha",
          icon: fa.faBitcoinSign,
        },
        CNTOKEN: {
          name: "CNTOKEN",
          tag: "CNTOKEN",
          icon: fa.faBitcoinSign,
        },
        Coinscope: {
          name: "Coinscope",
          tag: "Coinscope",
          icon: fa.faBitcoinSign,
        },
      },
    },
    {
      id: 24,
      name: "Social Signals",
      image: "/assets/icons/socialsignals.webp",
      subCategories: {
        all: {
          name: t("type.all"),
          tag: "All",
          icon: fa.faSignal,
        },
      },
    },
    {
      id: 11,
      name: "Google",
      image: "/assets/icons/google.webp",
      subCategories: {
        mapsReviews: {
          name: t("type.maps-reviews"),
          tag: "Maps Reviews",
          icon: fa.faLocationDot,
        },
        // mapsCitations: {
        //   name: t("type.maps-citations"),
        //   tag: "Maps Citations",
        //   icon: fa.faMapLocationDot,
        // },
        businessReviews: {
          name: t("type.business-reviews"),
          tag: "Business Reviews",
          icon: fa.faBriefcase,
        },
        // visitors: {
        //   name: t("type.visitors"),
        //   tag: "Visitors",
        //   icon: fa.faUsers,
        // },
      },
    },
    {
      id: 13,
      name: "Website Traffic",
      image: "/assets/icons/safari.webp",
      subCategories: {
        traffic: {
          name: t("type.traffic"),
          tag: "Traffic",
          icon: fa.faGlobe,
        },
        trafficReferrer: {
          name: t("type.trafficReferrer"),
          tag: "Referrer Traffic",
          icon: fa.faGlobe,
        },
        trafficIPhone: {
          name: t("type.trafficIPhone"),
          tag: "IPhone Traffic",
          icon: fa.faGlobe,
        },
        trafficSEO: {
          name: t("type.trafficSEO"),
          tag: "SEO Friendly",
          icon: fa.faGlobe,
        },
        trafficUK: {
          name: t("type.trafficUK"),
          tag: "UK Traffic",
          icon: fa.faGlobe,
        },
        trafficUSA: {
          name: t("type.trafficUSA"),
          tag: "USA Traffic",
          icon: fa.faGlobe,
        },
        trafficSK: {
          name: t("type.trafficSK"),
          tag: "South Korea Traffic",
          icon: fa.faGlobe,
        },
        trafficIndia: {
          name: t("type.trafficIndia"),
          tag: "India Traffic",
          icon: fa.faGlobe,
        },
        trafficBrazil: {
          name: t("type.trafficBrazil"),
          tag: "Brazil Traffic",
          icon: fa.faGlobe,
        },
        trafficGermany: {
          name: t("type.trafficGermany"),
          tag: "Germany Traffic",
          icon: fa.faGlobe,
        },
        trafficFrance: {
          name: t("type.trafficFrance"),
          tag: "France Traffic",
          icon: fa.faGlobe,
        },
        trafficRussia: {
          name: t("type.trafficRussia"),
          tag: "Russia Traffic",
          icon: fa.faGlobe,
        },
        trafficUkraine: {
          name: t("type.trafficUkraine"),
          tag: "Ukraine Traffic",
          icon: fa.faGlobe,
        },
        trafficItaly: {
          name: t("type.trafficItaly"),
          tag: "Italy Traffic",
          icon: fa.faGlobe,
        },
        trafficNetherlands: {
          name: t("type.trafficNetherlands"),
          tag: "Netherlands Traffic",
          icon: fa.faGlobe,
        },
        trafficSpain: {
          name: t("type.trafficSpain"),
          tag: "Spain Traffic",
          icon: fa.faGlobe,
        },
        trafficTurkey: {
          name: t("type.trafficTurkey"),
          tag: "Turkey Traffic",
          icon: fa.faGlobe,
        },
        trafficChina: {
          name: t("type.trafficChina"),
          tag: "China Traffic",
          icon: fa.faGlobe,
        },
        trafficSingapore: {
          name: t("type.trafficSingapore"),
          tag: "Singapore Traffic",
          icon: fa.faGlobe,
        },
      },
    },
    // {
    //   id: 999,
    //   name: "Private Test",
    //   image: "/assets/icons/socialsignals.webp",
    //   subCategories: {
    //     all: {
    //       name: t("type.all"),
    //       tag: "All",
    //       icon: fa.faSignal,
    //     },
    //   },
    // },
  ];

  // Navbar

  const solutions = [
    {
      name: "Instagram",
      href: "/instagram",
      icon: "/assets/icons/instagram.webp",
    },
    {
      name: "TikTok",
      href: "/tiktok",
      icon: "/assets/icons/tiktok.webp",
    },
    {
      name: "YouTube",
      href: "/youtube",
      icon: "/assets/icons/youtube.webp",
    },
    {
      name: "Twitter",
      href: "/twitter",
      icon: "/assets/icons/twitter.webp",
    },
    {
      name: "Facebook",
      href: "/facebook",
      icon: "/assets/icons/facebook.webp",
    },
    {
      name: "Telegram",
      href: "/telegram",
      icon: "/assets/icons/telegram.webp",
    },
    {
      name: "Discord",
      href: "/discord",
      icon: "/assets/icons/discord.webp",
    },
    {
      name: "Pinterest",
      href: "/pinterest",
      icon: "/assets/icons/pinterest.webp",
    },
    {
      name: "Spotify",
      href: "/spotify",
      icon: "/assets/icons/spotify.webp",
    },
    {
      name: "SoundCloud",
      href: "/soundcloud",
      icon: "/assets/icons/soundcloud.webp",
    },
    {
      name: "Twitch",
      href: "/twitch",
      icon: "/assets/icons/twitch.webp",
    },
    {
      name: "Web Traffic",
      href: "/website-traffic",
      icon: "/assets/icons/safari.webp",
    },
  ];

  const callsToAction = [{ name: t("navbar.All Services"), href: "/signin", icon: PlayIcon }];

  const resources = [
    {
      name: t("navbar.Contact Us"),
      description: t("navbar.For all questions related"),
      href: "/contact-us",
      icon: LifebuoyIcon,
    },
    {
      name: t("navbar.Announcements"),
      description: t("navbar.Stay updated on new features and updates to our SMM platform"),
      href: "/announcements",
      icon: BookmarkSquareIcon,
    },
    {
      name: t("navbar.Franchise"),
      description: t("navbar.What are the benefits"),
      href: "/franchise",
      icon: CalendarIcon,
    },
    {
      name: t("navbar.Blog"),
      description: t("navbar.Discover interesting articles"),
      href: "/blog",
      icon: ShieldCheckIcon,
    },
  ];

  const recentPosts = [
    { id: 1, name: "Boost your conversion rate", href: "#" },
    {
      id: 2,
      name: "How to use search engine optimization to drive traffic to your site",
      href: "#",
    },
    { id: 3, name: "Improve your customer experience", href: "#" },
  ];

  const navLinks = [
    {
      name: t("navbar.Services"),
    },
    {
      name: t("navbar.Affiliates"),
    },
    {
      name: t("navbar.Discounts"),
    },
    {
      name: t("navbar.More"),
    },
    {
      name: t("navbar.Recent Posts"),
    },
  ];

  // Footer

  // Admin Sidebar

  const adminSidebarNavigation = [
    {
      name: "Главная",
      href: "/admin/dashboard",
      icon: HomeIcon,
      current: pathname === "/admin/dashboard",
    },
    {
      name: "Пользователи",
      href: "/admin/users",
      icon: UsersIcon,
      current: pathname === "/admin/users",
    },
    {
      name: "Заказы",
      href: "/admin/orders",
      icon: ArchiveBoxIcon,
      current: pathname === "/admin/orders",
    },
    {
      name: "Платежи",
      href: "/admin/payments",
      icon: CircleStackIcon,
      current: pathname === "/admin/payments",
    },
    // {
    //   name: "Услуги",
    //   href: "/admin/services",
    //   icon: ListBulletIcon,
    //   current: pathname === "/admin/services",
    // },
    // {
    //   name: "Выводы",
    //   href: "/admin/payouts",
    //   icon: BanknotesIcon,
    //   current: pathname === "/admin/payouts",
    // },
    {
      name: "Добавить отзыв",
      href: "/admin/add-review",
      icon: PencilSquareIcon,
      current: pathname === "/admin/add-review",
    },
  ];

  // Sidebar

  const sidebarNavigation = [
    {
      name: t("sidebar.New Order"),
      href: "/#new-order",
      icon: ShoppingCartIcon,
      current: pathname === "/#new-order",
    },
    {
      name: t("sidebar.My Orders"),
      href: "/dashboard/orders/all",
      icon: ArchiveBoxIcon,
      current: pathname === "/dashboard/orders/all",
    },
    // {
    //   name: t("sidebar.Services"),
    //   href: "/dashboard/services",
    //   icon: ListBulletIcon,
    //   current: pathname === "/dashboard/services",
    // },
    {
      name: t("sidebar.Add Funds"),
      href: "/dashboard/addfunds",
      icon: BanknotesIcon,
      current: pathname === "/dashboard/addfunds",
    },
    {
      name: t("sidebar.Support"),
      href: "/contact-us",
      icon: LifebuoyIcon,
      current: false,
    },
    {
      name: t("sidebar.Affiliates"),
      href: "/dashboard/affiliates",
      icon: PresentationChartLineIcon,
      current: pathname === "/dashboard/affiliates",
    },
    // {
    //   name: t("sidebar.Franchise"),
    //   href: "#",
    //   icon: CalendarIcon,
    //   current: false,
    //   disabled: true,
    // },
    // {
    //   name: t("sidebar.API"),
    //   href: "/dashboard/api",
    //   icon: Cog6ToothIcon,
    //   current: pathname === "/dashboard/api",
    // },
    // {
    //   name: t("sidebar.Announcements"),
    //   href: "/announcements",
    //   icon: BookmarkSquareIcon,
    //   current: false,
    // },
  ];

  const sidebarText = [
    {
      name: t("sidebar.Settings"),
    },
    {
      name: t("sidebar.Change currency"),
    },
    {
      name: t("sidebar.Dark Mode"),
    },
    {
      name: t("sidebar.Sign Out"),
    },
    {
      name: t("sidebar.Change language"),
    },
  ];

  // Currencies and Languages
  const currencies = {
    USD: { name: "USD", symbol: "$" },
    EUR: { name: "EUR", symbol: "€" },
    CAD: { name: "CAD", symbol: "$" },
    GBP: { name: "GBP", symbol: "£" },
    RUB: { name: "RUB", symbol: "₽" },
    AUD: { name: "AUD", symbol: "$" },
  };

  const languages = {
    en: { name: "English", flag: AnimatedStickerFlagUsa, code: "en" },
    es: { name: "Español", flag: AnimatedStickerFlagSpain, code: "es" },
    de: { name: "Deutsch", flag: AnimatedStickerFlagGermany, code: "de" },
    fr: { name: "Français", flag: AnimatedStickerFlagFrance, code: "fr" },
    ru: { name: "Русский", flag: AnimatedStickerFlagRussia, code: "ru" },
    hi: { name: "हिन्दी", flag: AnimatedStickerFlagIndia, code: "hi" },
    zh: { name: "華语", flag: AnimatedStickerFlagChina, code: "zh" },
    jp: { name: "日本語", flag: AnimatedStickerFlagJapan, code: "jp" },
    kr: { name: "한국어", flag: AnimatedStickerFlagKorea, code: "kr" },
    // uk: { name: "Українська мова", flag: AnimatedStickerFlagUkraine, code: "uk" },
  };

  const addFundsPaymentGateways = [
    // {
    //   id: 1,
    //   title: "Cardlink",
    //   apiName: "Cardlink",
    //   titleIcon: faCreditCard,
    //   icons: {
    //     visa,
    //     mastercard,
    //     mir,
    //     sbp
    //   },
    //   disabled: false,
    // },
    // {
    //   id: 2,
    //   title: "Freekassa",
    //   apiName: "Freekassa",
    //   icons: {
    //     visa,
    //     mastercard,
    //     mir,
    //     sbp,
    //     tinkoff,
    //     sber,
    //     alfa,
    //     vtb,
    //     yoomoney,
    //   },
    //   disabled: false,
    // },
    {
      id: 3,
      title: "Cryptomus",
      apiName: "Cryptomus",
      icons: { usdt, usdc, busd, trx, ton, matic, xmr, dash },
      disabled: false,
    },
    {
      id: 4,
      title: "Coinbase",
      apiName: "Coinbase",
      icons: { btc, eth, usdc, doge, usdt, ltc, dai, bch, matic },
      disabled: false,
    },
    {
      id: 5,
      title: "PAYEER",
      apiName: "Payeer",
      icons: { payeer, perfectmoney, qiwi, advcash, xrp },
      disabled: false,
    },
  ];

  const paymentGatewaysList = [
    // {
    //   id: 1,
    //   title: t("paymentGateways.Credit card"),
    //   apiName: "Cardlink",
    //   titleIcon: faCreditCard,
    //   disabled: false,
    // },
    // {
    //   id: 2,
    //   title: t("paymentGateways.Credit card v2"),
    //   apiName: "Freekassa",
    //   titleIcon: faCreditCard,
    //   disabled: false,
    // },
    {
      id: 3,
      title: t("paymentGateways.Cryptocurrency"),
      apiName: "Cryptomus",
      titleIcon: faBitcoinSign,
      disabled: false,
    },
    {
      id: 4,
      title: t("paymentGateways.Cryptocurrency v2"),
      apiName: "Coinbase",
      titleIcon: faBitcoinSign,
      disabled: false,
    },
  ];

  const payoutMethods = [
    {
      title: "QIWI",
      icon: qiwi,
    },
    {
      title: "Payeer",
      icon: payeer,
    },
    {
      title: "Perfect Money",
      icon: perfectmoney,
    },
    {
      title: "WebMoney (WMZ)",
      icon: webmoney,
    },
    {
      title: "SMMSTATS.COM",
      icon: smmstats,
    },
  ];

  const packageOptionsList = [
    {
      id: 1,
      title: t("packageOptions.Standard"),
      rate: 1,
      description: [
        { icon: ShieldCheckIcon, bold: t("packageOptions.365 Days"), string: t("packageOptions.Money Back Guarantee") },
        { icon: UsersIcon, bold: t("packageOptions.Real & Active"), string: t("packageOptions.Engagement") },
        { icon: LockClosedIcon, bold: t("packageOptions.No password"), string: t("packageOptions.required") },
      ],
    },
    {
      id: 2,
      title: t("packageOptions.Premium"),
      rate: 1.7,
      description: [
        { icon: ShieldCheckIcon, bold: t("packageOptions.365 Days"), string: t("packageOptions.Money Back Guarantee") },
        { icon: UsersIcon, bold: t("packageOptions.Real & Active"), string: t("packageOptions.Engagement") },
        { icon: LockClosedIcon, bold: t("packageOptions.No password"), string: t("packageOptions.required") },
        { icon: BoltIcon, bold: t("packageOptions.Fast"), string: t("packageOptions.Delivery") },
        { icon: PhoneIcon, bold: t("packageOptions.Priority"), string: t("packageOptions.Support") },
      ],
      best: true,
    },
    {
      id: 3,
      title: t("packageOptions.VIP"),
      rate: 1.9,
      description: [
        { icon: ShieldCheckIcon, bold: t("packageOptions.365 Days"), string: t("packageOptions.Money Back Guarantee") },
        { icon: UsersIcon, bold: t("packageOptions.Real & Active"), string: t("packageOptions.Engagement") },
        { icon: LockClosedIcon, bold: t("packageOptions.No password"), string: t("packageOptions.required") },
        { icon: BoltIcon, bold: t("packageOptions.Fast"), string: t("packageOptions.Delivery") },
        { icon: PhoneIcon, bold: t("packageOptions.Priority"), string: t("packageOptions.Support") },
        { icon: GiftIcon, bold: t("packageOptions.SECRET GIFT") + "!" },
      ],
    },
  ];

  return {
    categories,
    solutions,
    callsToAction,
    resources,
    recentPosts,
    navLinks,
    adminSidebarNavigation,
    sidebarNavigation,
    sidebarText,
    currencies,
    languages,
    addFundsPaymentGateways,
    paymentGatewaysList,
    payoutMethods,
    packageOptionsList,
  };
};
