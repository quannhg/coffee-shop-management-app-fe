import {
  Chip,
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography
} from '@material-tailwind/react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import filter from '@assets/filter.svg';
import { GENDERS, ROLES, RoleColor } from '@constants';
import { useEmployeeListStore } from '@states';

export function FilterEmployee() {
  const { employeeFilter, setFilter } = useEmployeeListStore();

  const { role: selectedRoles, gender: selectedGenders } = employeeFilter;

  const handleSelectedRole = (role: Role) => {
    const roleIndex = selectedRoles.findIndex((selectedRole) => selectedRole === role);

    if (roleIndex !== -1) {
      const updatedRoles = [...selectedRoles];
      updatedRoles.splice(roleIndex, 1);
      setFilter({ role: updatedRoles, gender: selectedGenders });
    } else {
      setFilter({ role: [...selectedRoles, role], gender: selectedGenders });
    }
  };

  const handleSelectedGender = (gender: Gender) => {
    const roleIndex = selectedGenders.findIndex((selectedGender) => selectedGender === gender);

    if (roleIndex !== -1) {
      const updatedGenders = [...selectedGenders];
      updatedGenders.splice(roleIndex, 1);
      setFilter({ role: selectedRoles, gender: updatedGenders });
    } else {
      setFilter({ role: selectedRoles, gender: [...selectedGenders, gender] });
    }
  };

  const handleClearFilter = () => {
    setFilter({ gender: [], role: [] });
  };

  return (
    <div className='w-fit'>
      <Popover placement='bottom-start'>
        <PopoverHandler>
          <Chip
            variant='ghost'
            color='teal'
            className='cursor-pointer hover:bg-teal-100 p-2'
            value={<FunnelIcon color='teal' className='w-6 h-6' />}
          />
        </PopoverHandler>
        <PopoverContent className='grid gap-2 w-76'>
          <Typography variant='h5' color='teal' className='font-bold'>
            Lọc nhân viên
          </Typography>
          <div className='grid gap-2'>
            <Typography variant='h6' color='blue-gray'>
              Vai trò
            </Typography>
            <div className='flex gap-2'>
              {ROLES.map((role, idx) => {
                return (
                  <span
                    key={idx}
                    onClick={() => handleSelectedRole(role)}
                    className='cursor-pointer w-fit'
                  >
                    <Chip
                      size='sm'
                      color={RoleColor[role]}
                      variant={selectedRoles.includes(role) ? undefined : 'outlined'}
                      value={role}
                    />
                  </span>
                );
              })}
            </div>
            <div className='grid grid-cols-3 gap-2 justify-items-center'></div>
          </div>
          <div className='grid gap-2'>
            <Typography variant='h6' color='blue-gray'>
              Giới tính
            </Typography>
            <div className='flex gap-2'>
              <span
                onClick={() => handleSelectedGender(GENDERS[0])}
                className='cursor-pointer w-fit'
              >
                <Chip
                  size='sm'
                  color='cyan'
                  variant={selectedGenders.includes(GENDERS[0]) ? undefined : 'outlined'}
                  value={GENDERS[0]}
                />
              </span>
              <span
                onClick={() => handleSelectedGender(GENDERS[1])}
                className='cursor-pointer w-fit'
              >
                <Chip
                  size='sm'
                  color='deep-purple'
                  variant={selectedGenders.includes(GENDERS[1]) ? undefined : 'outlined'}
                  value={GENDERS[1]}
                />
              </span>
            </div>
          </div>
          <div
            onClick={() => handleClearFilter()}
            className='flex items-center gap-2 p-1 w-fit cursor-pointer hover:bg-red-100 hover:rounded-full hover:border hover:border-red-200 active:border-red-300 active:bg-red-200'
          >
            <img src={filter} alt='Funnel Slash' />
            <span className='text-red-500 text-base font-medium'>Bỏ lựa chọn</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
