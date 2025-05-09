import axios from 'axios';
// Base URL for the backend API
const API_URL = 'http://localhost:8080/api/posts';

export interface Post {
  image: any;
  profilePictureUrl: string;
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  userId: string;
  username: string;
  createdAt: string;
  likes: number;
  ingredients: string[];
  steps: string[];
  tags: string[];
  cookTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
// Data structure used when creating a new post
export interface CreatePostRequest {
  title: string;
  content: string;
  imageUrl: string;
  userId: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
  cookTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
// Fetch all posts from the backend
export async function getPosts(_token: any): Promise<Post[]> {
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  return response.data;
}
// Fetch a single post by ID
export async function getPost(id: string): Promise<Post> {
  const response = await axios.get(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
}
// Create a new post
export async function createPost(data: CreatePostRequest): Promise<Post> {
  const response = await axios.post(API_URL, data, {
    withCredentials: true,
  });
  return response.data;
}
// Update an existing post by ID
export async function updatePost(id: string, data: Partial<Post>): Promise<Post> {
  const response = await axios.put(`${API_URL}/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
}
// Delete a post by ID
export async function deletePost(id: string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });
}