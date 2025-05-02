import type { ChatIntent, ParsedQuery } from '~/types/chat';

/**
 * Simple NLP utility for understanding user queries
 */

// Intent patterns
const intentPatterns = [
  {
    intent: 'search_profiles',
    patterns: [
      /find\s+(?:me\s+)?(?:a\s+)?(?:person|people|profile|profiles|users|candidates|professionals)/i,
      /search\s+(?:for\s+)?(?:person|people|profile|profiles|users|candidates|professionals)/i,
      /looking\s+(?:for\s+)?(?:person|people|profile|profiles|users|candidates|professionals)/i,
      /who\s+(?:has|have|knows|is|are|can)/i,
      /profiles?\s+(?:with|that|who)/i
    ]
  },
  {
    intent: 'search_businesses',
    patterns: [
      /find\s+(?:me\s+)?(?:a\s+)?(?:business|businesses|company|companies|organization|organizations)/i,
      /search\s+(?:for\s+)?(?:business|businesses|company|companies|organization|organizations)/i,
      /looking\s+(?:for\s+)?(?:business|businesses|company|companies|organization|organizations)/i,
      /which\s+(?:business|businesses|company|companies|organization|organizations)/i,
      /businesses?\s+(?:that|which|who)/i
    ]
  },
  {
    intent: 'search_preferences',
    patterns: [
      /find\s+(?:me\s+)?(?:a\s+)?(?:partner preference|preferences|partner requirements|requirements)/i,
      /search\s+(?:for\s+)?(?:partner preference|preferences|partner requirements|requirements)/i,
      /looking\s+(?:for\s+)?(?:partner preference|preferences|partner requirements|requirements)/i,
      /what\s+(?:are|is)\s+(?:the\s+)?(?:partner preference|preferences|partner requirements|requirements)/i
    ]
  },
  {
    intent: 'match_profile_to_businesses',
    patterns: [
      /match\s+(?:my|this)?\s*profile\s+(?:to|with)\s+businesses/i,
      /find\s+(?:me\s+)?businesses\s+(?:for|matching)\s+(?:my|this)?\s*profile/i,
      /which\s+businesses\s+(?:match|fit|are good for)\s+(?:my|this)?\s*profile/i
    ]
  },
  {
    intent: 'match_business_to_profiles',
    patterns: [
      /match\s+(?:my|this)?\s*business\s+(?:to|with)\s+profiles/i,
      /find\s+(?:me\s+)?profiles\s+(?:for|matching)\s+(?:my|this)?\s*business/i,
      /which\s+profiles\s+(?:match|fit|are good for)\s+(?:my|this)?\s*business/i
    ]
  },
  {
    intent: 'greeting',
    patterns: [
      /^(?:hi|hello|hey|greetings|howdy|hiya)(?:\s|$)/i,
      /^(?:good\s+(?:morning|afternoon|evening|day))(?:\s|$)/i
    ]
  },
  {
    intent: 'help',
    patterns: [
      /^(?:help|assist|support|guide)(?:\s|$)/i,
      /what\s+can\s+you\s+do/i,
      /how\s+(?:do|can)\s+(?:I|you|we)/i,
      /show\s+me\s+how/i
    ]
  }
];

// Entity extraction patterns
const entityPatterns = {
  skills: [
    /skills?\s+(?:in|like|such as)?\s+([^.?!]+)/i,
    /(?:knows|knowing|experienced in|expertise in|proficient in)\s+([^.?!]+)/i
  ],
  industries: [
    /industr(?:y|ies)\s+(?:like|such as)?\s+([^.?!]+)/i,
    /(?:in|from|within)\s+(?:the\s+)?([^.?!]+)\s+(?:industry|sector|field)/i
  ],
  locations: [
    /location(?:s)?\s+(?:in|like|such as)?\s+([^.?!]+)/i,
    /(?:in|from|near|around)\s+([^.?!]+)/i,
    /based\s+(?:in|near|around)\s+([^.?!]+)/i
  ]
};

