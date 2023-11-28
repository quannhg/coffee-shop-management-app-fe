type NotificationDetailStore = {
  sendingStep: number;
  mediaTab: string;
  editorReadOnly: boolean;
  approveProposalParams: ApproveProposalParams | null;
  setSendingStep: (payload: number) => void;
  setMediaTab: (payload: string) => void;
  setEditorReadOnly: (payload: boolean) => void;
  setApproveProposalParams: (payload: ApproveProposalParams) => void;
};
