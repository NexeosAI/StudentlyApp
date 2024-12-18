import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'
import DashboardPage from './pages/dashboard'
import { ProtectedRoute } from './components/auth/protected-route'
import { MarketingLayout } from './layouts/marketing-layout'
import { AppLayout } from './layouts/app-layout'
import HomePage from './pages/home'
import PricingPage from './pages/pricing'
import FeaturesPage from './pages/features'
import AboutPage from './pages/about'
import BlogPage from './pages/blog'
import ResourcesPage from './pages/resources'
import ContactPage from './pages/contact'
import NotFoundPage from './pages/not-found'

// Import chat & writing pages
import ChatAssistantPage from './pages/chat/assistant'
import WritingCoachPage from './pages/chat/writing-coach'
import GrammarCheckerPage from './pages/chat/grammar'
import TranslationHelperPage from './pages/chat/translation'

// Import study tool pages
import FlashcardGeneratorPage from './pages/study/flashcards'
import QuizCreatorPage from './pages/study/quiz'
import MindMapCreatorPage from './pages/study/mindmap'
import PracticeProblemPage from './pages/study/practice'
import StudyPlannerPage from './pages/study/planner'
import ProgressTrackerPage from './pages/study/progress'

// Import research tool pages
import ResearchHelperPage from './pages/research/helper'
import PaperAnalyzerPage from './pages/research/analyzer'
import CitationManagerPage from './pages/research/citations'
import SourceEvaluatorPage from './pages/research/sources'

// Import content creation pages
import EssayWriterPage from './pages/content/essay'
import ReportGeneratorPage from './pages/content/report'
import ResearchProposalPage from './pages/content/proposal'
import AbstractGeneratorPage from './pages/content/abstract'

import { adminRoutes } from './routes/admin-routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <MarketingLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'features', element: <FeaturesPage /> },
          { path: 'pricing', element: <PricingPage /> },
          { path: 'about', element: <AboutPage /> },
          { path: 'blog', element: <BlogPage /> },
          { path: 'resources', element: <ResourcesPage /> },
          { path: 'contact', element: <ContactPage /> },
          { path: 'auth/login', element: <LoginPage /> },
          { path: 'auth/register', element: <RegisterPage /> },
        ],
      },
      {
        path: 'dashboard',
        element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
        children: [
          { index: true, element: <DashboardPage /> },
          {
            path: 'chat',
            children: [
              { path: 'assistant', element: <ChatAssistantPage /> },
              { path: 'writing-coach', element: <WritingCoachPage /> },
              { path: 'grammar', element: <GrammarCheckerPage /> },
              { path: 'translation', element: <TranslationHelperPage /> },
            ],
          },
          {
            path: 'study',
            children: [
              { path: 'flashcards', element: <FlashcardGeneratorPage /> },
              { path: 'quiz', element: <QuizCreatorPage /> },
              { path: 'mindmap', element: <MindMapCreatorPage /> },
              { path: 'practice', element: <PracticeProblemPage /> },
              { path: 'planner', element: <StudyPlannerPage /> },
              { path: 'progress', element: <ProgressTrackerPage /> },
            ],
          },
          {
            path: 'research',
            children: [
              { path: 'helper', element: <ResearchHelperPage /> },
              { path: 'analyzer', element: <PaperAnalyzerPage /> },
              { path: 'citations', element: <CitationManagerPage /> },
              { path: 'sources', element: <SourceEvaluatorPage /> },
            ],
          },
          {
            path: 'content',
            children: [
              { path: 'essay', element: <EssayWriterPage /> },
              { path: 'report', element: <ReportGeneratorPage /> },
              { path: 'proposal', element: <ResearchProposalPage /> },
              { path: 'abstract', element: <AbstractGeneratorPage /> },
            ],
          },
        ],
      },
      ...adminRoutes,
    ],
  },
])

export default router
