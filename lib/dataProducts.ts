import { dataProductsStore } from './dataProductsStore';
import type { DataProduct } from '@/types/dataProduct';

export async function getAllDataProducts(): Promise<DataProduct[]> {
  return dataProductsStore.list();
}

export async function getDataProductBySlug(slug: string): Promise<DataProduct | undefined> {
  return dataProductsStore.bySlug(slug);
}

export { SUPPORT_FUNCTIONS, DP_BU_NAMES, DP_BU_COLORS } from './dataProductsMeta';
