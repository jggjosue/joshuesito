export interface ProjectsCard {
  title: string;
  _id: string;
  imageUrl: string;
  tags: string[];
  description: any;
  link: string;
}

export interface simpleBlogCard {
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: any;
}

export interface fullBlog {
  currentSlug: string;
  title: string;
  content: any;
  titleImage: any;
  _createdAt?: string;
}
