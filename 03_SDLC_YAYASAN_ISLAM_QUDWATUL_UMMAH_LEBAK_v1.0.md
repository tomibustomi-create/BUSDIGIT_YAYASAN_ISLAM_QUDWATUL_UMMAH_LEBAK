# 03 — SDLC: YAYASAN ISLAM QUDWATUL UMMAH LEBAK

## 1. Daftar Isi
1. Lifecycle
2. Governance & RACI
3. Repository
4. Branching
5. Environments
6. Development Standards
7. Testing
8. Security
9. Database Migration
10. CI/CD
11. Release & Rollback
12. Backup & DR
13. Monitoring
14. Incident Management
15. Change Management
16. Definition of Ready/Done
17. Roadmap
18. Risks

## 2. Lifecycle
Discovery -> Blueprint -> PRD -> Architecture -> UX -> Design -> Implementation -> Testing -> UAT -> Release -> Operations -> Maintenance.

## 3. Governance & RACI
Pimpinan = accountable bisnis; Keuangan = accountable accounting; Unit = responsible operasional; Developer = responsible teknis; Auditor = consulted/informed.

## 4. Repository
```text
santriman-finance/
├─ apps/
│  ├─ web/
│  └─ api/
├─ packages/
│  ├─ accounting/
│  ├─ auth/
│  ├─ reporting/
│  └─ shared/
├─ database/
│  ├─ migrations/
│  └─ seeds/
├─ docs/
├─ tests/
└─ infrastructure/
```

## 5. Branching
main, develop, feature/*, fix/*, hotfix/*.

## 6. Environments
local, development, staging, production.

## 7. Development Standards
Accounting first, auditability, security by default, no silent mutation, configuration over hard-code, code review untuk perubahan accounting.

## 8. Testing
Unit, integration, E2E, accounting invariant (debit = credit), regression, security, backup restore.

## 9. Security
Password hashing, secure sessions, RBAC, least privilege, encryption in transit, encrypted backup, audit trail, rate limiting, CSRF, validation, secret management.

## 10. Database Migration
Migration versioned, reviewed, tested, reversible bila memungkinkan. Perubahan production dicatat.

## 11. CI/CD
Lint -> type/static check -> unit -> integration -> security -> build -> staging -> UAT -> production.

## 12. Release & Rollback
Major/minor/patch. Setiap release memiliki changelog, migration plan, smoke test, backup check, rollback plan.

## 13. Backup & DR
Backup database, dokumen, konfigurasi penting; offsite; encryption; retention; restore test berkala.

## 14. Monitoring
Health app/database, CPU/memory/disk, backup, errors, login failures, API latency, failed jobs, accounting failures.

## 15. Incident
SEV-1 sampai SEV-4: detect -> classify -> contain -> investigate -> recover -> verify -> postmortem.

## 16. Definition of Ready
Requirement jelas, acceptance tersedia, dependency diketahui, security/data impact ditinjau.

## 17. Definition of Done
Code merged, test lulus, audit/security reviewed, migration aman, documentation updated, staging/UAT sesuai scope.

## 18. Roadmap
Foundation -> Accounting Core -> Cash/Bank -> Fund -> Education Finance -> Budget -> Reporting -> Governance -> UAT.
