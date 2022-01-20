___
# PLC 장비 제어 프로그램 개발
- PLC 장비들을 게이트웨이에 연동하여 통합 제어할 수 있는 프로그램을 개발했습니다.

  - User가 장비 제어 -> 제어 데이터 서버에 전송(소켓 통신)
  - 서버에서 게이트웨이로 데이터 전송(소켓 통신)
  - 게이트웨이에서 Modbus 장비 제어 완료 후 결과값 서버로 전송
  - 서버에서 DB 제어 -> client로 결과 전송 -> User 확인

<br/>

## ✨ 성과
- 하드코딩 되어 있던 코드들을 함수형 프로그래밍으로 `리팩토링`
  - `기존 코드`
    - 한 js 파일에 1000줄 이상의 하드코딩...
    - 장비를 추가하면 해당하는 코드를 계속 추가해줘야 함
  - `내가 수정한 코드`
    - 각각의 기능만 담당하게 분리
    - 장비를 추가해도 해당 장비코드만 등록하면 추가적인 구현 없음

<br/>

### 👉 프로젝트 진행 기간 :
- 2021.5.10 ~ 2021.5.28

<br/>

### 👉 기술스택 :
- Node.js, Express.js
- MariaDB
- Linux

<br/>

### 👉 코드 실행 :
- **npm install**    // cmd 또는 power shell 에서 PLC 폴더 경로 설정 후 npm install 입력, 파일 실행에 필요한 node modules가 설치됨. 게이트웨이에 원격 접속하여 PLC_gateway 폴더에서도 npm install을 진행해야 함.
  
- **npm start**     // PLC 폴더와 PLC_gateway 폴더에서 각각 npm start를 하면 server와 client가 각각 실행됨.

<br/>

### 👉 목차 :
- [PLC 장비 제어 프로그램 개발](#plc-장비-제어-프로그램-개발)
  - [✨ 성과](#-성과)
    - [👉 프로젝트 진행 기간 :](#-프로젝트-진행-기간-)
    - [👉 기술스택 :](#-기술스택-)
    - [👉 코드 실행 :](#-코드-실행-)
    - [👉 목차 :](#-목차-)
    - [👉 개발 상세내용](#-개발-상세내용)
      - [1. 프로그램 흐름 구성도](#1-프로그램-흐름-구성도)
      - [2. 장비 Address Mapping](#2-장비-address-mapping)
      - [3. 장비 제어 모니터링(Modbus-RTU)](#3-장비-제어-모니터링modbus-rtu)
      - [4. 게이트웨이 SSH 원격 접속(MobaXterm)](#4-게이트웨이-ssh-원격-접속mobaxterm)
      - [5. 서버 & 게이트웨이 통신](#5-서버--게이트웨이-통신)
      - [6. 게이트웨이 장비 제어 & DB 업데이트](#6-게이트웨이-장비-제어--db-업데이트)
      - [7. 온습도센서 데이터 1분마다 DB 저장(crontab)](#7-온습도센서-데이터-1분마다-db-저장crontab)
      - [- 센서 데이터 DB 저장 확인](#--센서-데이터-db-저장-확인)
      - [8. 온습도센서, 라즈베리파이 연결 사진 첨부](#8-온습도센서-라즈베리파이-연결-사진-첨부)

<br/>

### 👉 개발 상세내용
#### 1. 프로그램 흐름 구성도
<img src="https://user-images.githubusercontent.com/60170616/150289931-1303ed4f-b43b-4259-92d5-40d06bfe3d0e.png" width="800px"></img>
- User가 장비를 제어하면 서버 -> 게이트웨이로 제어 데이터를 전송합니다. 제어가 성공했을 시 서버에서 DB를 제어하고, client에서는 반영된 데이터를 확인할 수 있습니다.
- DB 제어는 서버에서만 이뤄지며, 실제 장비(Modbus) 제어는 게이트웨이에서만 이뤄집니다.
- 온습도 센서(라즈베리파이)의 데이터는 1분마다 수집되어(crontab) 서버로 전송되고, DB에 저장됩니다.
##
#### 2. 장비 Address Mapping
<img src="https://user-images.githubusercontent.com/60170616/150290111-221b3bca-9134-478c-9bec-053ec8c52300.png" width="500px"></img>
- 각 장비들의 address 주소를 설정하여 제어에 용이하게 합니다.
##
#### 3. 장비 제어 모니터링(Modbus-RTU)
![3](https://user-images.githubusercontent.com/60170616/122720091-fbc17e00-d2a9-11eb-90a1-82ea2be468b4.png)
- Modbus-RTU 프로그램으로 장비가 제어되는 것을 모니터링합니다. 위 사진은 postman으로 user의 데이터 입력 신호를 보내 2번 조명(0x0002)이 켜진 모습입니다.
##
#### 4. 게이트웨이 SSH 원격 접속(MobaXterm)
![4](https://user-images.githubusercontent.com/60170616/122720106-024ff580-d2aa-11eb-9324-fb70fa7fb165.png)
- MobaXterm을 이용하여 게이트웨이에 SSH 원격 접속하고, 장비 제어 소스 코드를 옮겼습니다. 이후에는 Visual studio code에서 SSH 원격 접속했습니다.
##
#### 5. 서버 & 게이트웨이 통신
![5](https://user-images.githubusercontent.com/60170616/122720121-07ad4000-d2aa-11eb-89ec-73d7328c15b7.png)
- postman으로 입력 데이터를 보냈을 때 서버에서 이를 수신하고, 게이트웨이로 전송하는 과정을 확인했습니다.
##
#### 6. 게이트웨이 장비 제어 & DB 업데이트
![6](https://user-images.githubusercontent.com/60170616/122720148-0e3bb780-d2aa-11eb-8d54-7bd663d821df.png)
- 게이트웨이에서 장비가 제어되고, 서버에서 DB를 update 한 것을 확인했습니다.
##
#### 7. 온습도센서 데이터 1분마다 DB 저장(crontab)
![7](https://user-images.githubusercontent.com/60170616/122720158-1267d500-d2aa-11eb-8279-e11aeb8badd9.png)
- 온습도센서를 라즈베리파이에 연결하고, crontab으로 1분마다 센서 데이터를 게이트웨이로 전송합니다. 게이트웨이에서는 센서 데이터를 서버로 전송하고, 서버에서는 데이터를 DB에 저장합니다.
  
#### - 센서 데이터 DB 저장 확인
![8](https://user-images.githubusercontent.com/60170616/122720172-1693f280-d2aa-11eb-8a14-3cd3f277b391.png)
- 센서 데이터가 DB에 저장된 것을 확인했습니다. 센서 데이터는 온도, 습도, 이산화탄소, 미세먼지 등 입니다.
##
#### 8. 온습도센서, 라즈베리파이 연결 사진 첨부
![9](https://user-images.githubusercontent.com/60170616/122720181-1a277980-d2aa-11eb-9ac8-6eccb5ba79e7.png)
- 온습도센서와 라즈베리파이를 연결한 모습입니다.
___
