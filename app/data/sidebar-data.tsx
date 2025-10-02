import React from 'react'

//who
import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats, MdOutlineEventNote } from 'react-icons/md'
import { FaWpforms, FaRegQuestionCircle } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { MdAdminPanelSettings } from 'react-icons/md'
//what
import { TbHome } from 'react-icons/tb'
import {
  FaHands,
  FaHandsHoldingCircle,
  FaHandshakeSimple,
} from 'react-icons/fa6'
import { PiHandbagBold } from 'react-icons/pi'
//we

import { RiNewspaperLine } from 'react-icons/ri'
import { IoIosHelpCircleOutline } from 'react-icons/io'
import { GoCodeOfConduct } from 'react-icons/go'
import { LiaCookieBiteSolid } from 'react-icons/lia'

//parts
import { SiSemanticweb } from 'react-icons/si'
import { VscReferences } from 'react-icons/vsc'
import { PiHandEye } from 'react-icons/pi'
import { FaHandPointer } from 'react-icons/fa'

//courses
import { GiMaterialsScience, GiFamilyTree } from 'react-icons/gi'
import { GiHumanPyramid, GiMisdirection, GiEvilMinion } from 'react-icons/gi'

// import { nanoid } from 'nanoid'

import { LuBoxes, LuBox, LuPersonStanding, LuReplaceAll } from 'react-icons/lu'
import { FaSitemap } from 'react-icons/fa'
import { ImShocked } from 'react-icons/im'
import { TfiHandStop } from 'react-icons/tfi'
import { TbReportAnalytics, TbMoneybag } from 'react-icons/tb'
import { SiCodeproject, SiTestinglibrary } from 'react-icons/si'
import { CiBag1 } from 'react-icons/ci'
import { MdSwitchAccessShortcut, MdOutlinePermMedia } from 'react-icons/md'
export const links = [
  {
    title: 'Add Achievement',
    text: 'add Achievement',
    url: 'add-achievement',
    icon: FaWpforms,
  },
  {
    title: 'All Achievements',
    text: 'all Achievements',
    url: 'all-achievements',
    icon: MdQueryStats,
  },
  { title: 'Stats', text: 'stats', url: 'stats', icon: IoBarChartSharp },
  { title: 'Profile', text: 'profile', url: 'profile', icon: ImProfile },
  {
    title: 'Analytics',
    text: 'analytics',
    url: 'course-analytics',
    icon: TbReportAnalytics,
  },
  {
    title: 'Admin',
    text: 'admin',
    url: 'admin',
    icon: MdAdminPanelSettings,
  },
]
import { RiGalleryLine } from 'react-icons/ri'
import { BiPhotoAlbum } from 'react-icons/bi'
import { LiaMapMarkedAltSolid } from 'react-icons/lia'
export const imageLinks = [
  {
    // id: nanoid()
    path: 'gallery',
    text: 'gallery',
    icon: RiGalleryLine,
  },
  {
    // id: nanoid()
    path: 'albums',
    text: 'albums',
    icon: BiPhotoAlbum,
  },
  {
    // id: nanoid(),
    path: 'marked',
    text: 'marked',
    icon: LiaMapMarkedAltSolid,
  },
]
import { LuPanelTop } from 'react-icons/lu'
import { TbHexagonalPrismPlus } from 'react-icons/tb'
import { FaTags } from 'react-icons/fa'
export const courseConfigLinks = [
  {
    // id: nanoid(),
    path: 'course-headers',
    text: 'course headers',
    icon: LuPanelTop,
  },
  {
    // id: nanoid(),
    path: 'all-examples',
    text: 'examples',
    icon: TbHexagonalPrismPlus,
  },
  {
    // id: nanoid(),
    path: 'tags',
    text: 'tags',
    icon: FaTags,
  },
]

export const whatlinks = [
  {
    // id: nanoid()
    path: '.',
    text: 'home',
    icon: TbHome,
  },
  {
    // id: nanoid()
    path: 'all-signs',
    text: 'signs',
    icon: FaHands,
  },
  {
    // id: nanoid()
    path: 'cart',
    text: 'cart',
    icon: PiHandbagBold,
  },
  {
    //   id: nanoid()
    path: 'checkout',
    text: 'checkout',
    icon: FaHandsHoldingCircle,
  },
  {
    // id: nanoid()
    path: 'orders',
    text: 'orders',
    icon: FaHandshakeSimple,
  },
]

export const footerLinks = [
  {
    // id: nanoid()
    path: 'about',
    text: 'about',
    icon: FaRegQuestionCircle,
  },
  {
    // id: nanoid(),
    path: 'events',
    text: 'events',
    icon: MdOutlineEventNote,
  },
  {
    // id: nanoid()
    path: 'news',
    text: 'news',
    icon: RiNewspaperLine,
  },
  {
    // id: nanoid(),
    path: 'help',
    text: 'help',
    icon: IoIosHelpCircleOutline,
  },
  {
    // id: nanoid(),
    path: 'terms-and-conditions',
    text: 'terms and conditions',
    icon: GoCodeOfConduct,
  },
  {
    // id: nanoid(),
    path: 'cookie-setting',
    text: 'cookie setting',
    icon: LiaCookieBiteSolid,
  },
]

