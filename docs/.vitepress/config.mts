import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GoManager",
  description: "Versatile and efficient library designed to simplify state management.",
  markdown: {
    container: {
      tipLabel: '💡TIP',
      warningLabel: '⚠WARNING',
      dangerLabel: '❗DANGER',
      infoLabel: '❔INFO',
      detailsLabel: 'DETAILS'
    }
  },
  base:'/repo',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Reference', link: '/reference/basic-gomanager' },
      { text: 'Learn', link: '/learn/quick-start' }
    ],
    sidebar: {
      '/learn/':[
      {

        items:[
          {text: 'Quick Start',link: '/learn/quick-start'},
          {text: 'Guides',items:[
            {text:'Your First Manager',link:'/learn/guides/your-first-manager'},
            {text:'Event Handling',link:'/learn/guides/event-handling'},
            {text:'Server-Client Sync',link:'/learn/guides/server-client-sync'},
          ]},
        ],
      },
    ],
    '/reference/':[
      {
        items:[
          {text:"GoManager",link:"/reference/basic-gomanager"},
        ]
      }
    ],
  },
  }
})
