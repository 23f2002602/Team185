
import type { Product } from '@/types';
// import { google } from 'googleapis';

// TODO: Implement Google Sheets fetching logic here.
// This is a placeholder to guide you. You'll need to set up API access
// and use environment variables for your API key and Sheet ID.

/*
Example of how you might fetch data (this is conceptual):

async function fetchProductsFromSheet(): Promise<Product[]> {
  try {
    const auth = new google.auth.GoogleAuth({
      // Ensure your GOOGLE_APPLICATION_CREDENTIALS environment variable is set
      // or provide keyFile path or credentials object.
      // For API Key usage (less secure, ensure sheet is public):
      // const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID; // Store your Sheet ID in .env.local
    const range = 'Sheet1!A2:G'; // Adjust sheet name and range as needed

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
      // key: apiKey, // if using API key
    });

    const rows = response.data.values;
    if (rows && rows.length) {
      return rows.map((row): Product => ({
        id: row[0] || String(Math.random()), // Assuming ID is in the first column
        name: row[1] || 'Unnamed Product',  // Assuming Name is in the second column
        description: row[2] || '',          // Assuming Description is in the third column
        price: parseFloat(row[3]) || 0,     // Assuming Price is in the fourth column
        category: row[4] || 'Uncategorized',// Assuming Category is in the fifth column
        condition: row[5] || 'Used - Good', // Assuming Condition is in the sixth column
        location: row[6] || 'Anywhere',     // Assuming Location is in the seventh column
        imageUrl: row[7] || 'https://placehold.co/600x400.png', // Assuming Image URL is in the eighth column
        imageHint: row[8] || 'product photo', // Assuming Image Hint is in the ninth column
        // Ensure the order matches your sheet columns and Product type
      }));
    }
    return [];
  } catch (err) {
    console.error('Error fetching products from Google Sheet:', err);
    return []; // Return empty array or throw error
  }
}

// You would then call this function, likely in a server component or API route:
// export const mockProducts: Product[] = await fetchProductsFromSheet();
// For now, we'll keep it as an empty array until you implement the above.
*/

export const mockProducts: Product[] = [];

// TODO: These could also be fetched from your Google Sheet or a dedicated configuration sheet.
export const productCategories = [
    'Electronics', 
    'Furniture', 
    'Clothing & Apparel', 
    'Books & Media', 
    'Sports & Outdoors', 
    'Home & Garden',
    'Toys & Games',
    'Vehicles & Parts',
    'Collectibles & Art',
    'Antiques',
    'Musical Instruments',
    'Other' // Keep "Other" as a fallback, "Add New Category" will be a special form value
];

export const productConditions: ('All' | Product['condition'])[] = ['All', 'New', 'Used - Like New', 'Used - Good', 'Used - Fair'];
export const productLocations = ['Any', 'Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'];

// Specific conditions for the "Add Item" form
export const addItemFormConditions = [
  "Very Good in condition",
  "Decent Condition",
  "Bad in condition",
] as const;

export type AddItemFormCondition = typeof addItemFormConditions[number];
