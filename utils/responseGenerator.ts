import type { ChatIntent, ParsedQuery } from '~/types/chat';
import type { Profile, BusinessProfile, PartnerPreferences } from '~/types/dataconnect';
import type { SearchResult } from '~/types/search';

/**
 * Generate a response based on search results
 */
export function generateResponse(
  parsedQuery: ParsedQuery,
  profileResults?: SearchResult<Profile>[],
  businessResults?: SearchResult<BusinessProfile>[],
  preferenceResults?: SearchResult<PartnerPreferences>[]
): string {
  const { intent, entities } = parsedQuery;
  
  // Check if we have any results
  const hasProfileResults = profileResults && profileResults.length > 0;
  const hasBusinessResults = businessResults && businessResults.length > 0;
  const hasPreferenceResults = preferenceResults && preferenceResults.length > 0;
  const hasAnyResults = hasProfileResults || hasBusinessResults || hasPreferenceResults;
  
  // If no results, return a message based on the intent
  if (!hasAnyResults) {
    switch (intent) {
      case 'search_profiles':
        return `I couldn't find any profiles matching your search${entities.skills ? ' for skills in ' + entities.skills.join(', ') : ''}. Try broadening your search criteria.`;
        
      case 'search_businesses':
        return `I couldn't find any businesses matching your search${entities.industries ? ' in the ' + entities.industries.join(', ') + ' industry' : ''}. Try broadening your search criteria.`;
        
      case 'search_preferences':
        return `I couldn't find any partner preferences matching your search${entities.skills ? ' for skills in ' + entities.skills.join(', ') : ''}. Try broadening your search criteria.`;
        
      case 'match_profile_to_businesses':
        return "I couldn't find any businesses that match your profile. Try updating your profile with more details or broadening your search criteria.";
        
      case 'match_business_to_profiles':
        return "I couldn't find any profiles that match your business. Try updating your business profile with more details or broadening your search criteria.";
        
      default:
        return "I couldn't find any results matching your search. Try rephrasing your question or using different keywords.";
    }
  }
  
  // Generate a response based on the intent and results
  switch (intent) {
    case 'search_profiles':
      if (hasProfileResults) {
        const count = profileResults!.length;
        const topSkills = getTopSkills(profileResults!);
        return `I found ${count} profile${count > 1 ? 's' : ''} matching your search${entities.skills ? ' for skills in ' + entities.skills.join(', ') : ''}. ${topSkills ? `Common skills include ${topSkills}.` : ''}`;
      }
      break;
      
    case 'search_businesses':
      if (hasBusinessResults) {
        const count = businessResults!.length;
        const topIndustries = getTopIndustries(businessResults!);
        return `I found ${count} business${count > 1 ? 'es' : ''} matching your search${entities.industries ? ' in the ' + entities.industries.join(', ') + ' industry' : ''}. ${topIndustries ? `Industries include ${topIndustries}.` : ''}`;
      }
      break;
      
    case 'search_preferences':
      if (hasPreferenceResults) {
        const count = preferenceResults!.length;
        const topSkillsNeeded = getTopSkillsNeeded(preferenceResults!);
        return `I found ${count} partner preference${count > 1 ? 's' : ''} matching your search${entities.skills ? ' for skills in ' + entities.skills.join(', ') : ''}. ${topSkillsNeeded ? `Skills in demand include ${topSkillsNeeded}.` : ''}`;
      }
      break;
      
    case 'match_profile_to_businesses':
      if (hasBusinessResults) {
        const count = businessResults!.length;
        const topMatch = businessResults![0];
        const matchScore = Math.round(topMatch.distance * 100);
        return `I found ${count} business${count > 1 ? 'es' : ''} that might be a good match for your profile. The top match is ${topMatch.item.name} with a ${matchScore}% match score.`;
      }
      break;
      
    case 'match_business_to_profiles':
      if (hasProfileResults) {
        const count = profileResults!.length;
        const topMatch = profileResults![0];
        const matchScore = Math.round(topMatch.distance * 100);
        return `I found ${count} profile${count > 1 ? 's' : ''} that might be a good match for your business. The top match is ${topMatch.item.name} with a ${matchScore}% match score.`;
      }
      break;
      
    case 'general_question':
      let response = "Based on the information I have:";
      
      if (hasProfileResults) {
        response += `\n- I found ${profileResults!.length} relevant profiles`;
      }
      
      if (hasBusinessResults) {
        response += `\n- I found ${businessResults!.length} relevant businesses`;
      }
      
      if (hasPreferenceResults) {
        response += `\n- I found ${preferenceResults!.length} relevant partner preferences`;
      }
      
      return response;
      
    default:
      return "Here are the results I found based on your query:";
  }
  
  // Fallback response
  return "Here are the results I found based on your query:";
}

/**
 * Get the top skills from profile results
 */
function getTopSkills(profileResults: SearchResult<Profile>[]): string | null {
  // Collect all skills
  const allSkills: string[] = [];
  profileResults.forEach(result => {
    if (result.item.skills && result.item.skills.length > 0) {
      allSkills.push(...result.item.skills);
    }
  });
  
  // Count occurrences of each skill
  const skillCounts: Record<string, number> = {};
  allSkills.forEach(skill => {
    skillCounts[skill] = (skillCounts[skill] || 0) + 1;
  });
  
  // Sort skills by count
  const sortedSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([skill]) => skill);
  
  // Return top 3 skills
  return sortedSkills.slice(0, 3).join(', ') || null;
}

/**
 * Get the top industries from business results
 */
function getTopIndustries(businessResults: SearchResult<BusinessProfile>[]): string | null {
  // Collect all industries
  const allIndustries: string[] = [];
  businessResults.forEach(result => {
    if (result.item.industry) {
      allIndustries.push(result.item.industry);
    }
  });
  
  // Count occurrences of each industry
  const industryCounts: Record<string, number> = {};
  allIndustries.forEach(industry => {
    industryCounts[industry] = (industryCounts[industry] || 0) + 1;
  });
  
  // Sort industries by count
  const sortedIndustries = Object.entries(industryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([industry]) => industry);
  
  // Return top 3 industries
  return sortedIndustries.slice(0, 3).join(', ') || null;
}

/**
 * Get the top skills needed from partner preference results
 */
function getTopSkillsNeeded(preferenceResults: SearchResult<PartnerPreferences>[]): string | null {
  // Collect all skills needed
  const allSkillsNeeded: string[] = [];
  preferenceResults.forEach(result => {
    if (result.item.skillsNeeded && result.item.skillsNeeded.length > 0) {
      allSkillsNeeded.push(...result.item.skillsNeeded);
    }
  });
  
  // Count occurrences of each skill
  const skillCounts: Record<string, number> = {};
  allSkillsNeeded.forEach(skill => {
    skillCounts[skill] = (skillCounts[skill] || 0) + 1;
  });
  
  // Sort skills by count
  const sortedSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([skill]) => skill);
  
  // Return top 3 skills
  return sortedSkills.slice(0, 3).join(', ') || null;
}
