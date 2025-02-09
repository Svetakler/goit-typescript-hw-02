export interface User {
  name: string;
  links: {
    html: string;
  };
}

export interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular?: string;
  };
  tags?: string[];
  user?: User;
  likes?: number;
  description?: string;
}
