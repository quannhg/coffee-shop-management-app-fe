type SearchMember = {
  id: string;
  name: string;
  avatarUrl: string;
};

type MemberSuggestion = {
  name: string;
  avatarUrl: string;
};

type SearchMemberStore = {
  currentInputValue: string;
  setCurrentInputValue: (memberName: string) => void;
  resetCurrentInputValue: () => void;
};
