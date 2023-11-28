import { memberSearchService } from '@services';
import { create } from 'zustand';

export const useMemberListStore = create<MemberListStore>()((set) => ({
  memberList: [],
  getMemberList: async () => {
    const searchMemberList = await memberSearchService.searchByName('');
    set({
      memberList: searchMemberList.map((obj) => {
        return { name: obj.name, id: obj.id };
      })
    });
  }
}));
