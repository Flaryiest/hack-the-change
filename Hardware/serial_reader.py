import serial

# TODO: make functions that can be imported by another python program
def init_serial(serial_port="COM3", serial_baudrate=9600, serial_timeout=None) :
    return serial.Serial(
        port = serial_port,
        baudrate = serial_baudrate,
        timeout = serial_timeout
        )

def get_user_id(ser, serial_message_len=9) :
    '''reads a single 9 byte input from serial and outputs it as a string. ser is a serial.serial object'''

    raw_input = b'' # set raw_input as a bytes

    # NOTE: assumes that all the user id's have serial_message_len length
    raw_input += ser.read(serial_message_len)

    return raw_input.decode("utf-8")


def close_serial(ser) :
    '''closes ser as a serial object'''
    ser.close()
# testing code (should work the same as the definitions
if __name__ == "__main__":
    ser = serial.Serial(
        port = "COM3",
        baudrate = 9600,
        timeout = None
        )
    raw_input = b''

    # read 10 bytes (9 ASCII chars and 1 '\0')
    # raw_input is a bytes (basically an integer array) now
    raw_input += ser.read(9)
    print(f"read '{raw_input.decode("utf-8")}' from serial")

    ser.close()
    
    # bytes are just integer arrays
    '''
    message = "Python is fun"
    byte1 = bytes(message, "utf-8")

    for i in range(0, len(byte1)):
        print(f"{byte1[i]}")
        if (byte1[i] == 32):
            print("there is a space!!!")
            '''
