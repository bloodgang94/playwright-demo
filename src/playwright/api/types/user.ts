export type User = {
  name: string;
  job: string;
};

export type UserResponse = User & {
  id: string;
  createdAt: string;
};
