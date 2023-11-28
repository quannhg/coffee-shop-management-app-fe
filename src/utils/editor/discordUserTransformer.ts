export const discordUserTransformer = (markdownContent: string, memberList: DiscordMembers[]) => {
  const MENTION_REGEX = /<@(\d+)>/g;
  const matches = [...markdownContent.matchAll(MENTION_REGEX)];
  const discordMention = matches.map((match) => match[0]);
  const discordId = matches.map((match) => match[1]);
  const discordUsernameToMention: { [username: string]: string } = memberList.reduce(
    (result: { [username: string]: string }, member: DiscordMembers) => {
      result[`@${member.usernameDiscord}`] = `<@${member.discordId}>`;
      return result;
    },
    {}
  );

  const discordMentionToUsername: { [id: string]: string } = memberList.reduce(
    (result: { [id: string]: string }, member: DiscordMembers) => {
      result[`<@${member.discordId}>`] = `@${member.usernameDiscord}`;
      return result;
    },
    {}
  );

  const objectMemberList: { [id: string]: string } = memberList.reduce(
    (result: { [id: string]: string }, member: DiscordMembers) => {
      result[member.discordId] = `@${member.usernameDiscord}`;
      return result;
    },
    {}
  );
  const discordUsername = discordId.map((id) => objectMemberList[id]);

  return {
    discordMention: discordMention,
    discordUsername: discordUsername,
    discordMentionToUsername: discordMentionToUsername,
    discordUsernameToMention: discordUsernameToMention
  };
};

export const convertIdToUsername = (
  content: string,
  discordMention: string[],
  discordMentionToUsername: { [id: string]: string }
) => {
  const numOfMention = discordMention.length;
  for (let index = 0; index < numOfMention; ++index) {
    const element = discordMention[index];
    content = content.replace(element, discordMentionToUsername[element]);
  }
  return content;
};

export const convertUsernameToId = (
  content: string,
  discordUsername: string[],
  discordUsernameToMention: { [username: string]: string }
) => {
  const numOfMention = discordUsername.length;
  for (let index = 0; index < numOfMention; ++index) {
    const element = discordUsername[index];
    content = content.replace(element, discordUsernameToMention[element]);
  }
  return content;
};
