# Save-My-Fridge
<img width="611" height="605" alt="스크린샷 2026-03-24 200914" src="https://github.com/user-attachments/assets/c8310db9-0bd4-4203-8f96-5864b1fc690e" />

**학번:** 22411905  
**성함:** 구민주  
**이메일:** alswn249@naver.com

## [ Revision history ]

| Revision date | Version # | Description | Author |
| :--- | :--- | :--- | :--- |
| 03/26/2026 | 0.0.1 | 초안작 | 구민주 |

### = Contents =
| No. | Title | Page |
| :--- | :--- | :---: |
| 1 | Business purpose | 1 |
| 2 | System context diagram | 2 |
| 3 | Use case list | 3 |
| 4 | Concept of operation | 4 |
| 5 | Problem statement | 6 |
| 6 | Glossary | 7 |
| 7 | References | 7 |

#### 1. Business purpose
#### 2. System context diagram
<img width="1897" height="449" alt="스크린샷 2026-03-26 003436" src="https://github.com/user-attachments/assets/a02d75b3-cf55-400a-bcb7-194f0a9fb903" />  
-Login(간단 로그인)<br/>   
-재료 등록<br/>       
-재료 삭제<br/>   
-재료 수량 수정<br/>   
-전체 목록 조회<br/>   
-이름 검색<br/>   
-카테고리 필터<br/>   
-유통기한 입력/수정<br/>   
-유통기한 임박 표시(3일 이내)<br/>      
-유통기한 지난 재료 표기(폐기)<br/>      
-메모추가<br/>     
-보관 위치 설정(냉장/냉동)

#### 3. Use case list
1)Login
| 구분 | 상세 |
| :--- | :--- |
| Actor | User | 
| Description | 사용자가 아이디와 비밀번호로 로그인한다. |

2)Register Ingredient(재료 등록)
| 구분 | 상세 |
| :--- | :--- |
| Actor | User | 
| Description | 보관할 식재료의 이름, 카테고리, 수량, 유통기한 등의 정보를 시스템에 저장한다. |

3)Delete Ingredient(재료 삭제)
| 구분 | 상세 |
| :--- | :--- |
| Actor | User | 
| Description | 사용하거나 버린 재료를 제거한다. |

4)Edit Ingredient Quantity(재료 수량 수정)
| 구분 | 상세 |
| :--- | :--- |
| Actor | User | 
| Description | 일부 사용 시 수량을 업데이트한다. |

5)View full list(전체 목록 조회)
| 구분 | 상세 |
| :--- | :--- |
| Actor | User | 
| Description | 냉장고의 전체 재료(내용) 확인 |

6)Search by name(재료찾기)
| 구분 | 상세 |
| :--- | :--- |
| Actor | User | 
| Description | 사용자가 찾을려는 재료를 찾아준다. |

7)Category filter
| 구분 | 상세 |
| :--- | :--- |
| Actor | User | 
| Description | 채소 / 육류 / 유제품 등 분류하여 조회한다. |

8)Enter/Edit expiration data (유통기한 입력/수정)
| 구분 | 상세 |
| :--- | :--- |
| Actor | User | 
| Description | 날짜 입력 및 남은 일수를 계산한다. |

9)Mark Expiration Date (Within 3 Days), 유통기한 임박(3일이내)
| 구분 | 상세 |
| :--- | :--- |
| Actor | System | 
| Description | 유통기한이 3일 이내로 남은 재료를 표시 |

10)Mark Expired Ingredients (Discard), 유통기한 지난 재료 폐기
| 구분 | 상세 |
| :--- | :--- |
| Actor | System | 
| Description | 유통기한이 부패한 재료 한 번에 정리한다. |

11)Add Memo
| 구분 | 상세 |
| :--- | :--- |
| Actor | User | 
| Description | 사용자가 이름을 입력하여 본인의 냉장고 데이터 파일(.txt)을 불러오고 세션을 시작한다. |