/**
 * Parse a user query to determine intent and extract entities
 */
export function parseQuery(text: string): ParsedQuery {
  // Default result
  const result: ParsedQuery = {
    intent: 'unknown',
    entities: {},
    originalText: text
  };
  
  // Determine intent
  for (const { intent, patterns } of intentPatterns) {
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        result.intent = intent as ChatIntent;
        break;
      }
    }
    if (result.intent !== 'unknown') break;
  }
  
  // If we couldn't determine a specific intent, default to general search based on keywords
  if (result.intent === 'unknown') {
    if (/business|company|organization|startup|enterprise/i.test(text)) {
      result.intent = 'search_businesses';
    } else if (/profile|person|people|professional|candidate|user/i.test(text)) {
      result.intent = 'search_profiles';
    } else if (/preference|requirement|partner/i.test(text)) {
      result.intent = 'search_preferences';
    } else {
      result.intent = 'general_question';
    }
  }
  
  // Extract entities
  result.entities.searchText = text; // Use the full text as search text
  
  // Extract skills
  const skills: string[] = [];
  for (const pattern of entityPatterns.skills) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const extractedSkills = match[1].split(/,|\sand\s/).map(s => s.trim());
      skills.push(...extractedSkills);
    }
  }
  if (skills.length > 0) {
    result.entities.skills = skills;
  }
  
  // Extract industries
  const industries: string[] = [];
  for (const pattern of entityPatterns.industries) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const extractedIndustries = match[1].split(/,|\sand\s/).map(s => s.trim());
      industries.push(...extractedIndustries);
    }
  }
  if (industries.length > 0) {
    result.entities.industries = industries;
  }
  
  // Extract locations
  const locations: string[] = [];
  for (const pattern of entityPatterns.locations) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const extractedLocations = match[1].split(/,|\sand\s/).map(s => s.trim());
      locations.push(...extractedLocations);
    }
  }
  if (locations.length > 0) {
    result.entities.locations = locations;
  }
  
  // Extract limit
  const limitMatch = text.match(/(?:show|find|get|display|limit)\s+(?:me\s+)?(\d+)/i);
  if (limitMatch && limitMatch[1]) {
    result.entities.limit = parseInt(limitMatch[1], 10);
  }
  
  return result;
}

/**
 * Generate a response based on the parsed query
 */
export function generateResponseTemplate(parsedQuery: ParsedQuery): string {
  const { intent, entities } = parsedQuery;
  
  switch (intent) {
    case 'greeting':
      return "Hello! I'm your AI assistant for Partners in Biz. How can I help you today? You can ask me to find profiles, businesses, or partner preferences.";
      
    case 'help':
      return "I can help you find potential business partners and match profiles with businesses. Try asking me things like:\n\n" +
        "- Find profiles with JavaScript skills\n" +
        "- Search for businesses in the tech industry\n" +
        "- Match my profile with businesses\n" +
        "- Find partner preferences for marketing skills";
      
    case 'search_profiles':
      return `Here are some profiles that match your search${entities.skills ? ' for skills in ' + entities.skills.join(', ') : ''}:`;
      
    case 'search_businesses':
      return `Here are some businesses that match your search${entities.industries ? ' in the ' + entities.industries.join(', ') + ' industry' : ''}:`;
      
    case 'search_preferences':
      return `Here are partner preferences that match your search${entities.skills ? ' for skills in ' + entities.skills.join(', ') : ''}:`;
      
    case 'match_profile_to_businesses':
      return "Here are businesses that might be a good match for your profile:";
      
    case 'match_business_to_profiles':
      return "Here are profiles that might be a good match for your business:";
      
    case 'general_question':
      return "I'll try to answer your question based on the information I have:";
      
    case 'unknown':
    default:
      return "I'm not sure I understand what you're looking for. Could you try rephrasing your question? You can ask me to find profiles, businesses, or partner preferences.";
  }
}
