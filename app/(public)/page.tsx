import Link from 'next/link'
import { Truck, Banknote, RefreshCw, ShieldCheck } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { getNewArrivals, getFeaturedProducts } from '@/lib/data/db'
import { createClient } from '@/lib/supabase/server'
import { CategoryIcon } from '@/components/ui/CategoryIcon'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Byby Kids — Vêtements bébé & enfant au Maroc',
  description: 'Boutique de vêtements bébé et enfant au Maroc. Des pièces douces pour tous les jours. Livraison partout au Maroc. Paiement à la livraison.',
}

const CATEGORY_TILES = [
  { slug: 'naissance',   label: 'Naissance',   sub: '0–24 mois',    bg: '#DEEEF8', accent: '#2A7BAD', emoji: '🍼' },
  { slug: 'bebe-fille',  label: 'Bébé fille',  sub: '0–2 ans',      bg: '#FDDDE9', accent: '#B83870', emoji: '🎀' },
  { slug: 'bebe-garcon', label: 'Bébé garçon', sub: '0–2 ans',      bg: '#CEEAF8', accent: '#1A6B9A', emoji: '🧸' },
  { slug: 'fille',       label: 'Fille',        sub: '2–12 ans',     bg: '#FDDDE9', accent: '#C0527A', emoji: '👗' },
  { slug: 'garcon',      label: 'Garçon',       sub: '2–12 ans',     bg: '#CEEAF8', accent: '#2A7BAD', emoji: '👕' },
  { slug: 'pyjamas',     label: 'Pyjamas',      sub: 'Toutes tailles', bg: '#FFF3D6', accent: '#8A6000', emoji: '🌙' },
  { slug: 'robes',       label: 'Robes',        sub: 'Fille & enfant', bg: '#FDDDE9', accent: '#B83870', emoji: '✨' },
  { slug: 'ensembles',   label: 'Ensembles',    sub: 'Bébé & enfant',  bg: '#D4F0E4', accent: '#2A8A5A', emoji: '🎽' },
  { slug: 'chaussures',  label: 'Chaussures',   sub: 'Tous âges',    bg: '#FFF3D6', accent: '#7A5000', emoji: '👟' },
  { slug: 'accessoires', label: 'Accessoires',  sub: 'Bonnets, sacs…', bg: '#E8D8F8', accent: '#6A3A9A', emoji: '🎒' },
]

const TRUST_ITEMS = [
  { Icon: Truck,       label: 'Livraison partout au Maroc', sub: '2 à 4 jours ouvrés',      bg: '#DEEEF8', color: '#2A7BAD' },
  { Icon: Banknote,    label: 'Paiement à la livraison',    sub: 'Vous payez à la réception', bg: '#FDDDE9', color: '#B83870' },
  { Icon: RefreshCw,   label: 'Échange sous 7 jours',       sub: 'Retour facile garanti',     bg: '#D4F0E4', color: '#2A8A5A' },
  { Icon: ShieldCheck, label: 'Qualité garantie',           sub: 'Matières douces & sûres',   bg: '#FFF3D6', color: '#8A6000' },
]

