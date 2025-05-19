export type SearchField = 'title' | 'description' | 'email' | 'price';

export const isValidSearchField = (field: string): field is SearchField => {
    return ['title', 'description', 'email', 'price'].includes(field);
}; 