export const partLinks = [
  {
    // id: nanoid(),
    path: 'references',
    text: 'references',
    icon: VscReferences,
  },
  {
    // id: nanoid(),
    path: 'word',
    text: 'word',
    icon: SiSemanticweb,
  },
  {
    // id: nanoid(),
    path: 'orientation',
    text: 'orientation',
    icon: FaHandPointer,
  },
  {
    // id: nanoid(),
    path: 'hand-status',
    text: 'hand status',
    icon: PiHandEye,
  },
  {
    // id: nanoid(),
    path: 'prefix',
    text: 'prefix',
    icon: GoCodeOfConduct,
  },
  {
    // id: nanoid(),
    path: 'bag-combined-parts',
    text: 'bag of parts',
    icon: CiBag1,
  },
]

export const staticContentPartLinks = [
  {
    // static_id: nanoid(),
    static_path: 'edit-media',
    static_text: 'media',
    static_icon: MdOutlinePermMedia,
  },
]

export const curriculumLinks = [
  {
    // id: nanoid(),
    // fragmentId: nanoid(),
    path: 'no',
    text: 'no',
    icon: GiMaterialsScience,
    activeIcon: LuBoxes,
  },
  {
    // id: nanoid(),
    // fragmentId: nanoid(),
    path: 'so',
    text: 'so',
    icon: GiHumanPyramid,
    activeIcon: LuPersonStanding,
  },
  {
    // id: nanoid(),
    // fragmentId: nanoid(),
    path: 'story',
    text: 'story',
    icon: GiHumanPyramid,
    activeIcon: LuPersonStanding,
  },
]

export const noLinks = [
  {
    // id: nanoid()
    path: 'crud',
    text: 'crud',
    icon: LuBox,
  },
  {
    // id: nanoid()
    path: 'domain',
    text: 'domain',
    icon: FaSitemap,
  },
  {
    // id: nanoid()
    path: 'tuple',
    text: 'tuple',
    icon: GiMisdirection,
  },
  {
    // id: nanoid()
    path: 'place',
    text: 'place',
    icon: LuReplaceAll,
  },
  {
    // id: nanoid()
    path: 'item',
    text: 'item',
    icon: GiFamilyTree,
  },
]

export const soLinks = [
  {
    // id: nanoid()
    path: 'shock',
    text: 'shock',
    icon: ImShocked,
  },
  {
    // id: nanoid()
    path: 'denial',
    text: 'denial',
    icon: TfiHandStop,
  },

  {
    // id: nanoid()
    path: 'anger',
    text: 'anger',
    icon: GiEvilMinion,
  },

  {
    // id: nanoid()
    path: 'bargain',
    text: 'bargain',
    icon: TbMoneybag,
  },

  {
    // id: nanoid(),
    path: 'depression',
    text: 'depression',
    icon: SiCodeproject,
  },

  {
    // id: nanoid(),
    path: 'testing',
    text: 'testing',
    icon: SiTestinglibrary,
  },
  {
    // id: nanoid(),
    path: 'acceptance',
    text: 'acceptance',
    icon: MdSwitchAccessShortcut,
  },
]

import { PiShootingStarFill } from 'react-icons/pi'
import { GiFallingStar, GiJusticeStar, GiStarFlag } from 'react-icons/gi'
export const storyLinks = [
  {
    // id: nanoid(),
    path: 'exposition',
    text: 'exposition',
    icon: GiStarFlag,
  },
  {
    // id: nanoid(),
    path: 'rising',
    text: 'rising',
    icon: PiShootingStarFill,
  },
  {
    // id: nanoid()
    path: 'climax',
    text: 'climax',
    icon: GiJusticeStar,
  },
  {
    // id: nanoid()
    path: 'falling',
    text: 'falling',
    icon: GiFallingStar,
  },
  {
    // id: nanoid(),
    path: 'denouement',
    text: 'denouement',
    icon: GiStarFlag,
  },
]

import {
  FaItalic,
  FaBold,
  FaListUl,
  FaAngleDown,
  FaPlus,
} from 'react-icons/fa6'
import { IoIosMore } from 'react-icons/io'
import { IoText } from 'react-icons/io5'
import { AiOutlineFontColors } from 'react-icons/ai'

export const textAreaCtrl = [
  {
    text: 'text styles',
    icon: (
      <div className='flex'>
        {/* <IoText />
        <FaAngleDown /> */}
      </div>
    ),
  },
  {
    text: 'Bold',
    icon: FaBold,
  },

  {
    text: 'Italic',
    icon: FaItalic,
  },
  {
    text: 'More Formatting',
    icon: IoIosMore,
  },
  {
    text: 'Text color',
    icon: (
      <div className='flex'>
        {/* <AiOutlineFontColors />
        <FaAngleDown /> */}
      </div>
    ),
  },
  {
    text: 'List',
    icon: (
      <div className='flex'>
        {/* <FaListUl />
        <FaAngleDown /> */}
      </div>
    ),
  },
  {
    text: 'Insert',
    icon: FaPlus,
  },
]

import type { SidebarData } from '../components/layout/types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Mizoguchi Coji',
    email: 'coji@techtalk.jp',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: FaPlus,
      plan: 'React Router + ShadcnUI',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: FaPlus,
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: FaPlus,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
          ],
        },
        {
          title: 'Errors',
          icon: FaPlus,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: FaPlus,
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: FaPlus,
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: FaPlus,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: FaPlus,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: FaPlus,
        },
      ],
    },
  ],
}
