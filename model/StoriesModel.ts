export interface StoriesResponse {
  error: boolean;
  message: string;
  listStory: ListStory[];
}

export interface ListStory {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
  createdAt: string;
  lat: number;
  lon: number;
}

export type GetStoriesParams = {
  page?: number;
  size?: number;
  location?: 0 | 1;
};
