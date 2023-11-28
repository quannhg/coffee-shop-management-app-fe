type NotificationElements = {
  formFields: FormTemplate;
  markdown: string;
};

type MemberId = {
  id: string;
  name: string;
};

type ProjectId = {
  id: string;
  name: string;
};

type Meeting = {
  online: { isSelected: boolean; link: string };
  offline: boolean;
};

type DiscordRecipientsParams = {
  channelId: string[];
  otherAccount: {
    id: string;
    name: string;
  }[];
};

type ApproveProposalParams = {
  title: string;
  memberId: MemberId[];
  project: Record<string, string>;
  meeting: Meeting;
  time: string;
  recipients: { discord: DiscordRecipientsParams; gmail?: null };
};
