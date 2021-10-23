#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>
#include <termios.h>
#include <arpa/inet.h>
#include <errno.h>

#define BAUDRATE 9600

int OpenSerial(char *device_name);
void error_handling(char *message);

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("아규먼트를 주세요\n");
        printf("./multi_sensor (포트)\n");
        return -1;
    }

    char PORT1[10] = {};
    sprintf(PORT1, "/dev/ttyUSB%s", argv[1]);
    //printf("%s\n", PORT1);

    int FdPort1;
    FdPort1 = OpenSerial(PORT1);
    // FdPort1 = OpenSerial("/dev/ttyUSB0");
    if (FdPort1 < 0)
    {
        return -1;
    }

    int ReadMsgSize_temp = 0;
    int ReadMsgSize_co2 = 0;
    int ReadMsgSize_voc = 0;
    unsigned char data_temp_humi[8];
    unsigned char data_co2_pm[8];
    unsigned char data_co2_voc[8];

    unsigned char temp_humi[8] = {0x47, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x48};
    unsigned char co2_pm[8] = {0x48, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x49};
    unsigned char co2_voc[8] = {0x48, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x4a};

    write(FdPort1, temp_humi, 8 * sizeof(char));
    sleep(1);
    ReadMsgSize_temp = read(FdPort1, data_temp_humi, 8 * sizeof(char));

    write(FdPort1, co2_pm, 8 * sizeof(char));
    sleep(1);
    ReadMsgSize_co2 = read(FdPort1, data_co2_pm, 8 * sizeof(char));

    write(FdPort1, co2_voc, 8 * sizeof(char));
    sleep(1);
    ReadMsgSize_voc = read(FdPort1, data_co2_voc, 8 * sizeof(char));

    char temp[20], humi[20], co2[20], pm[20], voc[20];
    if (ReadMsgSize_temp > 0)
    {
        sprintf(temp, "%02x%02x", data_temp_humi[3], data_temp_humi[4]);
        sprintf(humi, "%02x%02x", data_temp_humi[5], data_temp_humi[6]);
        //printf("온도 : %d\n습도 : %d\n", atoi(temp), atoi(humi));
    }
    else
    {
        perror("data_temp_humi can not read\n");
    }

    if (ReadMsgSize_co2 > 0)
    {
        sprintf(co2, "%02x%02x", data_co2_pm[3], data_co2_pm[4]);
        sprintf(pm, "%02x%02x", data_co2_pm[5], data_co2_pm[6]);
        //printf("co2 : %d\npm2.5 : %d\n", atoi(co2), atoi(pm));
    }
    else
    {
        perror("data_co2_pm can not read\n");
    }

    if (ReadMsgSize_voc > 0)
    {
        sprintf(voc, "%02x%02x", data_co2_voc[5], data_co2_voc[6]);
        //printf("vocs : %d\n", atoi(voc));
    }
    else
    {
        perror("data_co2_voc can not read\n");
        return 0;
    }
    char sensor_data[100] = {};
    sprintf(sensor_data, "{\"temp\" : %d, \"humi\" : %d, \"co2\" : %d, \"dust_pm25\" : %d}", atoi(temp), atoi(humi), atoi(co2), atoi(pm));
    printf("%s", sensor_data);
    close(FdPort1);
    return 0;
}

int OpenSerial(char *device_name)
{
    int fd;
    struct termios newtio;

    fd = open(device_name, O_RDWR | O_NOCTTY);

    if (fd < 0)
    {
        perror("Serial Port Open Fail\n");
        return -1;
    }

    memset(&newtio, 0, sizeof(newtio));
    newtio.c_iflag = IGNPAR;
    newtio.c_oflag = 0;
    newtio.c_cflag = CS8 | CLOCAL | CREAD;

    switch (BAUDRATE)
    {
    case 115200:
        newtio.c_cflag |= B115200;
        break;
    case 57600:
        newtio.c_cflag |= B57600;
        break;
    case 38400:
        newtio.c_cflag |= B38400;
        break;
    case 19200:
        newtio.c_cflag |= B19200;
        break;
    case 9600:
        newtio.c_cflag |= B9600;
        break;
    case 4800:
        newtio.c_cflag |= B4800;
        break;
    }

    newtio.c_lflag = 0;
    // newtio.c_cc[VTIME] = 20;
    // newtio.c_cc[VMIN] = 0;

    tcflush(fd, TCIFLUSH);
    tcsetattr(fd, TCSANOW, &newtio);

    return fd;
}
