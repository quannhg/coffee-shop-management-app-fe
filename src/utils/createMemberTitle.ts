export function createMemberTitle(member: {
  role: 'COLLABORATOR' | 'ADMIN' | 'MEMBER';
  classYear?: string | null;
  orientation: 'ENGINEERING' | 'RESEARCH' | 'OPERATION_ASSISTANT' | 'HUMAN_RESOURCE';
}) {
  const { role, classYear, orientation } = member;
  let aggregateRole: string;

  if (member.role === 'ADMIN') aggregateRole = 'Quản trị viên';
  else {
    const orientationName = orientation
      .split('_')
      .map((word) => word[0] + word.slice(1).toLowerCase())
      .join(' ');

    if (orientation === 'ENGINEERING' || orientation === 'RESEARCH') {
      const roleName = role[0] + role.slice(1).toLowerCase();
      aggregateRole = `${orientationName} ${roleName}`;
    }
    // HR and OA are always members
    else aggregateRole = orientationName;

    if (classYear) aggregateRole = `${classYear} - ${aggregateRole}`;
  }

  return aggregateRole;
}
