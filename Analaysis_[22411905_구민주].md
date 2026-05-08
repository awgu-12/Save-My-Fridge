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
| 3 | 3a. 계정 정보가 틀리거나 네트워크 오류 시 접속에 실패한다. |
|   | ...3a1. "아이디 또는 비밀번호를 확인해주세요" 문구를 보여준다. |
|   | ...3a2. 다시 로그인을 시도한다.(Use case #1 재실행) |
RELATED INFORMATION
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
| 3 | 3a. 필수 입력값 누락 시 등록 실패 |
|   | ...3a1. 누락된 항목을 입력하라는 알림창 보여주기 |
|   | ...3a2. 사용자는 다시 입력을 시도한다.(Use case #2 재실행) |
RELATED INFORMATION
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
| 2 | 2a. 사용자가 확인 팝업에서 '취소'를 선택한다. |
|   | ...2a1. 시스템은 삭제 처리를 중단하고 이전 화면으로 돌아간다. |
RELATED INFORMATION
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
| 3 | 시스템은 실시간으로 변경된 수치를 데이터베이스에 업데이트하고 화면에 표시한다. |
EXTENSION SCENARIOS
| step | Branching Action |
| 2 | 2a. 사용자가 수량을 0미만으로 줄이려고 시도한다. |
|   | ...2a1. 시스템은 수량이 0보다 작을 수 없다는 안내를 하거나 버튼을 비활성화 시킨다. |
RELATED INFORMATION
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
| 1 | 사용자가 시스템의 메인 화면에 접속 시 해당 use case 시작 |
| 2 | 시스템은 서버로부터 해당 사용자의 전체 식재료 데이터를 요청 |
| 3 | 시스템은 받아온 정보를 이름, 유통기한, 수량 등 정해진 형식에 맞춰 나열 & 출력 |
EXTENSION SCENARIOS
| step | Branching Action |
| 2 | 2a. 데이터 베이스에 등록된 식재료가 하나도 없을 경우 |
|   | ...2a1. 시스템은 "보관 중인 재료가 없습니다"라는 문구와 함께 비어있는 화면을 보여준다. |
RELATED INFORMATION
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
| 2 | 2a. 입력한 검색어와 일치하는 식재료가 목록에 없는 경우 |
|   | ...2a1. 시스템은 "검색 결과가 없습니다"라는 메시지를 화면에 표시한다. |
RELATED INFORMATION
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
| Preconditions | 메인 목록 화면에 접속 상태 & 재료에 카테고리 설정이 되어 있어야 한다. |
| Trigger | 사용자가 카테고리 아이콘/필터를 클릭할 경우 |
| Success Post Conditon| 선택된 카테고리에 해당하는 식재료들만 선별되어 목록 출력 |
| Failed Post Condition | 필터링 결과가 없을 경우 빈 화면과 함께 안내 문구 출력 |

MAIN SUCCESS SCENARIO
| step | Action |
| :--- | :--- |
| s | 사용자가 필터링하고 싶은 카테고리(예: 채소)를 선택한다. |
| 1 | 사용자가 특정 카테고리 버튼을 누를 때 시작된다. |
| 2 | 시스템은 전체 식재료 데이터 중 선택된 카테고리 속성값을 가진 데이터만 추출한다. |
| 3 | 시스템은 추출된 데이터들로 목록 화면을 다시 구성하여 보여준다. |
| 4 | 사용자가 카테고리별로 분류된 목록을 확인하면 끝난다. |
EXTENSION SCENARIOS
| step | Branching Action |
| 2 | 2a. 선택한 카테고리에 속한 식재료가 현재 냉장고에 하나도 없는 경우 |
|   | ...2a1. 시스템은 "해당 카테고리에 등록된 재료가 없습니다"라고 표시한다. |
RELATED INFORMATION
| Performance | <1 seconds |
| Frequency | 특정 용도의 재료를 찾을 때 자주 발생 |
| <Concurrency> | 제한 없음 |
| Due Date |

Use case #8 : Set Expiration Date

GENERAL CHARACTERISTICS
| Term | Description |
| :--- | :---|
| Summary | 식재료의 안전한 소비를 위해 만료 날짜 정보를 입력하거나 수정하는 기능 |
| Scope | Refrigerator Management System (RMS) |
| Level | User level |
| Author | 구민주 | 
| Last Update | 2026-05-08 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 식재료 등록 또는 수정 화면이 활성화된 상태 |
| Trigger | 사용자가 유통기한 입력란 또는 달력 아이콘을 클릭할 경우 |
| Success Post Conditon| 선택한 날짜 정보가 해당 식재료 데이터에 정확히 저장된다. |
| Failed Post Condition | 날짜를 선택하지 않고 취소할 경우 기존 날짜가 유지되거나 비어 있게 된다. |

MAIN SUCCESS SCENARIO
| step | Action |
| :--- | :--- |
| s | 사용자가 유통기한 설정을 위해 날짜 선택기(DatePicker)를 실행한다. |
| 1 | 사용자가 날짜 입력 칸을 터치 시 시작 |
| 2 | 시스템은 사용자에게 연/월/일 선택이 가능한 달력 UI를 제공한다. |
| 3 | 사용자가 재료의 유통기한에 해당하는 날짜를 선택하고 '확인'을 누른다. |
| 4 | 선택된 날짜가 화면에 표시되고 데이터로 확정되면 해당 use case는 끝난다. |
EXTENSION SCENARIOS
| step | Branching Action |
| 3 | 3a. 사용자가 현재 이전의 날짜(이미 지난 날짜)를 선택하려고 할 경우 |
|   | ...3a1. 시스템은 "이미 지난 날짜입니다. 다시 확인해주세요"라는 경고 메시지를 띄운다. |
RELATED INFORMATION
| Performance | <1 seconds |
| Frequency | 모든 식재료 등록 시 반드시 발생 (high) |
| <Concurrency> | 제한 없음 |
| Due Date |

Use case #9 : Exp. Date Warning

GENERAL CHARACTERISTICS
| Term | Description |
| :--- | :---|
| Summary | 유통기한 만료가 가까워진 식재료를 사용자에게 시각적으로 강조하여 알리는 기 |
| Scope | Refrigerator Management System (RMS) |
| Level | User level |
| Author | 구민주 | 
| Last Update | 2026-05-07 |
| Status | Analysis |
| Primary Actor | System |
| Preconditions | 시스템에 유통기한 정보가 입력 식재료가 존재해야 한다. |
| Trigger | 사용자가 메인 목록 화면에 진입하거나 시스템 날짜가 갱신될 경우 |
| Success Post Conditon| 유통기한이 3일 이내로 남은 재료 옆에 노란색 경고 아이콘이나 강조 문구가 표시 |
| Failed Post Condition | 조건을 만족하는 재료가 없을 경우 평상시와 동일한 목록을 출력 |

MAIN SUCCESS SCENARIO
| step | Action |
| :--- | :--- |
| s | 시스템이 전체 식재료의 유통기한 데이터를 확인한다. |
| 1 | 사용자가 목록 조회를 요청하여 데이터를 로드할 때 시작된다. |
| 2 | 시스템은 현재 날짜와 재료별 만료 날짜 사이의 잔여 기한을 계산한다. |
| 3 | 잔여 기한이 3일 이하(0 < d <= 3)인 재료들에 대해 '임박' 플래그를 설정한다. |
| 4 | User case 9번은 목록 출력 시 해당 재료들을 강조하면 끝난다. |
EXTENSION SCENARIOS
| step | Branching Action |
| 3 | 3a. 등록된 모든 식재료의 유통기한이 3일보다 많이 남았을 경우 |
|   | ...2a1. 시스템은 별도의 경고 표시 없이 일반적인 목록을 화면에 구성한다. |
RELATED INFORMATION
| Performance | <0.5 seconds |
| Frequency | 메인 화면을 볼 때마다 백그라운드에서 실 |
| <Concurrency> | 제한 없음 |
| Due Date |

Use case #10 : Identify Expired Item

GENERAL CHARACTERISTICS
| Term | Description |
| :--- | :---|
| Summary | 유통기한이 이미 경과한 식재료를 자동으로 판별하여 사용자에게 폐기를 유도하는 기능 |
| Scope | Refrigerator Management System (RMS) |
| Level | User level |
| Author | 구민주 | 
| Last Update | 2026-05-07 |
| Status | Analysis |
| Primary Actor | System |
| Preconditions | 시스템에 유통기한이 설정된 식재료 데이터가 존재해야 한다. |
| Trigger | 시스템이 목록 데이터를 로드하거나 정기적인 날짜 업데이트가 발생할 경우 |
| Success Post Conditon| 오늘 날짜를 기준으로 기한이 지난 재료를 '폐기 대상'으로 분류하고 빨간색으로 표시한다. |
| Failed Post Condition | 모든 재료의 유통기한이 유효할 경우 일반적인 목록 상태를 유지 |

MAIN SUCCESS SCENARIO
| step | Action |
| :--- | :--- |
| s | 시스템이 현재 날짜와 식재료별 유통기한을 비교한다. |
| 1 | 해당 use case는 시스템이 메인 목록 화면을 구성하기 위해 데이터를 읽을 때 시작된다. |
| 2 | 시스템은 유통기한 날짜가 오늘 날짜보다 이전(Date < Today)인 재료를 검색한다.|
| 3 | 조건에 해당하는 재료의 상태값을 'Expired(폐기)'로 변경한다. |
| 4 | 화면 목록에서 해당 재료들이 빨간색 강조와 함께 최상단에 노출되면 해당 use case는 끝난다. |
EXTENSION SCENARIOS
| step | Branching Action |
| 2 | 2a. 유통기한이 지난 재료가 하나도 존재하지 않을 경우 |
|   | ...2a1. 시스템은 별도의 폐기 경고 없이 날짜순으로 목록을 정렬하여 출력한다. |
RELATED INFORMATION
| Performance | <0.5 seconds |
| Frequency | 시스템 접속 시마다 백그라운드에서 실행 |
| <Concurrency> | 제한 없음 |
| Due Date |

Use case #11 : Add Memo

GENERAL CHARACTERISTICS
| Term | Description |
| :--- | :---|
| Summary | 식재료에 대해 사용자가 별도로 기록하고 싶은 특이사항이나 부가 정보를 저장하는 기능 |
| Scope | Refrigerator Management System (RMS) |
| Level | User level |
| Author | 구민주 | 
| Last Update | 2026-05-07 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 특정 식재료의 상세 정보 화면이나 등록/수정 화면이 열려 있어야 한다. |
| Trigger | 사용자가 '메모' 입력란을 터치하여 텍스트를 입력할 경우 |
| Success Post Conditon| 입력된 메모 내용이 해당 식재료 데이터와 함께 서버에 안전하게 저장된다. |
| Failed Post Condition | 입력 도중 취소하거나 앱이 강제 종료될 경우 작성 중이던 내용은 저장되지 않는다. |

MAIN SUCCESS SCENARIO
| step | Action |
| :--- | :--- |
| s | 사용자가 식재료에 추가 정보를 기록하기 위해 메모란을 선택한다. |
| 1 | 이 User case는 사용자가 메모 입력 영역에 텍스트를 작성할 때 시작된다. |
| 2 | 사용자는 재료의 활용법, 구매처 등의 정보를 자유롭게 기술한다. |
| 3 | 시스템은 사용자가 '저장' 또는 '완료' 버튼을 누르면 해당 텍스트를 DB에 업데이트한다. |
| 4 | 이 User case는 상세 화면에서 저장된 메모 내용이 정상적으로 조회되면 끝난다. |
EXTENSION SCENARIOS
| step | Branching Action |
| 2 | 2a. 입력된 메모의 길이가 시스템이 허용하는 최대 글자 수를 초과한 경우 |
|   | ..2a1. 시스템은 글자 수 제한 알림을 띄우고 더 이상의 입력을 제한한다. |
RELATED INFORMATION
| Performance | <2 seconds |
| Frequency | 상세한 관리가 필요한 재료에 대해 간헐적 발 |
| <Concurrency> | 제한 없음 |
| Due Date |

Use case #12 : Set Storage Location

GENERAL CHARACTERISTICS
| Term | Description |
| :--- | :---|
| Summary | 식재료를 냉장실 혹은 냉동실 중 어디에 보관할지 장소를 지정하는 기능 |
| Scope | Refrigerator Management System (RMS) |
| Level | User level |
| Author | 구민주 | 
| Last Update | 2026-05-07 |
| Status | Analysis |
| Primary Actor | User |
| Preconditions | 식재료 등록 또는 수정 화면이 활성화되어 있어야 한다. |
| Trigger | 사용자가 위치 선택 옵션을 클릭할 경우 |
| Success Post Conditon| 선택한 보관 위치 정보가 데이터베이스에 저장되어 관리된다. |
| Failed Post Condition | 위치를 선택하지 않을 경우 시스템 기본 설정값(예: 냉장)으로 저장된다. |

MAIN SUCCESS SCENARIO
| step | Action |
| :--- | :--- |
| s | 사용자가 식재료의 보관 장소를 결정한다. |
| 1 | 사용자가 화면에 제시된 '냉장' 혹은 '냉동' 옵션 중 하나를 선택한다. |
| 2 | 시스템은 선택된 위치 정보를 해당 식재료 데이터의 위치 속성에 할당한다. |
| 3 | 이 User case는 사용자가 등록/수정을 완료하여 위치 정보가 저장되면 끝난다.. |
EXTENSION SCENARIOS
| step | Branching Action |
| 1 | 1a. 사용자가 아무런 위치도 선택하지 않고 저장을 시도할 경우 |
|   | ...1a1. 시스템은 사용자의 편의를 위해 자동으로 '냉장'을 기본값으로 설정하여 저장한다. |
RELATED INFORMATION
| Performance | <1 seconds |
| Frequency | 식재료 등록 시 매번 발생 |
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
1) Login
<img width="400" height="600" alt="스크린샷 2026-04-29 110759" src="https://github.com/user-attachments/assets/b05595f5-2c74-456f-803d-6eda0f95cca8" />

Login Screen: 사용자 인증을 위한 초기 화면입니다. 시스템의 정체성을 담은 캐릭터와 함께 심플한 로그인 폼을 제공합니다. use case의 1번 기능을 보여줍니다.

2) 메인 대시보드
<img width="400" height="600" alt="스크린샷 2026-05-08 033100" src="https://github.com/user-attachments/assets/be5b4add-e5c1-416d-acb7-c257a3db4aaa" />

