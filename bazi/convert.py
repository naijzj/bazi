

import argparse
import subprocess

description = '''
'''
parser = argparse.ArgumentParser(description=description,
                                 formatter_class=argparse.RawTextHelpFormatter)
parser.add_argument('gans', action="store", help=u'天干')
parser.add_argument('zhis', action="store", help=u'地支')
parser.add_argument('--version', action='version',
                    version='%(prog)s 0.1 +微:Carlos-Dalsen')
options = parser.parse_args()

result = ''
for item in zip(options.gans, options.zhis):
    result = result + "".join(item) + " "

#subprocess.call("cls", shell=True)
print(result)
print(subprocess.check_output("python bazi.py -b " + result, shell=True).decode('gbk'))
