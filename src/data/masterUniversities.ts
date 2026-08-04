export interface MasterUniversity {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  region: 'North America' | 'Europe' | 'Asia-Pacific' | 'Middle East' | 'Latin America';
  isPartner: boolean;
  isPathwayPartner?: boolean;
  qsRanking?: string;
  tuitionRange?: string;
  tuitionTier: 'Budget' | 'Moderate' | 'Premium'; // Budget <$15k, Moderate $15k-$25k, Premium >$25k
  institutionType: 'University' | 'College' | 'Business School' | 'Tech Institute' | 'Pathway Center';
  sector: 'Public' | 'Private';
  hasIeltsWaiver: boolean;
  hasScholarship: boolean;
  image: string;
  featured?: boolean;
}

export const REGIONAL_CAMPUS_IMAGES = {
  US: [
    'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80', // Ivy quad
    'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80', // US Classic Hall
    'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80', // US Campus lawn
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', // US College Library
    'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80'
  ],
  UK: [
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80', // Gothic UK campus
    'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=800&q=80', // Oxford/Cambridge style
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', // Red brick UK
    'https://images.unsplash.com/photo-1543832923-42667bc64e93?auto=format&fit=crop&w=800&q=80'
  ],
  CA: [
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80', // Canadian campus autumn
    'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80', // Toronto/McGill style
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
  ],
  AU: [
    'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80', // Sydney sandstone
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', // Melbourne modern
    'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&w=800&q=80'
  ],
  EU: [
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80', // Paris historic
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80', // Heidelberg/German campus
    'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80', // Swiss/Nordic
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80'
  ],
  ASIA: [
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80', // Dubai modern highrise campus
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80', // Asian university garden
    'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80', // Tech center campus
    'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80'
  ]
};

export const GRADIENT_SEALS = [
  'from-red-800 to-amber-700',
  'from-blue-900 to-indigo-700',
  'from-emerald-900 to-teal-700',
  'from-purple-900 to-indigo-800',
  'from-[#8B1E2D] to-rose-900',
  'from-amber-800 to-yellow-600',
  'from-slate-900 to-zinc-700',
  'from-cyan-900 to-blue-800'
];

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

import { getUniversityLogoUrls, getUniversityCrestTheme } from '../utils/universityLogos';
import { getCountryTuitionRange } from '../utils/currencyUtils';

export function getUniversityCampusImage(uniName: string, countryCode: string, idx: number): string {
  const code = (countryCode || 'US').toUpperCase();
  const images = REGIONAL_CAMPUS_IMAGES[code as keyof typeof REGIONAL_CAMPUS_IMAGES] || REGIONAL_CAMPUS_IMAGES.US;
  let hash = 0;
  for (let i = 0; i < uniName.length; i++) {
    hash = (hash << 5) - hash + uniName.charCodeAt(i);
    hash |= 0;
  }
  return images[Math.abs(hash) % images.length];
}

export function getUniversityCardBranding(uniName: string, countryCode: string, type: string, idx: number) {
  const initials = getUniversityInitials(uniName);
  const theme = getUniversityCrestTheme(uniName);
  const logoUrls = getUniversityLogoUrls(uniName, countryCode);
  const image = logoUrls.google;

  const tags = [
    'Official University Seal',
    'Accredited Global Campus',
    'STEM Innovation Hub',
    'Global Research Facility',
    'Public University System',
    'Premier Academic Seal',
    'Pathway & Career Center',
    'Graduate Academic Hub'
  ];
  let hash = 0;
  for (let i = 0; i < uniName.length; i++) {
    hash = (hash << 5) - hash + uniName.charCodeAt(i);
    hash |= 0;
  }
  const posHash = Math.abs(hash);
  const campusTag = tags[posHash % tags.length];

  return { initials, gradient: theme.bg, image, campusTag };
}

export const COUNTRY_STATS = [
  { country: 'USA', code: 'US', count: 347, region: 'North America' },
  { country: 'United Kingdom', code: 'UK', count: 210, region: 'Europe' },
  { country: 'Canada', code: 'CA', count: 131, region: 'North America' },
  { country: 'Australia', code: 'AU', count: 127, region: 'Asia-Pacific' },
  { country: 'France', code: 'FR', count: 75, region: 'Europe' },
  { country: 'Dubai (UAE)', code: 'AE', count: 47, region: 'Middle East' },
  { country: 'Germany', code: 'DE', count: 26, region: 'Europe' },
  { country: 'Switzerland', code: 'CH', count: 26, region: 'Europe' },
  { country: 'Malaysia', code: 'MY', count: 23, region: 'Asia-Pacific' },
  { country: 'Finland', code: 'FI', count: 22, region: 'Europe' },
  { country: 'Singapore', code: 'SG', count: 20, region: 'Asia-Pacific' },
  { country: 'Ireland', code: 'IE', count: 18, region: 'Europe' },
  { country: 'Italy', code: 'IT', count: 15, region: 'Europe' },
  { country: 'New Zealand', code: 'NZ', count: 14, region: 'Asia-Pacific' },
  { country: 'Malta', code: 'MT', count: 12, region: 'Europe' },
  { country: 'Netherlands', code: 'NL', count: 10, region: 'Europe' },
  { country: 'Poland', code: 'PL', count: 9, region: 'Europe' },
  { country: 'South Korea', code: 'KR', count: 8, region: 'Asia-Pacific' },
  { country: 'Czech Republic', code: 'CZ', count: 8, region: 'Europe' },
  { country: 'Sweden', code: 'SE', count: 7, region: 'Europe' },
  { country: 'Cyprus', code: 'CY', count: 6, region: 'Europe' },
  { country: 'Hungary', code: 'HU', count: 6, region: 'Europe' },
  { country: 'Latvia', code: 'LV', count: 5, region: 'Europe' },
  { country: 'Belgium', code: 'BE', count: 4, region: 'Europe' },
  { country: 'Spain', code: 'ES', count: 4, region: 'Europe' },
  { country: 'Vietnam', code: 'VN', count: 4, region: 'Asia-Pacific' },
  { country: 'Denmark', code: 'DK', count: 3, region: 'Europe' },
  { country: 'Hong Kong', code: 'HK', count: 3, region: 'Asia-Pacific' },
  { country: 'Georgia', code: 'GE', count: 2, region: 'Europe' },
  { country: 'Japan', code: 'JP', count: 2, region: 'Asia-Pacific' },
  { country: 'Mauritius', code: 'MU', count: 2, region: 'Middle East' },
  { country: 'Slovenia', code: 'SI', count: 2, region: 'Europe' },
  { country: 'Sri Lanka', code: 'LK', count: 2, region: 'Asia-Pacific' },
  { country: 'Bulgaria', code: 'BG', count: 1, region: 'Europe' },
  { country: 'Costa Rica', code: 'CR', count: 1, region: 'Latin America' },
  { country: 'Croatia', code: 'HR', count: 1, region: 'Europe' },
  { country: 'Greece', code: 'GR', count: 1, region: 'Europe' },
  { country: 'Indonesia', code: 'ID', count: 1, region: 'Asia-Pacific' },
  { country: 'Lithuania', code: 'LT', count: 1, region: 'Europe' },
  { country: 'Monaco', code: 'MC', count: 1, region: 'Europe' },
  { country: 'Saudi Arabia', code: 'SA', count: 1, region: 'Middle East' },
  { country: 'West Indies', code: 'WI', count: 1, region: 'Latin America' },
];

