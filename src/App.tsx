import React, { useState, useEffect, useCallback } from 'react';
import { ViewMode, University, Course } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BookCounsellingModal } from './components/BookCounsellingModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AiAdvisorModal } from './components/AiAdvisorModal';
import { CourseDetailModal } from './components/CourseDetailModal';

import { HomeView } from './components/views/HomeView';
import { GlimpseSection } from './components/GlimpseSection';
import { DestinationsView } from './components/views/DestinationsView';
import { UniversitiesView } from './components/views/UniversitiesView';
import { UniversityDetailView } from './components/views/UniversityDetailView';
import { ProgramsView } from './components/views/ProgramsView';
import { PathwayProgramsView } from './components/views/PathwayProgramsView';
import { ScholarshipsView } from './components/views/ScholarshipsView';
import { ServicesView } from './components/views/ServicesView';
import { BlogsView } from './components/views/BlogsView';
import { EventsView } from './components/views/EventsView';
import { ContactView } from './components/views/ContactView';
import { LegalView } from './components/views/LegalView';

import {
  parseRouteHash,
  buildRouteHash,
  findUniversityById,
  findCourseById,
  getPageTitle
} from './lib/router';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Sync state from window.location.hash
  const handleHashChange = useCallback(() => {
    const route = parseRouteHash(window.location.hash);
    setCurrentView(route.view);

    if (route.isBookModal) {
      setIsBookModalOpen(true);
    } else if (route.isSearchModal) {
      setIsSearchModalOpen(true);
    } else if (route.isAiModal) {
      setIsAiModalOpen(true);
    }

    if (route.universityId) {
      const foundUni = findUniversityById(route.universityId);
      if (foundUni) setSelectedUniversity(foundUni);
    } else if (!window.location.hash.includes('id=')) {
      setSelectedUniversity(null);
    }

    if (route.courseId) {
      const foundCourse = findCourseById(route.courseId);
      if (foundCourse) setSelectedCourse(foundCourse);
    } else if (!window.location.hash.includes('id=')) {
      setSelectedCourse(null);
    }
  }, []);

  // On mount and window hashchange listener
  useEffect(() => {
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);

  // Sync window.location.hash when user navigates in UI
  const navigateTo = useCallback((view: ViewMode) => {
    setCurrentView(view);
    setSelectedUniversity(null);
    setSelectedCourse(null);
    const targetHash = buildRouteHash(view, null, null, false);
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectUniversity = useCallback((uni: University | null) => {
    setSelectedUniversity(uni);
    if (uni) {
      const targetHash = buildRouteHash('universities', uni, null, false);
      window.history.pushState(null, '', targetHash);
    } else {
      const targetHash = buildRouteHash(currentView, null, null, false);
      window.history.pushState(null, '', targetHash);
    }
  }, [currentView]);

  const handleSelectCourse = useCallback((course: Course | null) => {
    setSelectedCourse(course);
    if (course) {
      const targetHash = buildRouteHash('programs', null, course, false);
      window.history.pushState(null, '', targetHash);
    } else {
      const targetHash = buildRouteHash(currentView, null, null, false);
      window.history.pushState(null, '', targetHash);
    }
  }, [currentView]);

  const handleOpenBookModal = useCallback(() => {
    setIsBookModalOpen(true);
    const targetHash = buildRouteHash(currentView, selectedUniversity, selectedCourse, true);
    window.history.pushState(null, '', targetHash);
  }, [currentView, selectedUniversity, selectedCourse]);

  const handleCloseBookModal = useCallback(() => {
    setIsBookModalOpen(false);
    const targetHash = buildRouteHash(currentView, selectedUniversity, selectedCourse, false);
    window.history.pushState(null, '', targetHash);
  }, [currentView, selectedUniversity, selectedCourse]);

  // Update document.title on route or detail changes
  useEffect(() => {
    document.title = getPageTitle(currentView, selectedUniversity, selectedCourse);
  }, [currentView, selectedUniversity, selectedCourse]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#222222] font-sans flex flex-col selection:bg-[#8B1E2D] selection:text-white">
      
      {/* Sticky Header */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenBookModal={handleOpenBookModal}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {selectedUniversity ? (
          <UniversityDetailView
            university={selectedUniversity}
            onBack={() => handleSelectUniversity(null)}
            onOpenBookModal={handleOpenBookModal}
            onSelectCourse={handleSelectCourse}
            onNavigate={navigateTo}
          />
        ) : (
          <>
            {currentView === 'home' && (
              <HomeView
                onNavigate={navigateTo}
                onOpenBookModal={handleOpenBookModal}
                onSelectUniversity={handleSelectUniversity}
                onSelectCourse={handleSelectCourse}
              />
            )}

            {currentView === 'glimpse' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <GlimpseSection
                  onNavigate={navigateTo}
                  onOpenBookModal={handleOpenBookModal}
                />
              </div>
            )}

            {currentView === 'destinations' && (
              <DestinationsView
                onOpenBookModal={handleOpenBookModal}
                onSelectUniversity={handleSelectUniversity}
              />
            )}

            {currentView === 'universities' && (
              <UniversitiesView
                onSelectUniversity={handleSelectUniversity}
                onOpenBookModal={handleOpenBookModal}
              />
            )}

            {currentView === 'programs' && (
              <ProgramsView
                onSelectCourse={handleSelectCourse}
                onOpenBookModal={handleOpenBookModal}
              />
            )}

            {currentView === 'pathways' && (
              <PathwayProgramsView
                onOpenBookModal={handleOpenBookModal}
              />
            )}

            {currentView === 'scholarships' && (
              <ScholarshipsView
                onOpenBookModal={handleOpenBookModal}
              />
            )}

            {currentView === 'services' && (
              <ServicesView
                onOpenBookModal={handleOpenBookModal}
              />
            )}

            {currentView === 'blogs' && (
              <BlogsView />
            )}

            {currentView === 'events' && (
              <EventsView
                onOpenBookModal={handleOpenBookModal}
              />
            )}

            {currentView === 'contact' && (
              <ContactView />
            )}

            {(currentView === 'privacy' || currentView === 'terms' || currentView === 'disclaimer' || currentView === 'cookies') && (
              <LegalView
                activeTab={currentView}
                onNavigate={navigateTo}
                onOpenBookModal={handleOpenBookModal}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onNavigate={navigateTo} 
        onOpenBookModal={handleOpenBookModal}
      />

      {/* Floating Action Buttons */}
      <WhatsAppButton />

      {/* Modals */}
      <BookCounsellingModal
        isOpen={isBookModalOpen}
        onClose={handleCloseBookModal}
      />

      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectUniversity={(uni) => {
          setIsSearchModalOpen(false);
          handleSelectUniversity(uni);
        }}
        onSelectCourse={(course) => {
          setIsSearchModalOpen(false);
          handleSelectCourse(course);
        }}
        onNavigate={(view) => {
          setIsSearchModalOpen(false);
          navigateTo(view);
        }}
      />

      <AiAdvisorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onOpenBookModal={() => {
          setIsAiModalOpen(false);
          handleOpenBookModal();
        }}
      />

      <CourseDetailModal
        course={selectedCourse}
        onClose={() => handleSelectCourse(null)}
        onOpenBookModal={() => {
          handleSelectCourse(null);
          handleOpenBookModal();
        }}
      />

    </div>
  );
}
