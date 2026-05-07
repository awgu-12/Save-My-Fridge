# Save-My-Fridge
<img width="611" height="605" alt="스크린샷 2026-03-24 200914" src="https://github.com/user-attachments/assets/c8310db9-0bd4-4203-8f96-5864b1fc690e" />

**학번:** 22411905  
**성함:** 구민주  
**이메일:** alswn249@naver.com

## [ Revision history ]

| Revision date | Version # | Description | Author |
| :--- | :--- | :--- | :--- |
| 04/29/2026 | 0.1.0 | first writing | 구민주 |
| 04/30/2026 | 0.1.1 | contents 5,6 writing | 구민주 |

### = Contents =
| No. | Title |
| :--- | :--- |
| 1 | Introducion .....................................................
| 2 | Use case analysis ...............................................
| 3 | Domain analysis .................................................
| 4 | User Interface prototype ........................................
| 5 | Glossary ........................................................
| 6 | References ......................................................

#### 1. Introduction
**1. Summary**<br/>
많은 사람들은 일상생활에서 식재료를 구매하고 관리하는 과정에서 냉장고 깊숙이 보관된 재료의 존재를 잊거나 유통기한을 놓쳐 음식을 폐기하곤 한다. 
특히 1인 가구나 바쁜 현대인들은 냉장고 안의 정확한 재고 상태를 파악하지 못해 이미 있는 재료를 중복 구매하는 경제적 손실을 겪기도 한다. 
이러한 비효율적인 식재료 관리와 음식물 쓰레기 발생 문제를 해소하기 위하여 고안된 시스템이 바로 **'Save-My-Fridge'**이다.
**2. intorduce "Save-My-Fridge**<br/>
본 시스템에서 사용자들은 자신이 보유한 식재료를 냉장 및 냉동 위치별로 등록하고 관리할 수 있다. 
사용자는 각 재료의 수량과 유통기한 정보를 한눈에 파악하여 불필요한 중복 구매를 방지할 수 있으며, 
검색 및 필터 기능을 통해 원하는 재료를 신속하게 찾을 수 있다. 
또한, 시스템이 유통기한 임박(3일 이내) 재료나 폐기 대상 재료를 자동으로 판별하여 시각적으로 표시해 줌으로써 식재료의 선순환을 돕고 위생적인 관리 환경을 제공한다는 장점이 있다.
**3. Goal**<br/>
이번 Analysis 보고서에서는 시스템의 사용자(User)와 내부 시스템 로직이 어떤 구성으로 다양한 기능들을 수행하는지 모델링하고, 
각 기능들을 구체적으로 분석하여 명확하게 정의할 것이다. 또한, 유통기한 관리, 재료 등록 및 수정 등의 기능을 실제로 구현하기 위해 필요한 핵심 클래스들을 도출하고 데이터 간의 관계를 분석하는 것을 목표로 한다.

#### 2. Use case analysis
1. Use case diagram
<img width="1240" height="1183" alt="스크린샷 2026-04-30 151452" src="https://github.com/user-attachments/assets/ba557071-2370-4946-91e4-20b7592a20b1" />
Conceptualization 보고서에서 작성했던 Use case list를 바탕으로 그려진 Use case diagram으로, starUML을 이용하여 액터(User)가 시스템의 12가지 주요 기능들에 어떤 식으로 접근하고, 각 Use case들이 상호작용하는 관계를 구체적으로 지정하였다. 특히 식재료 등록, 수정, 삭제 및 유통기한 자동 판별 기능을 중심으로 사용자의 관리 흐름을 시각화하였다.