12)Set Storage Location (Refrigerated / Freezer), 보관 위치 설정(냉장/냉동)
| 구분 | 상세 |
| :--- | :--- |
| Actor | User | 
| Description | 식재료에 라 보관 장소를 '냉장' 또는 '냉동'으로 지정, 관리한다. |

#### 4. Concept of operation
1)Login
| 구분 | 상세 |
| :--- | :--- |
| Purpose | 앱을 사용하기 위해 등록된 사용자인지 확인 | 
| Approach | 사용자가 ID, PW를 입력 후 로그인을 요청하면 서버에서 회원 정보를 조회 후 성공/실패 여부를 확인한다. |
| Dynamics | 앱 실행 후 로그인 화면에서 시도할 경우 |
| Goals | 로그인 기능을 구현하여 사용자 인증을 완료한다 |

2)Register Ingredient
| 구분 | 상세 |
| :--- | :--- |
| Purpose | 냉장고에 보관할 식재료 정보를 시스템에 저장 | 
| Approach | 사용자가 재료명, 카테고리, 수량, 유통기한을 입력하고 등록 버튼을 누르면 데이터베이스에 해당 정보가 저장된다. |
| Dynamics | 새로운 식재료를 구매하거나 보관을 시작할 때 |
| Goals | 사용자가 보유한 식재료의 목록을 정확하게 데이터화한다.  |

3)Delete Ingredient
| 구분 | 상세 |
| :--- | :--- |
| Purpose | 더 이상 보관하지 않는 식재료 정보 목록에서 제거 | 
| Approach | 사용자가 삭제할 재료를 선택하고 삭제 버튼을 누르면 데이터베이스에서 해당 항목 삭제 |
| Dynamics | 재료 수 모두 소비했거나 폐기하여 목록 정리가 필요할  |
| Goals | 현재 보관 중인 재료와 시스템 상의 목록을 일치 |

4)Edit Ingredient Quantity
| 구분 | 상세 |
| :--- | :--- |
| Purpose | 보관 중인 재료 양 변했을 때 정보 업데이트 | 
| Approach | 상세 화면에서 수량조절 버튼(+/-)이나 입력을 통해 변경 |
| Dynamics | 재료의 일부 사용 또는 추가 구매의 보관 경우  |
| Goals | 정확한 재료 수량 파악하며 효율적인 관리 |

5)View full list
| 구분 | 상세 |
| :--- | :--- |
| Purpose | 현재 보관 중인 모든 식재료 현황 확인 | 
| Approach | 로그인 후 full버튼 클릭 시 모든 재료 데이터를 리스트 형태로 화면에 출력 |
| Dynamics | 현재 보관 현황을 확인하고 싶을 때  |
| Goals | 전체 식재료 파악과 관리 |

6)Search by name
| 구분 | 상세 |
| :--- | :--- |
| Purpose | 특정 재료를 찾기 위한 기능 | 
| Approach | 검색창에 키워드 입력 시 해당 글자가 포함된 재료 이름만 필터링 후 보여주기 |
| Dynamics | 급할 때 특정 재료의 유뮤, 수량 확인을 위할 떄  |
| Goals | 탐색 시간을 단축 |

7)Category filter
| 구분 | 상세 |
| :--- | :--- |
| Purpose | 재료 종류별로 모아보기 기능을 통해 관리 효율성 증 | 
| Approach | 사용자가 특정 카테고리를 선택하면 해당 분류의 데이터만 선별 후 표시 |
| Dynamics | 특정 종류의 재료들만 따로 확인하고 싶을 때  |
| Goals | 식재료를 체계적으로 분류하고 관리 |

8)Enter/Edit expiration data
| 구분 | 상세 |
| :--- | :--- |
| Purpose | 각 재료의 신선도 관리 기준 날짜 정보 등록 또는 변경  | 
| Approach | 날짜 선택 도구를 통해 정확한 [년/월/일]을 선택, 잘못 입력된 날짜 수정 |
| Dynamics | 새로운 재료 등록 또는 잘못된 날짜 수정할 때  |
| Goals | 정확한 날짜 통해 유통기한 알림 기능 정확도 증가 |

