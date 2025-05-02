// Define result types with distance metadata
export interface SearchResult<T> {
  item: T;
  distance: number;
}
