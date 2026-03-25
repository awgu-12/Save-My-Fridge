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

-Login(간단 로그인)
-재료 등록
-재료 삭제
-재료 수량 수정
-전체 목록 조회
-이름 검색
-카테고리 필터
-유통기한 입력/수정
-유통기한 임박 표시(3일 이내)
-유통기한 지난 재료 표기(폐기)
-메모추가
-보관 위치 설정(냉장/냉동)
3. Use case list
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
| Actor | System | 
| Description | 사용하거나 버린 재료를 제거한다. |

4)Edit Ingredient Quantity(재료 수량 수정)
| 구분 | 상세 |
| :--- | :--- |
| Actor | user | 
| Description | 일부 사용 시 수량을 업데이트한다. |

5)View full list(전체 목록 조회)
| 구분 | 상세 |
| :--- | :--- |
| Actor | user | 
| Description | 냉장고의 전체 재료(내용) 확인 |

6)Search by name(재료찾기)
| 구분 | 상세 |
| :--- | :--- |
| Actor | user | 
| Description | 사용자가 찾을려는 재료를 찾아준다. |

7)Category filter
| 구분 | 상세 |
| :--- | :--- |
| Actor | user | 
| Description | 채소 / 육류 / 유제품 등 분류하여 조회한다. |

8)Enter/Edit expiration data (유통기한 입력/수정)
| 구분 | 상세 |
| :--- | :--- |
| Actor | user | 
| Description | 날짜 입력 및 남은 일수를 계산한다. |

9)Mark Expiration Date (Within 3 Days), 유통기한 임박(3일이내)
| 구분 | 상세 |
| :--- | :--- |
| Actor | System | 
| Description | 유통기한이 3일 이내로 남은 재료를 표시 |

10)Mark Expired Ingredients (Discard), 유통기한 지난 재료 폐기
| 구분 | 상세 |
| :--- | :--- |
| Actor | user | 
| Description | 유통기한이 부패한 재료 한 번에 정리한다. |

11)Add Memo
| 구분 | 상세 |
| :--- | :--- |
| Actor | user | 
| Description | 사용자가 이름을 입력하여 본인의 냉장고 데이터 파일(.txt)을 불러오고 세션을 시작한다. |

12)Set Storage Location (Refrigerated / Freezer), 보관 위치 설정(냉장/냉동)
| 구분 | 상세 |
| :--- | :--- |
| Actor | User | 
| Description | 식재료에 라 보관 장소를 '냉장' 또는 '냉동'으로 지정, 관리한다. |

4. Concept of operation
5. Problem statement
6. Glossary
7. References
