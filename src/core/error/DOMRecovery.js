/**
 * Handles DOM element recovery and repair
 */
export class DOMRecovery {
  /**
   * Verify element exists and has required structure
   */
  static verifyElement(element, requiredSelectors = []) {
    if (!element) return false;
    return requiredSelectors.every(selector => element.querySelector(selector));
  }

  /**
   * Attempt to repair missing DOM structure
   */
  static repairElement(element, template) {
    if (!element) return null;
    
    try {
      // Preserve existing content if possible
      const content = element.innerHTML;
      element.innerHTML = template;
      
      // Restore content to appropriate container if it exists
      const contentContainer = element.querySelector('[data-content]');
      if (contentContainer && content) {
        contentContainer.innerHTML = content;
      }
      
      return element;
    } catch (error) {
      console.error('Failed to repair element:', error);
      return null;
    }
  }

  /**
   * Create replacement element if repair fails
   */
  static createReplacement(id, className, template) {
    const replacement = document.createElement('div');
    replacement.id = id;
    replacement.className = className;
    replacement.innerHTML = template;
    return replacement;
  }

  /**
   * Replace failed element with working version
   */
  static replaceElement(failed, replacement) {
    if (failed && replacement) {
      failed.parentNode?.replaceChild(replacement, failed);
      return true;
    }
    return false;
  }
}