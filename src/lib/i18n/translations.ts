export type Translations = {
  [key: string]: {
    common: {
      welcome: string
      signIn: string
      signUp: string
      emailAddress: string
      password: string
      forgotPassword: string
      or: string
      loading: string
      error: string
      success: string
      navigation: {
        features: string
        about: string
        blog: string
        resources: string
        contact: string
        pricing: string
      }
    }
    home: {
      hero: {
        title: string
        subtitle: string
        cta: string
        announcement: string
        learnMore: string
        feature1: string
        feature2: string
        feature3: string
      }
    }
    features: {
      title: string
      subtitle: string
      feature1: {
        title: string
        description: string
      }
      feature2: {
        title: string
        description: string
      }
      feature3: {
        title: string
        description: string
      }
    }
    pricing: {
      title: string
      subtitle: string
      monthly: string
      annually: string
      basic: {
        name: string
        price: string
        description: string
        features: string[]
      }
      pro: {
        name: string
        price: string
        description: string
        features: string[]
      }
    }
    auth: {
      continueWithGoogle: string
      continueWithEmail: string
      noAccount: string
      alreadyHaveAccount: string
      createAccount: string
      signInToAccount: string
    }
    nav: {
      home: string
      dashboard: string
      settings: string
      profile: string
      signOut: string
    }
  }
}

