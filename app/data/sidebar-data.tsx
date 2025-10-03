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
    title: 'course-headers',
    url: 'course-headers',
    icon: LuPanelTop,
  },
  {
    // id: nanoid(),
    title: 'all-examples',
    url: 'examples',
    icon: TbHexagonalPrismPlus,
  },
  {
    // id: nanoid(),
    title: 'tags',
    url: 'tags',
    icon: FaTags,
  },
]

export const whatlinks = [
  {
    // id: nanoid()
    title: 'home',
    url: 'home',
    icon: TbHome,
  },
  {
    // id: nanoid()
    title: 'all-signs',
    url: 'signs',
    icon: FaHands,
  },
  {
    // id: nanoid()
    title: 'cart',
    url: 'cart',
    icon: PiHandbagBold,
  },
  {
    //   id: nanoid()
    title: 'checkout',
    url: 'checkout',
    icon: FaHandsHoldingCircle,
  },
  {
    // id: nanoid()
    title: 'orders',
    url: 'orders',
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
    title: 'no',
    url: 'no',
    icon: GiMaterialsScience,
    activeIcon: LuBoxes,
  },
  {
    // id: nanoid(),
    // fragmentId: nanoid(),
    title: 'so',
    url: 'so',
    icon: GiHumanPyramid,
    activeIcon: LuPersonStanding,
  },
  {
    // id: nanoid(),
    // fragmentId: nanoid(),
    title: 'story',
    url: 'story',
    icon: GiHumanPyramid,
    activeIcon: LuPersonStanding,
  },
]

export const noLinks = [
  {
    // id: nanoid()
    title: 'crud',
    url: 'courses/crud',
    icon: LuBox,
  },
  {
    // id: nanoid()
    title: 'domain',
    url: 'courses/domain',
    icon: FaSitemap,
  },
  {
    // id: nanoid()
    title: 'tuple',
    url: 'courses/tuple',
    icon: GiMisdirection,
  },
  {
    // id: nanoid()
    title: 'place',
    url: 'courses/place',
    icon: LuReplaceAll,
  },
  {
    // id: nanoid()
    title: 'item',
    url: 'courses/item',
    icon: GiFamilyTree,
  },
]

export const soLinks = [
  {
    // id: nanoid()
    title: 'shock',
    url: 'courses/shock',
    icon: ImShocked,
  },
  {
    // id: nanoid()
    title: 'denial',
    url: 'courses/denial',
    icon: TfiHandStop,
  },

  {
    // id: nanoid()
    title: 'anger',
    url: 'courses/anger',
    icon: GiEvilMinion,
  },

  {
    // id: nanoid()
    title: 'bargain',
    url: 'courses/bargain',
    icon: TbMoneybag,
  },

  {
    // id: nanoid(),
    title: 'depression',
    url: 'courses/depression',
    icon: SiCodeproject,
  },

  {
    // id: nanoid(),
    title: 'testing',
    url: 'courses/testing',
    icon: SiTestinglibrary,
  },
  {
    // id: nanoid(),
    title: 'acceptance',
    url: 'courses/acceptance',
    icon: MdSwitchAccessShortcut,
  },
]

import { PiShootingStarFill } from 'react-icons/pi'
import { GiFallingStar, GiJusticeStar, GiStarFlag } from 'react-icons/gi'
export const storyLinks = [
  {
    // id: nanoid(),
    title: 'exposition',
    url: 'exposition',
    icon: GiStarFlag,
  },
  {
    // id: nanoid(),
    title: 'rising',
    url: 'courses/rising',
    icon: PiShootingStarFill,
  },
  {
    // id: nanoid()
    title: 'climax',
    url: 'courses/climax',
    icon: GiJusticeStar,
  },
  {
    // id: nanoid()
    title: 'falling',
    url: 'courses/falling',
    icon: GiFallingStar,
  },
  {
    // id: nanoid(),
    title: 'denouement',
    url: 'courses/denouement',
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
import { title } from 'process'

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
      items: whatlinks,
    },
    {
      title: 'curriculum',
      items: [
        {
          title: 'No',
          icon: FaPlus,
          items: noLinks,
        },
        {
          title: 'So',
          icon: FaPlus,
          items: soLinks,
        },
        {
          title: 'Story',
          icon: FaPlus,
          items: storyLinks,
        },
      ],
    },
    {
      title: 'configure-parts',
      items: [
        {
          title: 'handparts-list',
          icon: FaPlus,
          items: [
            {
              title: 'settings',
              url: '/settings',
              icon: FaPlus,
            },
          ],
        },
        {
          title: 'controlls',
          items: courseConfigLinks,
          icon: FaPlus,
        },
      ],
    },
  ],
}
