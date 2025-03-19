// models/stats.ts (FE)
import { getDailyStats as apiDaily, getMonthlyStats as apiMonthly, getRevenueStats as apiRevenue } from '@/services/management/admin/stats';

export const getDailyStats = async () => {
  const data = await apiDaily();
  return { appointments: { daily: data } };
};

export const getMonthlyStats = async () => {
  const data = await apiMonthly();
  return { appointments: { monthly: data } };
};

export const getRevenueStats = async () => {
  const data = await apiRevenue();
  return { revenue: data };
};