통합 재고 리스트: 사용자가 등록한 모든 식재료를 한눈에 파악할 수 있는 메인 대시보드. 시스템 날짜와 연동하여 유통기한 임박 재료는 노란색(D-3)으로, 만료된 재료는 빨간색(폐기)으로 상태를 즉각 표시하여 사용자의 빠른 의사결정을 돕습니다. use case의 5,9,10의 기능들을 한 번에 보여줍니다.

3) Search by name
<img width="400" height="600" alt="스크린샷 2026-05-08 032958" src="https://github.com/user-attachments/assets/9ef3e37b-0a50-45a1-8b55-5043ee5fa41d" />

실시간 이름 검색: 상단에 상시 노출되는 검색바를 통해 식재료의 양이 많아져도 이름의 일부만 입력하여 원하는 데이터를 실시간으로 필터링할 수 있도록 설계했습니다. use case의 6번 기능을 보여줍니다.

4) Category filter
<img width="400" height="600" alt="스크린샷 2026-05-08 033953" src="https://github.com/user-attachments/assets/d222f4e2-d1f2-4cde-8741-17ecd3278c76" />

카테고리 분류 필터: 채소, 육류, 유제품 등 아이콘 기반의 카테고리 탭을 제공합니다. 사용자는 터치 한 번으로 특정 그룹의 식재료만 선별하여 조회할 수 있어 냉장고 관리가 효율적입니다.

