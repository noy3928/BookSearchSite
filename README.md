## 실행방법

1. root 폴더에 .env.local 파일을 생성합니다.

```
NEXT_PUBLIC_API_URL={NEXT_PUBLIC_API_URL}
```

2. 의존성 패키지를 설치합니다.

```
$ yarn install
```

2. 프로젝트를 실행합니다.

```
$ yarn dev
```

<br>

## 구현사항

- [x] 리스트, 상세 2개의 화면을 가진다.
- [x] 리스트화면에서 결과값 하나를 선택하면 상세 화면을 보여준다.
- [x] 리스트화면에서는 검색어를 입력할 수 있다.
  - [x] 검색된 정보를 화면에 보여줄 수 있어야 한다.
  - [x] "|" 과 "-" 키워드를 입력받아, 키워드에 따른 검색을 할 수 있어야 한다.
- [x] 무한스크롤이 될 수 있게 한다.

<br>

## 작업 방식

### TDD

- 요구사항을 토대로 기능구현사항을 먼저 [github issue](https://github.com/noy3928/BookSearchSite/issues?q=is%3Aissue+is%3Aclosed)로 작성했습니다.
- 정리된 기능구현사항을 바탕으로 테스트코드를 작성했습니다.
- 테스트코드를 작성 후 기능구현을 진행했습니다.
  - 기존의 TDD 방법론대로 테스트'만' 통과하는 코드를 작성 후 리팩토링을 진행하려 하였으나, 해당 방법론이 익숙치 않아 처음 테스트를 통과하기 위한 코드를 작성할 때부터 코드 작성법에 신경을 쓰게 되었습니다.
  - 때문에 후에 작업하려고 했던 리팩토링은 생략하였습니다.
- 작성된 기능에 대해서 CSS를 추가했습니다.

### 함수형 프로그래밍

- 주어진 요구사항을 토대로 기능구현을 고민하던 중, 함수형 프로그래밍을 도입하면 코드의 가독성과 유지보수성이 높아질 것이라는 생각이 들었습니다.
- 특히 검색기능의 경우 기능 동작에 대한 pipeLine을 만들면 유지보수성이 올라갈 것이라고 판단했습니다. 이를 위해 주어진 기능을 작은 단위로 나누고, 각 단위별로 함수를 작성했습니다. [검색](https://github.com/noy3928/BookSearchSite/issues/3) [무한스크롤](https://github.com/noy3928/BookSearchSite/issues/4)
  - [resolveKeyword](https://github.com/noy3928/BookSearchSite/blob/main/src/services/utils/resolveKeyword.ts) : 입력된 검색어를 "or", "not", "normal"로 분류하여 반환합니다.
  - [fetchBooksByType](https://github.com/noy3928/BookSearchSite/blob/main/src/services/utils/fetchBooksByType.ts) : resolveKeyword에서 반환받은 키워드와 타입에 따라 검색을 진행합니다.
    - pageNumber를 인자로 받아, 페이징 기능을 구현했습니다.
    - setTotalBooks를 인자로 받아, 검색된 키워드의 총 개수를 저장할 수 있게 합니다.
  - [filterKeyword](https://github.com/noy3928/BookSearchSite/blob/main/src/services/utils/filterKeyword.ts) : fetchBooksByType 함수에서 "not" 타입인 경우 키워드를 필터링합니다.
  - [pipe](https://github.com/noy3928/BookSearchSite/blob/main/src/services/utils/fpUtils.ts) : 여러 함수를 합성하는 함수형 유틸함수를 만들었습니다. 프로미스를 지원할 수 있게 만들었습니다.
  - [searchAndSetBooks](https://github.com/noy3928/BookSearchSite/blob/main/src/services/utils/searchAndSetBooks.ts) : 앞서 작성한 함수들을 pipe 함수와 함께 조합하는 함수입니다.
    - resolveKeyword를 통해 키워드를 분류합니다.
    - 분류된 키워드와 타입을 fetchBooksByType 함수에 인자로 전달합니다.
      - loadingDecorator 함수를 통해 로딩 상태를 수정합니다.
    - fetchBooksByType 함수에서 반환받은 데이터를 setBooks 함수를 통해 저장합니다.
    - (키워드 분류 -> 도서 검색 -> 검색결과 반영) 이라는 흐름으로 동작합니다.
  - [loadingDecorator](https://github.com/noy3928/BookSearchSite/blob/main/src/services/utils/loadingDecorator.ts) : 기존에 A -> B -> C 로 동작하는 pipe에서 B 함수의 실행 앞 뒤에 isLoading 상태를 수정하기 위해서 데코레이터 패턴을 사용했습니다. 이 함수를 통해 A -> D(B) -> C 로 동작하게 만들었습니다. 조금 더 쉽게 표현하면 A -> D -> B -> D -> C로 동작하도록 만들었습니다.

<br>

## 시간이 있었다면 더 구현하고 싶었던 사항

- fetchBooksByType 함수에 대한 에러처리
- 테스트코드
  - searchAndSetBooks 함수에 대한 테스트코드를 작성하지 못했습니다. 무한스크롤기능이 추가되기 전의 버전에서는 테스트코드를 작성했지만, 무한스크롤기능이 추가되면서 fetchBooksByType 함수가 커링 함수로 변경되면서 테스트코드 작성에 어려움을 겪었습니다. 커링함수를 조합하는 함수에 대해서 테스트를 작성하는 부분에 대해서 이해도가 아직 부족했던 것 같습니다.
  - useIntersectionObserver 함수에 대한 테스트코드를 작성하지 못했습니다. intersectionObserver api를 모킹하고, 해당 api에 대한 테스트코드를 작성하려하였으나, 시간이 부족하여 작성하지 못했습니다.
