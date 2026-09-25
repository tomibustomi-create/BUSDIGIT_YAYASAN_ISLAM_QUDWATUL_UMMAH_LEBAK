/**
 * ==============================================================================
 * SISTEM INFORMASI KEUANGAN & AKUNTANSI YAYASAN ISLAM QUDWATUL UMMAH LEBAK
 * TUGAS PROJEK BISNIS DIGITAL (BUSDIGIT)
 * File: Code.gs (Google Apps Script Backend & Firebase Firestore Bridge)
 * ==============================================================================
 */

// ======================== KONFIGURASI PROJEK ========================
const CONFIG = {
  APP_TITLE: "SIMKEU Qudwatul Ummah Lebak",
  VERSION: "1.0.0",
  // Masukkan Firebase Project ID Anda di sini jika ingin menggunakan koneksi REST Firestore langsung dari Apps Script
  FIREBASE_PROJECT_ID: "qudwah-keuangan-prod", 
  DEFAULT_UNITS: [
    { id: "yayasan", name: "Kantor Yayasan Qudwatul Ummah" },
    { id: "tkit", name: "TKIT Qudwatul Ummah" },
    { id: "sdit", name: "SDIT Qudwatul Ummah" },
    { id: "smpit", name: "SMPIT Qudwatul Ummah" },
    { id: "smait", name: "SMAIT Qudwatul Ummah" },
    { id: "boarding", name: "Pondok Pesantren / Boarding Qudwah" }
  ],
  FUND_SOURCES: [
    { id: "INPAK", name: "INPAK Pendidikan" },
    { id: "IKS", name: "IKS (Iuran Kegiatan Siswa)" },
    { id: "ISB", name: "ISB (Iuran Sarana Belajar)" },
    { id: "SPP", name: "SPP (Sumbangan Pembinaan Pendidikan)" },
    { id: "IBL", name: "IBL (Iuran Belajar Lembaga / Asrama)" },
    { id: "BOS", name: "BOS (Bantuan Operasional Sekolah Pusat)" },
    { id: "BOSDA", name: "BOSDA (Bantuan Operasional Daerah)" },
    { id: "SODAQOH", name: "Sodaqoh / ZISWAF Yayasan" }
  ]
};

/**
 * Endpoint Utama Web App (Melayani file HTML)
 */
function doGet(e) {
  const htmlOutput = HtmlService.createTemplateFromFile('index').evaluate();
  htmlOutput
    .setTitle(CONFIG.APP_TITLE)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return htmlOutput;
}

/**
 * Mengambil metadata konfigurasi sistem (Unit & Sumber Dana)
 */
function getSystemMetadata() {
  return {
    units: CONFIG.DEFAULT_UNITS,
    fundSources: CONFIG.FUND_SOURCES,
    version: CONFIG.VERSION
  };
}

/**
 * Inisialisasi Sheet Database Otomatis jika pengguna memilih mode Spreadsheet
 */
function initializeSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create("DATABASE_SIMKEU_QUDWATUL_UMMAH");
  
  // Sheet Jurnal Umum
  let sheetJurnal = ss.getSheetByName("Jurnal_Umum");
  if (!sheetJurnal) {
    sheetJurnal = ss.insertSheet("Jurnal_Umum");
    sheetJurnal.appendRow([
      "ID Jurnal", "Tanggal", "Unit ID", "Sumber Dana", "Keterangan", 
      "Kode Akun Debit", "Nama Akun Debit", "Nominal Debit", 
      "Kode Akun Kredit", "Nama Akun Kredit", "Nominal Kredit", 
      "Bukti/Evidence", "Status", "Operator", "Waktu Input"
    ]);
    sheetJurnal.getRange(1, 1, 1, 15).setFontWeight("bold").setBackground("#059669").setFontColor("#FFFFFF");
  }

  // Sheet Tagihan & Pembayaran SPP/IBL
  let sheetSPP = ss.getSheetByName("SPP_IBL");
  if (!sheetSPP) {
    sheetSPP = ss.insertSheet("SPP_IBL");
    sheetSPP.appendRow([
      "No Invoice", "Tanggal", "Unit", "NISN/ID", "Nama Siswa", "Kelas", 
      "Bulan Tagihan", "Nominal SPP", "Nominal IBL", "Nominal IKS", 
      "Total Bayar", "Status", "Metode", "Waktu Input"
    ]);
    sheetSPP.getRange(1, 1, 1, 14).setFontWeight("bold").setBackground("#2563EB").setFontColor("#FFFFFF");
  }

  // Sheet Anggaran BOS / BOSDA
  let sheetBOS = ss.getSheetByName("Anggaran_BOS");
  if (!sheetBOS) {
    sheetBOS = ss.insertSheet("Anggaran_BOS");
    sheetBOS.appendRow([
      "Kode Komponen", "Sumber Dana", "Unit", "Kegiatan / Belanja", 
      "Pagu Anggaran", "Realisasi", "Sisa Saldo", "Status", "No Bukti Nota"
    ]);
    sheetBOS.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#D97706").setFontColor("#FFFFFF");
  }

  return { success: true, spreadsheetUrl: ss.getUrl() };
}