5) Registration
<img width="400" height="600" alt="스크린샷 2026-05-08 032901" src="https://github.com/user-attachments/assets/55770d2d-df2f-493d-8591-8826a33766ff" />

다중 속성 등록 화면: 식재료명 입력부터 위치(냉장/냉동) 선택, 캘린더 위젯을 통한 정밀한 유통기한 설정이 가능합니다. 수량 조절 버튼을 배치하여 오타 없이 빠르게 수치를 입력할 수 있도록 인터페이스를 구성했습니다. use case 2,8,12번을 한눈에 확인해 기능할 수 있습니다.

6) Detail Management
<img width="400" height="600" alt="스크린샷 2026-04-29 155855" src="https://github.com/user-attachments/assets/5fbf4f5a-f364-4c60-9e84-de493ac09a7f" />

상세 정보 및 편집 관리: 등록된 재료를 클릭하면 나타나는 화면으로, 보관 장소와 유통기한을 재확인할 수 있습니다. 텍스트 메모 기능을 통해 보관 팁이나 구매처 등을 기록할 수 있으며, 하단의 삭제 버튼을 통해 간편하게 재고를 정리할 수 있습니다. use case 3,4,11번의 기능을 수행합니다.

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

#### 6. References
사용자, 보관 위치, 유통기한 — <https://www.foodsafetykorea.go.kr/>

식재료, 재고 목록 - <https://www.naqs.go.kr/hp/main/main.do>

Android Developers Documentation (UI Components) — <https://developer.android.com/docs>

Google Material Design 3 (UI/UX Guidelines) — <https://m3.material.io>

StarUML Documentation (Diagramming Standards) — <http://staruml.io/docs>
