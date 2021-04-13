export interface SitemapItem {
  url: string;
  title: string;
  root?: boolean;
}

export interface Sitemap {
  projects_index: string;
  services_index: string;
  blog_index: string;
  agency_index: string;
  contacts_index: string;
  projects: SitemapItem[];
  services: SitemapItem[];
  blog: SitemapItem[];
}
