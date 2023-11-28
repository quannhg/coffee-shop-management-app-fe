type WorkingStatus = 'working' | 'completed' | 'quit' | 'stopped';

type ParticipateProject = {
  type: string;
  projectId: string;
  projectName: string;
  roleInProject: string;
  memberStatusInProject: WorkingStatus;
  joinedProjectAt?: number;
  projectStatus: ProjectStatus;
  allMembersOfProject: { userId: string; memberName: string; avatarUrl: string }[];
  leavedProjectAt?: number;
  totalTimeDurationJoined?: string;
  delayTime?: string;
  canceledDay?: number;
  hoursProjectCurrentWeek?: number;
  hoursProjectAveragePerMonth?: number;
  hoursProjectDataPerMonth?: number[];
  increaseTimePercent?: number;
  projectMaterials?: [
    {
      name: string;
      url: string;
    }
  ];
  quitReason?: string;
  timeElapsed?: string;
  reason?: string;
};

type DetailMemberProjectStore = {
  statusDetailMemberProject: StoreStatus;
  participateProjects: ParticipateProject[];
  getParticipateProject: promise<void>;
};
