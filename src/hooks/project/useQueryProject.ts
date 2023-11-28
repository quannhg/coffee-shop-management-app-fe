import { useMemo } from 'react';
import { PROJECT_TIME, PROJECT_ITEMS_PER_PAGE } from '@constants';
import { useFilterProjectStore, useProjectSearchStore, useProjectGeneralStore } from '@states';
import { manipulateTime, fromToNow, timeCurrent } from '@utils';

export function useQueryProject() {
  const { status, timeInterval } = useFilterProjectStore();
  const { listProject } = useProjectSearchStore();
  const { activePage, queryProject } = useProjectGeneralStore();

  const projectParam = useMemo(() => {
    const param: ProjectRequest = {
      name: listProject.map((project) => project.name),
      status: status,
      sort: {
        status: 'asc',
        startDate: 'asc'
      },
      pageSize: PROJECT_ITEMS_PER_PAGE,
      pageNumber: activePage
    };
    if (timeInterval !== PROJECT_TIME[0]) {
      const startDateToNow = fromToNow(manipulateTime[timeInterval]);
      const current = timeCurrent();
      param.fromTime = startDateToNow;
      param.toTime = current;
    }

    return param;
  }, [activePage, listProject, status, timeInterval]);

  return {
    projectParam: projectParam,
    queryProjectParam: useMemo(
      () => async (projectParam: ProjectRequest) => await queryProject(projectParam),
      [queryProject]
    )
  };
}
