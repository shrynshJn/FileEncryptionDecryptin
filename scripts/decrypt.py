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
    data = open(fileLoc, 'rb')
    data = pickle.load(data)
    data = [encrypter.decrypt(num) for num in data]
    data = [remove2s(num) for num in data]
    data = [eDeld(num) for num in data]
    data = [chr(num) for num in data]
    filename = sys.argv[2]
    dec_filename = os.path.abspath("./decrypted/" + filename + ".txt")
    decrypted = open(dec_filename,  'w')
    decrypted.write(''.join(data))
    decrypted.close()
    print(dec_filename, end='') 
except Exception as e:
    print(e)