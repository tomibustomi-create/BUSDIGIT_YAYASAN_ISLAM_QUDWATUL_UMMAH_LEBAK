# 02 — PRODUCT REQUIREMENTS DOCUMENT: YAYASAN ISLAM QUDWATUL UMMAH LEBAK

## 1. Daftar Isi
1. Vision
2. Role & Access
3. Business Model
4. Scope
5. IA & Journey
6. Functional Requirements
7. Business Rules
8. Data & Access
9. NFR
10. Security & Privacy
11. UX & Analytics
12. Edge Cases
13. Release
14. Risks
15. Acceptance
16. Traceability

## 2. Vision
Membangun sistem keuangan terintegrasi yang menghasilkan data transaksi yang konsisten, dapat diaudit, dan dapat digunakan untuk keputusan yayasan serta unit pendidikan.

## 3. Role & Access
Akses berbasis role dan scope unit/fund. Pimpinan dan auditor dapat melihat data sesuai otorisasi; operator hanya dapat menjalankan fungsi yang diberikan.

## 4. Business Model
Sistem internal yayasan. Tidak menggunakan model marketplace. Fokus pada governance, accounting, budgeting, dan reporting.

## 5. Scope
### Accounting
FR-001 Master COA; FR-002 jurnal double-entry; FR-003 period control; FR-004 reversal/correction; FR-005 closing.

### Cash & Bank
FR-006 kas; FR-007 bank; FR-008 rekonsiliasi; FR-009 penerimaan; FR-010 pengeluaran.

### Fund
FR-011 fund source; FR-012 fund restriction; FR-013 laporan per fund.

### Budget
FR-014 budget; FR-015 budget line; FR-016 actualization; FR-017 budget vs actual.

### Education Finance
FR-018 student master; FR-019 invoice SPP/IBL; FR-020 payment; FR-021 receivable.

### BOS/BOSDA
FR-022 budget; FR-023 realization; FR-024 evidence; FR-025 reporting.

### Governance
FR-026 approval; FR-027 attachment; FR-028 audit log; FR-029 user/role.

### Reporting
FR-030 financial reports; FR-031 management reports; FR-032 export.

## 6. Business Rules
- BR-001 setiap journal entry posted harus balance.
- BR-002 posted transaction tidak dihapus.
- BR-003 koreksi memakai reversal/correction.
- BR-004 periode closed menolak posting biasa.
- BR-005 approval mengikuti threshold/jenis transaksi.
- BR-006 evidence dapat diwajibkan berdasarkan transaction type.
- BR-007 SPP/IBL dapat membentuk receivable.
- BR-008 BOS/BOSDA harus dapat dibandingkan budget vs actual.
- BR-009 audit log tidak boleh dimodifikasi oleh user operasional.
- BR-010 setiap transaksi memiliki dimensi unit dan sumber dana bila relevan.

## 7. Data & Access
Dimensi minimum: account, unit, fund source, program, project, department, vendor, student, bank account, transaction.

## 8. NFR
NFR-001 security; NFR-002 auditability; NFR-003 consistency; NFR-004 backup; NFR-005 performance; NFR-006 scalability; NFR-007 observability; NFR-008 maintainability; NFR-009 accessibility; NFR-010 responsive; NFR-011 reliability; NFR-012 recoverability; NFR-013 privacy; NFR-014 exportability; NFR-015 traceability.

## 9. Security
RBAC, least privilege, session management, password hashing, optional MFA, CSRF protection, validation, rate limiting, audit logging, encrypted backups, secret management.

## 10. Acceptance
AC-001 posting balance; AC-002 reversal preserves history; AC-003 closed period protected; AC-004 approval enforced; AC-005 report totals reconcile; AC-006 audit trail complete; AC-007 backup restore tested; AC-008 role boundaries enforced.

## 11. Traceability
Setiap screen kritis harus terhubung ke FR. Setiap FR kritis memiliki acceptance/test. Setiap ADR terhubung ke constraint/requirement.
