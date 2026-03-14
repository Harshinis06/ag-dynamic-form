export interface Books {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  status: 'Available' | 'Borrowed' | 'Overdue' | 'Returned';
  borrowedBy?: string;       // Member ID
  borrowedDate?: string;
  dueDate?: string;
}
