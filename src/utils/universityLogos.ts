/**
 * Official University Logo & Heraldic Seal Utilities
 * Handles domain resolution and high-resolution official logo/crest generation
 */

// Known domain mappings for major partner and global universities
const UNIVERSITY_DOMAIN_MAP: Record<string, string> = {
  // Canada
  'royal roads university': 'royalroads.ca',
  'wilfrid laurier university': 'wlu.ca',
  'university of saskatchewan': 'usask.ca',
  'university of toronto': 'utoronto.ca',
  'university of british columbia': 'ubc.ca',
  'mcgill university': 'mcgill.ca',
  'university of waterloo': 'uwaterloo.ca',
  'mcmaster university': 'mcmaster.ca',
  'university of alberta': 'ualberta.ca',
  'western university': 'uwo.ca',
  'queen\'s university': 'queensu.ca',
  'simon fraser university': 'sfu.ca',
  'york university': 'yorku.ca',
  'concordia university': 'concordia.ca',
  'dalhousie university': 'dal.ca',
  'university of ottawa': 'uottawa.ca',
  'university of calgary': 'ucalgary.ca',
  'university of victoria': 'uvic.ca',
  'university of guelph': 'uoguelph.ca',
  'carleton university': 'carleton.ca',
  'ryerson university': 'torontomu.ca',
  'toronto metropolitan university': 'torontomu.ca',
  'centennial college': 'centennialcollege.ca',
  'seneca college': 'senecapolytechnic.ca',
  'humber college': 'humber.ca',
  'george brown college': 'georgebrown.ca',
  'fanshawe college': 'fanshawec.ca',
  'conestoga college': 'conestogac.on.ca',

  // United Kingdom
  'university of oxford': 'ox.ac.uk',
  'university of cambridge': 'cam.ac.uk',
  'imperial college london': 'imperial.ac.uk',
  'ucl': 'ucl.ac.uk',
  'university college london': 'ucl.ac.uk',
  'king\'s college london': 'kcl.ac.uk',
  'london school of economics': 'lse.ac.uk',
  'university of edinburgh': 'ed.ac.uk',
  'university of manchester': 'manchester.ac.uk',
  'university of bristol': 'bristol.ac.uk',
  'university of glasgow': 'gla.ac.uk',
  'university of birmingham': 'birmingham.ac.uk',
  'university of leeds': 'leeds.ac.uk',
  'university of sheffield': 'sheffield.ac.uk',
  'university of nottingham': 'nottingham.ac.uk',
  'university of southampton': 'southampton.ac.uk',
  'university of newcastle': 'ncl.ac.uk',
  'university of newcastle, australia': 'newcastle.edu.au',
  'university of newcastle australia': 'newcastle.edu.au',
  'university of exeter': 'exeter.ac.uk',
  'university of york': 'york.ac.uk',
  'durham university': 'dur.ac.uk',
  'university of warwick': 'warwick.ac.uk',
  'queen mary university of london': 'qmul.ac.uk',
  'brunel university london': 'brunel.ac.uk',
  'coventry university': 'coventry.ac.uk',
  'university of greenwich': 'gre.ac.uk',
  'university of herts': 'herts.ac.uk',
  'university of hertfordshire': 'herts.ac.uk',

  // Additional United States
  'abilene christian university': 'acu.edu',
  'arizona state university': 'asu.edu',
  'arkansas state university': 'astate.edu',
  'auburn university': 'auburn.edu',
  'baylor university': 'baylor.edu',
  'boston university': 'bu.edu',
  'bradley university': 'bradley.edu',
  'butler university': 'butler.edu',
  'cleveland state university': 'csuohio.edu',
  'colorado state university': 'colostate.edu',
  'creighton university': 'creighton.edu',
  'depaul university': 'depaul.edu',
  'drexel university': 'drexel.edu',
  'duquesne university': 'duq.edu',
  'elon university': 'elon.edu',
  'fairfield university': 'fairfield.edu',
  'florida international university': 'fiu.edu',
  'fordham university': 'fordham.edu',
  'full sail university': 'fullsail.edu',
  'george mason university': 'gmu.edu',
  'hofstra university': 'hofstra.edu',
  'indiana state university': 'indstate.edu',
  'james madison university': 'jmu.edu',
  'kennesaw state university': 'kennesaw.edu',
  'kent state university': 'kent.edu',
  'louisiana state university': 'lsu.edu',
  'marquette university': 'marquette.edu',
  'marshall university': 'marshall.edu',
  'new jersey institute of technology': 'njit.edu',
  'northeastern university': 'northeastern.edu',
  'northern arizona university': 'nau.edu',
  'ohio university': 'ohio.edu',
  'oregon state university': 'oregonstate.edu',
  'pace university': 'pace.edu',
  'purdue university': 'purdue.edu',
  'rider university': 'rider.edu',
  'rowan university': 'rowan.edu',
  'sacred heart university': 'sacredheart.edu',
  'saint louis university': 'slu.edu',
  'san diego state university': 'sdsu.edu',
  'san francisco state university': 'sfsu.edu',
  'san jose state university': 'sjsu.edu',
  'seattle university': 'seattleu.edu',
  'seton hall university': 'shu.edu',
  'southern methodist university': 'smu.edu',
  'stevens institute of technology': 'stevens.edu',
  'suffolk university': 'suffolk.edu',
  'texas a&m university': 'tamu.edu',
  'texas state university': 'txstate.edu',
  'tulane university': 'tulane.edu',
  'university of alabama': 'ua.edu',
  'university of arizona': 'arizona.edu',
  'university of central florida': 'ucf.edu',
  'university of cincinnati': 'uc.edu',
  'university of colorado denver': 'ucdenver.edu',
  'university of connecticut': 'uconn.edu',
  'university of dayton': 'udayton.edu',
  'university of delaware': 'udel.edu',
  'university of denver': 'du.edu',
  'university of florida': 'ufl.edu',
  'university of hartford': 'hartford.edu',
  'university of houston': 'uh.edu',
  'university of idaho': 'uidaho.edu',
  'university of illinois at chicago': 'uic.edu',
  'university of kansas': 'ku.edu',
  'university of kentucky': 'uky.edu',
  'university of maine': 'umaine.edu',
  'university of maryland': 'umd.edu',
  'university of massachusetts boston': 'umb.edu',
  'university of memphis': 'memphis.edu',
  'university of miami': 'miami.edu',
  'university of missouri': 'missouri.edu',
  'university of nebraska-lincoln': 'unl.edu',
  'university of new hampshire': 'unh.edu',
  'university of new haven': 'newhaven.edu',
  'university of new mexico': 'unm.edu',
  'university of north texas': 'unt.edu',
  'university of oklahoma': 'ou.edu',
  'university of oregon': 'uoregon.edu',
  'university of rhode island': 'uri.edu',
  'university of south carolina': 'sc.edu',
  'university of south florida': 'usf.edu',
  'university of southern mississippi': 'usm.edu',
  'university of tampa': 'ut.edu',
  'university of tennessee': 'utk.edu',
  'university of utah': 'utah.edu',
  'university of vermont': 'uvm.edu',
  'university of wisconsin-milwaukee': 'uwm.edu',
  'university of wyoming': 'uwyo.edu',
  'valparaiso university': 'valpo.edu',
  'virginia commonwealth university': 'vcu.edu',
  'washington state university': 'wsu.edu',
  'webster university': 'webster.edu',
  'western kentucky university': 'wku.edu',
  'wichita state university': 'wichita.edu',

  // Additional UK
  'anglia ruskin university': 'aru.ac.uk',
  'aston university': 'aston.ac.uk',
  'bath spa university': 'bathspa.ac.uk',
  'birkbeck university of london': 'bbk.ac.uk',
  'bournemouth university': 'bournemouth.ac.uk',
  'bpp university': 'bpp.com',
  'canterbury christ church university': 'canterbury.ac.uk',
  'cardiff metropolitan university': 'cardiffmet.ac.uk',
  'city university of london': 'city.ac.uk',
  'de montfort university': 'dmu.ac.uk',
  'edge hill university': 'edgehill.ac.uk',
  'edinburgh napier university': 'napier.ac.uk',
  'glasgow caledonian university': 'gcu.ac.uk',
  'goldsmiths university of london': 'gold.ac.uk',
  'kingston university': 'kingston.ac.uk',
  'lancaster university': 'lancaster.ac.uk',
  'leeds beckett university': 'leedsbeckett.ac.uk',
  'liverpool john moores university': 'ljmu.ac.uk',
  'london metropolitan university': 'londonmet.ac.uk',
  'london south bank university': 'lsbu.ac.uk',
  'loughborough university': 'lboro.ac.uk',
  'manchester metropolitan university': 'mmu.ac.uk',
  'middlesex university': 'mdx.ac.uk',
  'northumbria university': 'northumbria.ac.uk',
  'nottingham trent university': 'ntu.ac.uk',
  'oxford brookes university': 'brookes.ac.uk',
  'queen margaret university': 'qmu.ac.uk',
  'queen\'s university belfast': 'qub.ac.uk',
  'robert gordon university': 'rgu.ac.uk',
  'royal holloway university of london': 'royalholloway.ac.uk',
  'sheffield hallam university': 'shu.ac.uk',
  'solent university': 'solent.ac.uk',
  'swansea university': 'swansea.ac.uk',
  'teesside university': 'tees.ac.uk',
  'university for the creative arts': 'uca.ac.uk',
  'university of aberdeen': 'abdn.ac.uk',
  'university of bath': 'bath.ac.uk',
  'university of bedfordshire': 'beds.ac.uk',
  'university of bradford': 'bradford.ac.uk',
  'university of brighton': 'brighton.ac.uk',
  'university of chester': 'chester.ac.uk',
  'university of dundee': 'dundee.ac.uk',
  'university of east anglia': 'uea.ac.uk',
  'university of east london': 'uel.ac.uk',
  'university of essex': 'essex.ac.uk',
  'university of gloucestershire': 'glos.ac.uk',
  'university of hull': 'hull.ac.uk',
  'university of kent': 'kent.ac.uk',
  'university of law': 'law.ac.uk',
  'university of leicester': 'le.ac.uk',
  'university of lincoln': 'lincoln.ac.uk',
  'university of liverpool': 'liverpool.ac.uk',
  'university of northampton': 'northampton.ac.uk',
  'university of plymouth': 'plymouth.ac.uk',
  'university of portsmouth': 'port.ac.uk',
  'university of reading': 'reading.ac.uk',
  'university of roehampton': 'roehampton.ac.uk',
  'university of salford': 'salford.ac.uk',
  'university of south wales': 'southwales.ac.uk',
  'university of stirling': 'stir.ac.uk',
  'university of strathclyde': 'strath.ac.uk',
  'university of sunderland': 'sunderland.ac.uk',
  'university of surrey': 'surrey.ac.uk',
  'university of sussex': 'sussex.ac.uk',
  'university of the west of england': 'uwe.ac.uk',
  'university of west london': 'uwl.ac.uk',
  'university of west of scotland': 'uws.ac.uk',
  'university of westminster': 'westminster.ac.uk',
  'university of wolverhampton': 'wlv.ac.uk',
  'university of worcester': 'worc.ac.uk',

  // Additional Australia & New Zealand
  'australian catholic university': 'acu.edu.au',
  'bond university': 'bond.edu.au',
  'charles darwin university': 'cdu.edu.au',
  'charles sturt university': 'csu.edu.au',
  'cquniversity': 'cqu.edu.au',
  'curtin university': 'curtin.edu.au',
  'edith cowan university': 'ecu.edu.au',
  'federation university': 'federation.edu.au',
  'flinders university': 'flinders.edu.au',
  'griffith university': 'griffith.edu.au',
  'james cook university': 'jcu.edu.au',
  'la trobe university': 'latrobe.edu.au',
  'murdoch university': 'murdoch.edu.au',
  'southern cross university': 'scu.edu.au',
  'swinburne university of technology': 'swinburne.edu.au',
  'torrens university': 'torrens.edu.au',
  'university of canberra': 'canberra.edu.au',
  'university of newcastle (australia)': 'newcastle.edu.au',
  'university of new england': 'une.edu.au',
  'university of south australia': 'unisa.edu.au',
  'university of southern queensland': 'unisq.edu.au',
  'university of tasmania': 'utas.edu.au',
  'university of the sunshine coast': 'usc.edu.au',
  'university of wollongong': 'uow.edu.au',
  'victoria university': 'vu.edu.au',
  'western sydney university': 'westernsydney.edu.au',

  // Europe & Asia & Middle East
  'trinity college dublin': 'tcd.ie',
  'university college dublin': 'ucd.ie',
  'eth zurich': 'ethz.ch',
  'epfl': 'epfl.ch',
  'technical university of munich': 'tum.de',
  'tum': 'tum.de',
  'lmu munich': 'lmu.de',
  'delft university of technology': 'tudelft.nl',
  'university of amsterdam': 'uva.nl',
  'wittenborg university of applied sciences': 'wittenborg.eu',
  'varna university of management': 'vum.bg',
  'national university of singapore': 'nus.edu.sg',
  'nus': 'nus.edu.sg',
  'nanyang technological university': 'ntu.edu.sg',
  'ntu': 'ntu.edu.sg',
  'singapore management university': 'smu.edu.sg',
  'university of hong kong': 'hku.hk',
  'chinese university of hong kong': 'cuhk.edu.hk',
  'hkust': 'ust.hk',
  'university of dubai': 'ud.ac.ae',
  'american university in dubai': 'aud.edu',
  'heriot-watt university dubai': 'hw.ac.uk'
};

