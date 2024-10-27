export type Review = {
  id: number;
  rating: number;
  review: string | null;
  author: string;
};

export type ReviewData = {
  reviews: Review[];
};
