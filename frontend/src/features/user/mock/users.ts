// features/user/mock/users.ts
import type { User, UserRole, UserStatus } from "../types/user-type";

const ROLES: UserRole[] = [
  "DON",
  "NURSE_RN",
  "NURSE_LPN",
  "CNA",
  "ADMISSION_STAFF",
  "SYSTEM_ADMIN",
];

const FIRST_NAMES = [
  "Anna", "David", "Lisa", "Michael", "Sarah", "James", "Emily", "Robert",
  "Jessica", "Daniel", "Kevin", "Laura", "Chris", "Amanda", "Brian", "Linda",
];
const LAST_NAMES = [
  "Lee", "Kim", "Chen", "Brown", "Williams", "Wilson", "Davis", "Johnson",
  "Taylor", "Martinez", "Nguyen", "Tran", "Smith", "Clark", "Walker", "Young",
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function randomLastLogin(seed: number): string {
  const day = 20 + (seed % 9);
  const hour = (seed * 7) % 24;
  const minute = (seed * 13) % 60;
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `06/${pad(day)}/2026${pad(hour12)}:${pad(minute)}${period}`;
}

// 10 record đầu tiên bám sát ảnh mẫu để demo UI đúng ý
export const SAMPLE_USERS: User[] = [
  { id: "1", fullName: "Anna Lee", email: "annalee@nhms.com", role: "DON", status: "ACTIVE", lastLogin: "06/29/2026 02:10PM" },
  { id: "2", fullName: "David Kim", email: "david.kim@nhms.com", role: "NURSE_RN", status: "ACTIVE", lastLogin: "06/29/2026 01:45PM" },
  { id: "3", fullName: "Lisa Chen", email: "lisa.chen@nhms.com", role: "NURSE_LPN", status: "ACTIVE", lastLogin: "06/29/2026 11:32AM" },
  { id: "4", fullName: "Michael Brown", email: "michael.brown@nhms.com", role: "CNA", status: "ACTIVE", lastLogin: "06/29/2026 09:15AM" },
  { id: "5", fullName: "Sarah Williams", email: "sarah.williams@nhms.com", role: "ADMISSION_STAFF", status: "ACTIVE", lastLogin: "06/28/2026 04:50PM" },
  { id: "6", fullName: "James Wilson", email: "james.wilson@nhms.com", role: "NURSE_RN", status: "INACTIVE", lastLogin: "06/20/2026 10:20AM" },
  { id: "7", fullName: "Emily Davis", email: "emily.davis@nhms.com", role: "CNA", status: "ACTIVE", lastLogin: "06/29/2026 08:05AM" },
  { id: "8", fullName: "Robert Johnson", email: "robert.johnson@nhms.com", role: "SYSTEM_ADMIN", status: "ACTIVE", lastLogin: "06/29/2026 02:05AM" },
  { id: "9", fullName: "Jessica Taylor", email: "jessica.taylor@nhms.com", role: "NURSE_LPN", status: "INACTIVE", lastLogin: "06/15/2026 03:40AM" },
  { id: "10", fullName: "Daniel Martinez", email: "daniel.martinez@nhms.com", role: "CNA", status: "ACTIVE", lastLogin: "06/29/2026 07:20AM" },
];

// Sinh thêm cho đủ 58 user để test phân trang / filter / search
function generateRest(count: number): User[] {
  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    const idx = 11 + i;
    const first = FIRST_NAMES[idx % FIRST_NAMES.length];
    const last = LAST_NAMES[(idx * 3) % LAST_NAMES.length];
    const role = ROLES[idx % ROLES.length];
    const status: UserStatus = idx % 8 === 0 ? "INACTIVE" : "ACTIVE";
    users.push({
      id: String(idx),
      fullName: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${idx}@nhms.com`,
      role,
      status,
      lastLogin: randomLastLogin(idx),
    });
  }
  return users;
}

export const MOCK_USERS: User[] = [...SAMPLE_USERS, ...generateRest(48)]; // tổng 58 users
