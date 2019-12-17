# -*- coding: utf8 -*-
#!/usr/bin/env python

import io
import os
import sys
import zipfile
import shutil

if __name__ == '__main__':
    currentDir = os.path.dirname(os.path.abspath(__file__))
    zipFullPath = sys.argv[1]
    newZipFullPath = sys.argv[2]

    tempDir = os.path.join(currentDir, "temp")

    if not os.path.exists(zipFullPath) or len(sys.argv) < 3:
        sys.exit('py <script name> <source zip path> <result zip path>')

    if not os.path.exists(os.path.dirname(newZipFullPath)):
        os.makedirs(os.path.dirname(newZipFullPath))

    if os.path.exists(tempDir):
        shutil.rmtree(tempDir)
    else:
        os.makedirs(tempDir)

    with zipfile.ZipFile(zipFullPath, 'r') as zip:
        zip.extractall(tempDir)

    files = os.listdir(tempDir)

    htms = [file for file in files if file.endswith('.htm')]
    for k, file in enumerate(htms):
        fileDecodedName = file.encode('cp437').decode('cp866')
        os.rename(os.path.join(tempDir, file),
                  os.path.join(tempDir, fileDecodedName))
        l = []
        fIn = io.open(os.path.join(tempDir, fileDecodedName),
                      'r', encoding='cp1251')
        for line in fIn:
            l.append(line)
        fIn.close()

        fOut = io.open(os.path.join(tempDir, fileDecodedName),
                       'w', encoding='utf8')
        for i in l:
            fOut.writelines(i)
        fOut.close()
        htms[k] = fileDecodedName

    zip = zipfile.ZipFile(newZipFullPath, "w")
    for dir, subdirs, files in os.walk(tempDir):
        for file in htms:
            zip.write(os.path.join(tempDir, file), file)
    zip.close()

    shutil.rmtree(tempDir)