2. Use case description
| :--- |
Use case #1 : Login
GENERAL CHARACTERISTICS
| Term | Description |
| :--- | :---|
| Summary | 사용자가 시스템을 이용하기 위해 신원 확인하는 기능 |
| Scope | Refrigerator Management System (RMS) |
| Level | User level |
| Author | 구민주 | 
| Last Update | 2026-05-07 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 앱이 실행되어 고르인 화면 활성화된 상태 |
| Trigger | 앱 초기 화면에서 아이디/비밀번호 입력 후 로그인 버튼을 누를 경우 |
| Success Post Conditon| 계정 정보 일치 시 인증 성공하고 메인 목록 화면으로 진입 |
| Failed Post Condition | 계정 정보가 일치하지 않거나 오프라인 상태일 경우 로그인이 실패한다. |

MAIN SUCCESS SCENARIO
| step | Action |
| :--- | :--- |
| s | 사용자가 로그인 서버에 인증을 요청한다. |
| 1 | 이 User case는 사용자가 아이디와 비밀번호를 입력할 때 시작된다. |
| 2 | 사용자는 로그인 버튼을 누른다. |
| 3 | 사용자 계정이 존재하고 정보가 일치하면 시스템에 접속한다. |
| 4 | 이 User case는 사용자가 메인 목록 화면 진입에 성공하면 끝난다. |
EXTENSION SCENARIOS
| step | Branching Action |
| :--- | :--- |
| 3 | 3a. 계정 정보가 틀리거나 네트워크 오류 시 접속에 실패한다.<br/r> ...3a1. "아이디 또는 비밀번호를 확인해주세요" 문구를 보여준다.<br/r> ...3a2. 다시 로그인을 시도한다.(Use case #1 재실행) |
RELATED INFORMATION
| Term | Description |
| :--- | :---|
| Performance | <5 seconds |
| Frequency | 앱 실행 시마다 발생 |
| <Concurrency> | 제한 없음 |
| Due Date |

Use case #2 : Register Ingerdient
GENERAL CHARACTERISTICS
| Term | Description |
| :--- | :---|
| Summary | 사용자가 새로운 식재료 정보를 시스템에 등록하기 위한 기능 |
| Scope | Refrigerator Management System (RMS) |
| Level | User level |
| Author | 구민주 | 
| Last Update | 2026-05-07 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자가 로그인 후 메인 화면에 접속한 상황이어야 한다. |
| Trigger | 사용자가 식재료 추가 버튼을 누를 경우 |
| Success Post Conditon| 데이터베이스에 정보가 저장되고 목록 화면에 즉시 반영된다. |
| Failed Post Condition | 필수 정보 누락 시 저장 실패하고 경고 메세지를 보여준다. |

MAIN SUCCESS SCENARIO
| step | Action |
| :--- | :--- |
| s | 사용자가 식재료 추가 버튼을 누른다. |
| 1 | 이 User case는 사용자가 추가 버튼(+)을 클릭할 때 시작된다. |
| 2 | 사용자는 재료명, 유통기한, 수량 등의 정보를 입력한다. |
| 3 | 시스템은 입력된 데이터의 유효성을 검사한 후 서버에 저장한다. |
| 4 | 이 User case는 사용자가 등록된 재료를 확인하면 끝난다. |
EXTENSION SCENARIOS
| step | Branching Action |
| :--- | :--- |
| 3 | 3a. 필수 입력값 누락 시 등록 실패<br/r> ...3a1. 누락된 항목을 입력하라는 알림창 보여주기<br/r> ...3a2. 사용자는 다시 입력을 시도한다.(Use case #2 재실행) |
RELATED INFORMATION
| Term | Description |
| :--- | :---|
| Performance | <3 seconds |
| Frequency | 식재료 새로 구매 시 발생 |
| <Concurrency> | 제한 없음 |
| Due Date |

Use case #3 : Delete Ingerdient
GENERAL CHARACTERISTICS
| Term | Description |
| :--- | :---|
| Summary | 소비 완료하거나 폐기할 재료를 목록에서 제거하는 기 |
| Scope | Refrigerator Management System (RMS) |
| Level | User level |
| Author | 구민주 | 
| Last Update | 2026-05-07 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 삭제하고자 하는 식재료가 목록에 존재해야한다. |
| Trigger | 사용자가 식재료 상세 정보 또는 목록에서 '삭제' 버튼을 누를 경우 |
| Success Post Conditon| 데이터베이스에서 해당 식재료 정보가 삭제되고 목록에서 사라진다. |
| Failed Post Condition | 삭제 확인 팝업에서 취소를 누를 경우 기존 상태를 유지한다. |

MAIN SUCCESS SCENARIO
| step | Action |
| :--- | :--- |
| s | 사용자가 특정 식재료의 삭제 버튼을 누른다. |
| 1 | 이 User case는 사용자가 삭제 명령을 내릴 때 시작된. |
| 2 | 시스템은 사용자에게 정말로 삭제할 것인지 묻는 확인 팝업을 띄운다. |
| 3 | 사용자가 '확인'을 선택하면 시스템은 해당 데이터를 영구 삭제한다. |
| 4 | 이 User case는 목록 화면이 갱신되어 삭제된 항목이 보이지 않으면 끝난다. |
EXTENSION SCENARIOS
| step | Branching Action |
| :--- | :--- |
| 2 | 2a. 사용자가 확인 팝업에서 '취소'를 선택한다.<br/r> ...2a1. 시스템은 삭제 처리를 중단하고 이전 화면으로 돌아간다. |
RELATED INFORMATION
| Term | Description |
| :--- | :---|
| Performance | <1 seconds |
| Frequency | 식재료를 다 썼을 때나 버릴 때 발생 (frequent) |
| <Concurrency> | 제한 없음 |
| Due Date |

Use case #4 : Edit Quantity
GENERAL CHARACTERISTICS
| Term | Description |
| :--- | :---|
| Summary | 등록된 식재료의 보관 수량을 늘리거나 줄여서 업데이트하는 기능 |
| Scope | Refrigerator Management System (RMS) |
| Level | User level |
| Author | 구민주 | 
| Last Update | 2026-05-07 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 수량을 수정할 식재료가 목록에 등록되어 있어야 한다. |
| Trigger | 사용자가 식재료 리스트 또는 상세 화면에서 수량 조절(+/-) 버튼을 누를 경우 |
| Success Post Conditon| 변경된 수량이 데이터베이스에 즉시 저장되고 화면에 반영된다. |
| Failed Post Condition | 네트워크 오류 등으로 저장에 실패할 경우 이전 수량으로 복구된다. |

MAIN SUCCESS SCENARIO
| step | Action |
| :--- | :--- |
| s | 사용자가 수량 조절 버튼을 누른다. |
| 1 | 이 User case는 사용자가 사용자가 특정 재료의 수량을 변경하고자 할 때 시작되다 . |
| 2 | 사용자는 증감 버튼을 통해 원하는 수량으로 조절한다. |
| 3 | 시스템은 실시간으로 변경된 수치를 데이터베이스에 업데이트한다. |
| 4 | 화면에 수정된 수량이 정확히 표시되면 use case는 끝난다. |
EXTENSION SCENARIOS
| step | Branching Action |
| :--- | :--- |
| 2 | 2a. 사용자가 수량을 0미만으로 줄이려고 시도한다.<br/r> ...2a1. 시스템은 수량이 0보다 작을 수 없다는 안내를 하거나 버튼을 비활성화 시킨다. |
RELATED INFORMATION
| Term | Description |
| :--- | :---|
| Performance | <1 seconds |
| Frequency | 식재료를 일부 사용 시 혹은 추가로 넣을 시 발생 (frequent) |
| <Concurrency> | 제한 없음 |
| Due Date |

Use case #5 : View All List
GENERAL CHARACTERISTICS
| Term | Description |
| :--- | :---|
| Summary | 현재 냉장고에 보관 중인 모든 식재료의 목록을 한눈에 확인하는 기능 |
| Scope | Refrigerator Management System (RMS) |
| Level | User level |
| Author | 구민주 | 
| Last Update | 2026-05-07 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 사용자가 로그인에 성공하여 메인 시스템에 접속한 상태일 것. |
| Trigger | 로그인 직후 or '목록'아이콘을 클릭할 경우 |
| Success Post Conditon| 데이터베이스의 최신 식재료 데이터를 불러와 화면에 리스트 형식으로 출력 |
| Failed Post Condition | 데이터를 불러오는데 실패할 시 네트워크 오류 메시지 출력 |

MAIN SUCCESS SCENARIO
| step | Action |
| :--- | :--- |
| s | 사용자가 메인 목록 화면 요청 |
| 1 | 사용자가 시스테므이 메인 화면에 접속 시 해당 use case 시작 |
| 2 | 시스템은 서버로부터 해당 사용자의 전체 식재료 데이터를 요청 |
| 3 | 시스템은 받아온 정보를 이름, 유통기한, 수량 등 정해진 형식에 맞춰 나열 |
| 4 | 전체 리스트를 사용자가 확인 가능할 때 해당 use case 종료 |
EXTENSION SCENARIOS
| step | Branching Action |
| :--- | :--- |
| 2 | 2a. 데이터 베이스에 등록된 식재료가 하나도 없을 경우<br/r> ...2a1. 시스템은 "보관 중인 재료가 없습니다"라는 문구와 함께 비어있는 화면을 보여준다. |
RELATED INFORMATION
| Term | Description |
| :--- | :---|
| Performance | <2 seconds |
| Frequency | 앱 이용 시 가장 빈번하게 발생(always) |
| <Concurrency> | 제한 없음 |
| Due Date |

Use case #6 : Search by Name
GENERAL CHARACTERISTICS
| Term | Description |
| :--- | :---|
| Summary | 사용자가 검색어를 입력하여 특정 식재료를 빠르게 찾는 기능 |
| Scope | Refrigerator Management System (RMS) |
| Level | User level |
| Author | 구민주 | 
| Last Update | 2026-05-07 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 메인 목록 화면에 접속 상태. |
| Trigger | 사용자가 상단 검색창에 텍스트 입력 시 |
| Success Post Conditon| 입력한 검색어가 포함된 식재료들만 화면에 필터링되어 나타난다. |
| Failed Post Condition | 검색 결과가 없을 경우 해당 내용을 사용자에게 알린다 |

MAIN SUCCESS SCENARIO
| step | Action |
| :--- | :--- |
| s | 사용자가 검색창에 찾고자 하는 재료의 이름을 입력 |
| 1 | 사용자가 검색창을 터치하고 키워드 입력 시 use case 시작 |
| 2 | 시스템은 입력된 글자가 포함된 재료 명칭을 실시간으로 검색한다 |
| 3 | 시스템은 전체 목록 중 조건에 일치하는 항목들만 남기고 나머지는 숨긴다. |
| 4 | 이 User case는 사용자가 원하는 재료를 찾아낼 시 종료 |
EXTENSION SCENARIOS
| step | Branching Action |
| :--- | :--- |
| 2 | 2a. 입력한 검색어와 일치하는 식재료가 목록에 없는 경우<br/r> ...2a1. 시스템은 "검색 결과가 없습니다"라는 메시지를 화면에 표시한다. |
RELATED INFORMATION
| Term | Description |
| :--- | :---|
| Performance | <1 seconds |
| Frequency | 저장된 재료가 많을 때 주로 발생(frequent) |
| <Concurrency> | 제한 없음 |
| Due Date |

Use case #7 : Category Filter
GENERAL CHARACTERISTICS
| Term | Description |
| :--- | :---|
| Summary | 사용자가 검색어를 입력하여 특정 식재료를 빠르게 찾는 기능 |
| Scope | Refrigerator Management System (RMS) |
| Level | User level |
| Author | 구민주 | 
| Last Update | 2026-05-07 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 메인 목록 화면에 접속 상태. |
| Trigger | 사용자가 상단 검색창에 텍스트 입력 시 |
| Success Post Conditon| 입력한 검색어가 포함된 식재료들만 화면에 필터링되어 나타난다. |
| Failed Post Condition | 검색 결과가 없을 경우 해당 내용을 사용자에게 알린다 |

MAIN SUCCESS SCENARIO
| step | Action |
| :--- | :--- |
| s | 사용자가 검색창에 찾고자 하는 재료의 이름을 입력 |
| 1 | 사용자가 검색창을 터치하고 키워드 입력 시 use case 시작 |
| 2 | 시스템은 입력된 글자가 포함된 재료 명칭을 실시간으로 검색한다 |
| 3 | 시스템은 전체 목록 중 조건에 일치하는 항목들만 남기고 나머지는 숨긴다. |
| 4 | 이 User case는 사용자가 원하는 재료를 찾아낼 시 종료 |
EXTENSION SCENARIOS
| step | Branching Action |
| :--- | :--- |
| 2 | 2a. 입력한 검색어와 일치하는 식재료가 목록에 없는 경우<br/r> ...2a1. 시스템은 "검색 결과가 없습니다"라는 메시지를 화면에 표시한다. |
RELATED INFORMATION
| Term | Description |
| :--- | :---|
| Performance | <1 seconds |
| Frequency | 저장된 재료가 많을 때 주로 발생(frequent) |
| <Concurrency> | 제한 없음 |
| Due Date |
#### 3. Domain analysis
1) User
사용자에 관련된 클래스이다. 시스템 접속을 위한 계정 정보와 사용자 이름을 관리하는 클래스이다.

2) Inventory
전체 재고를 관리하는 클래스이다. 현재 보관 중인 식재료의 총 개수와 업데이트 정보를 저장하는 클래스이다.

