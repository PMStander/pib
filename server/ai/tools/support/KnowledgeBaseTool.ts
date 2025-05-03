import { StructuredTool } from "@langchain/core/tools";
import { z } from "zod";

/**
 * Tool for searching and retrieving knowledge base articles
 */
export class KnowledgeBaseTool extends StructuredTool {
  name = "knowledge_base";
  description = "Searches and retrieves knowledge base articles";
  
  schema = z.object({
    query: z.string().describe("Search query to find knowledge base articles")
  });
  
  // Sample knowledge base articles for demonstration
  private knowledgeBase: Record<string, any>[] = [
    {
      id: "KB001",
      title: "How to Reset Your Password",
      category: "Account",
      content: "This article explains how to reset your password:\n\n1. Go to the login page\n2. Click on 'Forgot Password'\n3. Enter your email address\n4. Follow the instructions in the password reset email\n5. Create a new, secure password\n\nIf you do not receive the password reset email, please check your spam folder or contact support.",
      tags: ["password", "reset", "account", "login"]
    },
    {
      id: "KB002",
      title: "Subscription Billing Cycles Explained",
      category: "Billing",
      content: "Our subscription billing cycles work as follows:\n\n- Monthly subscriptions are billed every 30 days from your initial signup date\n- Annual subscriptions are billed once per year from your initial signup date\n- All subscriptions auto-renew unless canceled\n- Billing occurs 24 hours before the start of your new billing cycle\n- You can change your billing cycle from your account settings\n\nFor any billing questions, please contact our billing department.",
      tags: ["billing", "subscription", "payment", "renewal"]
    },
    {
      id: "KB003",
      title: "Troubleshooting Common Login Issues",
      category: "Technical",
      content: "If you're having trouble logging in, try these steps:\n\n1. Clear your browser cache and cookies\n2. Try a different browser\n3. Ensure caps lock is off\n4. Reset your password\n5. Check if your account is locked (you'll receive an email if it is)\n6. Verify you're using the correct email address\n\nIf none of these steps resolve your issue, please contact support with details about the error message you're seeing.",
      tags: ["login", "troubleshooting", "error", "access"]
    },
    {
      id: "KB004",
      title: "How to Export Your Data",
      category: "Usage",
      content: "To export your data from our platform:\n\n1. Log in to your account\n2. Go to Settings > Data Management\n3. Select the 'Export' tab\n4. Choose which data you want to export\n5. Select your preferred format (CSV, Excel, or JSON)\n6. Click 'Generate Export'\n7. Once processing is complete, you'll receive an email with a download link\n\nNote: Large exports may take up to 24 hours to process.",
      tags: ["export", "data", "download", "csv", "excel"]
    },
    {
      id: "KB005",
      title: "Understanding Service Level Agreements (SLAs)",
      category: "Support",
      content: "Our Service Level Agreements (SLAs) define the level of service you can expect:\n\n- Priority 1 (Critical): Initial response within 1 hour, resolution efforts 24/7\n- Priority 2 (High): Initial response within 4 hours, resolution during business hours\n- Priority 3 (Medium): Initial response within 8 hours\n- Priority 4 (Low): Initial response within 24 hours\n\nSLA times are measured during business hours (9am-5pm in your registered timezone, Monday-Friday) unless you have premium support.",
      tags: ["sla", "support", "priority", "response time"]
    }
  ];
  
  constructor() {
    super();
  }
  
  /**
   * Search the knowledge base for articles matching the query
   * @param input The search query
   */
  async _call({ query }: { query: string }): Promise<string> {
    try {
      // Search for relevant articles
      const results = this.searchKnowledgeBase(query);
      
      if (results.length === 0) {
        return "No knowledge base articles found matching your query. Please try a different search term or contact support for assistance.";
      }
      
      // Format and return the results
      return this.formatSearchResults(results);
    } catch (error) {
      return `Error searching knowledge base: ${error.message}`;
    }
  }
  
  /**
   * Search the knowledge base for articles matching the query
   * @param query The search query
   */
  private searchKnowledgeBase(query: string): any[] {
    const queryLower = query.toLowerCase();
    const queryTerms = queryLower.split(/\s+/).filter(term => term.length >= 3);
    
    // Score each article based on query term matches
    const scoredResults = this.knowledgeBase.map(article => {
      let score = 0;
      
      // Check title for matches
      if (article.title.toLowerCase().includes(queryLower)) {
        score += 10;
      }
      
      // Check tags for exact matches
      article.tags.forEach((tag: string) => {
        if (queryTerms.includes(tag.toLowerCase())) {
          score += 5;
        }
      });
      
      // Check content for matches
      const contentLower = article.content.toLowerCase();
      queryTerms.forEach(term => {
        if (contentLower.includes(term)) {
          score += 2;
        }
      });
      
      // Check category match
      if (article.category.toLowerCase().includes(queryLower)) {
        score += 3;
      }
      
      return {
        ...article,
        score
      };
    });
    
    // Filter out articles with no matches and sort by score
    return scoredResults
      .filter(article => article.score > 0)
      .sort((a, b) => b.score - a.score);
  }
  
  /**
   * Format search results into a readable string
   * @param results The search results
   */
  private formatSearchResults(results: any[]): string {
    // Limit to top 3 results
    const topResults = results.slice(0, 3);
    
    // Format the results
    let output = `Found ${results.length} relevant knowledge base article(s). Here are the most relevant:\n\n`;
    
    topResults.forEach((article, index) => {
      output += `## ${article.title} (${article.id})\n`;
      output += `Category: ${article.category}\n`;
      output += `Tags: ${article.tags.join(', ')}\n\n`;
      output += `${article.content}\n\n`;
      
      if (index < topResults.length - 1) {
        output += `---\n\n`;
      }
    });
    
    // Add a note if there are more results
    if (results.length > 3) {
      output += `\nThere are ${results.length - 3} more articles matching your query. Please refine your search for more specific results.`;
    }
    
    return output;
  }
}
