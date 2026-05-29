type Props = { slug: string; size?: number }

export function CategoryIcon({ slug, size = 32 }: Props) {
  const s = { width: size, height: size, viewBox: '0 0 48 48', xmlns: 'http://www.w3.org/2000/svg' }

  switch (slug) {

    case 'naissance':
      return (
        <svg {...s}>
          {/* biberon */}
          <rect x="19" y="4" width="10" height="5" rx="2.5" fill="#90CAF9"/>
          <path d="M14 16C14 12.7 16.7 10 20 10H28C31.3 10 34 12.7 34 16V38C34 41.3 31.3 44 28 44H20C16.7 44 14 41.3 14 38V16Z" fill="#BBDEFB"/>
          <path d="M14 16C14 12.7 16.7 10 20 10H28C31.3 10 34 12.7 34 16V38C34 41.3 31.3 44 28 44H20C16.7 44 14 41.3 14 38V16Z" fill="none" stroke="#42A5F5" strokeWidth="2"/>
          {/* lait */}
          <path d="M14 26C14 26 19 30 24 26C29 22 34 26 34 26V38C34 41.3 31.3 44 28 44H20C16.7 44 14 41.3 14 38V26Z" fill="#E3F2FD"/>
          {/* tétine */}
          <rect x="21" y="4" width="6" height="3" rx="1.5" fill="#64B5F6"/>
          <path d="M22 4V2.5C22 2 23 1.5 24 1.5C25 1.5 26 2 26 2.5V4" fill="#42A5F5"/>
          {/* graduations */}
          <path d="M20 20H18" stroke="#42A5F5" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M20 25H17" stroke="#42A5F5" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M20 30H18" stroke="#42A5F5" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )

    case 'bebe-fille':
      return (
        <svg {...s}>
          {/* robe bébé */}
          <path d="M17 14L11 24H37L31 14H17Z" fill="#F48FB1"/>
          <path d="M11 24H37L33 44H15L11 24Z" fill="#F8BBD0"/>
          <path d="M11 24H37L33 44H15L11 24Z" fill="none" stroke="#E91E8C" strokeWidth="1.5" strokeLinejoin="round"/>
          {/* nœud */}
          <path d="M18 10C18 10 21 7 24 10C27 7 30 10 30 10C30 10 27 13 24 12C21 13 18 10 18 10Z" fill="#E91E8C"/>
          <circle cx="24" cy="11" r="2" fill="#AD1457"/>
          {/* cœurs sur la robe */}
          <path d="M20 32C20 32 22 29 24 32C26 29 28 32 24 35C20 32 20 32 20 32Z" fill="#F48FB1" stroke="#E91E8C" strokeWidth="1"/>
          {/* col */}
          <path d="M17 14C17 14 20 17 24 17C28 17 31 14 31 14" fill="none" stroke="#E91E8C" strokeWidth="1.5"/>
        </svg>
      )

    case 'bebe-garcon':
      return (
        <svg {...s}>
          {/* body / grenouillère */}
          <path d="M16 12L9 20L16 22V40C16 42 17.8 44 20 44H28C30.2 44 32 42 32 40V22L39 20L32 12H28C28 12 27 16 24 16C21 16 20 12 20 12H16Z" fill="#90CAF9"/>
          <path d="M16 12L9 20L16 22V40C16 42 17.8 44 20 44H28C30.2 44 32 42 32 40V22L39 20L32 12H28C28 12 27 16 24 16C21 16 20 12 20 12H16Z" fill="none" stroke="#1E88E5" strokeWidth="1.5" strokeLinejoin="round"/>
          {/* rayures */}
          <path d="M16 28H32" stroke="#42A5F5" strokeWidth="2.5" strokeLinecap="round" opacity=".6"/>
          <path d="M16 34H32" stroke="#42A5F5" strokeWidth="2.5" strokeLinecap="round" opacity=".6"/>
          {/* boutons bas */}
          <circle cx="21" cy="42" r="1.5" fill="#1565C0"/>
          <circle cx="24" cy="42" r="1.5" fill="#1565C0"/>
          <circle cx="27" cy="42" r="1.5" fill="#1565C0"/>
          {/* étoile */}
          <path d="M24 19L24.6 21H26.5L25.1 22.2L25.6 24.1L24 23L22.4 24.1L22.9 22.2L21.5 21H23.4Z" fill="#FDD835"/>
        </svg>
      )

    case 'fille':
      return (
        <svg {...s}>
          {/* robe */}
          <path d="M19 6C19 6 21 11 24 11C27 11 29 6 29 6" fill="none" stroke="#CE93D8" strokeWidth="2" strokeLinecap="round"/>
          <path d="M15 14L9 44H39L33 14H15Z" fill="#E1BEE7"/>
          {/* corsage */}
          <path d="M15 14L19 24H29L33 14H15Z" fill="#CE93D8"/>
          {/* ceinture */}
          <rect x="19" y="23" width="10" height="3" rx="1.5" fill="#AB47BC"/>
          {/* étoiles sur la jupe */}
          <path d="M18 34L18.8 31.5L21 32.5L19 31L19.8 28.5L20.6 31L22.8 30L21 31.5L21.8 34L20 32.5Z" fill="#FFD54F"/>
          <path d="M29 38L29.6 36L31.5 36.8L29.8 35.5L30.4 33.5L31 35.5L32.9 34.8L31.2 36L31.8 38L30 36.8Z" fill="#FFD54F"/>
          <path d="M24 40L24.5 38.5L26 39L24.8 38L25.3 36.5L25.8 38L27.3 37.5L26 38.5L26.5 40L25 39Z" fill="#FFD54F"/>
          {/* bretelles */}
          <path d="M19 6L15 14" stroke="#CE93D8" strokeWidth="2" strokeLinecap="round"/>
          <path d="M29 6L33 14" stroke="#CE93D8" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )

    case 'garcon':
      return (
        <svg {...s}>
          {/* t-shirt */}
          <path d="M18 8H15L7 18L14 21V42C14 43 15 44 16 44H32C33 44 34 43 34 42V21L41 18L33 8H30C30 8 28 13 24 13C20 13 18 8 18 8Z" fill="#80DEEA"/>
          <path d="M18 8H15L7 18L14 21V42C14 43 15 44 16 44H32C33 44 34 43 34 42V21L41 18L33 8H30C30 8 28 13 24 13C20 13 18 8 18 8Z" fill="none" stroke="#00ACC1" strokeWidth="1.5" strokeLinejoin="round"/>
          {/* rayures */}
          <path d="M14 28H34" stroke="#00BCD4" strokeWidth="3" strokeLinecap="round" opacity=".5"/>
          <path d="M14 35H34" stroke="#00BCD4" strokeWidth="3" strokeLinecap="round" opacity=".5"/>
          {/* poche */}
          <rect x="27" y="22" width="6" height="7" rx="1.5" fill="#B2EBF2" stroke="#00ACC1" strokeWidth="1.5"/>
          {/* logo/badge */}
          <circle cx="21" cy="26" r="3.5" fill="#FFB300"/>
          <path d="M19.5 26L21 24.5L22.5 26L21 27.5Z" fill="#FF6F00"/>
        </svg>
      )

    case 'pyjamas':
      return (
        <svg {...s}>
          {/* haut pyjama */}
          <path d="M17 8H15L8 17L14 19V32H34V19L40 17L33 8H31C31 8 29 12 24 12C19 12 17 8 17 8Z" fill="#B39DDB"/>
          <path d="M17 8H15L8 17L14 19V32H34V19L40 17L33 8H31C31 8 29 12 24 12C19 12 17 8 17 8Z" fill="none" stroke="#7E57C2" strokeWidth="1.5" strokeLinejoin="round"/>
          {/* boutons */}
          <circle cx="24" cy="21" r="1.5" fill="#5E35B1"/>
          <circle cx="24" cy="26" r="1.5" fill="#5E35B1"/>
          <circle cx="24" cy="31" r="1.5" fill="#5E35B1"/>
          {/* lune */}
          <path d="M38 5C38 9 35 12 32 12C35 12 37 15 36 18C40 16 42 12 41 9C40.5 7 39 5.5 38 5Z" fill="#FFD54F"/>
          {/* étoiles */}
          <circle cx="11" cy="8" r="1.5" fill="#FFD54F"/>
          <circle cx="8" cy="14" r="1" fill="#FFF176"/>
          <circle cx="42" cy="20" r="1" fill="#FFF176"/>
          {/* nuages bas */}
          <path d="M14 34C14 34 15 32 17 32C19 32 20 34 20 34H34C34 34 35 32 37 32C39 32 40 34 40 34" stroke="#CE93D8" strokeWidth="1.5" fill="none" opacity=".5"/>
        </svg>
      )

    case 'robes':
      return (
        <svg {...s}>
          {/* robe de soirée */}
          <path d="M19 5C19 5 21 10 24 10C27 10 29 5 29 5" fill="none" stroke="#F06292" strokeWidth="2" strokeLinecap="round"/>
          <path d="M19 10L15 18H33L29 10H19Z" fill="#F48FB1"/>
          {/* jupe évasée */}
          <path d="M15 18L7 46H41L33 18H15Z" fill="#FCE4EC"/>
          <path d="M15 18L7 46H41L33 18H15Z" fill="none" stroke="#F06292" strokeWidth="1.5" strokeLinejoin="round"/>
          {/* volants */}
          <path d="M12 30C17 26 22 30 27 27C32 24 37 28 40 30" fill="none" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
          <path d="M10 38C15 34 20 38 25 35C30 32 35 36 38 38" fill="none" stroke="#F48FB1" strokeWidth="2" strokeLinecap="round"/>
          {/* ceinture */}
          <rect x="15" y="17" width="18" height="3" rx="1.5" fill="#E91E63"/>
          {/* bijou */}
          <circle cx="24" cy="14" r="2.5" fill="#E040FB"/>
          <circle cx="24" cy="14" r="1.2" fill="#F8BBD0"/>
        </svg>
      )

    case 'ensembles':
      return (
        <svg {...s}>
          {/* haut */}
          <path d="M14 6H12L6 14L12 16V24H36V16L42 14L36 6H34C34 6 32 10 24 10C16 10 14 6 14 6Z" fill="#A5D6A7"/>
          <path d="M14 6H12L6 14L12 16V24H36V16L42 14L36 6H34C34 6 32 10 24 10C16 10 14 6 14 6Z" fill="none" stroke="#43A047" strokeWidth="1.5" strokeLinejoin="round"/>
          {/* bande séparation */}
          <rect x="6" y="24" width="36" height="3" rx="1.5" fill="#66BB6A"/>
          {/* pantalon */}
          <path d="M8 27H40L38 44H28L24 34L20 44H10L8 27Z" fill="#81C784"/>
          <path d="M8 27H40L38 44H28L24 34L20 44H10L8 27Z" fill="none" stroke="#43A047" strokeWidth="1.5" strokeLinejoin="round"/>
          {/* poche */}
          <path d="M12 31C12 31 13 35 16 35C19 35 20 31 20 31" fill="none" stroke="#43A047" strokeWidth="1.5" strokeLinecap="round"/>
          {/* étoile sur haut */}
          <path d="M24 13L24.8 15.5H27.5L25.4 17L26.2 19.5L24 18L21.8 19.5L22.6 17L20.5 15.5H23.2Z" fill="#FDD835"/>
        </svg>
      )

    case 'chaussures':
      return (
        <svg {...s}>
          {/* chaussure bébé */}
          <path d="M6 28C6 28 9 18 19 16C24 15 29 17 34 20L42 25C44 26.5 44 30 42 31L12 38C9 39 6 36 6 28Z" fill="#FFCC80"/>
          <path d="M6 28C6 28 9 18 19 16C24 15 29 17 34 20L42 25C44 26.5 44 30 42 31L12 38C9 39 6 36 6 28Z" fill="none" stroke="#FF8F00" strokeWidth="2" strokeLinejoin="round"/>
          {/* semelle */}
          <path d="M6 32C6 32 6 40 14 40H40C43 40 44 37 42 35" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round"/>
          {/* bout de la chaussure */}
          <ellipse cx="11" cy="27" rx="5" ry="7" fill="#FFB74D" transform="rotate(-15 11 27)"/>
          {/* nœud */}
          <path d="M22 19C22 19 24 17 26 19C28 17 30 19 30 19C30 19 28 21 26 20.5C24 21 22 19 22 19Z" fill="#EF5350"/>
          <circle cx="26" cy="19.5" r="1.5" fill="#B71C1C"/>
          {/* lacets */}
          <path d="M19 20L18 25" stroke="#FF5722" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M23 18L22 24" stroke="#FF5722" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M17 22.5L24 21" stroke="#FF5722" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )

    case 'accessoires':
      return (
        <svg {...s}>
          {/* bonnet */}
          <path d="M9 24C9 15.2 15.7 8 24 8C32.3 8 39 15.2 39 24V27H9V24Z" fill="#80CBC4"/>
          <path d="M9 24C9 15.2 15.7 8 24 8C32.3 8 39 15.2 39 24V27H9V24Z" fill="none" stroke="#00897B" strokeWidth="2"/>
          {/* revers du bonnet */}
          <rect x="7" y="27" width="34" height="6" rx="3" fill="#4DB6AC"/>
          <rect x="7" y="27" width="34" height="6" rx="3" fill="none" stroke="#00897B" strokeWidth="1.5"/>
          {/* pompon */}
          <circle cx="24" cy="8" r="5" fill="#FFB74D"/>
          <circle cx="22" cy="7" r="1.5" fill="#FFA726"/>
          <circle cx="26" cy="7" r="1" fill="#FFA726"/>
          <circle cx="24" cy="5" r="1.2" fill="#FFD54F"/>
          {/* rayures sur le bonnet */}
          <path d="M9 21C14 19 19 21 24 19C29 17 34 19 39 21" fill="none" stroke="#00897B" strokeWidth="1.5" opacity=".5"/>
          {/* fleur déco */}
          <circle cx="24" cy="18" r="3.5" fill="#FFB3C1"/>
          <circle cx="24" cy="18" r="2" fill="#FF6B9D"/>
          <circle cx="24" cy="18" r="1" fill="#FFE0E9"/>
        </svg>
      )

    default:
      return (
        <svg {...s}>
          <circle cx="24" cy="24" r="18" fill="#E0E0E0"/>
          <path d="M18 24H30M24 18V30" stroke="#9E9E9E" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      )
  }
}
