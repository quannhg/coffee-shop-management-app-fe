import { useMemo } from 'react';
import { MEMBER_ITEMS_PER_PAGE } from '@constants';
import { useMemberGeneralStore, useFilterMemberStore } from '@states';

export function useQueryMember() {
  const { status, roles, standard } = useFilterMemberStore();
  const { activePage, queryMember } = useMemberGeneralStore();

  const memberParam = useMemo(() => {
    const param: MemberRequest = {
      pagination: {
        page: activePage,
        perpage: MEMBER_ITEMS_PER_PAGE
      },
      filter: {
        status: status,
        roles: roles,
        standard: standard
      }
    };

    return param;
  }, [activePage, roles, standard, status]);

  return {
    memberParam: memberParam,
    queryMemberParam: useMemo(
      () => async (memberParam: MemberRequest) => await queryMember(memberParam),
      [queryMember]
    )
  };
}