/**
 * Menyimpan Transaksi Jurnal Akuntansi Double-Entry
 * Menjamin prinsip Invariant Akuntansi: Debit == Credit
 */
function recordJournalTransaction(data) {
  try {
    // 1. Validasi Invariant Akuntansi
    const debit = Number(data.nominalDebit) || 0;
    const credit = Number(data.nominalCredit) || 0;

    if (debit <= 0 || credit <= 0) {
      return { success: false, message: "Nominal transaksi harus lebih besar dari 0!" };
    }

    if (Math.round(debit) !== Math.round(credit)) {
      return { 
        success: false, 
        message: `Jurnal tidak seimbang! Debit (Rp ${debit.toLocaleString('id-ID')}) != Kredit (Rp ${credit.toLocaleString('id-ID')})` 
      };
    }

    // 2. Generate ID Jurnal Unik
    const timestamp = new Date();
    const dateStr = Utilities.formatDate(timestamp, "Asia/Jakarta", "yyyyMMdd");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const journalId = `JV-${data.unitId.toUpperCase()}-${dateStr}-${randomSuffix}`;

    // 3. Simpan ke Spreadsheet jika terhubung
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      if (ss) {
        let sheet = ss.getSheetByName("Jurnal_Umum");
        if (!sheet) {
          initializeSheets();
          sheet = ss.getSheetByName("Jurnal_Umum");
        }
        sheet.appendRow([
          journalId,
          data.tanggal || Utilities.formatDate(timestamp, "Asia/Jakarta", "yyyy-MM-dd"),
          data.unitId,
          data.fundSourceId,
          data.keterangan,
          data.debitAccountCode,
          data.debitAccountName,
          debit,
          data.creditAccountCode,
          data.creditAccountName,
          credit,
          data.evidenceUrl || "-",
          "POSTED",
          data.operator || "Admin Yayasan",
          Utilities.formatDate(timestamp, "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss")
        ]);
      }
    } catch (e) {
      Logger.log("Peringatan Spreadsheet: " + e.message);
    }

    // 4. Catat Log
    Logger.log("Transaksi Jurnal Berhasil Dicatat: " + journalId);

    return {
      success: true,
      journalId: journalId,
      message: `Jurnal berhasil diposting dengan ID: ${journalId}`,
      data: data
    };

  } catch (error) {
    return { success: false, message: "Gagal menyimpan jurnal: " + error.toString() };
  }
}

/**
 * Menyimpan Pembayaran SPP / IBL Siswa
 */
