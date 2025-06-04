
"use client";

import { useEffect, useState, useCallback } from 'react';
import { getProductSuggestions, type ProductSuggestionsOutput } from '@/ai/flows/product-suggestions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IconSpinner } from '@/components/icons';
import { Wand2 } from 'lucide-react';

interface AIProductSuggestionsProps {
  browsingHistory: string[]; // Array of product names
}

export function AIProductSuggestions({ browsingHistory }: AIProductSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<ProductSuggestionsOutput>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = useCallback(async () => {
    if (browsingHistory.length === 0) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const historyString = browsingHistory.join(', ');
      const result = await getProductSuggestions({ browsingHistory: historyString, numberOfSuggestions: 3 });
      setSuggestions(result);
    } catch (err) {
      console.error("Error fetching AI suggestions:", err);
      setError("Failed to load suggestions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [browsingHistory]);

  useEffect(() => {
    // Fetch suggestions when browsing history changes, but only if there's history.
    // Debounce or delay could be added here if history updates too frequently.
    if (browsingHistory.length > 0) {
      fetchSuggestions();
    } else {
      setSuggestions([]); // Clear suggestions if history is empty
    }
  }, [browsingHistory, fetchSuggestions]);


  if (browsingHistory.length === 0 && suggestions.length === 0 && !isLoading) {
    return (
        <Card className="bg-accent/20 border-accent/50">
            <CardHeader>
                <CardTitle className="text-lg font-headline flex items-center"><Wand2 className="mr-2 h-5 w-5 text-accent" /> AI Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground font-body">Click the 'Suggest' button on products to see personalized recommendations here!</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="bg-accent/20 border-accent/50">
      <CardHeader>
        <CardTitle className="text-lg font-headline flex items-center"><Wand2 className="mr-2 h-5 w-5 text-accent" /> AI Product Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <IconSpinner className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 font-body">Finding recommendations...</p>
          </div>
        )}
        {error && <p className="text-destructive font-body">{error}</p>}
        {!isLoading && !error && suggestions.length === 0 && browsingHistory.length > 0 && (
          <p className="text-muted-foreground font-body">No suggestions found based on your current history.</p>
        )}
        {!isLoading && !error && suggestions.length > 0 && (
          <ul className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="p-3 border rounded-md bg-background shadow-sm">
                <h4 className="font-semibold font-headline text-primary">{suggestion.productName}</h4>
                <p className="text-sm text-muted-foreground font-body">{suggestion.reason}</p>
              </li>
            ))}
          </ul>
        )}
        {browsingHistory.length > 0 && !isLoading && (
             <Button onClick={fetchSuggestions} variant="ghost" size="sm" className="mt-4 text-accent hover:text-accent-foreground hover:bg-accent/30">
                Refresh Suggestions
            </Button>
        )}
      </CardContent>
    </Card>
  );
}
