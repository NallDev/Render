export interface AddStoryRequest {
  description: string;
  photo: File;
  lat?: number;
  lon?: number;
}

export interface AddStoryResponse {
  error: boolean;
  message: string;
}
