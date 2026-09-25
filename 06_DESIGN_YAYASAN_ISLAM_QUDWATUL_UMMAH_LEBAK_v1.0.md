# 06 — DESIGN: YAYASAN ISLAM QUDWATUL UMMAH LEBAK

## 1. Daftar Isi
1. Personality
2. Design Direction
3. Principles
4. Color System
5. Typography
6. Spacing/Grid
7. Shape/Elevation
8. Components
9. Motion
10. Responsive
11. Accessibility
12. Microcopy
13. Do/Don't

## 2. Personality
Tenang, aman, terpercaya, administratif, transparan, profesional, tidak berlebihan.

## 3. Design Direction
### Arah utama
**Institutional Finance — clean, restrained, high readability.**

Fokus visual pada data, hierarchy, status transaksi, dan laporan.

### Alternatif
1. Islamic institutional modern: aksen identitas Islami yang sangat terukur.
2. Data-centric enterprise: visual lebih utilitarian untuk finance team.

## 4. Principles
- Data first.
- Status first.
- Consistency.
- Progressive disclosure.
- Minimal decorative noise.

## 5. Color System
Gunakan semantic tokens, bukan hardcoded component colors:
- background
- foreground
- muted
- border
- primary
- success
- warning
- danger
- info
- accounting debit/credit/status tokens.

Warna final brand harus dikonfirmasi berdasarkan identitas yayasan.

## 6. Typography
Sans-serif modern, tinggi keterbacaan. Gunakan satu family utama dan hierarchy yang jelas.

## 7. Spacing/Grid
Gunakan 4/8px rhythm, container konsisten, dense table mode untuk finance.

## 8. Shape/Elevation
Radius kecil-menengah. Elevation hanya untuk layer penting seperti modal, drawer, popover.

## 9. Components
AppShell, Sidebar, Topbar, Breadcrumb, FilterBar, DataTable, StatusBadge, FormSection, CurrencyInput, DateInput, ApprovalTimeline, JournalLines, FileUploader, ConfirmationDialog, EmptyState, ErrorState, ReportViewer.

## 10. Motion
Subtle transitions. Hindari animasi dekoratif pada workflow accounting.

## 11. Responsive
Desktop dense; tablet adaptive; mobile untuk monitoring dan approval ringan, bukan target utama entry jurnal kompleks.

## 12. Accessibility
WCAG-oriented contrast, keyboard, focus, labels, errors, non-color-only status, screen-reader semantics.

## 13. Microcopy
Gunakan bahasa operasional:
- “Simpan Draft”
- “Ajukan Approval”
- “Setujui”
- “Tolak”
- “Posting Transaksi”
- “Balikkan Transaksi”
- “Periode Terkunci”

## 14. Do/Don't
DO gunakan tabel jelas, filter persistent, status eksplisit.
DON'T gunakan gradient berlebihan, icon-only critical actions, destructive action tanpa confirmation, atau warna sebagai satu-satunya penanda.
