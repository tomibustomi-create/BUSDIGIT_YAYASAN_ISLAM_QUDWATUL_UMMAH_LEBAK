# 07 — GOOGLE STITCH PROMPTS: YAYASAN ISLAM QUDWATUL UMMAH LEBAK

## 1. Context Global
Buat aplikasi web finance internal Yayasan Islam Qudwatul Ummah Lebak. Bahasa Indonesia. Design institutional finance: tenang, profesional, data-first, high readability. Multi-unit dan multi-sumber dana. Gunakan istilah IKS, bukan ISK.

## 2. Generation Order
SCR-001 Dashboard -> SCR-004 Jurnal -> SCR-005 Kas/Bank -> SCR-007 Budget -> SCR-008 SPP/IBL -> SCR-009 BOS/BOSDA -> SCR-011 Approval -> SCR-013 Reports -> SCR-014 Audit -> SCR-016 Settings.

## 3. Prompt SCR-001 Dashboard
Buat dashboard finance yayasan desktop-first responsive. Role-aware. Tampilkan saldo kas/bank, receivable SPP/IBL, budget vs actual, approval pending, transaksi terbaru, fund summary, dan alert rekonsiliasi. Gunakan data Indonesia realistis namun fiktif. Sediakan loading, empty, error, permission, dan filter periode/unit.

## 4. Prompt SCR-004 Jurnal
Buat halaman jurnal double-entry. Header: tanggal, nomor, unit, sumber dana, deskripsi, status. Detail: account, debit, credit, dimensions. Tampilkan balance indicator real-time. Actions: Simpan Draft, Ajukan Approval, Posting, Reversal sesuai permission. Tampilkan audit timeline dan attachment. Jangan izinkan edit posted entry.

## 5. Prompt SCR-005 Kas/Bank
Buat halaman kas/bank dengan account selector, saldo, transaksi, filter, reconciliation status. Sediakan detail transaction drawer, evidence, audit trail, dan action sesuai state.

## 6. Prompt SCR-007 Budget
Buat budget screen dengan tahun/periode/unit/fund/program. Tabel budget, actual, variance, percentage. Sediakan import/template jika diperlukan dan approval state.

## 7. Prompt SCR-008 SPP/IBL
Buat student billing workspace: student profile, invoice, outstanding receivable, payment allocation, receipt. Tampilkan aging sederhana. Bedakan draft, outstanding, partial, paid, reversed.

## 8. Prompt SCR-009 BOS/BOSDA
Buat fund compliance workspace untuk budget, realization, evidence, category, reporting period, dan variance. Tampilkan status evidence completeness.

## 9. Prompt SCR-011 Approval
Buat approval inbox dengan priority berdasarkan deadline/status, detail transaction, evidence, accounting summary, comment, approve/reject. Tidak boleh approve bila required evidence belum lengkap.

## 10. Prompt SCR-013 Reports
Buat report center: posisi keuangan, kinerja keuangan, arus kas, perubahan aset neto, catatan, budget vs actual, per unit, per fund, SPP/IBL, BOS/BOSDA, INPAK, IKS, ISB, Sodaqoh. Filter reproducible dan export.

## 11. Prompt SCR-014 Audit
Buat audit log viewer dengan actor, timestamp, action, entity, before/after summary, IP/session metadata bila kebijakan mengizinkan. Read-only untuk auditor.

## 12. Prompt SCR-016 Settings
Buat settings untuk organization, units, roles, permissions, COA, fiscal year, accounting period, fund source, approval rules, report mappings, notification.

## 13. Avoid List
Hindari dashboard yang terlalu dekoratif, data palsu yang terlihat seperti data produksi, destructive action tanpa confirmation, status yang hanya dibedakan warna, dan terminology IKS yang salah.
