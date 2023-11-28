import { useState } from 'react';
import { IconButton, Tooltip } from '@material-tailwind/react';
import Avatar from 'react-avatar';

const AvatarPopover: Component<{ member: Avatar }> = ({ member }) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false)
  };

  return (
    <Tooltip
      open={openPopover}
      handler={setOpenPopover}
      {...triggers}
      placement='bottom'
      content={member.name}
    >
      <Avatar
        round
        className='border-2 border-white hover:z-10 focus:z-10 cursor-pointer'
        src={member.imgURL ?? undefined}
        value={member.name
          .split(' ')
          .map((name) => name[0])
          .join('')}
      />
    </Tooltip>
  );
};

export const ShowMember: Component<{ members: Avatar[]; numVisibleMember: number }> = ({
  members,
  numVisibleMember
}) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false)
  };

  return (
    <div className='flex items-center space-x-4'>
      {members &&
        members
          .slice(0, numVisibleMember)
          .map((member, index) => <AvatarPopover key={index} member={member} />)}
      {members && members.length > numVisibleMember && (
        <Tooltip
          open={openPopover}
          handler={setOpenPopover}
          {...triggers}
          placement='bottom'
          content={
            <div className='flex flex-col gap-2'>
              {members.slice(numVisibleMember).map((member, index) => (
                <div key={index + numVisibleMember} className='flex gap-2'>
                  <Avatar
                    round
                    src={member.imgURL ?? undefined}
                    value={member.name
                      .split(' ')
                      .map((word) => word[0])
                      .join('')}
                  />
                  {member.name}
                </div>
              ))}
            </div>
          }
        >
          <IconButton
            size='sm'
            variant='outlined'
            className='rounded-full bg-blue-gray-800 border-white'
          >
            <span className='text-white font-semibold text-sm'>
              +{members.length - numVisibleMember}
            </span>
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};