export function getUniversityDomain(uniName: string, countryCode?: string): string {
  const lower = uniName.toLowerCase().trim();
  
  if (UNIVERSITY_DOMAIN_MAP[lower]) {
    return UNIVERSITY_DOMAIN_MAP[lower];
  }

  // Check substring matches
  for (const [key, domain] of Object.entries(UNIVERSITY_DOMAIN_MAP)) {
    if (lower.includes(key) || key.includes(lower)) {
      return domain;
    }
  }

  // Dynamic domain generator clean strategy
  const cleaned = lower
    .replace(/^the\s+/, '')
    .replace(/university|college|institute|school|technology|applied|sciences|of|and|for/g, '')
    .replace(/[^a-z0-9]/g, '');

  if (cleaned.length >= 3) {
    if (countryCode === 'UK') return `${cleaned}.ac.uk`;
    if (countryCode === 'CA') return `${cleaned}.ca`;
    if (countryCode === 'AU') return `${cleaned}.edu.au`;
    if (countryCode === 'NZ') return `${cleaned}.ac.nz`;
    if (countryCode === 'IE') return `${cleaned}.ie`;
    if (countryCode === 'DE') return `${cleaned}.de`;
    if (countryCode === 'FR') return `${cleaned}.fr`;
    if (countryCode === 'SG') return `${cleaned}.edu.sg`;
    return `${cleaned}.edu`;
  }

  return 'university.edu';
}

