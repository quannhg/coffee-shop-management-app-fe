type UserInfo = {
  id: string;
  username: string;
  email: string | null;
  avatarUrl: string | null;
  phone: string | null;
  birthdate: number | null;
  orientation: 'RESEARCH' | 'ENGINEERING' | 'OPERATION_ASSISTANT' | 'HUMAN_RESOURCE' | null;
  urls: string[];
};