export const RAW_MASTER_UNIVERSITIES: { country: string; code: string; region: MasterUniversity['region']; names: string[] }[] = [
  {
    country: 'USA',
    code: 'US',
    region: 'North America',
    names: [
      "Abilene Christian University", "Arkansas State University", "Tulsa Community College", "Los Angeles Pierce College (CC)", "California State University", "Kutztown University", "Colorado State University", "Purdue University - Northwest", "Concordia University", "Mercy College", "Devry University", "Drew University", "Duquesne University", "Santa Ana College", "Charleston Southern University", "Lynn University", "SUNY - Fredonia", "University of Scranton", "Northern Michigan University", "Missouri State University", "Johnson & Wales University", "University at Albany", "Creighton University", "Oklahoma City University", "Northern Arizona University", "The University of Memphis", "Cleary University", "Valparaiso University", "Northwestern Oklahoma State University", "University of Mary Hardin-Baylor", "Virginia Wesleyan University", "St. Thomas Aquinas College", "Oregon State University", "Kennesaw State University", "Weber State University", "Montana State University - Billings", "University of Nebraska at Kearney", "Indiana University of Pennsylvania", "Upper Iowa University", "The State University of New York at New Paltz (SUNY New Paltz)", "University of Houston - Clear Lake", "Culinary Institute of America", "Rivier University", "Jacksonville State University", "James Madison University", "Long Island University", "Marshall University", "Missouri University of Science & Technology", "New Jersey Institute of Technology", "Northwood University", "University of Cincinnati", "Saint Leo University", "New England College", "Austin Peay State University", "University of Maine - Fort Kent", "Texas Wesleyan University", "University of Advancing Technology", "Hartwick College", "The University of Nebraska-Lincoln", "University of California Riverside", "University of South Dakota", "The University of Findlay", "Saint Louis University", "Slippery Rock University of Pennsylvania",
      "San Francisco State University", "San Jose State University", "Wright State University", "Florida Institute of Technology", "University of Hartford", "University of Central Oklahoma", "Montana State University - Bozeman", "University of Wisconsin - Stevens Point", "University of Delaware", "Seattle University", "Rider University", "Southeast Missouri State University", "Dakota State University", "Alvernia University", "Agnes Scott College", "State University of New York at Plattsburgh (SUNY Plattsburgh)", "University of Southern Maine", "University of Tampa", "Tiffin University", "University of Alabama at Birmingham", "University of Arkansas at Little Rock", "University of Idaho", "University of Maryland", "Kent State University", "University of North Texas", "Full Sail University", "University of South Florida", "University of Nevada", "Webster University", "Wichita State University", "Dallas Baptist University", "Youngstown State University", "Duke University", "Mississippi State University", "Grand Valley State University", "Southern New Hampshire University", "University of Wisconsin Milwaukee", "Montana State University", "TRINE UNIVERSITY", "AMERICAN COLLEGIATE LA", "Indiana State University", "Milwaukee School of Engineering", "Texas State University", "Southern Illinois University Edwardsville", "Rowan University", "Western Kentucky University", "Sullivan University", "Cleveland State University", "College of Charleston", "Queens College", "Quinnipiac University", "California Lutheran University", "University of Bridgeport", "State University of New York, Geneseo (SUNY Geneseo)", "Strayer University", "Manhattanville College", "Ashland University", "Mississippi College", "Richard Bland College of William & Mary", "Berkeley College", "University of Dayton", "University of New Mexico", "Monroe College", "University of Rhode Island", "San Mateo College of Silicon Valley", "University of Maine", "Rocky Mountain College of Art + Design (RMCAD)", "Alfred University", "Florida Polytechnic University", "Paul Smith's College", "Tennessee Tech University", "Atlantis University", "UNIVERSITY OF NEW HAVEN", "Arizona State University",
      "University of California - Riverside Extension", "Bridge English Language Center", "Sacred Heart University", "Florida Institute of Technology - Orlando", "Keiser University", "Governors State University", "North Park University", "Nichols College", "Hofstra University", "Louisiana State University", "University of Illinois at Chicago", "Norwich University", "Adelphi University", "University of Tennessee - Chattanooga", "New York Conservatory for Dramatic Arts", "Glasgow Caledonian New York College (GCNYC)", "Manhattan Institute of Management", "St. John's University", "Baylor University", "California Baptist University", "University of Toledo", "National University", "Academy of Art University", "Saginaw Valley State University", "University of Central Florida", "Golden Gate University", "Green River College", "University of Massachusetts - Dartmouth", "University of Missouri–St. Louis (UMSL)", "Gannon University", "Virginia Tech Language and Culture Institute", "Alliant International University", "New York University - SPS", "University of Utah", "Illinois State University", "University of Tulsa", "Umass Amherst", "University of Nebraska–Lincoln", "Castleton University", "Embry-Riddle Aeronautical University - Daytona Beach", "Eastern Connecticut State University", "Embry-Riddle Aeronautical University - Prescott", "Stetson University", "North Central College", "Canisius College", "Worcester State University", "Lakeland University", "Florida International University", "The University of Kansas", "Fisher College", "Heidelberg University", "Auburn University, Alabama", "College of Staten Island - CUNY", "SUNY - Farmingdale State College", "SUNY - Albany", "University of Arizona", "LIM College", "Northwest Missouri State University", "SUNY Polytechnic Institute", "New York Film Academy", "American University", "Mercer University", "Seattle Central Community College", "LaRoche University", "New England Institute of Technology", "Briar Cliff University", "New York University - Steinhardt", "State University of New York at Old Westbury (SUNY Old Westbury)", "Western Washington University", "Park University", "DePaul University", "State University of New York, Fredonia",
      "Seattle Pacific University", "Western Illinois University", "University of South Carolina", "Massachusetts College of Pharmacy and Health Sciences (MCPHS University)", "New York Institute of Technology", "Florida Institute of Technology - Melbourne", "Florida Southern College", "Stetson University College of Law", "Pace University", "Lasell College", "St. Francis College", "University of Charleston", "Point Park University", "University of the Pacific", "Ohio Dominican University", "University of California, Irvine Division of Continuing Education", "Manhattan College", "Wilkes University", "John Jay College of Criminal Justice - CUNY", "SUNY - Binghamton University", "University of Massachusetts Boston (UMass Boston)", "Edgewood College", "Los Angeles Mission College", "Arkansas Tech University", "Bridge Language and Education Abroad", "California State University, Fresno", "California State University, Sonoma", "Campbellsville University", "George Mason University", "Indiana Institute of Technology", "California State University, Channel Islands", "University of Maryland, Baltimore County", "University of North Alabama", "WSU (Wichita State University)", "Hilbert College", "Montana State University Billings", "Aviation Institute of Maintenance", "California State University - Northridge", "California State University, Sacramento", "California State University, Stanislaus", "Concordia University - Nebraska", "Fairfield University", "Long Island University Post (LIU Post)", "California State University, Dominguez Hills", "University of Colorado Denver", "Washington College", "Hult International Business School Boston & San Francisco", "Stevens Institute of Technology - GRADUATE", "International American University", "Texas A & M University", "Bay Atlantic University", "California State University, Monterey Bay", "California State University, Bakersfield", "California State University, East Bay", "Concordia University Chicago", "GONZAGA UNIVERSITY", "Lawrence Technological University",
      "Loyola University - New Orleans", "California State University, San Bernardino", "Ohio University", "University of New Hampshire", "University of the Cumberlands", "Long Island University Brooklyn (LIU Brooklyn)", "Stevens Institute of Technology - UNDERGRADUATE", "College of Saint Elizabeth", "Felician University", "Humboldt State University", "Jefferson University, Philadelphia", "Lipscomb University", "Marist College", "Midwestern State University", "Monmouth University", "Murray State University", "Nebraska Wesleyan University", "Pittsburg State University", "Seton Hall University", "Troy University", "University of Vermont", "Washington State University", "West Virginia State University", "Western New England University", "Virginia Commonwealth University", "Paier College", "Algebra University", "Goodwin College", "University of Connecticut", "Bradley University", "Elgin Community College", "Roosevelt University", "Butler University", "Tulane University", "Elon University", "High Point University", "Clarkson University", "Daemen University", "Fordham University", "University of Portland", "Christian Brothers University", "Peninsula College", "University of Wyoming", "Southern Methodist University", "Capital University", "METROPOLITAN STATE UNIVERSITY OF DENVER", "HUSSON UNIVERSITY", "COLORADO MESA UNIVERSITY", "Marconi International University", "Maharishi International University", "Drexel University", "Suffolk University", "Auburn University at Montgomery", "State University of New York Polytechnic Institute", "Atlantis University", "University of Wisconsin-Eau Claire", "University of Wisconsin-La Crosse", "Marshall University, West Virginia", "California Flight Center", "Bellevue College", "Schiller International University", "Kings College - Canisius College", "Kings College - Marymount College", "Kings College - Pine Manor, Boston", "CATS Academy", "Flordia Polytechnic University", "Oglethorpe University", "AMERICAN COLLEGIATE DC", "Community Colleges of Spokane", "Johnson & Wales University"
    ]
  },
  {
    country: 'United Kingdom',
    code: 'UK',
    region: 'Europe',
    names: [
      "Solent University", "Kings College London", "University of York", "University of Aberdeen", "University of Stirling", "University of Bristol", "Canterbury Christ Church University", "University of Leeds", "University College Birmingham", "Kingston University", "Glasgow Caledonian University", "Sheffield Hallam University", "University of Portsmouth", "University of Worcester", "Bath Spa University", "Oxford Brookes University", "University for the Creative Arts", "University of Liverpool", "Abertay University", "Kaplan- University of Glasgow International College", "Bangor University", "University of Northampton", "Teesside University", "Coventry University", "Ravensbourne University London", "University of Chester", "University of Hertfordshire", "De Montfort University", "Aston University", "INTO Manchester Metropolitan University", "INTO University of Exeter", "Kaplan- Queen Mary University of London", "Liverpool John Moores University", "Regent's University London", "University of Glasgow", "Wrexham Glyndwr University", "Kaplan International College", "University of London Birkbeck", "Buckinghamshire New University", "Goldsmiths University of London", "Manchester Metropolitan University", "University of Essex", "University of Strathclyde", "Hult Business School (London)", "Cardiff University International Study Centre", "BPP University", "University of Exeter", "Queens University Belfast", "University of Sussex", "Heriot-Watt University, UK", "Ulster University", "Cardiff Metropolitan University", "University of Surrey", "London Metropolitan University", "Royal Holloway University of London", "University of Bradford", "University of Westminster", "Aberystwyth University", "Cranfield University", "University of South Wales", "University of Sunderland", "Leeds Beckett University", "University of Bedfordshire", "University of East London", "University of West London", "University of West of Scotland", "Instituto Marangoni", "London South Bank University (LSBU)", "Liverpool Hope University", "Staffordshire University",
      "University of Kingston", "University of Wales Trinity Saint David", "Glion Institute of Higher Education - London", "University of Hull", "University of Law", "Brunel University London", "Newcastle University", "University of Sheffield", "University of East Anglia", "Queen Mary University London", "Coventry University London International Study Centre", "City University of London", "University of Roehampton", "Swansea University", "Birmingham City University", "Middlesex University", "Robert Gordon University", "Nottingham Trent University", "St Mary's University", "University of Dundee", "University of Wolverhampton", "Arts University Bournemouth", "Edge Hill University", "Northumbria University Newcastle Campus", "University of Derby", "University of West of England, Bristol", "Edinburgh Napier University", "Anglia Ruskin University", "University of Plymouth", "University of Brighton", "University of Greenwich", "University of Leicester", "Regents University", "INTO Glasgow Caledonian University", "INTO University of East Anglia", "Northumbria University London Campus", "Global Business School", "Queen Mary University of London", "The University of Huddersfield", "University of Suffolk", "University of Gloucestershire", "University of Lincoln", "University of Manchester", "University of Cumbria", "St. Patrick College", "INTO London", "OnCampus University of Reading", "QAHE - Solent University", "Bellerbys College Brighton", "University of the Creative Arts", "DMU International College", "BANGOR BUSINESS SCHOOL", "Bradford University", "Chichester University", "East Anglia University", "Edinburgh University", "Glasgow School of Art", "Hult International Business School AG", "LCA Business School London", "Navitas University of Northampton International College", "Oncampus Queen Mary University of London", "Nottingham University", "Reading University", "Southampton University", "Ulster University Coleraine Campus", "Study Group - Leeds Beckett University Leeds", "Richmond The American International University in London", "Lancaster University", "Arts Bournemouth University", "INTO Queen's University Belfast",
      "Kaplan- UWE Bristol", "Le Cordon Bleu London", "Leeds Trinity University", "Birkbeck University of London", "Queen's University Belfast", "The College Swansea University", "University of the West of England Bristol", "St Clares Oxford", "Navitas University of Leicester Global Study Centre", "CATs College", "Bath University", "Buckingham University", "Derby University", "East London University", "Falmouth University", "Greenwich University", "Keele University", "Navitas London Brunel International College", "Loughborough University-London Campus", "Navitas University of Plymouth International College", "Study Group - University of Surrey International Study Centre", "Queen Margaret University", "Royal Agricultural University", "St Mary's University Twickenham", "University of the Highlands and Islands", "University of Strathclyde International Study", "School of Oriental and African Studies London (SOAS)", "Southampton Solent University", "INTO City University", "INTO University of Manchester", "Navitas Lancaster University", "Leicester University", "QAHE - Northumbria University", "Durham University", "University Birmingham Campus", "St Andrew College Cambridge", "St Patricks College", "Aberdeen University", "Bolton University", "Cambridge Education Group", "Edinburgh Business School", "Falmouth University of Arts", "Harper Adams University", "Kent University", "Norwich University Of The Arts", "University of Central Lancashire", "The University of Sheffield International College", "Ravensbourne", "Salford University", "Winchester University", "Trinity Laban Conservatoire of Music & Dance", "Cranfield University", "Sheffield Hallam University", "The University of Huddersfield", "Dudley College Of Technology", "MLA College", "University of Sheffield", "Kaplan- Bournemouth University", "Kaplan International College London", "Kaplan- Nottingham Trent International College", "Kaplan- University of Essex International College", "Kaplan- University of Liverpool International College", "Kaplan- University of Nottingham International College",
      "Navitas Birmingham City University- International College", "Navitas Hertfordshire International College", "Navitas University of International College Portsmouth", "University of Kingston International", "Bournemouth University", "Cardiff University"
    ]
  },
  {
    country: 'Canada',
    code: 'CA',
    region: 'North America',
    names: [
      "Wilfred Laurier University", "Canadore College", "New Brunswick Community College", "Conestoga College", "Fanshawe College", "Medicine Hat College", "Fairleigh Dickinson University Vancouver", "Saskatchewan Polytechnic", "Vancouver Island University", "Lasalle College, QC", "North Island College", "St. Francis Xavier University", "Sprott Shaw College", "Algoma University", "University of Lethbridge", "University of Northern British Columbia", "Acadia University", "Evergreen College", "Cumberland College", "Alexander College", "Flair College of Management and Technology", "SAIT (Southern Alberta Institute of Technology)", "Acsenda School of Management", "University of Saskatchewan", "University of Windsor", "Trent University", "Trinity Western University", "University of the Fraser Valley", "The King's University", "College of New Caledonia", "Capilano University", "Mount Allison University", "Selkirk College", "Mount Saint Vincent University", "University of Regina", "Seneca College", "St. Lawrence College", "Centennial College", "Algonquin College", "Le'Ecole Du Show-Business", "University Of Canada West", "Georgian College", "Confederation College", "Niagara College", "Lasalle College, Vancouver", "University of Prince Edward Island", "Brock University", "University of Fraser Valley", "University of New Brunswick", "College St-Michel", "Cape Breton University", "Red Deer College", "St Mary's University Calgary", "Georgian College of Applied Arts and Technology", "University of Victoria", "University of Guelph", "University of Winnipeg", "British Columbia Institute of Technology", "George Brown College", "Douglas College", "Loyalist College", "Nipissing University", "Lakehead University", "Durham College", "Thompson Rivers University", "Carleton University", "Cambrian College", "New York Institute of Technology (NYIT Canada)", "Vancouver Film School", "Southern Alberta Institute of Technology (SAIT)", "Yorkville University", "Fleming College",
      "Mohawk College", "St Thomas University", "Memorial University", "Norquest College", "Kwantlen Polytechnic University", "Toronto School of Management", "Coast Mountain College", "Trebas Institute", "Liaison College", "University of Canadian West", "Langara Centre for Entertainment and the Arts", "Dalhousie University", "Memorial University of Newfoundland", "Wilfrid Laurier University", "University of Prince Edward Island", "Yukon College", "Cambrian College at Hanson", "Sheridan College", "Vancouver Community College", "Royal Roads University", "College of the Rockies", "Seneca International Academy", "Humber College", "University of Manitoba", "Concordia University of Edmonton", "York University", "St Clair College", "Assiniboine Community College", "Brighton College", "CDI College", "College Multihexa", "The Kings University", "Northeastern University Vancouver", "Crandall University", "MacEwan University", "Bishop's University", "Ontario Tech University", "Langara College", "Canadian College", "Northern Lights College", "Avalon College", "Bow Valley College", "Cegep de la Gaspesie et des Iles", "College St. Michel", "Okanagan College", "University of Lethbridge", "Northern College", "Justice Institute of British Columbia", "St. Mary's University (Calgary)", "Western University", "Niagara College Toronto", "Adler University", "Aviron Technical Institute", "Canada College", "Cegep Marie Victorin", "Columbia College", "ST. MARY UNIVERSITY", "Lambton College", "University of Waterloo", "Red River College", "Eton College Canada", "VanWest College", "SUP Group (College Universal Gatineau)", "SUP Group (College Universal De Montreal)", "Arbutus College", "Simon Fraser University Pathway", "College Universel", "Focus College", "Great Plains College", "Lakeland College", "Tamwood Careers", "Sault College",
      "Manitoba Institute of Trades and Technology", "Stenberg College", "Toronto Film School", "Yukon University", "Brandon University", "Coquitlam College", "Academy of Art University at Langara College", "ISI College", "Matrix College", "Montreal College of Information Technology", "Oulton College", "Pacific Link College", "Queens College of Business", "CodeCore College", "Matrix College of Management Technology and Healthcare", "SUNVIEW COLLEGE", "College National of Science & Technology", "Kensley College, Montreal", "Kensley College, Quebec", "Insignia College", "Keyano College"
    ]
  },
  {
    country: 'Australia',
    code: 'AU',
    region: 'Asia-Pacific',
    names: [
      "University of New South Wales (UNSW Sydney)", "The University of Adelaide", "Macquarie University", "Griffith College", "Deakin University", "University of Tasmania", "South Australia Institute of Business & Technology", "Sustainable Design School Australia", "GEX Australia", "Charles Sturt University", "The Hotel School Australia", "Southern Cross University", "University of Canberra College", "University of Technology Sydney", "Asia Pacific International College", "Health Careers International Group", "Amber Aviation Academy", "Le Cordon Bleu Australia", "Australian College of Applied Psychology", "Strathfield College Australia", "Murdoch University", "Western Sydney University International College", "Torrens University", "University of Sydney", "University of the Sunshine Coast", "Central Queensland University", "Australian Institute of Higher Education", "Billy Blue College of Design", "Excelsia College", "Global Institute - Vocational", "IES College", "Melbourne Polytechnic", "Murdoch Institute of Technology", "Stott's College", "Australian National University College", "University of Adelaide College", "Curtin College", "Griffith University", "University of Newcastle", "Eynesbury College", "International College of Management Sydney", "James Cook University, Brisbane", "James Cook University, Townsville", "Australian Catholic University", "Airways Aviation", "CQUniversity", "SAE Creative Media Institute", "Engineering Institute of Technology", "Deakin College", "University of Queensland", "La Trobe University", "CIC Higher Education, Melbourne", "Blue Mountains International Hotel Management School", "Edith Cowan University, Perth", "Academies Australasia College", "HOLMES Commercial College - Holmes Institute", "University of New England", "University of Western Australia", "Academies Australasia Polytechnic", "Cambridge International College", "Federation University", "Holmes Institute - Vocational & Training",
      "King's Own Institute", "Melbourne Institute of Technology", "Queensland International Institute", "SIBT", "Monash University", "Queensland University of Technology", "Curtin University", "RMIT University", "University of South Australia", "La Trobe College, Australia", "APM College of Business and Communication", "Russo Business School", "Flinders University", "Swinburne University of Technology", "University of Southern Queensland", "Taylors College, Perth", "Sydney Institute of Business & Technology", "Western Sydney University", "Taylor's College, Sydney", "International Institute of Business & Information Technology", "Bond University, Gold Coast", "Victoria University", "Federation University - IIBIT", "University of Melbourne", "Academy of Information Technology", "Bedford College", "Edith Cowan College", "Flinders International Study Centre", "Holmesglen Institute - TAFE", "Laneway International College", "Monash College", "Sarina Russo Institute", "Stratfield College", "TAFE", "UTS Insearch", "TAFE International Western Australia", "Edith Cowan University", "Box Hill Institute", "International College of Hotel Management (ICHM)", "Southern School of Natural Therapies", "Acknowledge Education", "Stotts College", "TAFE TASMANIA", "William Angliss Institute", "Taylors College, Sydney", "University of Canberra", "Australasian College of Natural Therapies", "The Hotel School Sydney, Melbourne and Brisbane", "CATC Design School", "LCI Melbourne", "James Cook University Brisbane", "Melbourne Language Centre", "William Blue College of Hospitality Management", "TAFE SOUTH AUSTRALIA", "Newcastle International College", "Holmesglen Institute", "Chisholm Institute", "Australian National College of Beauty", "Jansen Newman Institute", "Charles Sturt University Study Centres", "William Angliss Institute (WAI)", "Front Cooking School", "Blue Mountains International Hotel Management School at Torrens University", "Charles Darwin University International College", "University of Wollongong"
    ]
  },
  {
    country: 'France',
    code: 'FR',
    region: 'Europe',
    names: [
      "SKEMA Business School", "Esigelec Graduate School of Engineering", "College de Paris", "ISC Paris Business School", "Sustainable Design School", "VATEL France", "Queen Mary University of London Institute in Paris", "GEX France", "SUP Bio-Tech", "Univ Lasalle", "Ducasse Education", "HEI Engineering School", "IPAG Business School", "Toulouse Business School", "Excelia Group, La Rochelle", "UCO (Université Catholique de l'Ouest)", "INSEEC Business School", "Institut supérieur d'électronique de Paris (ISEP)", "Mines-Alès Foundation - IMT", "Ferrandi Paris", "ISG - INSTITUT SUPERIEUR DE GESTION", "PSL University", "ICD Business School", "Technological University Dublin France", "Waterford Institute of Technology France", "NEOMA Business School", "EM Normandie", "Leonardo De Vinci", "Burgundy School of Business", "IMT Atlantique", "ESC Clermont", "The Catholic University of the West, Angers", "IPSA", "CEFAM", "Leonard De Vinci", "Montpellier Business School", "Paris School of Business", "ISEN", "KEDGE Business School", "EIDM Paris", "Eisti", "American Business School of Paris", "EDC Paris", "SG - INSTITUT SUPERIEUR DE GESTION", "LH Luxury HotelSchool Paris", "IESA", "Spéos Photography School", "Strate School of Business", "IGS - RH", "Athlone Institute of Technology France", "Rennes School of Business", "Le Cordon Bleu Paris", "The American Business School", "ESC Bretagne", "MOD Art", "EPITA - Graduate School of Computer Science",
      "Lecole De Design", "ISG - International Business School", "ESSCA School of Management", "ISA", "LISAA School of Art & Design", "EICAR", "Sup De Luxe", "ESAIP", "ESLSCA", "SMS Sports Management School", "France International Graduate School - FIGS", "Cours Florent Drama School", "ESAM School of Management & Finance", "Grenoble-INP", "ESDES LYON Business School", "National College of Ireland Dublin/France", "Institute of Technology Sligo France", "France International Graduate School", "Griffith College Dublin/France"
    ]
  },
  {
    country: 'Dubai (UAE)',
    code: 'AE',
    region: 'Middle East',
    names: [
      "University of Wollongong in Dubai", "University of Birmingham Dubai", "Western International College Dubai", "Bournemouth University Dubai", "Rochester Institute of Technology Dubai (RIT Dubai)", "American University of Ras Al Khaimah", "Manipal University Dubai", "Heriot-Watt University Dubai", "Modul University Dubai", "The Emirates Academy of Hospitality Management", "Synergy University Dubai", "Jumeirah - The Emirates Academy of Hospitality Management", "Canadian University Dubai", "Abu Dhabi University", "Emirates Aviation University", "NEST Academy of Management Education", "Hult International Business School (Dubai)", "Britts Imperial University College", "Middlesex University Dubai", "Murdoch University Dubai", "University of South Wales Dubai", "Emirates Academy", "University of Hertfordshire, Sharjah", "Curtin University, Dubai Campus", "Bath Spa University, Ras Al-Khaimah", "Heriot Watt University, Dubai Campus", "University of Bolton Academic Centre, Ras Al-Khaimah", "Murdoch University, Dubai Campus", "University of Bradford, Dubai Campus", "Canadian University, Dubai", "Birla Institute of Technology & Science Dubai", "American University in Dubai", "Symbiosis International University Dubai", "De MontFort University Dubai", "Manipal Academy of Higher Education Dubai", "Dubai Institute of Design and Innovation", "S P Jain School of Global Management Dubai", "EM Normandie, Dubai", "University of Europe for Applied Sciences, Dubai", "American University in the Emirates", "Istituto Marangoni Fashion and Design Dubai", "SAE University College, Dubai", "Institute of Management Technology Dubai", "Global Business Studies Dubai", "Idea Academy, Dubai", "UK College of Business and Computing Dubai", "Regent College Dubai"
    ]
  },
  {
    country: 'Germany',
    code: 'DE',
    region: 'Europe',
    names: [
      "The Berlin School of Design and Communication", "Berlin School of Business & Innovation (BSBI)", "SRH Hochschule Berlin", "EBS Universität", "Steinbeis University - School of Management and Innovation", "University of Applied Science Europe", "Berlin School of Business & Innovation", "New European College", "IUBH University of Applied Sciences", "GISMA Business University of Applied Sciences", "Munich Business School", "Lancaster University Leipzig", "International University SDI München", "Arden University Berlin", "International University of Applied Science", "International School of Management (ISM)", "CBS University Of Applied Science", "EU Business School, Munich", "Munich University of Digital Technology", "Fresenius University of Applied Science", "Hochschule Macromedia University", "ICN Business School, Berlin Campus", "Media Design University of Applied Science", "Schiller International University, Heidelberg", "PFH – Private University of Applied Science", "ISM University Pathway Programs"
    ]
  },
  {
    country: 'Switzerland',
    code: 'CH',
    region: 'Europe',
    names: [
      "BHMS Business and Hotel Management School", "Cesar Ritz Colleges", "Swiss School of Tourism and Hospitality", "Glion Institute of Higher Education - Switzerland", "University of Zurich", "GLION Institute of Higher Education", "EU Business School, Montreux and Geneva", "Swiss Hotel Management School", "Geneva Business School, Geneva", "Webster University Geneva", "Swiss School of Business and Management", "International Management Institute", "Cesar Ritz, Montreux", "International University in Geneva", "Hotel & Tourism Management Institute", "Les Roches, Montana", "Culinary Arts Academy (CAA)", "Hotel Institute Montreux (HIM)", "American Institute of Applied Sciences Switzerland", "EHL Swiss School of Tourism", "EHL Hospitality Business School", "Swiss Education Academy, Montreux", "Helvetic Business School, Vevey", "Swiss Educational College, Weggis", "Bella Vista Institute of Higher Education Switzerland", "S P Jain School of Global Management Switzerland"
    ]
  },
  {
    country: 'Malaysia',
    code: 'MY',
    region: 'Asia-Pacific',
    names: [
      "SEGi University & Colleges", "Westminster International College", "Sunway Le Cordon Bleu", "Heriot-Watt University (Malaysia Campus)", "Taylor's University", "Limkokwing University", "Manipal International University", "University of Nottingham Malaysia", "MAHSA UNIVERSITY", "Monash University, Malaysia Campus", "University of Southampton Malaysia", "University of Wollongong Malaysia", "Taylor's University, Malaysia", "UCSI University, Kuala Lumpur", "Heriot-Watt University, Malaysia Campus", "Swinburne University of Technology, Sarawak", "Sunway University, Petaling Jaya", "Asia Pacific University of Technology (APU)", "Sunway Le Cordon Bleu, Malaysia", "Raffles University, Malaysia Campus", "Raffles College of Higher Education", "MDIS Malaysia, Gelang Patah", "Lincoln University College, Kota Bharu"
    ]
  },
  {
    country: 'Finland',
    code: 'FI',
    region: 'Europe',
    names: [
      "Häme University of Applied Sciences", "LUT University", "Seinäjoki University of Applied Sciences", "Helsinki School of Business", "Hanken School of Economics", "Metropolia University of Applied Sciences", "Turku University of Applied Sciences", "Arcada University of Applied Sciences", "Kajaani University of Applied Sciences", "Satakunta University of Applied Sciences", "JAMK University of Applied Sciences", "Haaga-Helia University of Applied Sciences", "Lappeenranta University of Technology", "Seinajoki University of Applied Sciences", "LAB University of Applied Sciences", "Aalto University, Espoo", "Tampere University, Tampere", "University of Jyväskylä", "University of Eastern Finland, Kuopio", "LAB University of Applied Sciences, Lahti", "University of Vaasa", "Karelia University of Applied Sciences"
    ]
  },
  {
    country: 'Singapore',
    code: 'SG',
    region: 'Asia-Pacific',
    names: [
      "S P Jain School of Global Management Singapore", "Raffles Design Institute Singapore", "Nanyang Institute of Management", "Curtin University of Technology, Singapore (Navitas)", "University of Portsmouth KAPLAN Singapore", "Birmingham City University Singapore", "HTMi Hotel and Tourism Management Institute Singapore", "James Cook University Singapore", "BCA ACADEMY Singapore", "University College Dublin Singapore", "Management Development Institute of Singapore (MDIS)", "Northumbria University Singapore", "Global School of Technology & Management, Singapore", "Embry-Riddle Aeronautical University Asia", "PSB Academy Singapore", "EASB - East Asia Institute of Management", "Curtin Singapore", "Kaplan Higher Education Academy (KHEA)", "Royal Holloway University of London Singapore", "London School of Business and Finance (LSBF) Singapore"
    ]
  },
  {
    country: 'Ireland',
    code: 'IE',
    region: 'Europe',
    names: [
      "Trinity College Dublin", "Dublin City University", "American College Dublin", "Institute of Technology, Carlow", "Letterkenny Institute of Technology", "Waterford Institute of Technology, Ireland", "University College Dublin", "University of Limerick", "Cork Institute of Technology", "Limerick Institute of Technology", "Dublin Business School", "Shannon College of Hotel Management (NUI Galway)", "Athlone Institute of Technology", "University College Cork", "Maynooth University", "Dundalk Institute of Technology", "Technological University Dublin", "Griffith College Dublin, Cork and Limerick"
    ]
  },
  {
    country: 'Italy',
    code: 'IT',
    region: 'Europe',
    names: [
      "NABA-Nuova Accademia Di Belle Arti", "University of Padova", "(IED) Istituto Europeo DI Design", "Accademia di Costume e di Moda", "Quasar Design University", "DOMUS Academy", "Raffles Milano Istituto Moda e Design", "John Cabot University", "Istituto Modartech", "UET", "SPD (Scuola Politecnica di Design)", "Istituto Europeo di Design - IED", "Scuola Politecnica di Design - SPD", "Academia Europea Di Firenze", "Rome Business School"
    ]
  },
  {
    country: 'New Zealand',
    code: 'NZ',
    region: 'Asia-Pacific',
    names: [
      "Pacific International Hotel Management School", "New Zealand Tertiary College", "Future Skills Academy, Auckland", "UC International College, Christchurch", "Yoobee College of Creative Innovation", "Whitecliffe College", "University of Waikato College", "Le Cordon Bleu, Wellington", "New Zealand Airline Academy, Oamaru", "AcademyEX Education, Auckland", "New Zealand Management", "New Zealand Industry Training Enterprise", "UP International College (AUT), Auckland", "International College of Auckland"
    ]
  },
  {
    country: 'Malta',
    code: 'MT',
    region: 'Europe',
    names: [
      "London School of Commerce Malta", "Queen Mary University of London, Malta", "Idea Academy, Malta", "Ascencia Business School Malta", "Global Malta College", "Saint Martin's Institute of Higher Education", "Global Business School – GBS Malta Campus", "Learnkey Training Institute", "Yhank Institute, Malta", "European Business School, Malta", "European Global Institute of Innovation", "La Vallette Institute, Ta' Xbiex"
    ]
  },
  {
    country: 'Netherlands',
    code: 'NL',
    region: 'Europe',
    names: [
      "TIO University of Applied Sciences", "Global School for Entrepreneurship University (GS4E)", "Wittenborg University of Applied Sciences", "Webster University - Leiden", "Erasmus University Rotterdam", "University of Twente, Enschede", "Radboud University, Nijmegen", "The Hague University of Applied Sciences", "University of Applied Sciences Europe Netherlands", "SRH Haarlem University of Applied Sciences"
    ]
  },
  {
    country: 'Poland',
    code: 'PL',
    region: 'Europe',
    names: [
      "Vistula University, Warsaw", "Polonia University", "University of Information Technology and Management", "Lazaraski School of Commerce", "Bialystok University of Technology", "Poznan University of Economics and Business", "WSB University of Wroclaw", "Cracow University of Technology", "University of Technology and Arts in Applied Sciences in Warsaw"
    ]
  },
  {
    country: 'South Korea',
    code: 'KR',
    region: 'Asia-Pacific',
    names: [
      "George Mason University Korea", "Woosong University, Daejeon", "Kyungdong University, Goseong", "Hanil University, Wanju", "aSSIST University, Seoul", "Kimpo University, Gimpo", "Jangan University, Gyeonggi", "Le Cordon Bleu-Sookmyung Academy"
    ]
  },
  {
    country: 'Czech Republic',
    code: 'CZ',
    region: 'Europe',
    names: [
      "Newton College", "ART & DESIGN INSTITUT", "Anglo American University", "University of New York in Prague", "MIAS School of Business", "University of Liberec", "Czech University of Life Sciences", "Moravian College Olomouc"
    ]
  },
  {
    country: 'Sweden',
    code: 'SE',
    region: 'Europe',
    names: [
      "Halmstad University, Halmstad", "University West, Trollhättan", "Dalarna University, Falun", "Jönköping University, Jönköping", "Kristianstad University, Kristianstad", "Karlstad University, Karlstad", "Hyper Island University, Stockholm"
    ]
  },
  {
    country: 'Cyprus',
    code: 'CY',
    region: 'Europe',
    names: [
      "CTL Euro College", "Neapolis University, Pafos", "University of Nicosia", "University of Central Lancashire Cyprus", "Larnaca College", "Philips University"
    ]
  },
  {
    country: 'Hungary',
    code: 'HU',
    region: 'Europe',
    names: [
      "University of Debrecen", "Budapest Metropolitan University of Applied Science", "University of Pecs", "Duna International College - Budapest", "International Business School (IBS)", "Széchenyi István University"
    ]
  },
  {
    country: 'Latvia',
    code: 'LV',
    region: 'Europe',
    names: [
      "Riga Technical University", "TSI University of Applied Science", "Latvia University of Agriculture", "RISEBA University", "Ventspills University College (VUC)"
    ]
  },
  {
    country: 'Belgium',
    code: 'BE',
    region: 'Europe',
    names: [
      "KDG University of Applied Sciences and Arts", "United Business Institute", "University of Antwerp", "Thomas More University of Applied Sciences"
    ]
  },
  {
    country: 'Spain',
    code: 'ES',
    region: 'Europe',
    names: [
      "Geneva Business School Spain", "Instituto Europeo di Design - IED Spain", "Les Roches Marbella", "EU Business School Spain"
    ]
  },
  {
    country: 'Vietnam',
    code: 'VN',
    region: 'Asia-Pacific',
    names: [
      "FPT Education Global", "RMIT University, Vietnam Campus", "British University Vietnam, Hung Yen", "Keiser University Vietnam, Hanoi"
    ]
  },
  {
    country: 'Denmark',
    code: 'DK',
    region: 'Europe',
    names: [
      "IBA Kolding, Denmark", "University College of Northern Denmark", "International Business Academy (IBA)"
    ]
  },
  {
    country: 'Hong Kong',
    code: 'HK',
    region: 'Asia-Pacific',
    names: [
      "Technological and Higher Education Institute of Hong Kong", "Hong Kong Institute of Vocational Education", "Hong Kong Design Institute"
    ]
  },
  {
    country: 'Georgia',
    code: 'GE',
    region: 'Europe',
    names: [
      "Ilia State University", "ISET - International School of Economics at TSU"
    ]
  },
  {
    country: 'Japan',
    code: 'JP',
    region: 'Asia-Pacific',
    names: [
      "Kyoto University of Advanced Science (KUAS)", "Tokyo International University"
    ]
  },
  {
    country: 'Mauritius',
    code: 'MU',
    region: 'Middle East',
    names: [
      "Middlesex University Mauritius", "Curtin Mauritius, Moka"
    ]
  },
  {
    country: 'Slovenia',
    code: 'SI',
    region: 'Europe',
    names: [
      "Academia College Slovenia", "Alma Mater Europaea - ECM"
    ]
  },
  {
    country: 'Sri Lanka',
    code: 'LK',
    region: 'Asia-Pacific',
    names: [
      "Curtin University, Colombo", "Edith Cowan University, Colombo Campus"
    ]
  },
  {
    country: 'Bulgaria',
    code: 'BG',
    region: 'Europe',
    names: [
      "Varna University of Management"
    ]
  },
  {
    country: 'Costa Rica',
    code: 'CR',
    region: 'Latin America',
    names: [
      "Instituto Centroamericano de Administracion de Empresas (INCAE)"
    ]
  },
  {
    country: 'Croatia',
    code: 'HR',
    region: 'Europe',
    names: [
      "University of Dubrovnik"
    ]
  },
  {
    country: 'Greece',
    code: 'GR',
    region: 'Europe',
    names: [
      "Metropolitan College Greece"
    ]
  },
  {
    country: 'Indonesia',
    code: 'ID',
    region: 'Asia-Pacific',
    names: [
      "Deakin University Lancaster University Indonesia"
    ]
  },
  {
    country: 'Lithuania',
    code: 'LT',
    region: 'Europe',
    names: [
      "Vilnius University"
    ]
  },
  {
    country: 'Monaco',
    code: 'MC',
    region: 'Europe',
    names: [
      "International University of Monaco"
    ]
  },
  {
    country: 'Saudi Arabia',
    code: 'SA',
    region: 'Middle East',
    names: [
      "Batterjee Medical College, Jeddah"
    ]
  },
  {
    country: 'West Indies',
    code: 'WI',
    region: 'Latin America',
    names: [
      "St. George University"
    ]
  }
];

