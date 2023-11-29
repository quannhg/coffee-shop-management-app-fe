import { paths } from '@openapi-spec';
import { apiClient } from './common';

async function getAll() {
  const { data, error } = await apiClient.GET('/api/members');
  if (data) return data;
  throw error;
}

export type CreateMemberDto =
  paths['/api/members']['post']['requestBody']['content']['application/json'];

async function create(member: CreateMemberDto) {
  const { data, error } = await apiClient.POST('/api/members', {
    body: member
  });
  if (data) return data;
  throw error;
}

async function getDetails(memberId: string) {
  const { data, error } = await apiClient.GET('/api/members/{memberId}/details', {
    params: {
      path: { memberId }
    }
  });
  if (data) return data;
  throw error;
}

async function getStandard(memberId: string, standardType: StandardType) {
  const { data, error } = await apiClient.GET('/api/members/{memberId}/standards', {
    params: {
      path: { memberId },
      query: { type: standardType }
    }
  });
  if (data) return data;
  throw error;
}

async function getWorklogStats(memberId: string, range: { from: number; to: number }) {
  const { data, error } = await apiClient.GET('/api/members/{memberId}/worklogs', {
    params: {
      path: { memberId },
      query: range
    }
  });
  if (data) return data;
  throw error;
}

export const memberService = {
  getAll,
  create,
  getDetails,
  getStandard,
  getWorklogStats
};
