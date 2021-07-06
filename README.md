___
# QR코드 기반의 스마트 설비 관리 시스템 개발
- 스마트 설비 관리 시스템을 node.js로 개발했습니다.
- Back-End : Express.js + MariaDB
- Front-End : React
___
### 👉 프로젝트 진행 기간 :
- 2021.4.19 ~ 2021.5.4
### 👉 기술스택 :
- Node.js
- React + HTML, CSS, JavaScript
- Express.js
- MariaDB
### 👉 소스 실행 :
- **npm install**    // cmd 또는 power shell 에서 폴더 경로 설정 후 npm install 입력, 파일 실행에 필요한 node modules가 설치됨. client 폴더에서도 npm install 입력.
- **npm run dev**     // npm run dev 를 입력하면 server와 client가 동시에 실행됨.(server.js + ./client/src/index.js)
### 👉 목차(개발 상세내용) :
1. [DB 연동(MariaDB)](#1-db-연동mariadb)
2. [메인 대시보드](#2-메인-대시보드)
3. [설비 관리](#3-설비-관리)
4. [정비 관리](#4-정비-관리)
5. [자재 QR 코드 관리](#5-자재-qr-코드-관리)
6. [코드 관리(설비 분류, 설비 위치 코드)](#6-코드-관리설비-분류-설비-위치-코드)
7. [3D 창고조회](#7-3d-창고조회)
___
### 👉 개발 상세내용
#### 1. DB 연동(MariaDB)
![00](https://user-images.githubusercontent.com/60170616/122676932-0ed93d00-d21b-11eb-982c-db061462b18b.png)
- 서버는 express를 활용하였고, DB는 MariaDB를 연동하여 관리하였습니다.
##
#### 2. 메인 대시보드
![1](https://user-images.githubusercontent.com/60170616/122677021-67a8d580-d21b-11eb-85ec-d5a5f4d14d14.png)
- 메인 대시보드는 전체적인 설비 관리 시스템의 기능을 보여주고, 설비 및 정비 일정을 바로 파악할 수 있게 만들었습니다.
##
#### 3. 설비 관리
![2](https://user-images.githubusercontent.com/60170616/122677078-a474cc80-d21b-11eb-9da6-576fa60336cd.png)
- 설비 관리 페이지는 설비 보고서를 관리하는 페이지입니다. 설비 목록이 보여지고, 설비 보고서를 추가, 수정, 삭제할 수 있습니다. 또한 담당자 이름으로 검색을 하는 필터링 기능을 지원합니다.

#### - 보고서 추가, 수정, 삭제 모달창
<img src="https://user-images.githubusercontent.com/60170616/122677178-2cf36d00-d21c-11eb-9355-db9ff37fd67a.png" width="700px"></img>
- 추가, 수정, 삭제 버튼을 누르면 모달창이 뜨게 됩니다. 수정할 때는 DB에 저장되어 있는 데이터를 default 값으로 설정하였습니다.  
##
#### - 설비 상세페이지
<img src="https://user-images.githubusercontent.com/60170616/122677226-70e67200-d21c-11eb-9121-91df1c2b0bbb.png"></img>
- 설비 상세페이지에는 설비 기본정보와 설비에 쓰인 자재 정보들이 보여집니다. 실제 현장에서 QR 코드를 통해 설비 정보를 확인할 수 있게 하려는 목적으로 설비 링크에 대한 QR 코드를 프린트 가능하게 구현했습니다.

#### - 자재 정보 수정 및 QR 코드 프린트
<img src="https://user-images.githubusercontent.com/60170616/122677326-dcc8da80-d21c-11eb-8a53-e1ed9e4c97c7.png" width="600px"></img>
![6](https://user-images.githubusercontent.com/60170616/122677359-fbc76c80-d21c-11eb-9d45-790e5b051d37.png)

#### - 이미지 크게보기 기능
![7](https://user-images.githubusercontent.com/60170616/122677405-126dc380-d21d-11eb-8392-33b8227e3ed1.png)
   - 자재 정보에서 이미지를 클릭하면 크게 보여주고, 출력도 가능하도록 구현했습니다.
##
#### 4. 정비 관리
![8](https://user-images.githubusercontent.com/60170616/122677448-3c26ea80-d21d-11eb-967b-bfd4cb947b8f.png)
- 정비 관리 페이지에서는 정비 예정 스케쥴과 상세 내용을 관리합니다. 정비 스케쥴 추가, 수정, 삭제가 가능합니다.

#### - 정비스케쥴 추가, 수정, 삭제 모달창
<img src="https://user-images.githubusercontent.com/60170616/122677481-64164e00-d21d-11eb-9297-7e2904c521ab.png" width="700px"></img>
##
#### - 정비 캘린더
![10](https://user-images.githubusercontent.com/60170616/122677492-72646a00-d21d-11eb-962d-4332ea45fddd.png)
- 정비 스케쥴을 달력 형태로 한눈에 볼 수 있게 구현했습니다. 캘린더에서는 스케쥴을 간단하게 추가하도록 하고, 정비 관리 페이지에서 상세히 수정할 수 있습니다.

#### - 정비 스케쥴 간편 추가
![11](https://user-images.githubusercontent.com/60170616/122677533-a50e6280-d21d-11eb-9701-81dfa1cb5238.png)
##
#### 5. 자재 QR 코드 관리
![12](https://user-images.githubusercontent.com/60170616/122677542-b35c7e80-d21d-11eb-9123-ffb067044944.png)
- 자재 QR 코드 관리 페이지에서는 자재 정보를 관리합니다.

#### - 자재 정보 추가, 수정, 삭제, QR코드 프린트
![13](https://user-images.githubusercontent.com/60170616/122677588-edc61b80-d21d-11eb-874f-ff3ee3c57de1.png)
##
#### 6. 코드 관리(설비 분류, 설비 위치 코드)
![14](https://user-images.githubusercontent.com/60170616/122677619-0c2c1700-d21e-11eb-9b55-2049f604dc28.png)
![15](https://user-images.githubusercontent.com/60170616/122677626-10f0cb00-d21e-11eb-9b2d-1f6bd10f1d6e.png)
- 코드 관리 페이지는 설비 분류 및 위치 DB를 관리하는 페이지입니다. 설비 보고서를 추가할 때 설비 분류와 설비 위치를 설정해야 하는데, 그 때 DB에 저장된 분류와 위치를 드롭메뉴로 설정할 수 있게 합니다. 설비분류 및 위치가 새롭게 변경되면 코드관리에서 먼저 변경을 해줘야합니다.
#### - 설비 분류, 설비 위치 코드 추가 모달창
<img src="https://user-images.githubusercontent.com/60170616/122677702-67f6a000-d21e-11eb-90dd-1d14ce13ddd8.png" width="600px"></img>
##
#### 7. 3D 창고조회
![17](https://user-images.githubusercontent.com/60170616/122677714-7644bc00-d21e-11eb-9fdd-738091968f3f.png)
- 3D 창고조회 페이지는 설비 위치에 대한 3D 이미지를 보여줍니다. 360도 회전이 가능한 사진을 업로드하여 위치를 파악할 수 있도록 합니다.
___
