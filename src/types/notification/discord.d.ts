type DiscordMembers = {
  id: string;
  name: string;
  avatarUrl: string;
  discordId: string;
  usernameDiscord: string;
};

type DiscordChannels = {
  id: string;
  name: string;
};

type DiscordRecipients = {
  statusDiscord: StoreStatus;
  channelList: DiscordChannels[];
  memberList: DiscordMembers[];
  getChannelList: () => Promise<void>;
  getMemberList: () => Promise<void>;
};
