import { getPageInfo } from '~/data/pagesInfo'
import type { FaqItem, AdvItem, SeoLink, PageInfo } from '~/data/pagesInfo'
import type { GalleryItem } from '~/data/gallery'

export type { FaqItem, AdvItem, SeoLink, PageInfo as PageContent }

/**
 * Fetches page content (faqItems, advantages, seoLinks) for a given slug.
 * Source of truth: data/pagesInfo.ts
 * Admin overrides stored in Nitro storage via /api/admin/page-content.
 * Merging done in /api/cms/page-content/[slug].
 */
export async function usePageContent(slug: string): Promise<PageInfo> {
  const { data } = await useAsyncData<PageInfo>(
    `page-content:${slug}`,
    () => $fetch<PageInfo>(`/api/cms/page-content/${slug}`),
    { default: () => getPageInfo(slug) },
  )
  return data.value ?? getPageInfo(slug)
}

/**
 * Gallery (дополнительные фото страницы) — uploaded via admin, falls back to [].
 */
export async function usePageGallery(slug: string): Promise<GalleryItem[]> {
  const { data } = await useAsyncData<GalleryItem[]>(
    `page-gallery:${slug}`,
    () => $fetch<GalleryItem[]>(`/api/cms/page-gallery/${slug}`),
    { default: () => [] as GalleryItem[] },
  )
  return data.value ?? []
}

/**
 * Portfolio (готовые работы) — from catalogGallery defaults, editable in admin.
 */
export async function usePagePortfolio(slug: string): Promise<GalleryItem[]> {
  const { data } = await useAsyncData<GalleryItem[]>(
    `portfolio:${slug}`,
    () => $fetch<GalleryItem[]>(`/api/cms/gallery/${slug}`),
    { default: () => [] as GalleryItem[] },
  )
  return data.value ?? []
}
