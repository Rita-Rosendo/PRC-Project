import csv

with open('WARDS_2015_V2.csv', 'r', encoding='utf8') as ficheiro:
    case = list(csv.reader(ficheiro, delimiter=','))[1:]

with open('wards.txt', mode='w', encoding='utf8') as individuos:
    for ind in case:
        individuos.write("###  http://www.di.uminho.pt/prc2021/chicago_crimes#ward_" + ind[0] + '\n')
        individuos.write(':ward_' + ind[0] + ' rdf:type owl:NamedIndividual ,\n')
        individuos.write('                  :Ward ;\n')
        individuos.write('         :shape_area ' + ind[2] + ' ;\n')
        individuos.write('         :shape_length ' + ind[1] + ' .\n\n\n')
'''
import pandas as pd
df = pd.read_csv('WARDS_2015.csv')
# If you know the name of the column skip this
first_column = df.columns[0]
# Delete first
df = df.drop([first_column], axis=1)
df.to_csv('WARDS_2015_V2.csv', index=False)
'''