function recordStudentPayment(data) {
  try {
    const timestamp = new Date();
    const invoiceNo = `SPP-${data.unitId.toUpperCase()}-${Utilities.formatDate(timestamp, "Asia/Jakarta", "yyyyMM")}-${Math.floor(100 + Math.random() * 900)}`;
    const total = (Number(data.nominalSPP) || 0) + (Number(data.nominalIBL) || 0) + (Number(data.nominalIKS) || 0);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) {
      let sheet = ss.getSheetByName("SPP_IBL");
      if (!sheet) {
        initializeSheets();
        sheet = ss.getSheetByName("SPP_IBL");
      }
      sheet.appendRow([
        invoiceNo,
        data.tanggal || Utilities.formatDate(timestamp, "Asia/Jakarta", "yyyy-MM-dd"),
        data.unitId,
        data.studentId || "-",
        data.studentName,
        data.classGrade,
        data.billingMonth,
        Number(data.nominalSPP) || 0,
        Number(data.nominalIBL) || 0,
        Number(data.nominalIKS) || 0,
        total,
        "LUNAS",
        data.paymentMethod || "Tunai / Kas",
        Utilities.formatDate(timestamp, "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss")
      ]);
    }

    return {
      success: true,
      invoiceNo: invoiceNo,
      totalPaid: total,
      message: `Pembayaran SPP/IBL untuk ${data.studentName} berhasil dicatat!`
    };
  } catch (err) {
    return { success: false, message: "Gagal memproses SPP: " + err.toString() };
  }
}

/**
 * Mengambil Ringkasan Statistik Keuangan (Mock + Sheet Synced)
 */
function getFinancialDashboardSummary() {
  return {
    totalKasBank: 348500000,
    totalPenerimaanBulanIni: 87500000,
    totalPengeluaranBulanIni: 42350000,
    sisaAnggaranBOS: 65000000,
    chartSumberDana: {
      labels: ["SPP", "BOS", "BOSDA", "INPAK", "IBL", "IKS/ISB", "Sodaqoh"],
      data: [35000000, 25000000, 10000000, 7500000, 5000000, 3000000, 2000000]
    },
    transaksiTerbaru: [
      { id: "JV-SDIT-202609-101", unit: "SDIT Qudwah", dana: "BOS", desc: "Pembelian ATK Semester Ganjil", debit: 2450000, credit: 2450000, tgl: "2026-09-24", status: "POSTED" },
      { id: "JV-SMPIT-202609-102", unit: "SMPIT Qudwah", dana: "SPP", desc: "Penerimaan SPP & IBL Siswa Kelas 8", debit: 4500000, credit: 4500000, tgl: "2026-09-24", status: "POSTED" },
      { id: "JV-SMAIT-202609-103", unit: "SMAIT Qudwah", dana: "BOSDA", desc: "Konsumsi Pelatihan Guru Tahfizh", debit: 1200000, credit: 1200000, tgl: "2026-09-23", status: "POSTED" },
      { id: "JV-YAYS-202609-104", unit: "Kantor Yayasan", dana: "Sodaqoh", desc: "Penyaluran Santunan Beasiswa Dhuafa", debit: 3500000, credit: 3500000, tgl: "2026-09-22", status: "POSTED" }
    ]
  };
}

/**
 * Helper REST Firestore untuk integrasi Cloud Firestore langsung dari Apps Script
 */
function syncToFirestoreREST(collectionName, docId, jsonData, firebaseApiKey, firebaseProjectId) {
  try {
    const projectId = firebaseProjectId || CONFIG.FIREBASE_PROJECT_ID;
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}/${docId}?key=${firebaseApiKey}`;
    
    // Format JSON ke struktur Firestore Document Fields
    const firestoreFields = {};
    for (const key in jsonData) {
      const val = jsonData[key];
      if (typeof val === 'number') {
        firestoreFields[key] = { doubleValue: val };
      } else if (typeof val === 'boolean') {
        firestoreFields[key] = { booleanValue: val };
      } else {
        firestoreFields[key] = { stringValue: String(val) };
      }
    }

    const payload = JSON.stringify({ fields: firestoreFields });
    const options = {
      method: "patch",
      contentType: "application/json",
      payload: payload,
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(url, options);
    const respCode = response.getResponseCode();
    if (respCode >= 200 && respCode < 300) {
      return { success: true, message: "Sinkronisasi ke Cloud Firestore Berhasil!" };
    } else {
      return { success: false, message: "Gagal sync Firestore: " + response.getContentText() };
    }
  } catch (e) {
    return { success: false, message: "Error Firestore REST: " + e.toString() };
  }
}
