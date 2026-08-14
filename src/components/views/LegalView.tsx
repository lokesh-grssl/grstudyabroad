import React from 'react';
import { ViewMode } from '../../types';
import { 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Cookie, 
  Lock, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  Printer,
  Share2,
  Mail,
  Phone,
  Building2,
  ExternalLink
} from 'lucide-react';

interface LegalViewProps {
  activeTab: 'privacy' | 'terms' | 'disclaimer' | 'cookies';
  onNavigate: (view: ViewMode) => void;
  onOpenBookModal: () => void;
}

export const LegalView: React.FC<LegalViewProps> = ({
  activeTab,
  onNavigate,
  onOpenBookModal,
}) => {
  const tabs = [
    { id: 'privacy' as const, label: 'Privacy Policy', icon: ShieldCheck, route: 'privacy' as ViewMode },
    { id: 'terms' as const, label: 'Terms & Conditions', icon: FileText, route: 'terms' as ViewMode },
    { id: 'disclaimer' as const, label: 'Disclaimer', icon: AlertTriangle, route: 'disclaimer' as ViewMode },
    { id: 'cookies' as const, label: 'Cookie Policy', icon: Cookie, route: 'cookies' as ViewMode },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Grassroots Study Abroad - ${activeTab.toUpperCase()}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="bg-[#8B1E2D]/10 text-[#8B1E2D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 shrink-0" /> Legal Governance & Compliance
          </span>
          <h1 className="font-heading font-extrabold text-2xl xs:text-3xl sm:text-4xl text-[#222222] leading-tight">
            {activeTab === 'privacy' && 'Privacy Policy & Student Data Protection'}
            {activeTab === 'terms' && 'Terms & Conditions for Overseas Counselling'}
            {activeTab === 'disclaimer' && 'Official Study Abroad Disclaimer & Disclosures'}
            {activeTab === 'cookies' && 'Cookie Policy & Web Analytics Transparency'}
          </h1>
          <p className="text-gray-600 text-xs sm:text-base">
            Grassroots Solutions & Services Pvt. Ltd. (Grassroots Study Abroad) is committed to transparency, compliance with global data privacy frameworks (GDPR, DPDP Act 2023), and upholding ethical study abroad advisory standards.
          </p>
          <div className="text-xs text-gray-500 pt-1 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <span><strong>Effective Date:</strong> Jan 1, 2026</span>
            <span>•</span>
            <span><strong>Last Revised:</strong> July 2026</span>
          </div>
        </div>

        {/* Navigation Tabs Bar & Quick Actions */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 shadow-sm">
          {/* Tabs */}
          <div className="flex overflow-x-auto no-scrollbar items-center gap-1.5 sm:gap-2 pb-1 sm:pb-0 -mx-1 px-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigate(tab.route)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap min-h-[40px] ${
                    isActive
                      ? 'bg-[#8B1E2D] text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 active:bg-slate-300 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 justify-end pt-1 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors min-h-[36px]"
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5 shrink-0" />
              <span>Print</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors min-h-[36px]"
              title="Share document link"
            >
              <Share2 className="w-3.5 h-3.5 shrink-0" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* MAIN LEGAL CONTENT CONTAINER */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-slate-200/80 shadow-sm space-y-8 sm:space-y-10 text-slate-700 leading-relaxed text-xs sm:text-sm">

          {/* ==================== PRIVACY POLICY ==================== */}
          {activeTab === 'privacy' && (
            <div className="space-y-8">
              
              <div className="bg-rose-50/80 border border-rose-200/60 p-5 rounded-2xl flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-[#8B1E2D] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-[#8B1E2D] text-base">Student Privacy Commitment</h3>
                  <p className="text-xs text-rose-950/80">
                    At Grassroots Study Abroad, we handle highly sensitive academic transcripts, passport data, and financial records for foreign university admissions and visa applications. We strictly adhere to India’s Digital Personal Data Protection Act (DPDP) 2023, EU General Data Protection Regulation (GDPR), UK Data Protection Act, and FERPA standards.
                  </p>
                </div>
              </div>

              <section className="space-y-3">
                <h2 className="text-lg font-heading font-bold text-slate-900 border-b border-slate-100 pb-2">
                  1. Information We Collect from Students
                </h2>
                <p>
                  To provide overseas education counselling, university shortlisting, application filing, and student visa processing services, we collect the following personal and sensitive information:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li><strong>Personal Identification Details:</strong> Full Legal Name (as per Passport), Date of Birth, Gender, Nationality, Passport Number, Issue/Expiry Dates, and Photograph.</li>
                  <li><strong>Contact Information:</strong> Permanent/Communication Address, Mobile Number, Email Address, Emergency Contact Details, and Guardian Information.</li>
                  <li><strong>Academic Records:</strong> Grade 10/12 Marksheets, Bachelor’s/Master’s Degree Transcripts, Provisional Certificates, Backlog Summaries, Statement of Purpose (SOP), Letters of Recommendation (LOR), and Resume/CV.</li>
                  <li><strong>Standardized Language & Test Scores:</strong> Official score cards for IELTS, TOEFL iBT, PTE Academic, Duolingo, GRE, GMAT, SAT, or ACT.</li>
                  <li><strong>Financial & Visa Documentation:</strong> Bank Statements, Fixed Deposit Certificates, Income Tax Returns (ITR) of Sponsors, Education Loan Sanction Letters, and Affidavits of Support required for CAS (UK), I-20 (USA), CAQ/Study Permit (Canada), or APS (Germany).</li>
                  <li><strong>Technical & Digital Footprint:</strong> IP Address, Browser type, portal navigation behavior, and AI Advisor query history when accessing grstudyabroad.com.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-heading font-bold text-slate-900 border-b border-slate-100 pb-2">
                  2. Purpose of Data Collection & Usage
                </h2>
                <p>Your data is processed strictly for legitimate educational advisory purposes, including:</p>
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                    <div className="font-bold text-slate-800 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> University Admissions
                    </div>
                    <p className="text-xs text-slate-500">
                      Submitting official applications to partner universities, colleges, and pathway providers across UK, USA, Canada, Australia, Germany, and Ireland.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                    <div className="font-bold text-slate-800 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Visa & Immigration Support
                    </div>
                    <p className="text-xs text-slate-500">
                      Assisting students in booking VFS appointments, generating CAS/I-20/CoE documents, and preparing visa filing documentation for foreign embassies.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                    <div className="font-bold text-slate-800 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Scholarship & Financial Assistance
                    </div>
                    <p className="text-xs text-slate-500">
                      Evaluating eligibility for institutional, government (NOS, Chevening, Fulbright), and philanthropic grants or education loan processing with partner banks.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                    <div className="font-bold text-slate-800 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Pre-Departure & Value Added Services
                    </div>
                    <p className="text-xs text-slate-500">
                      Facilitating student housing bookings, foreign exchange (Forex), student travel insurance, international SIM cards, and airport transfers.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-heading font-bold text-slate-900 border-b border-slate-100 pb-2">
                  3. Data Sharing & Third-Party Disclosure
                </h2>
                <p>
                  Grassroots Study Abroad <strong>NEVER sells, rents, or monetizes student data</strong>. Data is shared exclusively with accredited entities necessary to execute your study abroad application:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li><strong>Foreign Universities & Educational Institutions:</strong> Official admissions portals, international recruitment offices, and centralized application systems (e.g. UCAS, Uni-Assist).</li>
                  <li><strong>Government Immigration Authorities:</strong> Foreign High Commissions, Embassies, UKVI, US CIS/SEVP, IRCC Canada, Australian Department of Home Affairs, and VFS Global.</li>
                  <li><strong>Banking & Financial Partners:</strong> Authorized nationalized and private banks (SBI, HDFC Credila, ICICI Bank, Auxilo) for education loan processing upon student consent.</li>
                  <li><strong>Testing Boards:</strong> ETS (GRE/TOEFL), IELTS (British Council/IDP), Pearson PTE for online score verification.</li>
                  <li><strong>Legal Compliance:</strong> Statutory authorities or law enforcement agencies if required under applicable Indian or international law.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-heading font-bold text-slate-900 border-b border-slate-100 pb-2">
                  4. Data Security, Retention & Student Rights
                </h2>
                <p>
                  We implement enterprise-grade 256-bit SSL encryption, restricted role-based employee access, and secure cloud storage.
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-2 text-xs">
                  <p><strong>Retention Period:</strong> Student records are retained for up to 5 years following intake completion to support post-arrival support, alumni tracking, and legal audit compliance.</p>
                  <p><strong>Your Rights:</strong> Under the DPDP Act 2023 & GDPR, you have the right to request access to your personal data, rectify inaccuracies, request deletion (right to be forgotten) prior to official university submission, or withdraw consent at any time by emailing <a href="mailto:privacy@grstudyabroad.com" className="text-[#8B1E2D] font-bold underline">privacy@grstudyabroad.com</a>.</p>
                </div>
              </section>

            </div>
          )}

          {/* ==================== TERMS & CONDITIONS ==================== */}
          {activeTab === 'terms' && (
            <div className="space-y-8">
              
              <div className="bg-amber-50/80 border border-amber-200/60 p-5 rounded-2xl flex items-start gap-4">
                <FileText className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-amber-900 text-base">Service Agreement Overview</h3>
                  <p className="text-xs text-amber-950/80">
                    By registering for counselling, submitting documents, or availing overseas education advisories from Grassroots Solutions & Services Pvt Ltd (Grassroots Study Abroad), students and parents agree to these binding Terms & Conditions.
                  </p>
                </div>
              </div>

              <section className="space-y-3">
                <h2 className="text-lg font-heading font-bold text-slate-900 border-b border-slate-100 pb-2">
                  1. Scope of Educational Advisory Services
                </h2>
                <p>
                  Grassroots Study Abroad provides end-to-end foreign education consulting services including:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li>Profile evaluation and career pathway mapping based on academic merit and budget constraints.</li>
                  <li>University shortlisting across 1,000+ partner and non-partner global institutions.</li>
                  <li>Editorial review of Statement of Purpose (SOP), Letters of Recommendation (LOR), and Academic CVs.</li>
                  <li>Submission of official application forms and tracking admission offer letters (Conditional / Unconditional).</li>
                  <li>Guidance on CAS / I-20 / CoE issuance, financial document vetting, and student visa interview mock preparation.</li>
                  <li>Pre-departure orientations, accommodation search assistance, and Forex/flight booking support.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-heading font-bold text-slate-900 border-b border-slate-100 pb-2">
                  2. Student & Applicant Responsibilities
                </h2>
                <p>
                  To ensure a successful application outcome, applicants agree to adhere to the following mandatory standards:
                </p>
                <div className="space-y-3 pt-2">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1.5">
                    <div className="font-bold text-slate-900 text-xs text-red-700 uppercase tracking-wide">
                      Mandatory Disclosure & Authenticity Policy
                    </div>
                    <p className="text-xs text-slate-600">
                      The applicant must provide 100% genuine, un-edited, and accurate academic marksheets, test scorecards, work experience letters, and financial proof. Submitting forged, fraudulent, or altered documents will result in immediate termination of counselling without refund and reporting to university integrity boards and immigration authorities (UKVI / US CIS / IRCC).
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1.5">
                    <div className="font-bold text-slate-900 text-xs">
                      Deadline Adherence & Communication
                    </div>
                    <p className="text-xs text-slate-600">
                      Students are responsible for submitting required documents at least 15 business days prior to university/scholarship deadlines. Grassroots Study Abroad is not liable for missed intakes caused by delayed document submission from the student’s side.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-heading font-bold text-slate-900 border-b border-slate-100 pb-2">
                  3. Admissions & Visa Guarantees Disclaimer
                </h2>
                <p>
                  Students explicitly acknowledge and agree that:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600">
                  <li><strong>Sole Admissions Authority:</strong> University admission offers, course credits, fee waivers, and scholarship awards are decided solely by foreign university academic committees. Grassroots Study Abroad acts as an official advisory channel and does NOT issue offer letters directly.</li>
                  <li><strong>Sole Visa Authority:</strong> Foreign visa approval or refusal decisions are governed strictly by sovereign government consular officers (UKVI, US Embassy, IRCC, Australian High Commission). No education agency can guarantee a 100% visa grant.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-heading font-bold text-slate-900 border-b border-slate-100 pb-2">
                  4. Advisory Fees, Professional Charges & Refunds
                </h2>
                <p className="text-xs text-slate-600">
                  Grassroots Study Abroad operates as a professional education consulting firm. All counselling, profile evaluation, university application processing, SOP editorial review, and visa filing support services are subject to applicable professional advisory fees:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>All service fee structures, retainer charges, and package terms are communicated transparently and agreed upon in writing prior to service initiation.</li>
                  <li>Direct third-party costs (University application fees, WES credential evaluations, VFS visa filing fees, SEVIS fees, IELTS/TOEFL exam fees) are payable directly to official providers/institutions and are strictly non-refundable.</li>
                  <li>Advisory and service fees paid to Grassroots Study Abroad are non-refundable once documentation work or application processing has commenced.</li>
                </ul>
              </section>

            </div>
          )}

          {/* ==================== DISCLAIMER ==================== */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-8">
              
              <div className="bg-red-50/80 border border-red-200/60 p-5 rounded-2xl flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-[#8B1E2D] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-[#8B1E2D] text-base">Important Disclosures & Legal Notice</h3>
                  <p className="text-xs text-rose-950/80">
                    The information provided on grstudyabroad.com, marketing materials, and counselling sessions is for general informational and educational guidance purposes only.
                  </p>
                </div>
              </div>

              <section className="space-y-3">
                <h2 className="text-lg font-heading font-bold text-slate-900 border-b border-slate-100 pb-2">
                  1. University Rankings, Tuition Fees & Intake Data
                </h2>
                <p>
                  While Grassroots Study Abroad takes utmost care to maintain accurate and updated information regarding university rankings (QS / Times Higher Education), tuition fee structures, living costs, and entry requirements:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>University fee structures, currency exchange rates, and entry criteria are updated periodically by foreign institutions and may change without prior notice.</li>
                  <li>Students must verify exact course fees and intake availability on the official university website prior to paying deposits or accepting offer letters.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-heading font-bold text-slate-900 border-b border-slate-100 pb-2">
                  2. Government Immigration Policies & Post-Study Work Rights
                </h2>
                <p>
                  Visa regulations, post-study work permits (e.g. UK Graduate Route 2-year PSW, US OPT/STEM OPT extensions, Canada PGWP rules, Australian Subclass 485), dependent visa rights, and permanent residency (PR) pathways are subject to sovereign government policy changes.
                </p>
                <p className="text-xs text-slate-600">
                  Grassroots Study Abroad provides immigration guidance based on current published high commission rules but is not liable for changes in foreign government immigration laws during or after a student’s course duration.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-heading font-bold text-slate-900 border-b border-slate-100 pb-2">
                  3. Financial & Loan Estimates Disclaimer
                </h2>
                <p className="text-xs text-slate-600">
                  Education loan eligibility estimates, EMI calculators, and interest rate projections displayed on our portal are indicative figures provided by banking partners. Final loan approval, interest rates, and collateral requirements are determined solely by lending banks (SBI, HDFC Credila, ICICI, etc.) upon full credit assessment.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-heading font-bold text-slate-900 border-b border-slate-100 pb-2">
                  4. Third-Party Links & External Educational Portals
                </h2>
                <p className="text-xs text-slate-600">
                  Our website contains external hyperlinks to official university portals, government immigration portals (UKVI, US CIS, IRCC, Australian Home Affairs), scholarship portals (Chevening, Fulbright), and testing boards. Grassroots Study Abroad does not exercise control over or accept liability for content or privacy practices on third-party sites.
                </p>
              </section>

            </div>
          )}

          {/* ==================== COOKIE POLICY ==================== */}
          {activeTab === 'cookies' && (
            <div className="space-y-8">
              
              <div className="bg-sky-50/80 border border-sky-200/60 p-5 rounded-2xl flex items-start gap-4">
                <Cookie className="w-6 h-6 text-sky-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-sky-950 text-base">Cookie Policy & User Experience Transparency</h3>
                  <p className="text-xs text-sky-900">
                    This Cookie Policy explains how Grassroots Solutions & Services Pvt Ltd uses cookies and similar web analytics technologies when you visit grstudyabroad.com.
                  </p>
                </div>
              </div>

              <section className="space-y-3">
                <h2 className="text-lg font-heading font-bold text-slate-900 border-b border-slate-100 pb-2">
                  1. What Are Cookies?
                </h2>
                <p className="text-xs text-slate-600">
                  Cookies are small text files stored on your computer or mobile device when you browse websites. They enable the portal to remember your navigation preferences, selected country destinations, university shortlists, and session status to deliver a smooth user experience.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-heading font-bold text-slate-900 border-b border-slate-100 pb-2">
                  2. Types of Cookies We Use
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-600" /> Strictly Necessary Cookies
                    </div>
                    <p className="text-xs text-slate-500">
                      Essential for portal navigation, secure logins, and submitting appointment requests or search filter updates. Cannot be disabled.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-600" /> Functional & Preference Cookies
                    </div>
                    <p className="text-xs text-slate-500">
                      Remembers your preferred study abroad country (e.g. UK, USA), degree intake filters, and AI Advisor chat history.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600" /> Performance & Analytics Cookies
                    </div>
                    <p className="text-xs text-slate-500">
                      Aggregated anonymous data via Google Analytics to analyze page views, course search trends, and optimize portal responsiveness.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600" /> Marketing & Event Cookies
                    </div>
                    <p className="text-xs text-slate-500">
                      Measures the effectiveness of global education fair announcements, university spot admission webinars, and counselling promotions.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-heading font-bold text-slate-900 border-b border-slate-100 pb-2">
                  3. Managing & Disabling Cookie Preferences
                </h2>
                <p className="text-xs text-slate-600">
                  You can control or block cookies at any time through your browser settings. Please note that disabling essential cookies may impact certain interactive features such as the AI Advisor or appointment booking forms.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li><strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies and other site data</li>
                  <li><strong>Mozilla Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
                  <li><strong>Apple Safari:</strong> Preferences &gt; Privacy &gt; Block all cookies</li>
                  <li><strong>Microsoft Edge:</strong> Settings &gt; Site permissions &gt; Cookies and site data</li>
                </ul>
              </section>

            </div>
          )}

          {/* Legal Compliance Contact Card */}
          <div className="mt-12 p-6 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#8B1E2D] font-bold text-xs uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full w-fit">
                <Building2 className="w-3.5 h-3.5" /> Corporate Legal Office
              </div>
              <h3 className="font-heading font-bold text-lg text-white">Have Questions Regarding Compliance or Data Rights?</h3>
              <p className="text-xs text-slate-400 max-w-xl">
                For formal legal inquiries, data protection officer (DPO) requests, or verification of official university agency agreements, reach out directly to our corporate legal desk.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-red-400" /> legal@grstudyabroad.com</span>
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-red-400" /> privacy@grstudyabroad.com</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-red-400" /> +91 84959 70819</span>
              </div>
            </div>

            <button
              onClick={onOpenBookModal}
              className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-500 hover:to-rose-500 shadow-lg transition-all shrink-0 flex items-center gap-2"
            >
              <span>Speak with a Advisor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
