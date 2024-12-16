type Translations = {
  [key: string]: {
    home: {
      hero: {
        title: string
        subtitle: string
        cta: string
      }
      features: {
        title: string
        items: Array<{
          title: string
          description: string
        }>
      }
    }
  }
}

export const translations: Translations = {
  'en-GB': {
    home: {
      hero: {
        title: 'Transform Your Learning Experience',
        subtitle: 'The intelligent student management platform that helps you achieve your academic goals',
        cta: 'Get Started',
      },
      features: {
        title: 'Features',
        items: [
          {
            title: 'Smart Organisation',
            description: 'Keep your coursework, assignments and revision organised with AI assistance',
          },
          {
            title: 'Personalised Learning',
            description: 'Get tailored study recommendations based on your learning style and goals',
          },
        ],
      },
    },
  },
  'en-US': {
    home: {
      hero: {
        title: 'Transform Your Learning Experience',
        subtitle: 'The smart student management platform that helps you reach your academic goals',
        cta: 'Get Started',
      },
      features: {
        title: 'Features',
        items: [
          {
            title: 'Smart Organization',
            description: 'Keep your coursework, assignments and study materials organized with AI assistance',
          },
          {
            title: 'Personalized Learning',
            description: 'Get customized study recommendations based on your learning style and goals',
          },
        ],
      },
    },
  },
  'en-NZ': {
    home: {
      hero: {
        title: 'Transform Your Learning Experience',
        subtitle: 'The clever student management platform that helps you achieve your academic goals',
        cta: 'Get Started',
      },
      features: {
        title: 'Features',
        items: [
          {
            title: 'Smart Organisation',
            description: 'Keep your coursework, assignments and revision organised with AI assistance',
          },
          {
            title: 'Personalised Learning',
            description: 'Get tailored study recommendations based on your learning style and goals',
          },
        ],
      },
    },
  },
  'en-AU': {
    home: {
      hero: {
        title: 'Transform Your Learning Experience',
        subtitle: 'The clever student management platform that helps you achieve your academic goals',
        cta: 'Get Started',
      },
      features: {
        title: 'Features',
        items: [
          {
            title: 'Smart Organisation',
            description: 'Keep your coursework, assignments and revision organised with AI assistance',
          },
          {
            title: 'Personalised Learning',
            description: 'Get tailored study recommendations based on your learning style and goals',
          },
        ],
      },
    },
  },
  'en-CA': {
    home: {
      hero: {
        title: 'Transform Your Learning Experience',
        subtitle: 'The smart student management platform that helps you achieve your academic goals',
        cta: 'Get Started',
      },
      features: {
        title: 'Features',
        items: [
          {
            title: 'Smart Organization',
            description: 'Keep your coursework, assignments and study materials organized with AI assistance',
          },
          {
            title: 'Personalized Learning',
            description: 'Get customized study recommendations based on your learning style and goals',
          },
        ],
      },
    },
  },
}
