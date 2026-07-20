<template>
  <figure class="not-prose my-12">
    <svg
      viewBox="0 0 880 620"
      class="mx-auto h-auto w-full max-w-[860px]"
      role="img"
      aria-label="Hand-drawn sketch: a disk holds demo.db, one file chopped into fixed-size pages; one page zoomed open shows a header, a slot array pointing down to rows, free space in the middle, and rows packed upward from the bottom"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      font-family="'Patrick Hand', 'Comic Sans MS', cursive"
    >
      <!-- ============ the disk ============ -->
      <g stroke="#F5F5F7" stroke-opacity="0.85" stroke-width="2">
        <path d="M 55 70 a 55 16 0 1 1 110 0 a 55 16 0 1 1 -110 0" />
        <path d="M 55 71 Q 52 96 57 118" />
        <path d="M 165 71 Q 168 96 163 118" />
        <path d="M 57 118 Q 110 137 163 118" />
        <circle cx="110" cy="70" r="4" stroke-opacity="0.5" />
      </g>
      <text x="110" y="162" text-anchor="middle" font-size="21" fill="#F5F5F7" transform="rotate(-2 110 162)">your disk</text>
      <text x="110" y="184" text-anchor="middle" font-size="17" fill="#9BA0A8">(the shelves)</text>

      <!-- arrow: disk -> file -->
      <g stroke="#9BA0A8" stroke-width="2">
        <path d="M 182 78 Q 212 62 246 84" />
        <path d="M 236 76 L 246 84 M 233 88 L 246 84" />
      </g>

      <!-- ============ the file strip ============ -->
      <text x="268" y="42" font-size="21" fill="#D4AF37" transform="rotate(-1 268 42)">demo.db — one file</text>
      <g stroke="#F5F5F7" stroke-opacity="0.85" stroke-width="2">
        <path d="M 262 58 Q 550 52 838 60 Q 842 86 837 113 Q 550 120 263 114 Q 258 86 262 58 Z" />
      </g>
      <g stroke="#9BA0A8" stroke-width="1.8">
        <path d="M 406 60 Q 403 86 407 112" />
        <path d="M 550 59 Q 553 86 549 113" />
        <path d="M 694 60 Q 691 86 695 112" />
      </g>
      <text x="334" y="93" text-anchor="middle" font-size="19" fill="#F5F5F7">page 1</text>
      <text x="478" y="93" text-anchor="middle" font-size="19" fill="#F5F5F7">page 2</text>
      <text x="622" y="93" text-anchor="middle" font-size="19" fill="#F5F5F7">page 3</text>
      <text x="766" y="93" text-anchor="middle" font-size="19" fill="#9BA0A8">… page N</text>
      <text x="550" y="145" text-anchor="middle" font-size="17" fill="#9BA0A8" transform="rotate(-1 550 145)">chopped into equal fixed-size pages (4 KB each)</text>

      <!-- zoom lines: page 2 -> the big page -->
      <g stroke="#9BA0A8" stroke-width="1.5" stroke-dasharray="6 7">
        <path d="M 410 116 Q 300 168 220 224" />
        <path d="M 546 116 Q 620 168 662 224" />
      </g>

      <!-- ============ one page, zoomed open ============ -->
      <path d="M 218 230 Q 440 224 662 229 Q 668 405 663 580 Q 440 587 217 581 Q 212 405 218 230 Z" fill="rgba(255,255,255,0.02)" stroke="#F5F5F7" stroke-opacity="0.9" stroke-width="2.5" />

      <!-- header band -->
      <path d="M 218 274 Q 440 269 662 273" stroke="#D4AF37" stroke-opacity="0.6" stroke-width="2" />
      <text x="440" y="258" text-anchor="middle" font-size="20" fill="#D4AF37" transform="rotate(-1 440 258)">page header — the bookkeeping</text>

      <!-- slot array -->
      <g stroke="#F5F5F7" stroke-opacity="0.85" stroke-width="1.8">
        <path d="M 236 288 q 21 -2 22 1 q 2 20 -1 21 q -20 2 -21 -1 q -3 -19 0 -21 Z" />
        <path d="M 268 289 q 20 -3 22 0 q 3 20 0 21 q -21 3 -22 0 q -2 -19 0 -21 Z" />
        <path d="M 300 288 q 21 -2 22 1 q 1 20 -1 21 q -20 1 -21 -1 q -2 -19 0 -21 Z" stroke-dasharray="4 5" stroke-opacity="0.45" />
      </g>
      <text x="338" y="306" font-size="19" fill="#F5F5F7">slot array — pointers to the rows (grows ↓)</text>

      <!-- pointer arrows: slots -> rows, the soul of the sketch -->
      <g stroke="#D4AF37" stroke-opacity="0.8" stroke-width="1.8">
        <path d="M 247 314 Q 300 460 560 546" />
        <path d="M 548 542 L 560 546 M 551 552 L 560 546" />
        <path d="M 279 314 Q 330 420 520 496" />
        <path d="M 508 492 L 520 496 M 511 502 L 520 496" />
      </g>

      <!-- free space -->
      <text x="420" y="408" text-anchor="middle" font-size="30" fill="#9BA0A8" letter-spacing="6" transform="rotate(-2 420 408)">free space</text>
      <text x="420" y="436" text-anchor="middle" font-size="17" fill="#9BA0A8">(squeezed from both sides)</text>
      <g stroke="#9BA0A8" stroke-width="1.8">
        <path d="M 420 350 Q 422 363 420 377 M 413 368 L 420 377 M 427 368 L 420 377" />
        <path d="M 420 466 Q 418 457 420 448 M 413 456 L 420 448 M 427 456 L 420 448" />
      </g>

      <!-- rows -->
      <path d="M 218 480 Q 440 475 662 479" stroke="#F5F5F7" stroke-opacity="0.5" stroke-width="2" />
      <text x="440" y="507" text-anchor="middle" font-size="19" fill="#F5F5F7">row 2 — 'SQLite', 'living in a single file'</text>
      <path d="M 218 528 Q 440 523 662 527" stroke="#F5F5F7" stroke-opacity="0.5" stroke-width="2" />
      <text x="440" y="558" text-anchor="middle" font-size="19" fill="#F5F5F7">row 1 — 'Bantu Dev', 'debugging'</text>

      <!-- rows grow up -->
      <g stroke="#F5F5F7" stroke-opacity="0.8" stroke-width="2">
        <path d="M 692 566 Q 689 520 692 476 M 685 486 L 692 476 M 699 486 L 692 476" />
      </g>
      <text x="712" y="530" font-size="18" fill="#F5F5F7" transform="rotate(90 712 530)" text-anchor="middle">rows grow up</text>

      <!-- gold margin note -->
      <text x="100" y="330" text-anchor="middle" font-size="17" fill="#D4AF37" transform="rotate(-4 100 330)">the page's own</text>
      <text x="100" y="350" text-anchor="middle" font-size="17" fill="#D4AF37" transform="rotate(-4 100 350)">table of contents</text>
      <g stroke="#D4AF37" stroke-opacity="0.7" stroke-width="1.5">
        <path d="M 138 335 Q 180 322 226 306 M 215 304 L 226 306 M 218 314 L 226 306" />
      </g>
    </svg>
    <figcaption class="mt-4 text-center text-[11px] uppercase tracking-vast text-stardust/50">
      one 4 KB page, under the librarian's magnifying glass
    </figcaption>
  </figure>
</template>