export function getCountryFlag(code?: string): string {
  if (!code) return '🌐';
  const upper = code.toUpperCase();
  const flags: Record<string, string> = {
    US: '🇺🇸',
    USA: '🇺🇸',
    UK: '🇬🇧',
    CA: '🇨🇦',
    AU: '🇦🇺',
    NZ: '🇳🇿',
    FR: '🇫🇷',
    DE: '🇩🇪',
    IE: '🇮🇪',
    SG: '🇸🇬',
    AE: '🇦🇪',
    CH: '🇨🇭',
    FI: '🇫🇮',
    IT: '🇮🇹',
    NL: '🇳🇱',
    SE: '🇸🇪',
    KR: '🇰🇷',
    MY: '🇲🇾',
    HK: '🇭🇰',
    JP: '🇯🇵'
  };
  return flags[upper] || '🌐';
}

export function getUniversityLogoUrls(uniName: string, countryCode?: string): { clearbit: string; iconhorse: string; google: string; unavatar: string } {
  const domain = getUniversityDomain(uniName, countryCode);
  
  return {
    clearbit: `https://logo.clearbit.com/${domain}`,
    iconhorse: `https://icon.horse/icon/${domain}`,
    google: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    unavatar: `https://unavatar.io/${domain}?fallback=false`
  };
}

