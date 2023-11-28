import { server, invoke } from '@services';

export const discordService = {
  getChannels: () => invoke<DiscordChannels[]>(server.get(`/api/templates/notification/channels`)),
  getMembers: () => invoke<DiscordMembers[]>(server.get(`/api/members/discord-id-list`))
};