export const translations: Translations = {
  'en-GB': {
    common: {
      welcome: 'Welcome',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      emailAddress: 'Email address',
      password: 'Password',
      forgotPassword: 'Forgot password?',
      or: 'or',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      navigation: {
        features: 'Features',
        about: 'About',
        blog: 'Blog',
        resources: 'Resources',
        contact: 'Contact',
        pricing: 'Pricing'
      }
    },
    home: {
      hero: {
        title: 'AI-Powered Study Assistant',
        subtitle: 'Your personal AI tutor for better learning outcomes',
        cta: 'Get Started',
        announcement: 'New: AI-powered study plans now available',
        learnMore: 'Learn more',
        feature1: 'Personalised learning paths',
        feature2: 'AI-powered insights',
        feature3: 'Track your progress'
      }
    },
    features: {
      title: 'Features',
      subtitle: 'Everything you need to succeed in your studies',
      feature1: {
        title: 'AI Study Plans',
        description: 'Personalised study plans adapted to your learning style and goals'
      },
      feature2: {
        title: 'Smart Analytics',
        description: 'Track your progress and get insights to improve your performance'
      },
      feature3: {
        title: 'Interactive Learning',
        description: 'Engage with AI-powered quizzes and exercises'
      }
    },
    pricing: {
      title: 'Simple, transparent pricing',
      subtitle: 'Choose the plan that works best for you',
      monthly: 'Monthly',
      annually: 'Annually',
      basic: {
        name: 'Basic',
        price: '£9.99',
        description: 'Perfect for individual students',
        features: [
          'Personalised study plans',
          'Basic analytics',
          'Limited AI interactions',
          'Email support'
        ]
      },
      pro: {
        name: 'Pro',
        price: '£19.99',
        description: 'For serious learners',
        features: [
          'Everything in Basic',
          'Advanced analytics',
          'Unlimited AI interactions',
          'Priority support',
          'Custom study materials'
        ]
      }
    },
    auth: {
      continueWithGoogle: 'Continue with Google',
      continueWithEmail: 'Continue with Email',
      noAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      createAccount: 'Create an account',
      signInToAccount: 'Sign in to your account',
    },
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      settings: 'Settings',
      profile: 'Profile',
      signOut: 'Sign Out',
    },
  },
  'fr-FR': {
    common: {
      welcome: 'Bienvenue',
      signIn: 'Se connecter',
      signUp: "S'inscrire",
      emailAddress: 'Adresse e-mail',
      password: 'Mot de passe',
      forgotPassword: 'Mot de passe oublié ?',
      or: 'ou',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      navigation: {
        features: 'Fonctionnalités',
        about: 'À propos',
        blog: 'Blog',
        resources: 'Ressources',
        contact: 'Contact',
        pricing: 'Tarifs'
      }
    },
    home: {
      hero: {
        title: "Assistant d'études alimenté par l'IA",
        subtitle: "Votre tuteur IA personnel pour de meilleurs résultats d'apprentissage",
        cta: 'Commencer',
        announcement: 'Nouveau : Plans d\'études alimentés par l\'IA maintenant disponibles',
        learnMore: 'En savoir plus',
        feature1: 'Parcours d\'apprentissage personnalisés',
        feature2: 'Analyses alimentées par l\'IA',
        feature3: 'Suivez vos progrès'
      }
    },
    features: {
      title: 'Fonctionnalités',
      subtitle: 'Tout ce dont vous avez besoin pour réussir vos études',
      feature1: {
        title: "Plans d'études IA",
        description: 'Plans d\'études personnalisés adaptés à votre style d\'apprentissage'
      },
      feature2: {
        title: 'Analyses intelligentes',
        description: 'Suivez vos progrès et obtenez des insights pour améliorer vos performances'
      },
      feature3: {
        title: 'Apprentissage interactif',
        description: 'Participez à des quiz et exercices alimentés par l\'IA'
      }
    },
    pricing: {
      title: 'Prix simples et transparents',
      subtitle: 'Choisissez le plan qui vous convient le mieux',
      monthly: 'Mensuel',
      annually: 'Annuel',
      basic: {
        name: 'Basique',
        price: '9,99 €',
        description: 'Parfait pour les étudiants individuels',
        features: [
          'Plans d\'études personnalisés',
          'Analyses de base',
          'Interactions IA limitées',
          'Support par email'
        ]
      },
      pro: {
        name: 'Pro',
        price: '19,99 €',
        description: 'Pour les apprenants sérieux',
        features: [
          'Tout du plan Basique',
          'Analyses avancées',
          'Interactions IA illimitées',
          'Support prioritaire',
          'Matériel d\'étude personnalisé'
        ]
      }
    },
    auth: {
      continueWithGoogle: 'Continuer avec Google',
      continueWithEmail: 'Continuer avec e-mail',
      noAccount: "Vous n'avez pas de compte ?",
      alreadyHaveAccount: 'Vous avez déjà un compte ?',
      createAccount: 'Créer un compte',
      signInToAccount: 'Connectez-vous à votre compte',
    },
    nav: {
      home: 'Accueil',
      dashboard: 'Tableau de bord',
      settings: 'Paramètres',
      profile: 'Profil',
      signOut: 'Déconnexion',
    },
  },
  'de-DE': {
    common: {
      welcome: 'Willkommen',
      signIn: 'Anmelden',
      signUp: 'Registrieren',
      emailAddress: 'E-Mail-Adresse',
      password: 'Passwort',
      forgotPassword: 'Passwort vergessen?',
      or: 'oder',
      loading: 'Laden...',
      error: 'Fehler',
      success: 'Erfolg',
      navigation: {
        features: 'Funktionen',
        about: 'Über uns',
        blog: 'Blog',
        resources: 'Ressourcen',
        contact: 'Kontakt',
        pricing: 'Preise'
      }
    },
    home: {
      hero: {
        title: 'KI-gestützter Studienassistent',
        subtitle: 'Ihr persönlicher KI-Tutor für bessere Lernergebnisse',
        cta: 'Jetzt starten',
        announcement: 'Neu: KI-gestützte Studienpläne jetzt verfügbar',
        learnMore: 'Mehr erfahren',
        feature1: 'Personalisierte Lernpfade',
        feature2: 'KI-gestützte Einblicke',
        feature3: 'Verfolgen Sie Ihren Fortschritt'
      }
    },
    features: {
      title: 'Funktionen',
      subtitle: 'Alles, was Sie für ein erfolgreiches Studium brauchen',
      feature1: {
        title: 'KI-Studienpläne',
        description: 'Personalisierte Studienpläne, angepasst an Ihren Lernstil'
      },
      feature2: {
        title: 'Intelligente Analysen',
        description: 'Verfolgen Sie Ihre Fortschritte und erhalten Sie Einblicke zur Verbesserung'
      },
      feature3: {
        title: 'Interaktives Lernen',
        description: 'KI-gestützte Quiz und Übungen'
      }
    },
    pricing: {
      title: 'Einfache, transparente Preise',
      subtitle: 'Wählen Sie den Plan, der am besten zu Ihnen passt',
      monthly: 'Monatlich',
      annually: 'Jährlich',
      basic: {
        name: 'Basic',
        price: '9,99 €',
        description: 'Perfekt für einzelne Studenten',
        features: [
          'Personalisierte Studienpläne',
          'Grundlegende Analysen',
          'Begrenzte KI-Interaktionen',
          'E-Mail-Support'
        ]
      },
      pro: {
        name: 'Pro',
        price: '19,99 €',
        description: 'Für engagierte Lerner',
        features: [
          'Alles aus Basic',
          'Erweiterte Analysen',
          'Unbegrenzte KI-Interaktionen',
          'Prioritäts-Support',
          'Maßgeschneiderte Studienmaterialien'
        ]
      }
    },
    auth: {
      continueWithGoogle: 'Mit Google fortfahren',
      continueWithEmail: 'Mit E-Mail fortfahren',
      noAccount: 'Noch kein Konto?',
      alreadyHaveAccount: 'Bereits ein Konto?',
      createAccount: 'Konto erstellen',
      signInToAccount: 'Bei Ihrem Konto anmelden',
    },
    nav: {
      home: 'Startseite',
      dashboard: 'Dashboard',
      settings: 'Einstellungen',
      profile: 'Profil',
      signOut: 'Abmelden',
    },
  },
  'es-ES': {
    common: {
      welcome: 'Bienvenido',
      signIn: 'Iniciar sesión',
      signUp: 'Registrarse',
      emailAddress: 'Correo electrónico',
      password: 'Contraseña',
      forgotPassword: '¿Olvidaste tu contraseña?',
      or: 'o',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      navigation: {
        features: 'Características',
        about: 'Acerca de',
        blog: 'Blog',
        resources: 'Recursos',
        contact: 'Contacto',
        pricing: 'Precios'
      }
    },
    home: {
      hero: {
        title: 'Asistente de estudio con IA',
        subtitle: 'Tu tutor de IA personal para mejores resultados de aprendizaje',
        cta: 'Comenzar',
        announcement: 'Nuevo: Planes de estudio con IA ya disponibles',
        learnMore: 'Saber más',
        feature1: 'Rutas de aprendizaje personalizadas',
        feature2: 'Análisis impulsados por IA',
        feature3: 'Sigue tu progreso'
      }
    },
    features: {
      title: 'Características',
      subtitle: 'Todo lo que necesitas para tener éxito en tus estudios',
      feature1: {
        title: 'Planes de estudio con IA',
        description: 'Planes de estudio personalizados adaptados a tu estilo de aprendizaje'
      },
      feature2: {
        title: 'Análisis inteligente',
        description: 'Sigue tu progreso y obtén información para mejorar tu rendimiento'
      },
      feature3: {
        title: 'Aprendizaje interactivo',
        description: 'Participa en cuestionarios y ejercicios impulsados por IA'
      }
    },
    pricing: {
      title: 'Precios simples y transparentes',
      subtitle: 'Elige el plan que mejor funcione para ti',
      monthly: 'Mensual',
      annually: 'Anual',
      basic: {
        name: 'Básico',
        price: '9,99 €',
        description: 'Perfecto para estudiantes individuales',
        features: [
          'Planes de estudio personalizados',
          'Análisis básico',
          'Interacciones limitadas con IA',
          'Soporte por correo'
        ]
      },
      pro: {
        name: 'Pro',
        price: '19,99 €',
        description: 'Para estudiantes serios',
        features: [
          'Todo en Básico',
          'Análisis avanzado',
          'Interacciones ilimitadas con IA',
          'Soporte prioritario',
          'Materiales de estudio personalizados'
        ]
      }
    },
    auth: {
      continueWithGoogle: 'Continuar con Google',
      continueWithEmail: 'Continuar con correo',
      noAccount: '¿No tienes cuenta?',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      createAccount: 'Crear una cuenta',
      signInToAccount: 'Inicia sesión en tu cuenta',
    },
    nav: {
      home: 'Inicio',
      dashboard: 'Panel',
      settings: 'Ajustes',
      profile: 'Perfil',
      signOut: 'Cerrar sesión',
    },
  }
}