export default async function HomePage() {
  const supabase = await createClient()
  const [newArrivals, bestSellers, { data: settings }] = await Promise.all([
    getNewArrivals(8),
    getFeaturedProducts(8),
    supabase.from('store_settings').select('*').single(),
  ])

  const hero = {
    badge:    settings?.hero_badge    ?? '🌟 Nouvelle collection 2026',
    title:    settings?.hero_title    ?? 'Vêtements bébé\n& enfant au Maroc',
    subtitle: settings?.hero_subtitle ?? 'Des tenues douces, pratiques et adorables pour tous les jours.',
    ctaLabel: settings?.hero_cta_label ?? 'Voir la collection',
    ctaHref:  settings?.hero_cta_href  ?? '/shop',
    videoUrl: settings?.hero_video_url ?? null,
  }

  return (
    <div className="bg-[#FAFAF7]">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Fond dégradé bleu→rose très doux */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EAF5FC] via-[#F8F0F8] to-[#FEF0F6]" />

        {/* Cercles décoratifs */}
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[#6BAED6]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-[#EF8DB2]/10 blur-3xl pointer-events-none" />

        <div className="relative lg:grid lg:grid-cols-[1fr_520px] xl:grid-cols-[1fr_600px] 2xl:grid-cols-[1fr_680px] lg:h-[620px] xl:h-[680px]">

          {/* Text panel */}
          <div className="flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-14 lg:h-full">
            {hero.badge && (
              <div className="inline-flex items-center gap-2 mb-5 self-start bg-white/80 rounded-full px-4 py-1.5 shadow-sm border border-[#EF8DB2]/30">
                <span className="text-[12px] font-bold text-[#EF8DB2] tracking-wide">
                  {hero.badge}
                </span>
              </div>
            )}

            <h1 className="text-[38px] sm:text-[46px] md:text-[54px] lg:text-[60px] xl:text-[68px] leading-[1.05] font-extrabold text-[#1C1C1E] mb-5 whitespace-pre-line">
              {hero.title.split('\n').map((line: string, i: number) => (
                <span key={i}>
                  {i === 1 ? <span className="text-[#6BAED6]">{line}</span> : line}
                  {i === 0 && '\n'}
                </span>
              ))}
            </h1>

            {hero.subtitle && (
              <p className="text-sm md:text-base lg:text-[17px] text-[#6B6B6B] leading-relaxed mb-5 max-w-lg">
                {hero.subtitle}
              </p>
            )}

            {/* Mini trust pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center gap-1.5 bg-[#DEEEF8] text-[#2A7BAD] text-xs font-bold px-3 py-1.5 rounded-full">
                💳 Paiement à la livraison
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#FDDDE9] text-[#B83870] text-xs font-bold px-3 py-1.5 rounded-full">
                🚚 Livraison Maroc
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={hero.ctaHref}
                className="inline-block bg-[#6BAED6] text-white text-sm md:text-base font-bold px-8 py-3.5 rounded-2xl hover:bg-[#4A8FBA] transition-all hover:shadow-lg hover:-translate-y-0.5 shadow-md shadow-[#6BAED6]/30"
              >
                {hero.ctaLabel} →
              </Link>
              <Link
                href="/promotions"
                className="inline-flex items-center gap-2 bg-[#EF8DB2] text-white text-sm md:text-base font-bold px-6 py-3.5 rounded-2xl hover:bg-[#C9608A] transition-all hover:shadow-lg hover:-translate-y-0.5 shadow-md shadow-[#EF8DB2]/30"
              >
                🏷️ Promotions
              </Link>
            </div>
          </div>

          {/* Media panel */}
          <div className="relative order-first lg:order-last h-64 sm:h-80 md:h-96 lg:h-full overflow-hidden">
            {hero.videoUrl ? (
              <>
                <video
                  src={hero.videoUrl}
                  autoPlay muted loop playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <div>
                    <p className="text-white text-base font-extrabold drop-shadow">Bébé &amp; Enfant</p>
                    <p className="text-white/70 text-xs mt-1">{hero.badge}</p>
                  </div>
                  <Link href="/shop" className="shrink-0 bg-white text-[#1C1C1E] text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#EAF5FC] hover:text-[#6BAED6] transition-colors">
                    Voir tout →
                  </Link>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 grid grid-rows-2 gap-1 p-2">
                <Link href="/shop?category=naissance"
                  className="bg-gradient-to-br from-[#CEEAF8] to-[#DEEEF8] rounded-2xl flex flex-col items-center justify-center text-center px-6 hover:from-[#B8DFF5] hover:to-[#CEEAF8] transition-all hover:shadow-md group">
                  <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🍼</span>
                  <span className="text-lg md:text-xl font-extrabold text-[#2A7BAD]">Bébé &amp; Naissance</span>
                  <span className="text-xs text-[#2A7BAD]/70 mt-0.5">0 – 24 mois</span>
                </Link>
                <Link href="/shop?category=fille"
                  className="bg-gradient-to-br from-[#FDDDE9] to-[#FEE8F0] rounded-2xl flex flex-col items-center justify-center text-center px-6 hover:from-[#F9C8DA] hover:to-[#FDDDE9] transition-all hover:shadow-md group">
                  <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">👗</span>
                  <span className="text-lg md:text-xl font-extrabold text-[#C0527A]">Fille &amp; Garçon</span>
                  <span className="text-xs text-[#C0527A]/70 mt-0.5">2 – 12 ans</span>
                </Link>
              </div>
            )}
          </div>

        </div>

        {/* Ligne dégradée bas */}
        <div className="relative h-1.5 w-full bg-gradient-to-r from-[#6BAED6] via-[#EF8DB2] to-[#6DBF9E]" />
      </section>

      {/* ── Category tiles ──────────────────────────────────────── */}
      <section className="bg-white border-b border-[#EBEBEB] py-7 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xl font-extrabold text-[#1C1C1E]">Nos catégories</span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#EBEBEB] to-transparent" />
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-10 gap-2 md:gap-3">
            {CATEGORY_TILES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="group flex flex-col items-center rounded-2xl py-4 px-2 text-center transition-all duration-200 hover:scale-[1.06] hover:shadow-lg border-2 border-transparent hover:border-white"
                style={{ backgroundColor: cat.bg }}
              >
                <div className="mb-1.5 group-hover:scale-110 transition-transform duration-200">
                  <CategoryIcon slug={cat.slug} size={36} />
                </div>
                <p className="text-[11px] md:text-[13px] font-extrabold leading-tight" style={{ color: cat.accent }}>
                  {cat.label}
                </p>
                <p className="text-[9px] md:text-[10px] mt-0.5 leading-tight hidden sm:block" style={{ color: cat.accent, opacity: 0.7 }}>
                  {cat.sub}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nouveautés ──────────────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section className="py-10 md:py-14 bg-[#FAFAF7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <span className="w-6 h-1.5 bg-[#6BAED6] rounded-full" />
                  <span className="w-4 h-1.5 bg-[#6BAED6]/40 rounded-full" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-[#1C1C1E]">
                    ✨ Nouveaux arrivages
                  </h2>
                  <p className="text-xs md:text-sm text-[#A8A8A8] mt-0.5">Les dernières pièces ajoutées</p>
                </div>
              </div>
              <Link href="/shop"
                className="text-sm font-bold text-[#6BAED6] hover:text-[#4A8FBA] transition-colors bg-[#EAF5FC] px-4 py-2 rounded-xl hover:bg-[#DEEEF8] whitespace-nowrap">
                Voir tout →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5">
              {newArrivals.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 4} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Trust bar ───────────────────────────────────────────── */}
      <section className="bg-white border-y border-[#EBEBEB] py-8 md:py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {TRUST_ITEMS.map(({ Icon, label, sub, bg, color }) => (
              <div key={label} className="flex flex-col items-center text-center gap-3 p-4 rounded-2xl transition-all hover:shadow-md" style={{ backgroundColor: bg }}>
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  <Icon size={22} style={{ color }} />
                </div>
                <div>
                  <p className="text-[12px] md:text-sm font-bold text-[#1C1C1E] leading-snug">{label}</p>
                  <p className="text-[10px] md:text-xs mt-0.5" style={{ color, opacity: 0.75 }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promo banner ────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#EF8DB2] via-[#D470A0] to-[#B83870]" />
        <div className="absolute right-0 top-0 w-64 h-full bg-white/5 skew-x-12 translate-x-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-white">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-xs font-bold mb-3">
                🏷️ Offres spéciales
              </div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
                Jusqu&apos;à <span className="text-yellow-300">-30%</span> sur une sélection
              </p>
              <p className="text-sm md:text-base text-white/80 mt-1.5">
                Profitez de nos offres avant rupture de stock.
              </p>
            </div>
            <Link href="/promotions"
              className="shrink-0 bg-white text-[#B83870] text-sm md:text-base font-extrabold px-8 py-3.5 rounded-2xl hover:bg-yellow-50 transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap shadow-lg">
              Voir les promotions →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Meilleures ventes ───────────────────────────────────── */}
      {bestSellers.length > 0 && (
        <section className="py-10 md:py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <span className="w-6 h-1.5 bg-[#EF8DB2] rounded-full" />
                  <span className="w-4 h-1.5 bg-[#EF8DB2]/40 rounded-full" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-[#1C1C1E]">
                    💛 Meilleures ventes
                  </h2>
                  <p className="text-xs md:text-sm text-[#A8A8A8] mt-0.5">Les pièces les plus appréciées</p>
                </div>
              </div>
              <Link href="/shop"
                className="text-sm font-bold text-[#EF8DB2] hover:text-[#C9608A] transition-colors bg-[#FEF0F6] px-4 py-2 rounded-xl hover:bg-[#FDDDE9] whitespace-nowrap">
                Voir tout →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