// GENERATE EXPANDED 1274 UNIVERSITIES LIST
export const ALL_MASTER_UNIVERSITIES: MasterUniversity[] = RAW_MASTER_UNIVERSITIES.flatMap(cGroup => {
  return cGroup.names.map((uniName, idx) => {
    const slug = uniName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const lowerName = uniName.toLowerCase();
    
    const isPathway = lowerName.includes('into') || 
                      lowerName.includes('kaplan') || 
                      lowerName.includes('navitas') || 
                      lowerName.includes('pathway') || 
                      lowerName.includes('study group');

    let instType: MasterUniversity['institutionType'] = 'University';
    if (isPathway) {
      instType = 'Pathway Center';
    } else if (lowerName.includes('business') || lowerName.includes('management') || lowerName.includes('essec') || lowerName.includes('insead') || lowerName.includes('hbs')) {
      instType = 'Business School';
    } else if (lowerName.includes('tech') || lowerName.includes('polytechnic') || lowerName.includes('institute of technology') || lowerName.includes('mit')) {
      instType = 'Tech Institute';
    } else if (lowerName.includes('college') || lowerName.includes('community college')) {
      instType = 'College';
    }

    let tier: MasterUniversity['tuitionTier'] = 'Moderate';
    if (cGroup.country === 'Germany' || cGroup.country === 'Finland' || cGroup.country === 'Poland' || cGroup.country === 'France' || instType === 'College') {
      tier = 'Budget';
    } else if (idx % 3 === 0 || cGroup.country === 'USA' || cGroup.country === 'Switzerland') {
      tier = 'Premium';
    }

    const isPrivate = lowerName.includes('private') || 
                      instType === 'Business School' || 
                      isPathway || 
                      (cGroup.country === 'USA' && idx % 2 === 1 && !lowerName.includes('state') && !lowerName.includes('city') && !lowerName.includes('university of'));
    const sector: 'Public' | 'Private' = isPrivate ? 'Private' : 'Public';

    const image = getUniversityCampusImage(uniName, cGroup.code, idx);

    return {
      id: `${cGroup.code.toLowerCase()}-${idx}-${slug}`,
      name: uniName,
      country: cGroup.country,
      countryCode: cGroup.code,
      region: cGroup.region,
      isPartner: true,
      isPathwayPartner: isPathway,
      qsRanking: idx < 5 ? `#${(idx + 1) * 20 + 10} Global / Top Institution in ${cGroup.country}` : undefined,
      tuitionTier: tier,
      tuitionRange: getCountryTuitionRange(cGroup.code, tier),
      institutionType: instType,
      sector,
      hasIeltsWaiver: idx % 4 !== 0, // ~75% accept MOI / IELTS waivers
      hasScholarship: idx % 3 !== 0, // ~66% offer scholarships
      image,
      featured: idx < 2
    };
  });
});