3) Ingredient
식재료 상세 정보를 가지는 클래스이다. 재료의 이름, 수량, 카테고리 등을 저장하고 관리하는 핵심 클래스이다.

4) ExpirationManager
유통기한을 관리하는 클래스이다. 현재 날짜와 비교하여 기한 임박 알림이나 폐기 여부를 판별하는 기능을 한다.

5) StorageManager
보관 위치 정보를 관리하는 클래스이다. 식재료가 냉장실 혹은 냉동실 중 어디에 위치하는지 저장하는 클래스이다.

6) Memo
부가 정보를 관리하는 클래스이다. 식재료에 대해 사용자가 별도로 기록한 메모 내용을 저장하고 있는 클래스이다.

#### 4. User Interface prototype
#### 5. Glossary
| Term | Description |
| :--- | :--- |
| 사용자(User) | 냉장고 내 식재료를 등록, 수정, 삭제하며 관리하는 사용 |
| 식재료 | 냉장고에 보관되는 품목으로 일므, 수량, 유토익한 등의 정보를 가진 물건 |
| 보관 위치 | 식재료가 저장도니 물리적 장소 |
| 유통기한 | 식재료를 안전하게 섭취할 수 있는 최대 기한 |
| 카테고리 | 식재료의 종류에 따른 분류 |
| 유통기한 관리 | 현재 날짜를 기준으로 재료의 신선도 상태를 판별하는 행위 |
| 재고목록 | 사용자가 등록하여 현재 시스템에 저장되어 있는 모든 식재료 데이터 |
| 메 | 특정 식재료에 대해 사용자가 추가로 기록한 정보 |

#### 6.. References
사용자, 보관 위치, 유통기한 — <https://www.foodsafetykorea.go.kr/>
식재료, 재고 목록 - <https://www.naqs.go.kr/hp/main/main.do>
Android Developers Documentation (UI Components) — <https://developer.android.com/docs>
Google Material Design 3 (UI/UX Guidelines) — <https://m3.material.io>
StarUML Documentation (Diagramming Standards) — <http://staruml.io/docs>
