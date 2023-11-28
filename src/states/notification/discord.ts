import { discordService } from '@services';
import { create } from 'zustand';

export const useDiscordRecipientsStore = create<DiscordRecipients>()((set) => ({
  statusDiscord: 'UNINIT',
  channelList: [],
  memberList: [],
  getChannelList: async () => {
    set(() => ({ statusDiscord: 'PENDING' }));
    try {
      const channelList = await discordService.getChannels();
      set(() => ({ statusDiscord: 'SUCCESS', channelList: channelList }));
    } catch (err) {
      set(() => ({ statusDiscord: 'REJECT' }));
    }
  },
  getMemberList: async () => {
    set(() => ({ statusDiscord: 'PENDING' }));
    try {
      const memberList = await discordService.getMembers();
      set(() => ({ statusDiscord: 'SUCCESS', memberList: memberList }));
    } catch (err) {
      set(() => ({ statusDiscord: 'REJECT' }));
    }
  }
}));
