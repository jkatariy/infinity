// Maximum number of recently viewed solutions to store
const MAX_RECENT_SOLUTIONS = 10;

// Product interface
export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  slug: string;
}

/**
 * Add a product to recently viewed list
 * @param product Product to add to recently viewed
 */
export const addToRecentlyViewed = (product: Product): void => {
  if (typeof window === 'undefined') return;

  try {
    // Get current list from localStorage
    const recentlyViewedJSON = localStorage.getItem('recently-viewed-solutions') || '[]';
    let recentlyViewed: Product[] = JSON.parse(recentlyViewedJSON);

    // Remove product if it already exists in the list (to avoid duplicates)
    recentlyViewed = recentlyViewed.filter(item => item.id !== product.id);

    // Add product to the beginning of the array
    recentlyViewed.unshift(product);

      // Limit to MAX_RECENT_SOLUTIONS
  if (recentlyViewed.length > MAX_RECENT_SOLUTIONS) {
    recentlyViewed = recentlyViewed.slice(0, MAX_RECENT_SOLUTIONS);
    }

    // Save back to localStorage
    localStorage.setItem('recently-viewed-solutions', JSON.stringify(recentlyViewed));
  } catch (error) {
    console.error('Error adding product to recently viewed:', error);
  }
};

/**
 * Get list of recently viewed solutions
 * @returns Array of recently viewed solutions
 */
export const getRecentlyViewed = (): Product[] => {
  if (typeof window === 'undefined') return [];

  try {
    const recentlyViewedJSON = localStorage.getItem('recently-viewed-solutions') || '[]';
    return JSON.parse(recentlyViewedJSON);
  } catch (error) {
    console.error('Error getting recently viewed solutions:', error);
    return [];
  }
};

/**
 * Share a product using Web Share API or fallback to copying URL
 * @param product Product to share
 * @param url URL to share
 */
export const shareProduct = async (product: Product, url: string): Promise<boolean> => {
  const shareData = {
    title: product.name,
    text: `Check out this ${product.category} solution from Infinity Automated Solutions`,
    url,
  };

  try {
    // Try using Web Share API if available
    if (navigator.share) {
      await navigator.share(shareData);
      return true;
    } else {
      // Fallback to copying to clipboard
      await navigator.clipboard.writeText(url);
      return true;
    }
  } catch (error) {
    console.error('Error sharing product:', error);
    return false;
  }
}; 