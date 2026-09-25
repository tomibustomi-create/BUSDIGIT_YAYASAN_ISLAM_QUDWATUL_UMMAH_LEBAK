# 01 — PROJECT BLUEPRINT: YAYASAN ISLAM QUDWATUL UMMAH LEBAK

## 1. Daftar Isi
1. Executive Summary
2. Problem & Opportunity
3. Vision, Goals, Non-Goals
4. Users & Roles
5. Scope MVP/Post-MVP
6. Feature Map
7. Core Journeys
8. Page Inventory Awal
9. Conceptual Data
10. Integrations
11. Non-Functional Requirements
12. Security & Privacy Risks
13. Constraints & Assumptions
14. Open Decisions
15. Status

## 2. Executive Summary
Sistem adalah aplikasi web terintegrasi untuk pencatatan keuangan, akuntansi double-entry, penganggaran, approval, audit trail, rekonsiliasi, dan pelaporan Yayasan Islam Qudwatul Ummah Lebak.

Sumber dana utama: INPAK Pendidikan, IKS, ISB, SPP, IBL, BOS, BOSDA, dan Sodaqoh. Sistem harus mendukung konsolidasi yayasan sekaligus pelaporan per unit kerja, unit pendidikan, sumber dana, program, dan periode.

## 3. Problem & Opportunity
- Data keuangan multi-unit perlu disatukan tanpa kehilangan dimensi asal transaksi.
- Pencatatan harus menghasilkan laporan akuntansi dan laporan manajemen.
- Approval, bukti transaksi, dan audit trail harus terdokumentasi.
- SPP/IBL memerlukan konsep tagihan, piutang, dan pembayaran.
- BOS/BOSDA memerlukan anggaran, realisasi, bukti, dan pelaporan.
- Koreksi transaksi tidak boleh menghapus jejak historis.

## 4. Vision, Goals, Non-Goals
### GOAL
- GOAL-001: Satu sumber data keuangan yayasan.
- GOAL-002: Double-entry dan auditability.
- GOAL-003: Budget vs actual.
- GOAL-004: Pelaporan konsolidasi dan per unit.
- GOAL-005: Approval dan evidence terintegrasi.

### Non-Goals
- Bukan sistem payroll penuh pada MVP.
- Bukan ERP umum untuk seluruh operasional yayasan.
- Bukan pengganti kebijakan akuntansi resmi yayasan.

## 5. Users & Roles
| Role | Fungsi |
|---|---|
| Super Admin | konfigurasi sistem dan akses |
| Pimpinan Yayasan | monitoring, approval, laporan |
| Direktur Pendidikan | monitoring unit pendidikan |
| Kepala/Manajer Unit | transaksi/approval sesuai kewenangan |
| Keuangan | accounting, closing, reporting |
| Bendahara | kas/bank dan transaksi |
| Operator SPP | billing dan pembayaran siswa |
| Operasional | pengajuan kebutuhan/transaksi |
| Auditor/Viewer | baca laporan dan audit trail |

## 6. Scope MVP/Post-MVP
### MVP
Master data, COA, jurnal, kas/bank, penerimaan/pengeluaran, sumber dana, budget, approval, dokumen, audit trail, SPP/IBL, BOS/BOSDA, laporan dasar, closing, rekonsiliasi bank.

### Post-MVP
Integrasi bank/payment gateway, payroll penuh, mobile app native, advanced analytics, workflow eksternal, integrasi sistem pendidikan.

## 7. Feature Map
- Accounting Core
- Cash & Bank
- Fund Management
- Budgeting
- Student Billing
- Grant/Fund Reporting
- Fixed Assets
- Procurement
- Approval
- Document Management
- Reporting
- Audit & Governance

## 8. Core Journeys
### FLOW-001 Penerimaan
Input sumber -> validasi -> approval bila perlu -> posting jurnal -> attachment -> audit log.

### FLOW-002 Pengeluaran
Request -> approval -> pembayaran -> posting -> evidence -> audit log.

### FLOW-003 SPP/IBL
Siswa -> invoice -> piutang -> pembayaran -> rekonsiliasi -> receipt -> laporan.

### FLOW-004 BOS/BOSDA
Budget -> transaksi -> evidence -> realisasi -> monitoring -> report.

### FLOW-005 Closing
Validasi -> rekonsiliasi -> adjustment/reversal -> lock period -> laporan.

## 9. Page Inventory Awal
Dashboard, Master Data, COA, Kas/Bank, Penerimaan, Pengeluaran, Jurnal, Budget, SPP/IBL, BOS/BOSDA, INPAK, IKS, ISB, Sodaqoh, Aset, Approval, Dokumen, Rekonsiliasi, Closing, Laporan, Audit Log, Pengaturan.

## 10. Conceptual Data
Organization, Unit, User, Role, Permission, FiscalYear, AccountingPeriod, FundSource, Program, Project, COA, JournalEntry, JournalLine, CashAccount, BankAccount, BankTransaction, BankReconciliation, Budget, BudgetLine, Student, StudentAccount, StudentInvoice, StudentPayment, Vendor, PurchaseRequest, PurchaseOrder, Expense, FixedAsset, Depreciation, Document, Attachment, Approval, AuditLog, Report, ReportMapping.

## 11. Integrations
MVP dirancang loosely coupled. Integrasi eksternal belum wajib. Object storage digunakan untuk dokumen/evidence berukuran besar.

## 12. NFR Awal
- NFR-001 Security by default.
- NFR-002 Auditability.
- NFR-003 Data consistency.
- NFR-004 Backup dan restore test.
- NFR-005 Responsive web.
- NFR-006 Observability.
- NFR-007 Role-based access.
- NFR-008 Performance sesuai workload yayasan.
- NFR-009 Availability yang realistis untuk VPS.
- NFR-010 Maintainability.

## 13. Security & Privacy Risks
SEC-001 akses berdasarkan role; SEC-002 least privilege; SEC-003 password hashing; SEC-004 session protection; SEC-005 encryption in transit; SEC-006 backup encryption; SEC-007 audit trail; SEC-008 validasi input; SEC-009 rate limiting; SEC-010 lifecycle data.

## 14. Constraints & Assumptions
- Sistem web.
- Multi-unit.
- Double-entry.
- Transaction posting immutable secara operasional.
- Uang memakai decimal/numeric, bukan float.
- Definisi IKS, ISB, dan kebijakan INPAK belum dikunci.
- Kebijakan SAK resmi yayasan perlu dikonfirmasi sebelum finalisasi mapping laporan.

## 15. Open Decisions
- Pemisahan rekening kas/bank per unit atau terpusat.
- Boarding sebagai unit/cost center terpisah atau dimensi internal.
- SAK/acuan pelaporan resmi yayasan.
- Definisi dan perlakuan akuntansi IKS/ISB/INPAK.
