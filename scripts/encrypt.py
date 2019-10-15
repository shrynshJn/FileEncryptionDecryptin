import sys
import math 
import pickle
from aes import Rijndael
from encoding import elias_detla_encoding as eDelc
from encoding import elias_delta_decoding as eDeld
import os 
def convert16(num):
    return "2"*(16 - len(num)%16) + num

def remove2s(num):
    return num.replace('2', '')
try:
    encrypter = Rijndael('batmandarkknight')
    fileLoc =  os.path.abspath(sys.argv[1])
    data = [ord(x) for x in open(fileLoc, 'r').read()]
    data = [eDelc(num) for num in data]
    data = [convert16(num) for num in data]
    data = [encrypter.encrypt(num) for num in data]
    filename = sys.argv[2]
    enc_filename = os.path.abspath("./encrypted/" + filename + ".enc1")
    encrypted = open(enc_filename,  'bw')
    pickle.dump(data, encrypted)
    encrypted.close()
    print(enc_filename, end='') 
except Exception as e:
    print(e)