9)Mark Expiration Date (Within 3 Days)
| 구분 | 상세 |
| :--- | :--- |
| Purpose | 섭취 불가능한 식재료를 시각적으로 구분 | 
| Approach | 유통기한 날짜가 현재 날짜보다 이전인 항목을 자동으로 감지하여 '폐기' 문구 또는 색상으로 강조 |
| Dynamics | 유통기한 지난 재료 발생 시 실시간 반영 |
| Goals | 상한 음식 섭취 방지와 위생적인 냉장고 환경 유지  |

10)Mark Expired Ingredients (Discard)
| 구분 | 상세 |
| :--- | :--- |
| Purpose | 섭취 불가능한 식재료를 시각적으로 구분 | 
| Approach | 유통기한 날짜가 현재 날짜보다 이전인 항목 자동으로 감지, '폐기' 문구 또는 색상으로 강조 |
| Dynamics | 앱 실행 시 또는 목록 진입 시 유통기한 지난 항목들 자동 갱신 |
| Goals | 상한 음식 섭취를 방지하고 위생적인 냉장고 환경을 유지 |

11)Add memo
| 구분 | 상세 |
| :--- | :--- |
| Purpose |  추가적인 상세 정보를 기록| 
| Approach | 텍스트 입력창을 통해 자유로운 메모를 작성하고 저장한다. |
| Dynamics | 특정 재료에 대한 특이사항 필요 시  |
| Goals | 개인별 맞춤 정보 기록 후 활용도 높이 |

12)Set Storage Location (Refrigerated / Freezer)
| 구분 | 상세 |
| :--- | :--- |
| Purpose | 재료의 물리적인 보관 위치를 시스템 상에 표 | 
| Approach | 특정 재료를 선택 후 전환 버튼을 통해 '냉장' 혹은 '냉동' 중 하나를 선택 |
| Dynamics | 재료의 보관 위치를 옮겼을 경우  |
| Goals | 실제 재료가 위치 파악 용이와 불필요한 탐색 줄이기 |

#### 5. Problem statement
5.1) 데이터 로딩 성능 최적화<br/>
앱 진입 시마다 등록된 모든 식재료의 유통기한을 현재 날짜와 대조하여 상태(정상/임박/폐기)를 판별해야 한다. 양이 많을 수록 앱 실행 속도 느려질 경우 발생할 가능성이 높다.<br/>
5.2) 유통기한 판별 기준<br/>
사용자가 앱을 실행하는 시점의 시스템 날짜를 기준으로 상태를 갱신하므로, 기기의 시간 설정 오류가 있을 경우 잘못된 정보를 제공할 위험이 있다. 그렇기에 서버시간과의 동기화를 기반으로 상태를 판단하는 기술적 고려가 필요하다<br/>
NFRs)<br/>
-신뢰성 : 시스템은 사용자가 입력한 유통기한 데이터를 정확하게 유지하고, 계산 오류 없이 임박/폐기 상태를 판별해야 한다.<br/>
-사용성 (Usability) : 직관적인 GUI를 통해 사용자가 별도의 매뉴얼 없이도 재료 등록 및 수량 수정을 할 수 있어야 한다<br/>

#### 6. Glossary
| 용어 | 설명 |
| :--- | :--- |
| Inventory (인벤토리) | 현재 냉장고에 보관 중인 모든 식재료의 목록 데이터 | 
| Expiration Date (유통기한) | 해당 식재료를 안전하게 소비할 수 있는 기한 |
| Notification (알림) | 유통기한이 임박하거나 지난 재료를 사용자에게 시각적으로 알리는 기능 |
| Category | 육류, 채소, 과일 등 식재료의 특성에 따른 분류 체계 |

#### 7. References
1. 식품의약품안전처(MFDS) : https://www.mfds.go.kr/index.do
2. 공공데이터포털(data.go.kr) : https://www.data.go.kr/
