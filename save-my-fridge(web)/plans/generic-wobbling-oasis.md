# Plan: 계정설정, 개인정보 보호, 알림 기능 추가

## Context
Save-My-Fridge 앱에 현재 프로필 페이지의 "계정 설정"과 "개인정보 보호" 버튼이 실제 페이지 없이 placeholder 상태입니다. 또한 헤더의 Bell 아이콘도 동작하지 않습니다. 이 세 가지를 완전히 구현합니다.

## 추가할 기능

### 1. 계정 설정 페이지 (`/account-settings`)
- 이름(별명) 변경: 입력 필드로 닉네임 수정
- 프로필 사진: 파일 업로드 or 이모지 아바타 선택 (6가지 옵션)
- 저장 시 `localStorage`에 persist → Profile 페이지에 즉시 반영
- 뒤로가기 버튼 → `/profile`

### 2. 개인정보 보호 페이지 (`/privacy`)
- 냉장고 데이터 공개 범위 설정 (나만 보기 / 가족 공개)
- 냉장고 공유 멤버 관리 (멤버 추가/제거 UI — mock)
- 데이터 자동 삭제 설정 (폐기 재료 자동 삭제 토글)
- 냉장고 동기화 on/off 토글
- 뒤로가기 버튼 → `/profile`

### 3. 알림 패널 (NotificationPanel 컴포넌트)
- 헤더 Bell 아이콘 클릭 시 슬라이드다운 오버레이로 표시
- Bell 아이콘에 미읽은 알림 수 뱃지 표시
- 알림 종류:
  - 🔴 **폐기 알람**: `expiryDate < today` 인 재료 (자동 생성)
  - 🟠 **폐기 임박 알람**: `0 <= days <= 3` 인 재료 (자동 생성)
  - 🟢 **오늘의 추천 레시피**: 정적 샘플 2~3개 (고정 알림)
- 알림 개별 삭제 (X 버튼) + "전체 삭제" 버튼
- Home, Main, Profile 헤더에 동일 컴포넌트 사용

## 구현 전략

### 새로 만들 파일
| 파일 | 역할 |
|------|------|
| `src/app/pages/AccountSettings.tsx` | 계정 설정 페이지 |
| `src/app/pages/Privacy.tsx` | 개인정보 보호 페이지 |
| `src/app/components/NotificationPanel.tsx` | 알림 패널 (재사용) |
| `src/app/context/UserContext.tsx` | 닉네임/프로필사진 전역 상태 |

### 수정할 파일
| 파일 | 변경 내용 |
|------|-----------|
| `src/app/routes.tsx` | `/account-settings`, `/privacy` 라우트 추가 |
| `src/app/App.tsx` | `UserProvider` 감싸기 |
| `src/app/pages/Profile.tsx` | 버튼 navigate 연결, 사용자 정보(닉네임/사진) 표시 |
| `src/app/pages/Home.tsx` | Bell → NotificationPanel 연결, 뱃지 표시 |
| `src/app/pages/Main.tsx` | Bell → NotificationPanel 연결, 뱃지 표시 |

### UserContext 데이터 모델
```typescript
type UserProfile = {
  nickname: string;
  avatarEmoji: string; // e.g. "👤", "🧑", "👩", etc.
};
// localStorage key: "smf_user_profile"
```

### 알림 생성 로직 (NotificationPanel 내부)
```typescript
const today = new Date("2026-04-29"); // 앱 고정 날짜
const notifications = [
  // 폐기된 재료 (red)
  ...ingredients.filter(i => daysUntil(i.expiryDate) < 0).map(i => ({
    id: `expired-${i.id}`, type: "expired", title: `[폐기] ${i.name}`, ...
  })),
  // 임박 (orange, 0~3일)
  ...ingredients.filter(i => daysUntil(i.expiryDate) >= 0 && daysUntil(i.expiryDate) <= 3).map(...),
  // 추천 레시피 (green)
  { id: "recipe-1", type: "recipe", title: "오늘의 추천 레시피: 계란볶음밥" },
  { id: "recipe-2", type: "recipe", title: "오늘의 추천 레시피: 야채 된장국" },
]
```

### 알림 패널 UX
- 헤더 바로 아래 절대위치 오버레이 (top: 64px)
- 배경 클릭 시 닫힘 (backdrop)
- 앱 내 전역 상태 불필요 — `useState` local (각 화면별 독립)
- 삭제된 알림은 `dismissedIds` local state로 필터링

## 라우트 추가
```typescript
{ path: "/account-settings", Component: AccountSettings },
{ path: "/privacy", Component: Privacy },
```

## 검증 방법
1. Profile 페이지 → "계정 설정" 클릭 → AccountSettings 페이지 확인
2. 닉네임 변경 후 저장 → Profile로 돌아가면 변경된 이름 표시 확인
3. 아바타 이모지 선택 → Profile 프로필 사진에 반영 확인
4. Privacy 페이지 열기 → 토글/설정 동작 확인
5. Bell 아이콘 클릭 → 알림 패널 슬라이드다운 확인
6. 폐기/임박 재료가 알림에 나타나는지 확인 (초기 데이터 기준: 양상추 폐기, 다짐육 D-1)
7. 알림 X 버튼으로 개별 삭제, "전체 삭제" 동작 확인
8. Bell 뱃지 숫자가 알림 수와 일치하는지 확인