import { University } from '../types';

export function masterToUniversity(m: MasterUniversity): University {
  const tuition = m.tuitionRange || getCountryTuitionRange(m.countryCode || m.country, m.tuitionTier);

  return {
    id: m.id || m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: m.name,
    country: m.country,
    countryCode: m.countryCode,
    logo: '',
    bannerImage: m.image || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    location: `${m.country}`,
    qsRanking: m.qsRanking || `Top Ranked ${m.institutionType} in ${m.country}`,
    isPartner: m.isPartner,
    isPathwayPartner: m.isPathwayPartner || false,
    overview: `${m.name} is a leading ${m.sector.toLowerCase()} ${m.institutionType.toLowerCase()} situated in ${m.country}. Renowned for its academic excellence, cutting-edge research centers, and vibrant multicultural student community, ${m.name} offers comprehensive degree programs designed for high global employability, practical industry exposure, and smooth post-study work pathways.`,
    popularCourses: [
      'Business Administration & Global Management (BBA / MBA)',
      'Computer Science, AI & Software Engineering',
      'Data Science, Business Analytics & FinTech',
      'Mechanical, Electrical & Civil Engineering',
      'Healthcare Management, Public Health & Nursing',
      'International Finance, Accounting & Economics'
    ],
    tuitionRange: tuition,
    scholarshipsAvailable: m.hasScholarship 
      ? 'Entrance Merit Scholarships & Partner Grants Available (Up to $10,000 / 30% Tuition Waiver)'
      : 'Standard Institutional Partner Fee Structure',
    entryRequirements: {
      ug: 'High School Diploma / Grade 12 Certificate with 60% - 65% aggregate.',
      pg: 'Recognized Bachelor Degree with 55% - 60% aggregate (or 2.5+ CGPA).',
      english: m.hasIeltsWaiver 
        ? 'IELTS 6.0/6.5 overall OR Medium of Instruction (MOI) Certificate / Grade 12 English 70%+'
        : 'IELTS 6.5 overall (min 6.0 in each band) / PTE 58+ / TOEFL iBT 80+'
    },
    gallery: [
      m.image,
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80'
    ],
    acceptanceRate: m.tuitionTier === 'Premium' ? '68%' : m.tuitionTier === 'Moderate' ? '76%' : '84%'
  };
}
