# 05 — UX ARCHITECTURE: YAYASAN ISLAM QUDWATUL UMMAH LEBAK

## 1. Daftar Isi
1. UX Principles
2. Information Architecture
3. Navigation
4. Screen Inventory
5. Access Matrix
6. Core Flows
7. Form Standards
8. System States
9. Responsive & Accessibility
10. Content
11. Analytics
12. Stitch Order
13. Traceability

## 2. UX Principles
- Clarity over decoration.
- Accounting state selalu terlihat.
- Dangerous action membutuhkan confirmation.
- Evidence mudah ditemukan.
- Unit/fund context selalu jelas.
- Draft vs approved vs posted vs reversed dibedakan tegas.
- Report filters harus reproducible.

## 3. Information Architecture
Dashboard
├─ Keuangan
│  ├─ Penerimaan
│  ├─ Pengeluaran
│  ├─ Jurnal
│  ├─ Kas & Bank
│  └─ Rekonsiliasi
├─ Pendidikan
│  ├─ Siswa
│  ├─ SPP
│  └─ IBL
├─ Dana
│  ├─ INPAK Pendidikan
│  ├─ IKS
│  ├─ ISB
│  ├─ BOS
│  ├─ BOSDA
│  └─ Sodaqoh
├─ Anggaran
├─ Aset
├─ Approval
├─ Laporan
├─ Audit
└─ Pengaturan

## 4. Screen Inventory
| ID | Screen | Requirement |
|---|---|---|
| SCR-001 | Dashboard | FR-030 |
| SCR-002 | Penerimaan | FR-009 |
| SCR-003 | Pengeluaran | FR-010 |
| SCR-004 | Jurnal | FR-002 |
| SCR-005 | Kas/Bank | FR-006/007 |
| SCR-006 | Rekonsiliasi | FR-008 |
| SCR-007 | Budget | FR-014/017 |
| SCR-008 | SPP/IBL | FR-018/019/020/021 |
| SCR-009 | BOS/BOSDA | FR-022/023/024/025 |
| SCR-010 | Fund | FR-011/013 |
| SCR-011 | Approval | FR-026 |
| SCR-012 | Documents | FR-027 |
| SCR-013 | Reports | FR-030/031/032 |
| SCR-014 | Audit Log | FR-028 |
| SCR-015 | Closing | FR-005 |
| SCR-016 | Master Data | FR-001/029 |

## 5. Access Matrix
Gunakan role + unit scope + action scope. Contoh: Operator SPP dapat create payment, tetapi tidak dapat mengubah posted journal atau mengelola COA.

## 6. Core Flows
### FLOW-001 Penerimaan
Create draft -> validation -> approval -> post -> receipt -> audit.

### FLOW-002 Pengeluaran
Request -> approval -> payment -> post -> evidence -> audit.

### FLOW-003 SPP/IBL
Student -> invoice -> outstanding -> payment -> allocation -> receipt -> journal.

### FLOW-004 Closing
Review -> reconcile -> adjustment/reversal -> lock -> reports.

## 7. Form Standards
Wajib: date, unit, fund source, account/dimension relevan, amount, description, evidence, approval context. Monetary input menggunakan format lokal tetapi menyimpan numeric canonical.

## 8. System States
Semua screen kritis harus memiliki: loading, empty, draft, validation error, permission denied, save error, success, approval pending, approved, rejected, posted, reversed, closed period, offline/network retry.

## 9. Responsive & Accessibility
Desktop-first untuk finance admin, tetap usable tablet. Keyboard navigation, visible focus, labels, contrast, semantic headings, error messages yang spesifik.

## 10. Content
Bahasa utama Indonesia. Gunakan istilah yang konsisten: IKS (bukan ISK), IBL, INPAK Pendidikan, BOS, BOSDA, Sodaqoh.

## 11. Analytics
Track login, dashboard use, transaction creation, approval latency, failed posting, report generation, reconciliation completion, dan error rate. Hindari telemetry yang tidak perlu.

## 12. Stitch Order
1 Dashboard
2 Accounting transaction
3 Cash/Bank
4 Budget
5 SPP/IBL
6 BOS/BOSDA
7 Approval
8 Reports
9 Audit
10 Settings

## 13. Traceability
Setiap SCR kritis memiliki FR mapping dan acceptance/test mapping.