export function getUniversityInitials(uniName: string): string {
  const ignore = ['university', 'of', 'college', 'institute', 'technology', 'the', 'and', 'for', 'center', 'school', 'business', 'higher', 'studies', 'applied', 'sciences'];
  const words = uniName.split(/\s+/).filter(w => !ignore.includes(w.toLowerCase()));
  if (words.length >= 3) {
    return (words[0][0] + words[1][0] + words[2][0]).toUpperCase();
  } else if (words.length === 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  } else if (words.length === 1 && words[0].length >= 3) {
    return words[0].substring(0, 3).toUpperCase();
  }
  return uniName.substring(0, 3).toUpperCase();
}

export const OFFICIAL_CREST_THEMES = [
  { name: 'Crimson Gold', bg: 'from-[#8B1E2D] to-[#58000D]', border: 'border-amber-400/40', text: 'text-amber-200', sealBg: 'bg-[#6A1220]' },
  { name: 'Navy Imperial', bg: 'from-[#0F172A] to-[#1E3A8A]', border: 'border-[#38BDF8]/40', text: 'text-sky-200', sealBg: 'bg-[#172554]' },
  { name: 'Emerald Scholar', bg: 'from-[#064E3B] to-[#022C22]', border: 'border-emerald-300/40', text: 'text-emerald-200', sealBg: 'bg-[#065F46]' },
  { name: 'Royal Purple', bg: 'from-[#4C1D95] to-[#2E1065]', border: 'border-purple-300/40', text: 'text-purple-200', sealBg: 'bg-[#581C87]' },
  { name: 'Oxford Blue', bg: 'from-[#1E293B] to-[#0F172A]', border: 'border-amber-400/50', text: 'text-amber-300', sealBg: 'bg-[#334155]' },
  { name: 'Burgundy Gold', bg: 'from-[#701A2A] to-[#420E18]', border: 'border-yellow-400/40', text: 'text-yellow-200', sealBg: 'bg-[#52131F]' },
  { name: 'Cobalt Cyan', bg: 'from-[#1E3A8A] to-[#0284C7]', border: 'border-cyan-300/40', text: 'text-cyan-200', sealBg: 'bg-[#1D4ED8]' },
  { name: 'Forest Ivy', bg: 'from-[#14532D] to-[#052E16]', border: 'border-emerald-400/40', text: 'text-emerald-300', sealBg: 'bg-[#15803D]' },
  { name: 'Midnight Gold', bg: 'from-[#111827] to-[#374151]', border: 'border-amber-300/50', text: 'text-amber-200', sealBg: 'bg-[#1F2937]' },
  { name: 'Slate Crimson', bg: 'from-[#331018] to-[#8B1E2D]', border: 'border-rose-300/40', text: 'text-rose-200', sealBg: 'bg-[#4C121D]' }
];

export function getUniversityCrestTheme(uniName: string) {
  let hash = 0;
  for (let i = 0; i < uniName.length; i++) {
    hash = (hash << 5) - hash + uniName.charCodeAt(i);
    hash |= 0;
  }
  const posHash = Math.abs(hash);
  return OFFICIAL_CREST_THEMES[posHash % OFFICIAL_CREST_THEMES.length];
}
